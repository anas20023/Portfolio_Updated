import type { EducationItem, Service, LeadershipItem, CompetitiveProgramming } from './types';

export const education: EducationItem[] = [
  {
    institution: 'Bangladesh University of Business and Technology',
    degree: 'Teaching Assistant',
    duration: '2026 - Present',
    highlights: [
      'Assisting C and C++ OOP lab sessions and practical exercises',
      'Preparing lab materials, mentored students, and graded assignments',
    ],
  },
  {
    institution: 'Freelancer.com',
    degree: 'Front-End Developer',
    duration: '2024 - 2026',
    highlights: ['Developed robust web apps', 'Converting design into reality'],
  },
  {
    institution: 'Bangladesh University of Business and Technology',
    degree: 'B.Sc. Engg. in CSE',
    duration: '2023 - 2027',
    cgpa: '3.87',
    highlights: ['1000+ ACM Problems Solved', 'BIUPC Runner-Up'],
  },
  {
    institution: 'Tamirul Millat Kamil Madrasha, Tongi',
    degree: 'Alim',
    duration: '2020 - 2022',
    cgpa: '5.00',
    highlights: ['10th Merit position in Dhaka Division', 'Full Free Studentship'],
  },
  {
    institution: 'Tamirul Millat Kamil Madrasha, Tongi',
    degree: 'Dakhil',
    duration: '2018 - 2019',
    cgpa: '5.00',
    highlights: ['Top 10% in Dhaka Division', 'Full Free Studentship'],
  },
];

export const services: Service[] = [
  {
    title: 'Next.js Apps',
    description:
      'High-performance, SEO-friendly React applications with the latest Next.js features.',
    icon: 'Rocket',
  },
  {
    title: 'Frontend UI',
    description:
      'Modern, responsive user interfaces with React, Next.js, and Tailwind CSS for pixel-perfect designs.',
    icon: 'Layout',
  },
  {
    title: 'API Development',
    description:
      'Scalable RESTful APIs with Node.js, Express, and MongoDB for seamless data integration.',
    icon: 'Server',
  },
];

export const leadership: LeadershipItem[] = [
  {
    title: 'ICPC Volunteer',
    role: 'Media & Event Management',
    description:
      'Coordinated media coverage and logistics for regional ICPC events.',
  },
];

export const competitiveProgramming: CompetitiveProgramming = {
  platform: 'Codeforces',
  solved: '820+',
  achievements: [
    'Runners Up — BIUPC Junior Division Fall 2024',
    '10th in BIUPC Junior Division Spring 2025',
    'Top 20% in BIUCPC Fall 2025',
  ],
};
