'use client';

import { Section, Reveal } from '@/components/layout/Section';
import { profile as staticProfile } from '@/data/profile';
import { skills as staticSkills } from '@/data/projects';
import { services as staticServices } from '@/data/extras';
import type { Profile, SkillGroup, Service } from '@/data/types';
import { Icon, TechIcon } from '@/components/shared/Icon';
import {
  Code2,
  Server,
  Layers,
  Sparkles,
  MapPin,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export function About({
  profile = staticProfile,
  skills = staticSkills,
  services = staticServices,
}: {
  profile?: Profile;
  skills?: SkillGroup[];
  services?: Service[];
}) {
  return (
    <Section
      id="about"
      eyebrow="Foundation & Competencies"
      title="Engineering with algorithmic rigor and product craft"
      description="I bridge the gap between algorithmic problem solving and production-ready full-stack software."
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left Column: Narrative, Specs & High-Impact Capabilities */}
        <div className="space-y-10">
          <Reveal>
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Turning complex problems into clean, scalable software
              </h3>
              <p className="text-base leading-relaxed text-muted">
                {profile.about.whoIAm}
              </p>
              <p className="text-base leading-relaxed text-muted">
                {profile.about.whatIDo}
              </p>
            </div>
          </Reveal>

          {/* Quick Specifications Sheet */}
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h4 className="text-xs font-semibold tracking-wide text-foreground">
                Engineering Dossier
              </h4>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs text-muted">Location</dt>
                    <dd className="font-medium text-foreground">{profile.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs text-muted">Education</dt>
                    <dd className="font-medium text-foreground">B.Sc. Engg. in CSE (3.87)</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Briefcase className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs text-muted">Role</dt>
                    <dd className="font-medium text-foreground">Teaching Assistant (C++/OOP)</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs text-muted">Availability</dt>
                    <dd className="font-medium text-foreground">{profile.availability}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* High-Impact Capabilities */}
          <Reveal delay={0.12}>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-foreground">
                How I Contribute to Teams
              </h4>
              <div className="mt-4 grid gap-3.5 sm:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-xl border border-border bg-surface/70 p-4 transition-colors hover:border-accent/50"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon name={service.icon} className="h-4 w-4" />
                    </span>
                    <h5 className="mt-3 text-sm font-semibold text-foreground">
                      {service.title}
                    </h5>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Technical Toolkit */}
        <div id="skills" className="scroll-mt-28">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    Technical Toolkit
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    Core languages, frameworks, databases, and tooling
                  </p>
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Layers className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {skills.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-accent/10 text-accent">
                        <Icon name={group.icon} className="h-3.5 w-3.5" />
                      </span>
                      <h4 className="text-xs font-semibold text-foreground">
                        {group.category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent"
                        >
                          <TechIcon name={item} className="h-3 w-3 shrink-0 text-accent" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem Solving callout box */}
              <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-foreground">
                    Algorithmic Foundation
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  Daily problem solving in C++ across Codeforces and competitive programming contests — reinforcing algorithmic complexity analysis, recursion, dynamic programming, and data structures.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
