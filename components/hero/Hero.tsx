'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { profile } from '@/data/profile';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stats = [
  { label: 'Problems Solved', value: profile.stats.problemsSolved },
  { label: 'GitHub Repos', value: profile.stats.githubRepos },
  { label: 'GitHub Stars', value: profile.stats.githubStars },
  { label: 'CGPA', value: profile.stats.cgpa },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      {/* Subtle geometric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 mask-fade-b" />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[10%] top-1/3 h-px w-40 rotate-45 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute left-[8%] top-1/2 h-24 w-24 rounded-xl border border-border/60" />
        <div className="absolute right-[18%] top-1/4 h-16 w-16 rounded-full border border-border/60" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m {profile.name}.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="mt-4 text-lg font-medium text-primary sm:text-xl"
            >
              {profile.headline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              {profile.currentFocus}
            </motion.p>

            <motion.blockquote
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate="show"
              className="mt-5 border-l-2 border-primary/60 pl-4 font-mono text-sm italic text-foreground/80"
            >
              &ldquo;{profile.tagline}&rdquo;
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/50 hover:text-primary"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={7}
              initial="hidden"
              animate="show"
              className="mt-6 flex items-center gap-4"
            >
              <div className="flex items-center gap-1.5">
                {[
                  { label: 'GitHub', href: profile.github, Icon: Github },
                  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
                  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile image + stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={profile.image}
                  alt={`${profile.name} — ${profile.headline}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card/90 px-4 py-3 backdrop-blur sm:block">
              <p className="flex items-center gap-2 text-xs font-medium text-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {profile.location}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          custom={8}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card/60 p-5 text-center backdrop-blur"
            >
              <p className="text-2xl font-bold text-primary sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
