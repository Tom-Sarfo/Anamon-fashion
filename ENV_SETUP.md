# Environment Variables Setup Guide

## 🚨 Current Issue

You're getting "EmailJS configuration is missing" because the `.env` file needs your actual credentials.

## ✅ Quick Fix (5 minutes)

### Step 1: Get Your EmailJS Credentials

1. **Go to EmailJS Dashboard**: https://dashboard.emailjs.com/
2. **Sign up/Login** if you haven't already

### Step 2: Get Your Service ID

1. Click "Add New Service"
2. Choose "Gmail"
3. Connect your email (tomusacc@gmail.com)
4. Copy the Service ID (looks like `service_abc123`)

### Step 3: Get Your Template ID

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

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

4. Copy the Template ID (looks like `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your Public Key

### Step 5: Update Your .env File

Replace the placeholders in your `.env` file with your actual values:

```bash
# Open .env file and replace these values:
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
VITE_CONTACT_EMAIL=tomusacc@gmail.com
```

**Example:**

```bash
VITE_EMAILJS_PUBLIC_KEY=user_abc123def456
VITE_EMAILJS_SERVICE_ID=service_xyz789
VITE_EMAILJS_TEMPLATE_ID=template_abc123
VITE_CONTACT_EMAIL=tomusacc@gmail.com
```

### Step 6: Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🧪 Test Your Form

1. Fill out the contact form
2. Submit the form
3. Check your email (tomusacc@gmail.com)
4. You should receive the message!

## 🔒 Security Notes

- ✅ `.env` file is now in `.gitignore` (won't be committed to Git)
- ✅ Credentials are secure and private
- ✅ `.env.example` shows the structure without real values

## 🆘 Alternative: Formspree (Even Easier)

If EmailJS is too complex, use Formspree:

1. Go to https://formspree.io/
2. Create account and new form
3. Get your form endpoint
4. Update `.env`:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_actual_form_id
```

5. Switch to Formspree in `src/hooks/use-contact-form.ts`

The contact form will work once you add your actual credentials! 🚀
