import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url || 'https://anasibnbelal.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/auth'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

