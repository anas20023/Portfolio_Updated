'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import { ToggleButton, ToggleButtonGroup } from '@heroui/react';

const OPTIONS = [
  { key: 'light', label: 'Light theme', Icon: Sun },
  { key: 'dark', label: 'Dark theme', Icon: Moon },
  { key: 'system', label: 'Match system theme', Icon: Monitor },
] as const;

/**
 * "Have we hydrated yet?", expressed the way React wants to be asked.
 *
 * The usual `useState(false)` + `useEffect(() => setMounted(true))` does the
 * same job but trips react-hooks/set-state-in-effect, and rightly: it's a
 * cascading render React can't see the reason for. useSyncExternalStore hands
 * React a server snapshot and a client snapshot and lets it resolve the
 * difference as part of hydration instead. The store never actually changes, so
 * subscribe is a no-op — all three are module-level constants because unstable
 * references here would resubscribe on every render.
 */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  /**
   * next-themes seeds `theme` from localStorage inside a useState initialiser,
   * so the client knows the stored value on its very first render while the
   * server does not — rendering the selected pip straight away is a hydration
   * mismatch. Holding the selection empty until hydration makes the server
   * render and the first client render identical.
   *
   * This delays only the pip: next-themes' blocking inline script has already
   * put the right class on <html>, so the page itself is never the wrong
   * colour. And the group renders at full size either way, so nothing shifts.
   */
  return (
    <ToggleButtonGroup
      size="sm"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={hydrated && theme ? [theme] : []}
      onSelectionChange={(keys) => {
        const next = [...keys][0];
        if (typeof next === 'string') setTheme(next);
      }}
      aria-label="Colour theme"
      className={className}
    >
      {OPTIONS.map(({ key, label, Icon }) => (
        <ToggleButton key={key} id={key} isIconOnly aria-label={label}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
