# Lucky Nail Spa Website

A modern, responsive website for Lucky Nail Spa in Durham, NC.

## Files Structure

- `index.html` - Home page with all main sections
- `services.html` - Services page with detailed service information
- `styles.css` - All styling (shared between pages)
- `script.js` - JavaScript for mobile navigation and form handling
- `assets/` - Folder for images (see `assets/README.md` for image requirements)
- `api/contact.js` - Vercel serverless function for contact form submissions
- `vercel.json` - Vercel deployment configuration
- `package.json` - Node.js package configuration

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Smooth Scrolling** - Smooth anchor link navigation
- **Contact Form** - Serverless API endpoint for form submissions (Vercel)
- **Modern UI** - Clean, spa-inspired design with soft colors
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Accessibility** - Skip links, focus states, and ARIA labels

## Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Import your repository in [Vercel Dashboard](https://vercel.com)
3. Vercel will automatically detect the configuration and deploy

### Option 3: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository or drag and drop your project folder
4. Vercel will automatically configure and deploy

## Contact Form Setup

The contact form uses a Vercel serverless function (`api/contact.js`). To enable email sending:

1. Choose an email service (SendGrid, Resend, Nodemailer, etc.)
2. Add your API key as an environment variable in Vercel:
   - Go to Project Settings → Environment Variables
   - Add your API key (e.g., `SENDGRID_API_KEY`)
3. Update `api/contact.js` to use your email service

## Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

- `SENDGRID_API_KEY` (if using SendGrid)
- Or your preferred email service API key

## Getting Started (Local Development)

1. Install dependencies (optional):
   ```bash
   npm install
   ```

2. Run local development server:
   ```bash
   npm run dev
   ```
   Or use Vercel CLI:
   ```bash
   vercel dev
   ```

3. Open `index.html` in a web browser to view the home page

## Customization

- **Colors**: Edit the color variables in `styles.css` (primary accent: `#c38b8b`)
- **Fonts**: Currently using Google Fonts "Poppins" - can be changed in the HTML `<head>`
- **Content**: All text content can be edited directly in the HTML files

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Notes

- The contact form API endpoint is ready but needs email service configuration
- All images should be optimized for web
- The site is fully configured for Vercel deployment
# luckynailspa-website
