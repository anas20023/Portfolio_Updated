'use client';

import { redirect, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  UserCircle,
  Layers,
  ExternalLink,
  LogOut,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'CRM Leads', href: '/admin/leads', icon: Users },
  { name: 'Projects CMS', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Profile & Bio', href: '/admin/profile', icon: UserCircle },
  { name: 'Content & Skills', href: '/admin/content', icon: Layers },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Allow login page without auth wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!mounted || isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/admin/login');
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-surface-raised/40 text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link href="/admin" className="font-bold text-lg tracking-tight flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-accent" />
              <span>Admin & CRM</span>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-accent/15 text-accent font-semibold'
                      : 'text-muted hover:text-foreground hover:bg-surface-raised'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-foreground hover:bg-surface-raised rounded-md transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Open Public Site</span>
          </Link>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-xs font-semibold text-foreground truncate">
                {session.user?.name || 'Administrator'}
              </p>
              <p className="text-[11px] text-muted truncate">{session.user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 text-muted hover:text-rose-500 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-border bg-surface/60 backdrop-blur px-8 flex items-center justify-between shrink-0">
          <h1 className="text-base font-semibold capitalize">
            {pathname.replace('/admin', '').replace('/', '') || 'Dashboard Overview'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
            <ThemeSwitcher />
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}

