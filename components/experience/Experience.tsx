import { Section, Reveal } from '@/components/layout/Section';
import { education } from '@/data/extras';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="05 — Education & Experience"
      title="Education & Experience"
      description="Academic background and roles that shaped my journey as an engineer."
    >
      <div className="relative">
        <div className="absolute left-[15px] top-2 h-full w-px bg-border" />
        <div className="space-y-8">
          {education.map((item, i) => {
            const isWork = !item.degree.includes('B.Sc') &&
              !item.degree.includes('Alim') &&
              !item.degree.includes('Dakhil');
            const Icon = isWork ? Briefcase : GraduationCap;
            return (
              <Reveal key={item.institution + item.degree} delay={i * 0.05}>
                <div className="relative pl-10">
                  <span className="absolute left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
                  <div className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {item.degree}
                          </h3>
                          <p className="text-sm text-accent">
                            {item.institution}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            {item.duration}
                          </p>
                        </div>
                      </div>
                      {item.cgpa && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-default px-3 py-1.5 text-xs font-semibold text-foreground">
                          <Award className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                          CGPA {item.cgpa}
                        </span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2 text-sm text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
