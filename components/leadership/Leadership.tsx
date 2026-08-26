import { Section, Reveal } from '@/components/layout/Section';
import { leadership } from '@/data/extras';
import { Users } from 'lucide-react';

export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="07 — Leadership"
      title="Leading and organizing"
      description="Where I stepped beyond building to help communities grow."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leadership.map((item, i) => (
          <Reveal key={item.title + item.role} delay={i * 0.05}>
            <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25 transition-transform group-hover:scale-110">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm text-accent">{item.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
