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
    {
        category: 'Frontend',
        items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
    },
    {
        category: 'Full Stack',
        items: [
            'Next.js',
            'React',
            'Tailwind CSS',
            'JavaScript',
            'Node.js',
            'Express',
            'REST API',
            'MongoDB',
        ],
    },
    { category: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
    { category: 'Database', items: ['MongoDB', 'MySQL'] },
    { category: 'Programming', items: ['C', 'C++', 'Java'] },
    {
        category: 'Tools',
        items: ['Git', 'Linux', 'Firebase', 'Figma', 'Better Auth'],
    },
];

const P = 'https://i.ibb.co.com';

export const projects: Project[] = [
    {
        slug: 'docpilot-ai',
        title: 'DocPilot AI — AI-Powered Research Workspace',
        category: 'Full Stack',
        featured: true,
        status: 'Live',
        summary:
            'An AI-powered research and document analysis platform that transforms PDFs and research papers into structured insights. Users can upload documents, organize research libraries, chat with AI, generate summaries, extract key findings, and manage their workspace through a secure, modern SaaS experience.',
        thumbnail: `${P}/0ph82njb/Screenshot-2026-07-25-134200.png`,
        coverImage: `${P}/0ph82njb/Screenshot-2026-07-25-134200.png`,
        gallery: [`${P}/0ph82njb/Screenshot-2026-07-25-134200.png`],
        timeline: '2026',
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
            'HeroUI',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Better Auth',
            'OpenAI',
            'Cloudinary',
            'REST API',
        ],
        links: {
            live: 'https://docpilot-alpha.vercel.app/',
            github: 'https://github.com/anas20023/docpilot-ai', // Replace with your repository
        },
        challenges: [
            'Building a scalable AI document processing pipeline capable of handling large PDFs efficiently.',
            'Maintaining contextual conversations with uploaded documents while ensuring fast response times.',
            'Designing a secure multi-user workspace with authentication, document management, and cloud storage integration.',
        ],
        futurePlans: [
            'Support multiple AI models with user-selectable providers.',
            'Add collaborative workspaces, annotations, and real-time document sharing.',
            'Implement citation generation, semantic search, knowledge graphs, and AI-powered research assistants.',
        ],
    },
    {
        slug: 'recipehub',
        title: 'RecipeHub — Full Stack Recipe Sharing Platform',
        category: 'Full Stack',
        featured: true,
        status: 'Live',
        summary:
            'A feature-rich recipe sharing platform where users can discover, create, and share recipes, purchase premium content, and interact with a vibrant food community. The application includes secure authentication, role-based dashboards, recipe management, premium memberships, and a modern responsive interface.',
        thumbnail: `${P}/BKYn2T5K/Screenshot-2026-07-25-134023.png`,
        coverImage: `${P}/BKYn2T5K/Screenshot-2026-07-25-134023.png`,
        gallery: [`${P}/BKYn2T5K/Screenshot-2026-07-25-134023.png`],
        timeline: '2026',
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
            'HeroUI',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Better Auth',
            'Stripe',
            'Cloudinary',
            'REST API',
        ],
        links: {
            live: 'https://recipe-hub-alpha-code.vercel.app/',
            github: 'https://github.com/anas20023/recipe-hub', // replace with your repository
        },
        challenges: [
            'Implementing secure authentication with role-based authorization for users and administrators.',
            'Building premium recipe access with Stripe payment integration and purchase history management.',
            'Optimizing recipe search, filtering, pagination, and image delivery while maintaining excellent performance.',
        ],
        futurePlans: [
            'Introduce AI-powered recipe recommendations and meal planning.',
            'Add recipe collections, bookmarks, comments, and social following features.',
            'Expand with nutrition analysis, shopping lists, and Progressive Web App (PWA) support.',
        ],
    },
    {
        slug: 'bubtitclub',
        title: 'BUBT IT Club Management System',
        category: 'Full Stack',
        featured: true,
        status: 'Live',
        summary:
            'A modern full-stack club management platform for BUBT IT Club that streamlines event management, member registration, committee administration, announcements, gallery management, and programming contest operations through a responsive web application with secure authentication and role-based dashboards.',
        thumbnail: `${P}/v62hnbx7/Screenshot-2026-07-25-133758.png`,
        coverImage: `${P}/v62hnbx7/Screenshot-2026-07-25-133758.png`,
        gallery: [`${P}/v62hnbx7/Screenshot-2026-07-25-133758.png`],
        timeline: '2026 — Present',
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
            'HeroUI',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Better Auth',
            'Cloudinary',
            'REST API',
        ],
        links: {
            live: 'https://your-live-url.com',
            github: 'https://github.com/anas20023/your-repository',
        },
        challenges: [
            'Building a secure role-based authentication system for members, committee executives, and administrators.',
            'Managing dynamic event registrations, programming contest workflows, and member records efficiently.',
            'Designing a scalable admin dashboard with responsive UI while maintaining high performance across devices.',
        ],
        futurePlans: [
            'Introduce an online membership payment gateway with automated receipt generation.',
            'Add attendance tracking, certificate generation, and event analytics dashboards.',
            'Implement push notifications, email automation, and a mobile-friendly PWA experience.',
        ],
    },
    {
        slug: 'suggestion-sharing-platform-backend',
        title: 'Suggestion Sharing Platform — Backend',
        category: 'Backend',
        featured: true,
        status: 'Live',
        summary:
            'A backend service for a suggestion sharing platform built with Node.js, Express, and MongoDB, providing RESTful APIs for auth, suggestions, subscriptions, feedback, and admin moderation.',
        thumbnail: `${P}/v62hnbx7/Screenshot-2026-07-25-133758.png`,
        coverImage: `${P}/v62hnbx7/Screenshot-2026-07-25-133758.png`,
        gallery: [`${P}/v62hnbx7/Screenshot-2026-07-25-133758.png`],
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
        techStack: [
            'Next.js',
            'React',
            'Tailwind CSS',
            'MongoDB',
            'Firebase Auth',
        ],
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
        techStack: [
            'Node.js',
            'Express.js',
            'MongoDB',
            'Telegram Bot API',
            'Webhook',
        ],
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
        techStack: [
            'Next.js',
            'Tailwind CSS',
            'Better Auth',
            'Node.js',
            'Express.js',
            'MongoDB',
        ],
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
