import type { Project, SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: 'Layout',
    items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: ['Node.js', 'Express', 'REST API'],
  },
  {
    category: 'Database',
    icon: 'Database',
    items: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Programming',
    icon: 'Code2',
    items: ['C', 'C++', 'Java'],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    items: ['Git', 'Linux', 'Firebase', 'Figma', 'Better Auth'],
  },
];

export const techStackShowcase = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
  { category: 'Database', items: ['MongoDB', 'MySQL'] },
  { category: 'Programming', items: ['C', 'C++', 'Java'] },
  { category: 'Tools', items: ['Git', 'Linux', 'Firebase', 'Figma', 'Better Auth'] },
];

const P = 'https://i.ibb.co.com';

export const projects: Project[] = [
  {
    slug: 'suggestion-sharing-platform-backend',
    title: 'Suggestion Sharing Platform — Backend',
    category: 'Backend',
    featured: true,
    status: 'Live',
    summary:
      'A backend service for a suggestion sharing platform built with Node.js, Express, and MongoDB, providing RESTful APIs for auth, suggestions, subscriptions, feedback, and admin moderation.',
    thumbnail: `${P}/prWZ1X0x/Mockup-Views-1x-WEBP-20260502-151.webp`,
    coverImage: `${P}/prWZ1X0x/Mockup-Views-1x-WEBP-20260502-151.webp`,
    gallery: [`${P}/prWZ1X0x/Mockup-Views-1x-WEBP-20260502-151.webp`],
    timeline: '2025 — 2026',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API'],
    links: {
      live: 'https://sdp-3-backend.vercel.app/api-docs',
      github: 'https://github.com/anas20023/SDP_3_Backend',
    },
    challenges: [
      'Designing secure role-based access for users, moderators, and admins.',
      'Managing validation and consistent error handling across multiple API modules.',
      'Keeping suggestion and analytics queries efficient with growing data.',
    ],
    futurePlans: [
      'Add automated integration and load testing.',
      'Introduce Redis caching for frequently accessed endpoints.',
      'Improve monitoring and API versioning strategy.',
    ],
  },
  {
    slug: 'suggestion-sharing-admin-dashboard',
    title: 'Suggestion Sharing Platform — Admin Dashboard',
    category: 'Frontend',
    featured: true,
    status: 'Live',
    summary:
      'An admin dashboard for the Suggestion Sharing Platform built with React, Vite, and Tailwind CSS for managing users, suggestions, analytics, and moderation.',
    thumbnail: `${P}/FLSxZFBB/Mockup-Views-1x-WEBP-20260502-128.webp`,
    coverImage: `${P}/FLSxZFBB/Mockup-Views-1x-WEBP-20260502-128.webp`,
    gallery: [`${P}/FLSxZFBB/Mockup-Views-1x-WEBP-20260502-128.webp`],
    timeline: '2025 — 2026',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Axios', 'Chart.js'],
    links: {
      live: 'https://sdp-3-admin-dashboard.vercel.app/login',
      github: 'https://github.com/anas20023/SDP3_Admin_Dashboard',
    },
    challenges: [
      'Building a responsive admin UI that remains usable with dense data tables.',
      'Synchronizing chart widgets and moderation state with backend updates.',
      'Handling protected routes and token expiration cleanly.',
    ],
    futurePlans: [
      'Add advanced filters and saved views for moderators.',
      'Improve accessibility and keyboard navigation across dashboard modules.',
      'Introduce end-to-end tests for critical admin workflows.',
    ],
  },
  {
    slug: 'borrow-bee',
    title: 'Borrow Bee — Online Book Borrowing Platform',
    category: 'Next.js',
    featured: true,
    status: 'Live',
    summary:
      'A seamless, modern web app that digitizes the traditional library experience — explore a vast collection, filter by category, and borrow titles digitally.',
    thumbnail: `${P}/ks9cbHwx/Mockup-Views-1x-WEBP-20260502-647.webp`,
    coverImage: `${P}/ks9cbHwx/Mockup-Views-1x-WEBP-20260502-647.webp`,
    gallery: [`${P}/ks9cbHwx/Mockup-Views-1x-WEBP-20260502-647.webp`],
    timeline: '2025',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'Firebase Auth'],
    links: {
      live: 'https://b13-a08-borrow-bee-alpha-code.vercel.app/',
      github: 'https://github.com/anas20023/SDP3_Admin_Dashboard',
    },
    challenges: [
      'Designing smooth borrow/return flows while preventing duplicate borrow requests.',
      'Structuring book and category data for efficient filtering and search.',
      'Balancing performance and visual quality across different devices.',
    ],
    futurePlans: [
      'Add recommendation and personalized reading features.',
      'Support notifications for due dates and availability updates.',
      'Expand with analytics for popular genres and user engagement.',
    ],
  },
  {
    slug: 'alpha-radar-alert-api',
    title: 'Alpha Radar Alert API',
    category: 'API',
    featured: true,
    status: 'Live',
    summary:
      'A stateless radar intelligence API with MongoDB-backed Telegram notifications, designed for microcontroller-driven event reporting.',
    thumbnail: `${P}/4Zn6dm6s/Mockup-Views-1x-WEBP-20260502-897.webp`,
    coverImage: `${P}/4Zn6dm6s/Mockup-Views-1x-WEBP-20260502-897.webp`,
    gallery: [`${P}/4Zn6dm6s/Mockup-Views-1x-WEBP-20260502-897.webp`],
    timeline: '2025',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Telegram Bot API', 'Webhook'],
    links: {
      live: 'https://alert-api-for-micro-controller-proj.vercel.app/',
      github: 'https://github.com/anas20023/Alert-API-for-MicroController-Project',
    },
    challenges: [
      'Ensuring reliable alert delivery during unstable network conditions.',
      'Designing idempotent endpoints for repeated device signal submissions.',
      'Managing secure bot token usage and webhook validation.',
    ],
    futurePlans: [
      'Add retries and dead-letter handling for failed notifications.',
      'Introduce rate limiting and anomaly detection for incoming events.',
      'Provide richer API docs with practical integration examples.',
    ],
  },
  {
    slug: 'drivesphere',
    title: 'DriveSphere — Modern Car Rental',
    category: 'Next.js',
    featured: true,
    status: 'Live',
    summary:
      'A modern car rental web application where users can explore, book, and manage rental cars with a smooth, responsive experience.',
    thumbnail: `${P}/rJtJNWk/Chat-GPT-Image-May-21-2026-09-53-32-AM.png`,
    coverImage: `${P}/rJtJNWk/Chat-GPT-Image-May-21-2026-09-53-32-AM.png`,
    gallery: [`${P}/rJtJNWk/Chat-GPT-Image-May-21-2026-09-53-32-AM.png`],
    timeline: '2026',
    techStack: ['Next.js', 'Tailwind CSS', 'Better Auth', 'Node.js', 'Express.js', 'MongoDB'],
    links: {
      live: 'https://drivesphare.vercel.app/',
      github: 'https://github.com/anas20023/B13-A09-DriveSphere-alpha-code',
    },
    challenges: [
      'Maintaining accurate car availability and booking synchronization in real time.',
      'Implementing secure authentication and role-based access control for users and admins.',
      'Optimizing responsive performance and smooth user experience across all devices.',
    ],
    futurePlans: [
      'Integrate online payment gateways and automated booking confirmation systems.',
      'Add advanced filtering, recommendation, and AI-powered car suggestion features.',
      'Introduce admin analytics dashboards with booking insights and revenue tracking.',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
