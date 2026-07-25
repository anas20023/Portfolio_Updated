import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Services } from '@/components/about/Services';
import { Skills } from '@/components/skills/Skills';
import { ProjectsSection } from '@/components/projects/ProjectCard';
import { Education } from '@/components/experience/Experience';
import { CompetitiveProgramming } from '@/components/achievements/CompetitiveProgramming';
import { Leadership } from '@/components/leadership/Leadership';
import { Contact } from '@/components/contact/Contact';
import { featuredProjects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <ProjectsSection projects={featuredProjects} />
      <Education />
      <CompetitiveProgramming />
      <Leadership />
      <Contact />
    </>
  );
}
