# EmailJS Setup Guide for Contact Form

## Step 1: Install EmailJS

```bash
npm install @emailjs/browser
```

## Step 2: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 3: Configure Email Service

1. **Add Email Service:**

   - Go to EmailJS Dashboard
   - Click "Add New Service"
   - Choose "Gmail" or "Outlook"
   - Connect your email account (tomusacc@gmail.com)

2. **Get Service ID:**
   - Copy the Service ID (e.g., "service_abc123")
   - Replace `YOUR_SERVICE_ID` in `src/api/contact.ts`

## Step 4: Create Email Template

1. **Create Template:**
   - Go to "Email Templates" in EmailJS Dashboard
   - Click "Create New Template"
   - Use this template:

```html
Subject: New Contact Form Message from {{from_name}} Name: {{from_name}} Email:
{{from_email}} Subject: {{subject}} Message: {{message}} --- This message was
sent from your website contact form.
```

2. **Get Template ID:**
   - Copy the Template ID (e.g., "template_xyz789")
   - Replace `YOUR_TEMPLATE_ID` in `src/api/contact.ts`

## Step 5: Get Public Key

1. **Find Public Key:**
   - Go to "Account" → "API Keys" in EmailJS Dashboard
   - Copy your Public Key
   - Replace `YOUR_PUBLIC_KEY` in `src/api/contact.ts`

## Step 6: Update Configuration

Update `src/api/contact.ts` with your actual values:

```typescript
// Replace these with your actual EmailJS credentials
emailjs.init("your_actual_public_key");
await emailjs.send("your_service_id", "your_template_id", templateParams);
```

## Alternative: Server-Side Solution

If you prefer a server-side solution, you can use:

### Option 1: Vercel Serverless Functions

Create `api/contact.js` in your project root:

```javascript
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, subject, message } = req.body;

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: "tomusacc@gmail.com",
      pass: "your_app_password", // Use Gmail App Password
    },
  });

  const mailOptions = {
    from: "tomusacc@gmail.com",
    to: "tomusacc@gmail.com",
    subject: `Contact Form: ${subject}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email" });
  }
}
```

### Option 2: Formspree (No Setup Required)

Replace the form action with Formspree:

```html
<form action="https://formspree.io/f/your_form_id" method="POST">
  <!-- form fields -->
</form>
```

## Features Implemented

✅ **Form Validation**: All fields required, email format validation
✅ **Loading States**: Spinner during submission
✅ **Success Feedback**: Success message with reset option
✅ **Error Handling**: Clear error messages
✅ **Responsive Design**: Works on all devices
✅ **Accessibility**: Proper labels and ARIA attributes

## Testing

1. Fill out the contact form
2. Submit the form
3. Check your email (tomusacc@gmail.com)
4. Verify the email contains all form data

The contact form is now fully functional and will send emails to your inbox! 🚀


