import { Section, Reveal } from '@/components/layout/Section';
import { skills } from '@/data/projects';
import { Icon } from '@/components/shared/Icon';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 — Skills"
      title="Tools I reach for"
      description="A pragmatic toolkit spanning frontend, backend, databases, programming languages, and the tools that keep everything moving."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                  <Icon name={group.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {group.category}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
