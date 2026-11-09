import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Lead } from '@/models/Lead';
import { sendLeadNotification } from '@/lib/mail';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    await connectDB();

    const newLead = await Lead.create({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    // Fire and forget email notification
    sendLeadNotification(validatedData).catch(console.error);

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

