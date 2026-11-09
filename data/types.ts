export type SkillGroup = {
  category: string;
  icon: string;
  items: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  summary: string;
  status: 'Live' | 'In Progress' | 'Completed' | 'Archived';
  thumbnail: string;
  coverImage: string;
  gallery: string[];
  timeline: string;
  techStack: string[];
  links: { live?: string; github?: string };
  challenges: string[];
  futurePlans: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  duration: string;
  cgpa?: string;
  highlights: string[];
};

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export type LeadershipItem = {
  title: string;
  role: string;
  description: string;
};

export type CompetitiveProgramming = {
  platform: string;
  solved: string;
  achievements: string[];
};

export type Profile = {
  name: string;
  headline: string;
  title: string;
  motto: string;
  tagline: string;
  bio: string;
  summary: string;
  location: string;
  availability: string;
  currentFocus: string;
  email: string;
  github: string;
  linkedin: string;
  phone: string;
  resumeUrl: string;
  image: string;
  techBadges: string[];
  stats: {
    problemsSolved: number;
    githubRepos: number;
    githubStars: number;
    projects: number;
  };
  quickFacts: { label: string; value: string }[];
  about: {
    whoIAm: string;
    whatIDo: string;
    interests: { name: string; description: string }[];
  };
};
