import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * The four badge call sites in this app all passed `border-none` plus their own
 * background and text colour, overriding everything shadcn's cva default
 * variant supplied. HeroUI's `Chip` would have to be fought back to the same
 * padding/radius/weight and still wouldn't land pixel-identical, so this is a
 * plain span carrying exactly the classes that survived that override.
 *
 * Deliberately dropped from the old base: the transparent 1px border (the
 * call sites' `border-none` zeroed its computed width anyway), the four
 * `focus:*` ring classes (a span is not focusable, and `ring-ring` no longer
 * resolves — HeroUI ships `--focus`, not `--ring`), and the cva default
 * variant's `hover:bg-accent/80`, which no call site asked for and which
 * flashed an unrelated blue when the pointer crossed a badge.
 */
export function Tag({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        className
      )}
    >
      {children}
    </span>
  );
}
