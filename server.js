import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Paystack-Signature"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Verify Paystack webhook signature
function verifyPaystackSignature(payload, signature, secretKey) {
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(JSON.stringify(payload))
    .digest("hex");

  return hash === signature;
}

// Verify transaction with Paystack API
async function verifyTransaction(transactionRef, secretKey) {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${transactionRef}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error verifying transaction:", error);
    throw error;
  }
}

// Send email via SendGrid
async function sendEmail(to, subject, htmlContent) {
  try {
    const fromEmail = process.env.FROM_EMAIL;

    if (!fromEmail) {
      throw new Error("FROM_EMAIL environment variable is not set");
    }

    console.log(`📧 Attempting to send email from: ${fromEmail} to: ${to}`);

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subject,
          },
        ],
        from: { email: fromEmail },
        content: [
          {
            type: "text/html",
            value: htmlContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      let errorMessage = `SendGrid API error: ${response.status} - ${errorData}`;

      // Provide helpful error messages
      if (response.status === 403) {
        errorMessage += `\n\n⚠️  Sender Identity Issue:\n`;
        errorMessage += `   - Verify that "${fromEmail}" is verified in SendGrid\n`;
        errorMessage += `   - Go to: https://app.sendgrid.com/settings/sender_auth/senders\n`;
        errorMessage += `   - Check that the email matches exactly (case-sensitive)\n`;
        errorMessage += `   - Wait 5-10 minutes after verification for changes to propagate\n`;
      }

      throw new Error(errorMessage);
    }

    console.log(`✅ Email sent successfully from: ${fromEmail} to: ${to}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
}

// Generate HTML email template
function generateOrderEmailHTML(orderData, isCustomerEmail = true) {
  const { orderId, items, total, customerDetails, shippingInfo } = orderData;

  const itemsList = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <strong>${item.name}</strong><br>
        <small style="color: #666;">Size: ${item.size} | Color: ${item.color.name}</small>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
        ${item.price}
      </td>
    </tr>
  `
    )
    .join("");

  const emailType = isCustomerEmail
    ? "Order Confirmation"
    : "New Order Notification";
  const greeting = isCustomerEmail
    ? `Hello ${customerDetails.fullName},`
    : "Hello Order Management Team,";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${emailType}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #591976; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { margin-bottom: 15px; }
        .logo img { width: 50px; height: 50px; object-fit: contain; background: white; border-radius: 50%; padding: 5px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .customer-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; text-align: right; padding: 20px; background: #f0f0f0; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="https://tomusfootwear.vercel.app/logo.png" alt="Tomus Logo">
          </div>
          <h1>${emailType}</h1>
          <p>Order ID: ${orderId}</p>
        </div>
        
        <div class="content">
          <p>${greeting}</p>
          
          <div class="order-details">
            <h2>Order Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Details</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            
            <div class="total">
              Total: ₵${total}
            </div>
          </div>
          
          <div class="customer-details">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> ${customerDetails.fullName}</p>
            <p><strong>Email:</strong> ${customerDetails.email}</p>
            <p><strong>Phone:</strong> ${customerDetails.phone}</p>
            <p><strong>Address:</strong> ${shippingInfo.location}</p>
            ${shippingInfo.region ? `<p><strong>Region:</strong> ${shippingInfo.region}</p>` : ""}
            <p><strong>Shipping Method:</strong> ${shippingInfo.shippingMethod === "delivery" ? "Delivery" : "Pick Up"}</p>
            ${shippingInfo.additionalInfo ? `<p><strong>Additional Info:</strong> ${shippingInfo.additionalInfo}</p>` : ""}
          </div>
          
          ${
            isCustomerEmail
              ? `
            <p>Thank you for your order! We'll process it and ship it to you as soon as possible.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          `
              : `
            <p>Please process this order and update the customer on the status.</p>
          `
          }
        </div>
        
        <div class="footer">
          <p>© 2025 Anamon Fashion. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Create order endpoint (Payment on Delivery)
app.post("/api/create-order", async (req, res) => {
  try {
    // Parse request body if it's a string
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        console.error("Error parsing request body:", parseError);
        return res.status(400).json({ error: "Invalid JSON in request body" });
      }
    }

    // Extract order data from request body
    const { orderId, items, total, customerDetails, shippingInfo } = body;

    // Validate required fields
    if (!orderId || !items || !total || !customerDetails || !shippingInfo) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderData = {
      orderId,
      items,
      total: parseFloat(total).toFixed(2),
      customerDetails: {
        fullName: customerDetails.fullName || "N/A",
        email: customerDetails.email || "N/A",
        phone: customerDetails.phone || "N/A",
      },
      shippingInfo: {
        location: shippingInfo.location || "N/A",
        region: shippingInfo.region || "",
        shippingMethod: shippingInfo.shippingMethod || "delivery",
        paymentMethod: shippingInfo.paymentMethod || "delivery",
        additionalInfo: shippingInfo.additionalInfo || "",
      },
    };

    // Send customer confirmation email
    let customerEmailSent = false;
    let managementEmailSent = false;
    let emailErrors = [];

    try {
      const customerEmailHTML = generateOrderEmailHTML(orderData, true);
      await sendEmail(
        orderData.customerDetails.email,
        `Order Confirmation - ${orderData.orderId}`,
        customerEmailHTML
      );
      customerEmailSent = true;
    } catch (emailError) {
      console.error("❌ Failed to send customer email:", emailError);
      emailErrors.push(`Customer email failed: ${emailError.message}`);
    }

    // Send order management notification
    if (process.env.ORDER_MANAGEMENT_EMAIL) {
      try {
        console.log(
          `📧 Sending management notification to: ${process.env.ORDER_MANAGEMENT_EMAIL}`
        );
        const managementEmailHTML = generateOrderEmailHTML(orderData, false);
        await sendEmail(
          process.env.ORDER_MANAGEMENT_EMAIL,
          `New Order Received (Payment on Delivery) - ${orderData.orderId}`,
          managementEmailHTML
        );
        managementEmailSent = true;
        console.log(
          `✅ Management email sent successfully to: ${process.env.ORDER_MANAGEMENT_EMAIL}`
        );
      } catch (emailError) {
        console.error("❌ Failed to send management email:", emailError);
        emailErrors.push(`Management email failed: ${emailError.message}`);
      }
    } else {
      console.warn(
        "⚠️ ORDER_MANAGEMENT_EMAIL not set, skipping management notification"
      );
    }

    // Return response (success even if emails failed, but include warnings)
    const response = {
      message: "Order created successfully",
      orderId: orderData.orderId,
      emailsSent: {
        customer: customerEmailSent,
        management: managementEmailSent,
      },
    };

    if (emailErrors.length > 0) {
      response.warnings = emailErrors;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Order creation error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Webhook endpoint
app.post("/api/paystack-webhook", async (req, res) => {
  try {
    // Verify webhook signature
    const signature = req.headers["x-paystack-signature"];
    if (!signature) {
      console.error("Missing Paystack signature");
      return res.status(400).json({ error: "Missing signature" });
    }

    const isValidSignature = verifyPaystackSignature(
      req.body,
      signature,
      process.env.PAYSTACK_SECRET_KEY
    );

    if (!isValidSignature) {
      console.error("Invalid Paystack signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Extract webhook data
    const { event, data } = req.body;

    // Only process charge.success events
    if (event !== "charge.success") {
      return res.status(200).json({ message: "Event ignored" });
    }

    // Verify transaction with Paystack API
    const transaction = await verifyTransaction(
      data.reference,
      process.env.PAYSTACK_SECRET_KEY
    );

    if (!transaction || transaction.status !== "success") {
      console.error(
        "❌ Transaction verification failed or status is not success"
      );
      return res.status(400).json({ error: "Transaction verification failed" });
    }

    // Extract order details from metadata
    const metadata = transaction.metadata || {};
    const orderData = {
      orderId: data.reference,
      items: metadata.items || [],
      total: (transaction.amount / 100).toFixed(2),
      customerDetails: {
        fullName: metadata.fullName || "N/A",
        email: metadata.email || transaction.customer?.email || "N/A",
        phone: metadata.phone || "N/A",
      },
      shippingInfo: {
        location: metadata.location || "N/A",
        region: metadata.region || "",
        shippingMethod: metadata.shippingMethod || "delivery",
        additionalInfo: metadata.additionalInfo || "",
      },
    };

    // Send customer confirmation email
    let customerEmailSent = false;
    let managementEmailSent = false;
    let emailErrors = [];

    try {
      console.log(
        `📧 Sending customer confirmation email to: ${orderData.customerDetails.email}`
      );
      const customerEmailHTML = generateOrderEmailHTML(orderData, true);
      await sendEmail(
        orderData.customerDetails.email,
        `Order Confirmation - ${orderData.orderId}`,
        customerEmailHTML
      );
      customerEmailSent = true;
      console.log(
        `✅ Customer email sent successfully to: ${orderData.customerDetails.email}`
      );
    } catch (emailError) {
      console.error("❌ Failed to send customer email:", emailError);
      emailErrors.push(`Customer email failed: ${emailError.message}`);
    }

    // Send order management notification
    if (process.env.ORDER_MANAGEMENT_EMAIL) {
      try {
        console.log(
          `📧 Sending management notification to: ${process.env.ORDER_MANAGEMENT_EMAIL}`
        );
        const managementEmailHTML = generateOrderEmailHTML(orderData, false);
        await sendEmail(
          process.env.ORDER_MANAGEMENT_EMAIL,
          `New Order Received - ${orderData.orderId}`,
          managementEmailHTML
        );
        managementEmailSent = true;
        console.log(
          `✅ Management email sent successfully to: ${process.env.ORDER_MANAGEMENT_EMAIL}`
        );
      } catch (emailError) {
        console.error("❌ Failed to send management email:", emailError);
        emailErrors.push(`Management email failed: ${emailError.message}`);
      }
    } else {
      console.warn(
        "⚠️ ORDER_MANAGEMENT_EMAIL not set, skipping management notification"
      );
    }

    // Return success response (even if emails failed, but include status)
    const response = {
      message: "Webhook processed successfully",
      orderId: orderData.orderId,
      emailsSent: {
        customer: customerEmailSent,
        management: managementEmailSent,
      },
    };

    if (emailErrors.length > 0) {
      response.warnings = emailErrors;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
