import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { ProjectsSection } from '@/components/projects/ProjectCard';
import { Experience } from '@/components/experience/Experience';
import { Contact } from '@/components/contact/Contact';
import { featuredProjects } from '@/data/projects';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection projects={featuredProjects} />
      <Experience />
      <Contact />
      <Script
        id="tawk-to"
        src="https://embed.tawk.to/6a8ee09ab56df5344af1eedd/1k0v1qnag"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
