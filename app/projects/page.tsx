import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A collection of full-stack web apps, APIs, and platforms built by Anas Ibn Belal.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Portfolio
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Full-stack web apps, REST APIs, and platforms built with Next.js,
            Node.js, Express, and MongoDB.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
