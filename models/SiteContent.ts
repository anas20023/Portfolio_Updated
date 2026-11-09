import mongoose, { Schema, Document, Model } from 'mongoose';
import type {
  SkillGroup,
  Service,
  EducationItem,
  LeadershipItem,
  CompetitiveProgramming,
} from '@/data/types';

export interface ISiteContent extends Document {
  key: string; // e.g. 'main'
  skills: SkillGroup[];
  services: Service[];
  education: EducationItem[];
  leadership: LeadershipItem[];
  competitiveProgramming: CompetitiveProgramming;
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, default: 'main', unique: true, index: true },
    skills: [
      {
        category: { type: String, required: true },
        icon: { type: String, default: 'Code' },
        items: [{ type: String }],
      },
    ],
    services: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: 'Rocket' },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        duration: { type: String, required: true },
        cgpa: { type: String, default: '' },
        highlights: [{ type: String }],
      },
    ],
    leadership: [
      {
        title: { type: String, required: true },
        role: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    competitiveProgramming: {
      platform: { type: String, default: 'Codeforces' },
      solved: { type: String, default: '0' },
      achievements: [{ type: String }],
    },
  },
  { timestamps: true }
);

export const SiteContentModel: Model<ISiteContent> =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

