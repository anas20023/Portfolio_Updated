import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { ProjectsSection } from '@/components/projects/ProjectCard';
import { Experience } from '@/components/experience/Experience';
import { Contact } from '@/components/contact/Contact';
import { getFeaturedProjects } from '@/lib/get-projects';
import { getProfile } from '@/lib/get-profile';
import { getSiteContent } from '@/lib/get-content';
import Script from 'next/script';

// Incremental Static Regeneration (ISR) with 60-second background revalidation
export const revalidate = 60;

export default async function Home() {
  const [profile, siteContent, featured] = await Promise.all([
    getProfile(),
    getSiteContent(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <About
        profile={profile}
        skills={siteContent.skills}
        services={siteContent.services}
      />
      <ProjectsSection projects={featured} />
      <Experience
        education={siteContent.education}
        leadership={siteContent.leadership}
        competitiveProgramming={siteContent.competitiveProgramming}
      />
      <Contact profile={profile} />
      <Script
        id="tawk-to"
        src="https://embed.tawk.to/6a8ee09ab56df5344af1eedd/1k0v1qnag"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
