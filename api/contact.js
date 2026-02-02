// Contact form API endpoint for Vercel
module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Input sanitization - trim whitespace
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedMessage = message.trim();

    // Validate length
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 2000) {
      return res.status(400).json({ error: 'Message must be between 10 and 2000 characters' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Phone validation (if provided)
    if (sanitizedPhone && sanitizedPhone.length > 0) {
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(sanitizedPhone) || sanitizedPhone.replace(/\D/g, '').length < 10) {
        return res.status(400).json({ error: 'Invalid phone number format' });
      }
    }

    // Here you would typically send an email using a service like:
    // - SendGrid
    // - Resend
    // - Nodemailer with SMTP
    // - AWS SES
    // For now, we'll just log it and return success
    
    console.log('Contact form submission:', {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone || 'Not provided',
      messageLength: sanitizedMessage.length,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    // TODO: Replace this with actual email sending service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'contact@luckynailspadurham.com',
    //   from: 'noreply@luckynailspadurham.com',
    //   subject: `New Contact Form Submission from ${sanitizedName}`,
    //   text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nPhone: ${sanitizedPhone || 'N/A'}\n\nMessage:\n${sanitizedMessage}`
    // });

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while processing your request. Please try again later.' 
    });
  }
}


