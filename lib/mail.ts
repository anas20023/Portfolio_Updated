import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT) || 587;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || user;
const receiver = process.env.NOTIFICATION_RECEIVER_EMAIL || user;

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // If SMTP is not yet configured, skip silently in dev
  if (!user || !pass) {
    console.log('[Nodemailer] SMTP credentials missing in .env. Skipping email notification.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: receiver,
      replyTo: lead.email,
      subject: `[Portfolio CRM New Lead] ${lead.subject} from ${lead.name}`,
      text: `New message from ${lead.name} (${lead.email}):\n\nSubject: ${lead.subject}\n\nMessage:\n${lead.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #2563eb;">New Lead Received</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p><strong>Subject:</strong> ${lead.subject}</p>
          <div style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin-top: 12px;">
            <p style="margin: 0; white-space: pre-wrap;">${lead.message}</p>
          </div>
          <p style="margin-top: 18px; font-size: 12px; color: #6b7280;">Sent automatically from your Portfolio CRM.</p>
        </div>
      `,
    });
  } catch (error) {
    // Log error but don't fail user request
    console.error('[Nodemailer] Failed to send email notification:', error);
  }
}

