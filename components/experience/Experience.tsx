'use client';

import { Section, Reveal } from '@/components/layout/Section';
import { education, competitiveProgramming, leadership } from '@/data/extras';
import {
  Trophy,
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Target,
  ChevronRight,
} from 'lucide-react';

export function Experience() {
  return (
    <Section
      id="journey"
      eyebrow="Milestones &amp; Craft"
      title="Algorithmic problem solving &amp; technical trajectory"
      description="Solving algorithmic problems under time constraints, mentoring university students in C++ OOP, and engineering web products."
    >
      {/* Anchor targets for backwards compatibility with nav links */}
      <div id="education" className="sr-only" />
      <div id="competitive-programming" className="sr-only" />

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left Column: Algorithmic Problem Solving & Contests */}
        <div className="space-y-8">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    Competitive Programming
                  </h3>
                </div>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                  {competitiveProgramming.platform} · {competitiveProgramming.solved} Solved
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                Competing in algorithm contests develops deep intuition for time complexity, space optimization, edge cases, and disciplined debugging.
              </p>

              {/* Notable Contest Honors */}
              <div className="mt-6 space-y-3">
                <h4 className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground">
                  <Trophy className="h-3.5 w-3.5 text-accent" />
                  Contest Results &amp; Honors
                </h4>
                <ul className="space-y-2">
                  {competitiveProgramming.achievements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-border bg-background/50 p-3 text-xs sm:text-sm font-medium text-foreground"
                    >
                      <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Leadership & Contest Volunteering */}
              <div className="mt-6 border-t border-border pt-5">
                <h4 className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground">
                  <Users className="h-3.5 w-3.5 text-accent" />
                  Community &amp; Contest Leadership
                </h4>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {leadership.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg border border-border bg-background/40 p-3"
                    >
                      <p className="text-xs font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-[11px] font-medium text-accent">
                        {item.role}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Academic & Professional Timeline */}
        <div>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent">
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    Experience &amp; Education
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted">
                  2018 — Present
                </span>
              </div>

              <div className="relative mt-6 space-y-6 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {education.map((item) => {
                  const isWork =
                    !item.degree.includes('B.Sc') &&
                    !item.degree.includes('Alim') &&
                    !item.degree.includes('Dakhil');
                  const IconComponent = isWork ? Briefcase : GraduationCap;

                  return (
                    <div key={item.institution + item.degree} className="relative pl-9">
                      <span className="absolute left-2.5 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-3 ring-surface" />
                      <div className="rounded-xl border border-border/70 bg-background/40 p-4 transition-colors hover:border-accent/40">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                            <IconComponent className="h-3.5 w-3.5 text-accent" />
                            {item.degree}
                          </h4>
                          <span className="font-mono text-[11px] text-muted">
                            {item.duration}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-medium text-accent">
                          {item.institution}
                        </p>

                        {item.cgpa && (
                          <div className="mt-2 inline-flex items-center gap-1 rounded bg-default px-2 py-0.5 text-[11px] font-semibold text-foreground">
                            <Award className="h-3 w-3 text-accent" />
                            CGPA {item.cgpa}
                          </div>
                        )}

                        <ul className="mt-2.5 space-y-1">
                          {item.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-center gap-1.5 text-xs text-muted"
                            >
                              <ChevronRight className="h-3 w-3 text-accent/70 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// Export aliases for backwards compatibility with any other imports
export const Education = Experience;
