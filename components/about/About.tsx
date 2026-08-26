import { Section, Reveal } from '@/components/layout/Section';
import { profile } from '@/data/profile';
import { MapPin, GraduationCap, Briefcase, Languages, Clock } from 'lucide-react';

const factIcons: Record<string, typeof MapPin> = {
  Location: MapPin,
  Education: GraduationCap,
  Experience: Briefcase,
  Languages: Languages,
  Availability: Clock,
};

export function About() {
  const cards = [
    {
      title: 'Who I Am',
      body: profile.about.whoIAm,
    },
    {
      title: 'What I Do',
      body: profile.about.whatIDo,
    },
    {
      title: 'Interests',
      body: null as string | null,
      interests: profile.about.interests,
    },
    {
      title: 'Quick Facts',
      body: null as string | null,
      facts: profile.quickFacts,
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title="A bit about me"
      description="Aspiring engineer, problem solver, and lifelong learner focused on shipping scalable software."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              {card.body && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              )}
              {card.interests && (
                <ul className="mt-4 space-y-3">
                  {card.interests.map((interest) => (
                    <li key={interest.name} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {interest.name}
                        </p>
                        <p className="text-xs text-muted">
                          {interest.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {card.facts && (
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {card.facts.map((fact) => {
                    const FIcon = factIcons[fact.label] ?? MapPin;
                    return (
                      <div
                        key={fact.label}
                        className="rounded-lg border border-border/60 bg-background/40 p-3"
                      >
                        <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                          <FIcon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                          {fact.label}
                        </dt>
                        <dd className="mt-1.5 text-sm font-medium text-foreground">
                          {fact.value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
