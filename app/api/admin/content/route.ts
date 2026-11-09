import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteContentModel } from '@/models/SiteContent';
import { skills as staticSkills } from '@/data/projects';
import {
  education as staticEducation,
  services as staticServices,
  leadership as staticLeadership,
  competitiveProgramming as staticCP,
} from '@/data/extras';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function GET() {
  try {
    await connectDB();
    let content = await SiteContentModel.findOne({ key: 'main' }).lean();
    if (!content) {
      content = {
        key: 'main',
        skills: staticSkills,
        services: staticServices,
        education: staticEducation,
        leadership: staticLeadership,
        competitiveProgramming: staticCP,
      } as any;
    }
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    console.error('Error fetching content:', error);
    return NextResponse.json({
      success: true,
      content: {
        key: 'main',
        skills: staticSkills,
        services: staticServices,
        education: staticEducation,
        leadership: staticLeadership,
        competitiveProgramming: staticCP,
      },
    });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await checkAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { section, data } = await req.json();
    if (!section || !data) {
      return NextResponse.json({ error: 'Section and data are required' }, { status: 400 });
    }

    await connectDB();

    const update: any = {};
    update[section] = data;

    const updated = await SiteContentModel.findOneAndUpdate(
      { key: 'main' },
      { $set: update },
      { new: true, upsert: true }
    );

    revalidatePath('/');
    return NextResponse.json({ success: true, content: updated });
  } catch (error: any) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

