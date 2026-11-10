'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CalendarDays,
  CircleDot,
  Layers,
  Rocket,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { GithubIcon } from '@/components/shared/BrandIcons';
import { TechIcon } from '@/components/shared/Icon';
import type { Project } from '@/data/types';
import { Tag } from '@/components/shared/Tag';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Reveal } from '@/components/layout/Section';
import { renderMarkdown, stripMarkdown } from '@/lib/markdown';

export function ProjectDetail({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  return (
    <article className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -top-24 left-1/2 h-72 w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex flex-wrap gap-2">
                <Tag className="bg-default text-foreground">
                  {project.category}
                </Tag>
                {project.featured && (
                  <Tag className="bg-accent text-accent-foreground">
                    Featured
                  </Tag>
                )}
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg line-clamp-3">
                {stripMarkdown(project.summary)}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                    <CalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Timeline
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">
                    {project.timeline}
                  </dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                    <CircleDot className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Status
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">
                    {project.status}
                  </dd>
                </div>
                <div className="col-span-2 rounded-xl border border-border bg-surface p-4 sm:col-span-1">
                  <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                    <Layers className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Stack
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">
                    {project.techStack.length} technologies
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:text-accent"
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -inset-3 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                  <Target className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Overview
                </h2>
              </div>
              <div
                className="mt-4 max-w-3xl text-base leading-relaxed text-muted prose prose-neutral dark:prose-invert [&_a]:text-accent [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(project.summary || '') }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Technologies
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  <TechIcon name={t} className="h-4 w-4 shrink-0 text-accent" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Gallery
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src, i) => (
              <Reveal key={src + i} delay={i * 0.05}>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 380px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Challenges
              </h2>
            </div>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.challenges.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="font-mono text-xs text-accent">
                    0{i + 1}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {c}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Future Improvements */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                <Rocket className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Future Improvements
              </h2>
            </div>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.futurePlans.map((f, i) => (
              <Reveal key={f} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <ArrowUpRight className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {f}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                More Projects
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
