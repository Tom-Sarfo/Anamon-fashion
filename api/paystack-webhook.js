import crypto from "crypto";

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
        from: { email: process.env.FROM_EMAIL },
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
      throw new Error(`SendGrid API error: ${response.status} - ${errorData}`);
    }

    console.log(`Email sent successfully to: ${to}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
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
          <p>© 2025 Tomus Footwear. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Main webhook handler
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== WEBHOOK RECEIVED ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Body:", JSON.stringify(req.body, null, 2));

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

    console.log("✅ Webhook signature verified successfully");

    // Extract webhook data
    const { event, data } = req.body;

    // Only process charge.success events
    if (event !== "charge.success") {
      console.log(`❌ Ignoring event: ${event}`);
      return res.status(200).json({ message: "Event ignored" });
    }

    console.log("✅ Processing successful payment:", data.reference);

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

    console.log("✅ Transaction verified successfully");

    // Extract order details from metadata
    const metadata = transaction.metadata || {};
    const orderData = {
      orderId: data.reference,
      items: metadata.items || [],
      total: (transaction.amount / 100).toFixed(2), // Convert from kobo to naira
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

    console.log("📦 Order data extracted:", JSON.stringify(orderData, null, 2));

    // Check environment variables
    console.log("🔧 Environment check:");
    console.log(
      "- SENDGRID_API_KEY:",
      process.env.SENDGRID_API_KEY ? "✅ Set" : "❌ Missing"
    );
    console.log("- FROM_EMAIL:", process.env.FROM_EMAIL || "❌ Missing");
    console.log(
      "- ORDER_MANAGEMENT_EMAIL:",
      process.env.ORDER_MANAGEMENT_EMAIL || "❌ Missing"
    );

    // Send customer confirmation email
    console.log(
      "📧 Sending customer confirmation email to:",
      orderData.customerDetails.email
    );
    const customerEmailHTML = generateOrderEmailHTML(orderData, true);
    await sendEmail(
      orderData.customerDetails.email,
      `Order Confirmation - ${orderData.orderId}`,
      customerEmailHTML
    );

    console.log("✅ Customer confirmation email sent");

    // Send order management notification
    console.log(
      "📧 Sending management notification to:",
      process.env.ORDER_MANAGEMENT_EMAIL
    );
    const managementEmailHTML = generateOrderEmailHTML(orderData, false);
    await sendEmail(
      process.env.ORDER_MANAGEMENT_EMAIL,
      `New Order Received - ${orderData.orderId}`,
      managementEmailHTML
    );

    console.log("✅ Order management notification sent");

    // Return success response
    res.status(200).json({
      message: "Webhook processed successfully",
      orderId: orderData.orderId,
    });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
