import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ProjectModel } from '@/models/Project';
import { ProfileModel } from '@/models/Profile';
import { SiteContentModel } from '@/models/SiteContent';
import { projects, skills } from '@/data/projects';
import { profile } from '@/data/profile';
import { education, services, leadership, competitiveProgramming } from '@/data/extras';

export async function POST() {
  try {
    await connectDB();

    // 1. Seed Projects
    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      await ProjectModel.insertMany(projects);
    }

    // 2. Seed Profile
    const profileCount = await ProfileModel.countDocuments();
    if (profileCount === 0) {
      await ProfileModel.create(profile);
    }

    // 3. Seed Site Content (Skills, Services, Education, Leadership, CP)
    const contentCount = await SiteContentModel.countDocuments();
    if (contentCount === 0) {
      await SiteContentModel.create({
        key: 'main',
        skills,
        services,
        education,
        leadership,
        competitiveProgramming,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Initial portfolio data (projects, profile, and site content) seeded successfully.',
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message || 'Seed failed' }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
