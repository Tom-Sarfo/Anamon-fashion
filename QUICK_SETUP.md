# Quick Contact Form Setup

## ✅ EmailJS is now installed!

The `@emailjs/browser` package has been installed successfully. Now you need to configure it:

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for free account
3. Verify your email

### Step 2: Get Your Credentials

1. **Service ID**: Add Gmail service → Copy Service ID
2. **Template ID**: Create email template → Copy Template ID
3. **Public Key**: Account → API Keys → Copy Public Key

### Step 3: Update Configuration

Replace the placeholders in `src/api/contact.ts`:

```typescript
// Replace these with your actual values:
emailjs.init("your_actual_public_key");
await emailjs.send("your_service_id", "your_template_id", templateParams);
```

## 🎯 Alternative: Formspree (Even Easier)

If you prefer a simpler solution:

1. Go to [Formspree.io](https://formspree.io/)
2. Create account and new form
3. Get your form endpoint (e.g., `https://formspree.io/f/xaybzwab`)
4. Update `src/api/contact-formspree.ts`:
   ```typescript
   const formEndpoint = "https://formspree.io/f/YOUR_ACTUAL_FORM_ID";
   ```
5. Switch to Formspree in `src/hooks/use-contact-form.ts`:

   ```typescript
   // Comment out EmailJS import
   // import { sendContactEmail } from "@/api/contact";

   // Uncomment Formspree import
   import { sendContactEmailFormspree } from "@/api/contact-formspree";

   // In submitForm function, use:
   await sendContactEmailFormspree(state.formData);
   ```

## 🧪 Test Your Form

1. Fill out the contact form
2. Submit the form
3. Check your email (tomusacc@gmail.com)
4. You should receive the message!

## 📧 Email Template (for EmailJS)

Use this template in EmailJS:

**Subject:** New Contact Form Message from {{from_name}}

**Body:**

```
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your Tomus Footwear website contact form.
```

The contact form is ready to use! 🚀
