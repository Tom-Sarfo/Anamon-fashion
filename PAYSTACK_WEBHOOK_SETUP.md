# Paystack Webhook Integration Setup

This guide explains how to integrate Paystack payment webhooks with your Vercel frontend project to handle payment confirmations and send transactional emails via SendGrid.

## 📁 File Structure

```
your-project/
├── api/
│   └── paystack-webhook.js    # Vercel serverless function
├── env.example                # Environment variables template
├── PAYSTACK_WEBHOOK_SETUP.md  # This setup guide
└── ... (your existing frontend files)
```

## 🚀 Quick Setup

### 1. Add the Webhook Handler

Copy the `api/paystack-webhook.js` file into your existing Vercel project's `api/` folder. This creates a serverless function that will be accessible at:

```
https://your-app-name.vercel.app/api/paystack-webhook
```

### 2. Configure Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to the "Environment Variables" section
3. Add the following variables:

| Variable                 | Description                                                      | Example                    |
| ------------------------ | ---------------------------------------------------------------- | -------------------------- |
| `PAYSTACK_SECRET_KEY`    | Your Paystack secret key (starts with `sk_test_` or `sk_live_`)  | `sk_test_1234567890abcdef` |
| `SENDGRID_API_KEY`       | Your SendGrid API key (starts with `SG.`)                        | `SG.1234567890abcdef`      |
| `FROM_EMAIL`             | Email address to send emails from (must be verified in SendGrid) | `noreply@yourdomain.com`   |
| `ORDER_MANAGEMENT_EMAIL` | Email where order notifications are sent                         | `orders@yourdomain.com`    |

### 3. Set Up Paystack Webhook

In your Paystack dashboard:

1. Log in to your Paystack dashboard
2. Go to **Settings** → **Webhooks**
3. Click **Add Webhook**
4. Configure the webhook:
   - **URL**: `https://your-app-name.vercel.app/api/paystack-webhook`
   - **Events**: Select `charge.success`
   - **Status**: Active

### 4. Set Up SendGrid

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key:
   - Go to **Settings** → **API Keys**
   - Click **Create API Key**
   - Choose "Full Access" or "Restricted Access" with "Mail Send" permissions
3. Verify your sender email:
   - Go to **Settings** → **Sender Authentication**
   - Verify your domain or at least the sender email address

## 🔧 Frontend Integration

### Update Your Checkout Process

When processing payments with Paystack, include order details in the metadata:

```javascript
// Example: Frontend payment initialization
const paymentData = {
  email: customerEmail,
  amount: totalAmount * 100, // Convert to kobo (smallest currency unit)
  reference: generateOrderId(),
  metadata: {
    fullName: shippingInfo.fullName,
    phone: shippingInfo.phone,
    email: customerEmail,
    location: shippingInfo.location,
    region: shippingInfo.region,
    shippingMethod: shippingInfo.shippingMethod,
    additionalInfo: shippingInfo.additionalInfo,
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    })),
  },
};

// Initialize Paystack payment
const handler = PaystackPop.setup({
  key: "pk_test_your_public_key",
  email: paymentData.email,
  amount: paymentData.amount,
  reference: paymentData.reference,
  metadata: paymentData.metadata,
  callback: function (response) {
    // Payment successful - webhook will handle the rest
    console.log("Payment successful:", response.reference);
  },
  onClose: function () {
    // Payment cancelled
    console.log("Payment cancelled");
  },
});
handler.openIframe();
```

## 📧 Email Templates

The webhook automatically sends two types of emails:

### 1. Customer Confirmation Email

- **Recipient**: Customer's email address
- **Subject**: "Order Confirmation - [Order ID]"
- **Content**: Order details, items list, total, shipping information

### 2. Order Management Notification

- **Recipient**: Email specified in `ORDER_MANAGEMENT_EMAIL`
- **Subject**: "New Order Received - [Order ID]"
- **Content**: Same order details for internal processing

## 🔒 Security Features

The webhook includes several security measures:

1. **Signature Verification**: Verifies Paystack webhook signature using HMAC SHA512
2. **Transaction Verification**: Double-checks payment status with Paystack API
3. **Event Filtering**: Only processes `charge.success` events
4. **Error Handling**: Comprehensive error logging and handling

## 🐛 Testing

### Test the Webhook Locally

1. Use a tool like [ngrok](https://ngrok.com) to expose your local server
2. Set up a test webhook URL in Paystack dashboard
3. Make test payments and monitor the webhook logs

### Monitor Logs

Check Vercel function logs:

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to **Functions** → **api/paystack-webhook**
4. View real-time logs

## 📋 Environment Variables Reference

| Variable                 | Required | Description                                       |
| ------------------------ | -------- | ------------------------------------------------- |
| `PAYSTACK_SECRET_KEY`    | ✅       | Your Paystack secret key for webhook verification |
| `SENDGRID_API_KEY`       | ✅       | SendGrid API key for sending emails               |
| `FROM_EMAIL`             | ✅       | Verified sender email address                     |
| `ORDER_MANAGEMENT_EMAIL` | ✅       | Email for order notifications                     |

## 🚨 Troubleshooting

### Common Issues

1. **Webhook not receiving events**

   - Check if the webhook URL is correct
   - Verify the webhook is active in Paystack dashboard
   - Check Vercel function logs for errors

2. **Emails not sending**

   - Verify SendGrid API key is correct
   - Ensure sender email is verified in SendGrid
   - Check SendGrid account for sending limits

3. **Signature verification failing**
   - Ensure `PAYSTACK_SECRET_KEY` is correct
   - Check if you're using the right key (test vs live)

### Debug Mode

Add more logging by checking the Vercel function logs. The webhook logs all major steps:

- Webhook received
- Signature verification
- Transaction verification
- Email sending status

## 📞 Support

If you encounter issues:

1. Check the Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with Paystack's webhook testing tools
4. Ensure SendGrid account is properly configured

## 🔄 Deployment

After setting up:

1. Commit your changes to your repository
2. Push to your main branch
3. Vercel will automatically deploy the new function
4. Test the webhook with a real payment

The webhook will be live at: `https://your-app-name.vercel.app/api/paystack-webhook`
