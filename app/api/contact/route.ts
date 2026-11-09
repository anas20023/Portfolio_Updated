import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Lead } from '@/models/Lead';
import { sendLeadNotification } from '@/lib/mail';
import { cookies } from 'next/headers';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// In-memory rate limiting map: email -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 2; // Max 2 emails per 10 mins

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const normalizedEmail = email.toLowerCase().trim();
  const timestamps = rateLimitMap.get(normalizedEmail) || [];

  // Filter timestamps within current window
  const recent = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(normalizedEmail, recent);
  return false;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    // 1. Check Browser Anti-Spam Cookie
    const sentCookie = cookieStore.get('portfolio_contact_sent');
    if (sentCookie) {
      const sentTime = Number(sentCookie.value);
      const diffSec = Math.floor((Date.now() - sentTime) / 1000);
      if (diffSec < 300) {
        // Less than 5 minutes
        return NextResponse.json(
          {
            success: false,
            message: `You recently sent a message. Please wait ${300 - diffSec}s before sending another.`,
          },
          { status: 429 }
        );
      }
    }

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // 2. Email Rate Limiting
    if (isRateLimited(validatedData.email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many messages sent from this email address. Please try again in 10 minutes.',
        },
        { status: 429 }
      );
    }

    await connectDB();

    // 3. Database-Level Duplicate Protection (2 minutes)
    const recentDuplicate = await Lead.findOne({
      email: validatedData.email.toLowerCase().trim(),
      createdAt: { $gt: new Date(Date.now() - 2 * 60 * 1000) },
    });

    if (recentDuplicate) {
      return NextResponse.json(
        {
          success: false,
          message: 'An inquiry from your email was already recorded. Please allow time for a response.',
        },
        { status: 429 }
      );
    }

    // 4. Save to CRM Lead Collection
    const newLead = await Lead.create({
      name: validatedData.name,
      email: validatedData.email.toLowerCase().trim(),
      subject: validatedData.subject,
      message: validatedData.message,
    });

    // 5. Send Notification Email via Nodemailer
    await sendLeadNotification(validatedData);

    // 6. Set Anti-Spam HttpOnly Cookie (5 minutes duration)
    cookieStore.set('portfolio_contact_sent', Date.now().toString(), {
      httpOnly: true,
      maxAge: 60 * 5, // 5 minutes
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received! I will get back to you shortly.',
        leadId: newLead._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
