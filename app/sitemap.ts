import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';
import { getAllProjects } from '@/lib/get-projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url || 'https://anasibnbelal.vercel.app';
  const projects = await getAllProjects();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectRoutes,
  ];
}

