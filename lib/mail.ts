import nodemailer from 'nodemailer';

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Portfolio CRM" <${user}>`;
  const receiver = process.env.NOTIFICATION_RECEIVER_EMAIL || user;

  if (!user || !pass) {
    console.warn(
      '[Nodemailer] SMTP_USER or SMTP_PASS is missing in .env. Email notification was not sent.'
    );
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    // 1. Send Notification Email to Admin
    await transporter.sendMail({
      from,
      to: receiver,
      replyTo: lead.email,
      subject: `🚨 [Portfolio Lead] ${lead.subject} — ${lead.name}`,
      text: `New message received from your portfolio:\n\nName: ${lead.name}\nEmail: ${lead.email}\nSubject: ${lead.subject}\n\nMessage:\n${lead.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937; line-height: 1.6;">
          <div style="background-color: #2563eb; padding: 20px; border-radius: 8px 8px 0 0; color: white;">
            <h2 style="margin: 0; font-size: 20px;">New Inbound Lead Received</h2>
            <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">Submitted via Portfolio Contact Form</p>
          </div>
          <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px; background-color: #ffffff;">
            <p style="margin: 0 0 10px 0;"><strong>Sender Name:</strong> ${lead.name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Sender Email:</strong> <a href="mailto:${lead.email}" style="color: #2563eb;">${lead.email}</a></p>
            <p style="margin: 0 0 16px 0;"><strong>Subject:</strong> ${lead.subject}</p>
            <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 14px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px;">${lead.message}</p>
            </div>
            <a href="mailto:${lead.email}?subject=Re: ${encodeURIComponent(lead.subject)}" 
               style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px;">
              Reply Directly to ${lead.name}
            </a>
          </div>
        </div>
      `,
    });

    console.log(`[Nodemailer] Notification successfully sent to ${receiver}`);

    // 2. Send Auto-Confirmation to the Visitor
    try {
      await transporter.sendMail({
        from,
        to: lead.email,
        subject: `Thank you for reaching out, ${lead.name}!`,
        text: `Hi ${lead.name},\n\nThank you for reaching out regarding "${lead.subject}". I have received your message and will get back to you as soon as possible.\n\nBest regards,\nAnas Ibn Belal`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937; line-height: 1.6;">
            <p>Hi <strong>${lead.name}</strong>,</p>
            <p>Thank you for getting in touch! I have received your inquiry regarding <em>"${lead.subject}"</em>.</p>
            <p>I review messages regularly and will follow up with you as soon as possible.</p>
            <br />
            <p style="margin-bottom: 2px;">Best regards,</p>
            <p style="margin-top: 0;"><strong>Anas Ibn Belal</strong><br/><span style="color: #6b7280; font-size: 12px;">Software Engineer</span></p>
          </div>
        `,
      });
    } catch (visitorMailError) {
      // Don't fail if visitor mail rejects
      console.warn('[Nodemailer] Auto-reply to sender skipped:', visitorMailError);
    }

    return true;
  } catch (error: any) {
    console.error('[Nodemailer] Failed to send email:', error.message || error);
    return false;
  }
}
