# 🚀 Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Your code should be in a Git repository
3. **Environment Variables**: Prepare your API keys and secrets

## Step 1: Prepare Your Repository

### 1.1 Commit All Changes

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 1.2 Verify File Structure

Ensure you have:

- ✅ `api/paystack-webhook.js` - Serverless function
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Dependencies
- ✅ `.env.example` - Environment variables template

## Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing your project

### 2.2 Configure Project Settings

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)

### 2.3 Set Environment Variables

In the Vercel dashboard, go to **Settings > Environment Variables** and add:

```bash
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here

# SendGrid Configuration
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
FROM_EMAIL=your-email@yourdomain.com
ORDER_MANAGEMENT_EMAIL=orders@yourdomain.com
```

### 2.4 Deploy

Click "Deploy" and wait for the build to complete.

## Step 3: Configure Paystack Webhook

### 3.1 Get Your Webhook URL

After deployment, your webhook URL will be:

```
https://your-app-name.vercel.app/api/paystack-webhook
```

### 3.2 Set Up Paystack Webhook

1. Log into your [Paystack Dashboard](https://dashboard.paystack.com)
2. Go to **Settings > API Keys & Webhooks**
3. Click **Add Webhook**
4. Enter your webhook URL: `https://your-app-name.vercel.app/api/paystack-webhook`
5. Select events: `charge.success`, `transfer.success`
6. Save the webhook

## Step 4: Test the Deployment

### 4.1 Test Frontend

- Visit your deployed app: `https://your-app-name.vercel.app`
- Test the shopping cart functionality
- Test the checkout process

### 4.2 Test Webhook (Optional)

You can test the webhook locally using ngrok or use Paystack's webhook testing feature.

## Step 5: Production Checklist

### 5.1 Environment Variables

- [ ] `PAYSTACK_SECRET_KEY` - Production secret key
- [ ] `SENDGRID_API_KEY` - Production SendGrid key
- [ ] `FROM_EMAIL` - Verified sender email
- [ ] `ORDER_MANAGEMENT_EMAIL` - Order notification email

### 5.2 Paystack Configuration

- [ ] Switch to production Paystack keys
- [ ] Update webhook URL to production
- [ ] Test payment flow with real transactions

### 5.3 SendGrid Configuration

- [ ] Verify sender email domain
- [ ] Test email delivery
- [ ] Monitor email sending limits

## Troubleshooting

### Common Issues

#### 1. Build Failures

- Check `package.json` for correct dependencies
- Verify build command in `vercel.json`
- Check for TypeScript errors

#### 2. Webhook Not Working

- Verify environment variables are set
- Check Paystack webhook URL is correct
- Monitor Vercel function logs

#### 3. Email Not Sending

- Verify SendGrid API key
- Check sender email is verified
- Monitor SendGrid dashboard for errors

### Debugging

#### View Function Logs

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Functions** tab
4. Click on `api/paystack-webhook.js`
5. View real-time logs

#### Test Webhook Locally

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Deploy functions locally
vercel dev
```

## Security Considerations

### 1. Environment Variables

- Never commit `.env` files to Git
- Use Vercel's environment variable system
- Rotate API keys regularly

### 2. Webhook Security

- Paystack signature verification is implemented
- Monitor for suspicious webhook calls
- Set up alerts for failed payments

### 3. CORS Configuration

- Webhook endpoint allows Paystack domains
- Frontend CORS is configured in `vercel.json`

## Monitoring & Analytics

### 1. Vercel Analytics

- Enable Vercel Analytics for performance monitoring
- Monitor function execution times
- Track deployment success rates

### 2. Paystack Dashboard

- Monitor payment success rates
- Track webhook delivery status
- Review transaction logs

### 3. SendGrid Dashboard

- Monitor email delivery rates
- Track bounce rates
- Review email logs

## Support

If you encounter issues:

1. Check Vercel function logs
2. Review Paystack webhook status
3. Verify environment variables
4. Test locally with `vercel dev`

## Next Steps

After successful deployment:

1. Set up custom domain (optional)
2. Configure SSL certificates
3. Set up monitoring and alerts
4. Plan for scaling as traffic grows
