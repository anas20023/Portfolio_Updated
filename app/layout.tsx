import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AppShell } from '@/components/layout/AppShell';
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    siteName: `${profile.name} — Portfolio`,
    images: [
      {
        url: profile.image,
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    images: [profile.image],
    creator: '@anas20023',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is required, not defensive: next-themes' blocking
    // script mutates this element's class before React hydrates, so the server
    // HTML and the DOM React finds will always disagree here. It suppresses one
    // level only — the rest of the tree still warns normally.
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          /* Navbar links and every card carry transition-colors / transition-all,
             so without this a toggle animates every colour in the viewport at
             once — a visible half-second smear rather than a switch. */
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: profile.name,
                jobTitle: profile.title,
                description: profile.summary,
                url: siteConfig.url,
                image: profile.image,
                sameAs: [profile.github, profile.linkedin].filter(Boolean),
                knowsAbout: skills.flatMap((g) => g.items),
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: profile.location,
                },
              }),
            }}
          />
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
