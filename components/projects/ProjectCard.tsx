'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/shared/BrandIcons';
import type { Project } from '@/data/types';
import { Tag } from '@/components/shared/Tag';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Tag className="bg-background/80 text-foreground backdrop-blur-sm">
            {project.category}
          </Tag>
          {project.featured && (
            <Tag className="bg-accent text-accent-foreground backdrop-blur-sm">
              Featured
            </Tag>
          )}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="grid h-9 w-9 place-items-center rounded-lg bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="grid h-9 w-9 place-items-center rounded-lg bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="shrink-0 rounded-full bg-default px-2.5 py-1 text-xs font-medium text-muted">
            {project.status}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-background/50 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        >
          View details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent">
              03 — Featured Work
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Projects I&apos;m proud of
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              A selection of products and tools I&apos;ve designed and built end to end.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
