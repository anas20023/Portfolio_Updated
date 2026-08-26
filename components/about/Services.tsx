import { Section, Reveal } from '@/components/layout/Section';
import { services } from '@/data/extras';
import { Icon } from '@/components/shared/Icon';

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I Do"
      title="Services I offer"
      description="From full-stack Next.js apps to scalable APIs, here's how I can help."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25 transition-transform group-hover:scale-110">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
