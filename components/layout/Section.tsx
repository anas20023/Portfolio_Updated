'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center'
      )}
    >
      {eyebrow && (
        <p className="mb-2.5 text-xs font-semibold tracking-wide text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-16 sm:py-24 lg:py-28', className)}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
