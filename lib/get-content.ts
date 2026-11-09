import { cache } from 'react';
import { connectDB } from '@/lib/db';
import { SiteContentModel } from '@/models/SiteContent';
import { skills as staticSkills } from '@/data/projects';
import {
  education as staticEducation,
  services as staticServices,
  leadership as staticLeadership,
  competitiveProgramming as staticCP,
} from '@/data/extras';
import type {
  SkillGroup,
  Service,
  EducationItem,
  LeadershipItem,
  CompetitiveProgramming,
} from '@/data/types';

export interface SiteContentData {
  skills: SkillGroup[];
  services: Service[];
  education: EducationItem[];
  leadership: LeadershipItem[];
  competitiveProgramming: CompetitiveProgramming;
}

export const getSiteContent = cache(async (): Promise<SiteContentData> => {
  try {
    await connectDB();
    const doc: any = await SiteContentModel.findOne({ key: 'main' }).lean();
    if (doc) {
      return {
        skills: doc.skills?.length ? doc.skills : staticSkills,
        services: doc.services?.length ? doc.services : staticServices,
        education: doc.education?.length ? doc.education : staticEducation,
        leadership: doc.leadership?.length ? doc.leadership : staticLeadership,
        competitiveProgramming: doc.competitiveProgramming || staticCP,
      };
    }
  } catch (err) {
    console.warn('[getSiteContent] Using static fallback');
  }

  return {
    skills: staticSkills,
    services: staticServices,
    education: staticEducation,
    leadership: staticLeadership,
    competitiveProgramming: staticCP,
  };
});

