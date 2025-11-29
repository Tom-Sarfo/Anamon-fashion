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
        <small style="color: #666;">Size: ${item.size} | Color: ${item.color?.name || item.color || "N/A"}</small>
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

  const paymentMethodNote = shippingInfo.paymentMethod === "delivery"
    ? "<p><strong>Payment Method:</strong> Payment on Delivery</p>"
    : "";

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
        .header { background: #000000; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { margin-bottom: 15px; }
        .logo img { width: 50px; height: 50px; object-fit: contain; background: white; border-radius: 50%; padding: 5px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .customer-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; text-align: right; padding: 20px; background: #f0f0f0; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .payment-notice { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="https://tomusfootwear.vercel.app/logo.png" alt="Anamon Logo">
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
            ${paymentMethodNote}
            ${shippingInfo.additionalInfo ? `<p><strong>Additional Info:</strong> ${shippingInfo.additionalInfo}</p>` : ""}
          </div>
          
          ${
            isCustomerEmail
              ? `
            <div class="payment-notice">
              <p><strong>Payment on Delivery</strong></p>
              <p>Your order has been placed successfully! You will pay when your order is delivered.</p>
              <p>Expect your order to arrive within <strong>48 hours</strong> or <strong>2 days</strong>.</p>
            </div>
            <p>Thank you for your order! We'll process it and ship it to you as soon as possible.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          `
              : `
            <div class="payment-notice">
              <p><strong>Payment Method:</strong> Payment on Delivery</p>
              <p>This order requires payment upon delivery. Please ensure payment is collected when delivering the order.</p>
            </div>
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

// Main API handler for creating orders (Payment on Delivery)
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== CREATE ORDER REQUEST ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Method:", req.method);
    console.log("Headers:", JSON.stringify(req.headers, null, 2));
    
    // Parse request body if it's a string (Vercel sometimes sends it as a string)
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        console.error("Error parsing request body:", parseError);
        return res.status(400).json({ error: "Invalid JSON in request body" });
      }
    }
    
    console.log("Body:", JSON.stringify(body, null, 2));

    // Extract order data from request body
    const {
      orderId,
      items,
      total,
      customerDetails,
      shippingInfo,
    } = body;

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

    console.log("📦 Order data:", JSON.stringify(orderData, null, 2));

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
    let customerEmailSent = false;
    let managementEmailSent = false;
    let emailErrors = [];

    try {
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
      customerEmailSent = true;
      console.log("✅ Customer confirmation email sent");
    } catch (emailError) {
      console.error("❌ Failed to send customer email:", emailError);
      emailErrors.push(`Customer email failed: ${emailError.message}`);
    }

    // Send order management notification
    if (process.env.ORDER_MANAGEMENT_EMAIL) {
      try {
        console.log(
          "📧 Sending management notification to:",
          process.env.ORDER_MANAGEMENT_EMAIL
        );
        const managementEmailHTML = generateOrderEmailHTML(orderData, false);
        await sendEmail(
          process.env.ORDER_MANAGEMENT_EMAIL,
          `New Order Received (Payment on Delivery) - ${orderData.orderId}`,
          managementEmailHTML
        );
        managementEmailSent = true;
        console.log("✅ Order management notification sent");
      } catch (emailError) {
        console.error("❌ Failed to send management email:", emailError);
        emailErrors.push(`Management email failed: ${emailError.message}`);
      }
    } else {
      console.warn("⚠️ ORDER_MANAGEMENT_EMAIL not set, skipping management notification");
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
      console.warn("⚠️ Order created but some emails failed:", emailErrors);
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
}

