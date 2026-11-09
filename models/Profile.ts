import mongoose, { Schema, Document, Model } from 'mongoose';
import type { Profile as ProfileType } from '@/data/types';

export interface IProfile extends ProfileType, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    headline: { type: String, default: '' },
    title: { type: String, default: '' },
    motto: { type: String, default: '' },
    tagline: { type: String, default: '' },
    bio: { type: String, default: '' },
    summary: { type: String, default: '' },
    location: { type: String, default: '' },
    availability: { type: String, default: 'Open to opportunities' },
    currentFocus: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    techBadges: [{ type: String }],
    stats: {
      problemsSolved: { type: Number, default: 0 },
      githubRepos: { type: Number, default: 0 },
      githubStars: { type: Number, default: 0 },
      projects: { type: Number, default: 0 },
    },
    quickFacts: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    about: {
      whoIAm: { type: String, default: '' },
      whatIDo: { type: String, default: '' },
      interests: [
        {
          name: { type: String },
          description: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

export const ProfileModel: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

