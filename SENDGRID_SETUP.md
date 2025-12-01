# SendGrid Email Verification Guide

## Current Configuration

- **FROM_EMAIL**: `admin@tomusfootwear.com`
- **ORDER_MANAGEMENT_EMAIL**: `admin@tomusfootwear.com`

## Error Message

```
The from address does not match a verified Sender Identity. 
Mail cannot be sent until this error is resolved.
```

## Solution: Verify Your Sender Email

### Step 1: Access SendGrid Dashboard

1. Go to [https://app.sendgrid.com/](https://app.sendgrid.com/)
2. Log in to your account

### Step 2: Navigate to Sender Authentication

1. Click **Settings** (gear icon) in the left sidebar
2. Click **Sender Authentication**
3. Click **Verify a Single Sender**

### Step 3: Fill in Sender Details

Fill in the form with:

- **From Email Address**: `admin@tomusfootwear.com` ⚠️ **Must match your `.env` file**
- **From Name**: `Anamon Fashion` (or your brand name)
- **Reply To**: Your support email (e.g., `support@tomusfootwear.com`)
- **Company Address**: Your business address
- **Website**: Your website URL
- **City**: Your city
- **State**: Your state
- **Country**: Your country
- **Zip Code**: Your postal code

### Step 4: Verify Email

1. Click **Create**
2. Check the inbox for `admin@tomusfootwear.com`
3. Open the verification email from SendGrid
4. Click the **Verify** button in the email

### Step 5: Test

After verification:
1. Restart your server: `npm run dev`
2. Place a test order
3. Check both email inboxes for confirmation

## Alternative: Use a Different Verified Email

If you can't verify `admin@tomusfootwear.com`, you can:

1. **Use a Gmail address** (easiest for testing):
   - Verify your Gmail in SendGrid
   - Update `.env`:
     ```
     FROM_EMAIL=your-email@gmail.com
     ORDER_MANAGEMENT_EMAIL=your-email@gmail.com
     ```

2. **Use Domain Authentication** (best for production):
   - Verify your entire domain `tomusfootwear.com`
   - Allows sending from any email on that domain
   - More complex setup but better for production

## Quick Test

After verification, test with:

```bash
# Restart your server
npm run dev

# Place a test order
# Check email inboxes
```

## Troubleshooting

### Still Getting 403 Error?

1. **Double-check email matches**: The email in SendGrid must exactly match `FROM_EMAIL` in `.env`
2. **Wait a few minutes**: Verification can take 1-2 minutes to propagate
3. **Check SendGrid Activity**: Go to SendGrid Dashboard → Activity to see detailed logs
4. **Verify API Key**: Ensure `SENDGRID_API_KEY` in `.env` is correct

### Need Help?

- SendGrid Docs: https://sendgrid.com/docs/for-developers/sending-email/sender-identity/
- SendGrid Support: https://support.sendgrid.com/

