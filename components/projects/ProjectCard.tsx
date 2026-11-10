'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { GithubIcon } from '@/components/shared/BrandIcons';
import { TechIcon } from '@/components/shared/Icon';
import type { Project } from '@/data/types';
import { Tag } from '@/components/shared/Tag';
import { stripMarkdown } from '@/lib/markdown';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <div className="relative aspect-[16/10] overflow-hidden bg-default">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent" />
        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
          <Tag className="bg-background/85 text-foreground backdrop-blur-xs text-[11px]">
            {project.category}
          </Tag>
          {project.featured && (
            <Tag className="bg-accent text-accent-foreground text-[11px]">
              Featured
            </Tag>
          )}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-90 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="grid h-8 w-8 place-items-center rounded-lg bg-background/90 text-foreground backdrop-blur-xs transition-colors hover:text-accent"
            >
              <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="grid h-8 w-8 place-items-center rounded-lg bg-background/90 text-foreground backdrop-blur-xs transition-colors hover:text-accent"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {project.status}
          </span>
        </div>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {stripMarkdown(project.summary)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              <TechIcon name={tech} className="h-3 w-3 shrink-0 text-accent/80" />
              <span>{tech}</span>
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="rounded-md border border-border bg-background/40 px-1.5 py-0.5 font-mono text-[10px] text-muted">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:underline"
          >
            Explore case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted hover:text-foreground"
            >
              Visit live app
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [primary, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="max-w-2xl">
            <p className="mb-2.5 text-xs font-semibold tracking-wide text-accent">
              Selected Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Production systems &amp; software tools
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-muted">
              End-to-end applications designed for real users, combining modern Next.js frontend interfaces, scalable Node.js APIs, and database architecture.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            All projects archive
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Featured Marquee Highlight (Primary Project) */}
        {primary && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-all duration-300 hover:border-accent/40">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-default">
                <Image
                  src={primary.thumbnail}
                  alt={primary.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 680px, 100vw"
                  className="object-cover"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-surface/40 hidden lg:block" />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      Featured Project
                    </span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">{primary.category}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    <Link href={`/projects/${primary.slug}`} className="hover:text-accent transition-colors">
                      {primary.title}
                    </Link>
                  </h3>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted line-clamp-3">
                    {stripMarkdown(primary.summary)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {primary.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0 text-accent/80" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                  {primary.links.live && (
                    <a
                      href={primary.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-all hover:bg-accent/90"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  )}
                  {primary.links.github && (
                    <a
                      href={primary.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      View Code
                    </a>
                  )}
                  <Link
                    href={`/projects/${primary.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline ml-auto"
                  >
                    Read case study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companion Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
