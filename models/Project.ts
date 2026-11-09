import mongoose, { Schema, Document, Model } from 'mongoose';
import type { Project as ProjectType } from '@/data/types';

export interface IProject extends Omit<ProjectType, 'slug'>, Document {
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    summary: { type: String, required: true },
    status: {
      type: String,
      enum: ['Live', 'In Progress', 'Completed', 'Archived'],
      default: 'Completed',
    },
    thumbnail: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: [{ type: String }],
    timeline: { type: String, default: '' },
    techStack: [{ type: String }],
    links: {
      live: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    challenges: [{ type: String }],
    futurePlans: [{ type: String }],
  },
  { timestamps: true }
);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

