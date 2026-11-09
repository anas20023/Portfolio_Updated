import { cache } from 'react';
import { connectDB } from '@/lib/db';
import { ProjectModel } from '@/models/Project';
import { projects as staticProjects, featuredProjects as staticFeatured } from '@/data/projects';
import type { Project } from '@/data/types';

export const getAllProjects = cache(async (): Promise<Project[]> => {
  try {
    await connectDB();
    const dbProjects = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        featured: p.featured ?? false,
        summary: p.summary,
        status: p.status,
        thumbnail: p.thumbnail,
        coverImage: p.coverImage || p.thumbnail,
        gallery: p.gallery || [],
        timeline: p.timeline || '',
        techStack: p.techStack || [],
        links: p.links || {},
        challenges: p.challenges || [],
        futurePlans: p.futurePlans || [],
      }));
    }
  } catch (err: any) {
    // MongoDB might not be configured or offline yet in dev
    console.warn('[getAllProjects] Using static data fallback (MongoDB offline or unconfigured)');
  }
  return staticProjects;
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : staticFeatured;
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  try {
    await connectDB();
    const doc: any = await ProjectModel.findOne({ slug }).lean();
    if (doc) {
      return {
        slug: doc.slug,
        title: doc.title,
        category: doc.category,
        featured: doc.featured ?? false,
        summary: doc.summary,
        status: doc.status,
        thumbnail: doc.thumbnail,
        coverImage: doc.coverImage || doc.thumbnail,
        gallery: doc.gallery || [],
        timeline: doc.timeline || '',
        techStack: doc.techStack || [],
        links: doc.links || {},
        challenges: doc.challenges || [],
        futurePlans: doc.futurePlans || [],
      };
    }
  } catch (err: any) {
    // MongoDB might not be configured or offline yet in dev
    console.warn(`[getProjectBySlug] Using static fallback for "${slug}"`);
  }
  return staticProjects.find((p) => p.slug === slug);
});

