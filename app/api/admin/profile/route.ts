import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ProfileModel } from '@/models/Profile';
import { profile as staticProfile } from '@/data/profile';
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
    let doc = await ProfileModel.findOne({}).lean();
    if (!doc) {
      doc = staticProfile as any;
    }
    return NextResponse.json({ success: true, profile: doc });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ success: true, profile: staticProfile });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await checkAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    const updated = await ProfileModel.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );

    revalidatePath('/');
    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

