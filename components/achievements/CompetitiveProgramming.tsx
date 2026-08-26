import { Section, Reveal } from '@/components/layout/Section';
import { competitiveProgramming } from '@/data/extras';
import { Trophy, Code2, Target } from 'lucide-react';

export function CompetitiveProgramming() {
  return (
    <Section
      id="competitive-programming"
      eyebrow="06 — Competitive Programming"
      title="Competitive Programming"
      description="Solving algorithmic problems under pressure sharpens how I think about software."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-surface p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/25">
              <Code2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 text-5xl font-bold text-accent">
              {competitiveProgramming.solved}
            </p>
            <p className="mt-2 text-sm font-medium text-muted">
              Problems Solved on {competitiveProgramming.platform}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-2xl border border-border bg-surface p-8">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground">
                Notable Results
              </h3>
            </div>
            <ul className="mt-5 space-y-4">
              {competitiveProgramming.achievements.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4"
                >
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
