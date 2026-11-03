import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects Archive',
  description:
    'A complete collection of full-stack web apps, APIs, and platforms built by Anas Ibn Belal.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="py-12 sm:py-16 border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <p className="mb-2 text-xs font-semibold tracking-wide text-accent">
            Archive &amp; Case Studies
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            All Projects &amp; Software Works
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Full-stack web applications, AI research tools, and REST APIs built with Next.js, React, Node.js, Express, and MongoDB.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
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
