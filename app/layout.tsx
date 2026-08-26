import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { profile } from '@/data/profile';
import { skills } from '@/data/projects';
import { siteConfig } from '@/lib/constants';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    profile.name,
    'Software Engineer',
    'Developer Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Full Stack Developer',
    'Competitive Programming',
    ...skills.flatMap((g) => g.items),
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    siteName: `${profile.name} — Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // HeroUI's :root palette is light and this site has only ever existed in
    // dark, so ship this phase pinned to dark: every visual difference is then
    // attributable to HeroUI rather than to a palette flip. Phase 5 replaces
    // this literal with next-themes and does the light-mode design pass.
    <html
      lang="en"
      className={`dark ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
