'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {
  ArrowDown,
  Download,
  Mail,
  MapPin,
  Code2,
  GitBranch,
  GraduationCap,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/BrandIcons';
import { profile as staticProfile } from '@/data/profile';
import type { Profile } from '@/data/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero({ profile = staticProfile }: { profile?: Profile }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* Background architectural grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-25 mask-fade-b" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Focused, punchy introduction without duplicate filler */}
          <div>
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground font-medium">Available for opportunities</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1 text-muted">
                <MapPin className="h-3 w-3 text-accent" />
                Dhaka, Bangladesh
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show" className="mt-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-semibold text-accent">
                Software Engineer &amp; Competitive Programmer
              </p>
            </motion.div>

            {/* Single, purposeful description — no duplicate mottos or competing blurbs */}
            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted"
            >
              Specializing in scalable Next.js web applications and robust REST APIs, backed by 1,000+ competitive programming problems solved with a focus on algorithmic efficiency and clean architecture.
            </motion.p>

            {/* Direct Actions */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </Link>

              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                Selected Work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>

              <div className="flex items-center gap-1.5 pl-1 sm:pl-2">
                {[
                  { label: 'GitHub', href: profile.github, Icon: GithubIcon },
                  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon },
                  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Clean, quiet technical credibility counters */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 max-w-lg"
            >
              <div>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <Code2 className="h-3 w-3 text-accent" />
                  <span>Problems</span>
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  <CountUp start={0} end={profile.stats.problemsSolved} suffix="+" duration={2} />
                </p>
                <p className="text-[11px] text-muted">Codeforces &amp; ACM</p>
              </div>

              <div>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <GitBranch className="h-3 w-3 text-accent" />
                  <span>Repos</span>
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  <CountUp start={0} end={profile.stats.githubRepos} suffix="+" duration={2} />
                </p>
                <p className="text-[11px] text-muted">Open source</p>
              </div>

              <div>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <GitBranch className="h-3 w-3 text-accent" />
                  <span>Projects</span>
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  <CountUp start={0} end={profile.stats.projects || 30} suffix="+" duration={2} />
                </p>
                <p className="text-[11px] text-muted">Shipped &amp; deployed</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clearly visible, unobstructed portrait photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
              {/* Outer clean frame */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-2.5 shadow-lg shadow-black/5 dark:shadow-black/20">
                {/* Natural portrait aspect ratio: no gradients, no obscuring text badges */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-default">
                  <Image
                    src={profile.image}
                    alt={`${profile.name} — Software Engineer`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 380px, 100vw"
                    className="object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                </div>

                {/* Clean, minimal photo footer caption */}
                <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-muted">
                  <span className="font-medium text-foreground">{profile.name}</span>
                  <span className="font-mono text-[11px]">B.Sc. Engg. in CSE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
