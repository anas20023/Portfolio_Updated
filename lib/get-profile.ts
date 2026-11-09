import { cache } from 'react';
import { connectDB } from '@/lib/db';
import { ProfileModel } from '@/models/Profile';
import { profile as staticProfile } from '@/data/profile';
import type { Profile } from '@/data/types';

export const getProfile = cache(async (): Promise<Profile> => {
  try {
    await connectDB();
    const doc: any = await ProfileModel.findOne({}).lean();
    if (doc) {
      return {
        name: doc.name || staticProfile.name,
        headline: doc.headline || staticProfile.headline,
        title: doc.title || staticProfile.title,
        motto: doc.motto || staticProfile.motto,
        tagline: doc.tagline || staticProfile.tagline,
        bio: doc.bio || staticProfile.bio,
        summary: doc.summary || staticProfile.summary,
        location: doc.location || staticProfile.location,
        availability: doc.availability || staticProfile.availability,
        currentFocus: doc.currentFocus || staticProfile.currentFocus,
        email: doc.email || staticProfile.email,
        phone: doc.phone || staticProfile.phone,
        resumeUrl: doc.resumeUrl || staticProfile.resumeUrl,
        image: doc.image || staticProfile.image,
        github: doc.github || staticProfile.github,
        linkedin: doc.linkedin || staticProfile.linkedin,
        techBadges: doc.techBadges?.length ? doc.techBadges : staticProfile.techBadges,
        stats: doc.stats || staticProfile.stats,
        quickFacts: doc.quickFacts?.length ? doc.quickFacts : staticProfile.quickFacts,
        about: doc.about || staticProfile.about,
      };
    }
  } catch (err) {
    console.warn('[getProfile] Using static fallback');
  }
  return staticProfile;
});

