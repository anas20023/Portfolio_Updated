import type { ComponentType, SVGProps } from 'react';
import {
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  Quote,
  Search,
  FileText,
  FolderOpen,
  Palette,
  Eye,
  LayoutTemplate,
  Globe,
  Users,
  CalendarDays,
  Megaphone,
  Bell,
  PlayCircle,
  Shuffle,
  SlidersHorizontal,
  Trophy,
  Award,
  Medal,
  Star,
  GitPullRequest,
  Mic,
  Code2,
  HeartHandshake,
  Presentation,
  GraduationCap,
  Briefcase,
  Rocket,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Mail,
} from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  ReactIcon,
  NextjsIcon,
  NodejsIcon,
  ExpressIcon,
  MongodbIcon,
  MysqlIcon,
  TypescriptIcon,
  JavascriptIcon,
  TailwindIcon,
  CppIcon,
  JavaIcon,
  PythonIcon,
  GitIcon,
  LinuxIcon,
  FirebaseIcon,
  FigmaIcon,
  CodeforcesIcon,
  CIcon,
  RestApiIcon,
  ImageKitIcon,
  BetterAuthIcon,
} from './BrandIcons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const brandIcons: Record<string, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  react: ReactIcon,
  reactjs: ReactIcon,
  next: NextjsIcon,
  nextjs: NextjsIcon,
  node: NodejsIcon,
  nodejs: NodejsIcon,
  express: ExpressIcon,
  expressjs: ExpressIcon,
  mongodb: MongodbIcon,
  mongo: MongodbIcon,
  mysql: MysqlIcon,
  typescript: TypescriptIcon,
  ts: TypescriptIcon,
  javascript: JavascriptIcon,
  js: JavascriptIcon,
  tailwind: TailwindIcon,
  tailwindcss: TailwindIcon,
  c: CIcon,
  cpp: CppIcon,
  cplusplus: CppIcon,
  java: JavaIcon,
  python: PythonIcon,
  git: GitIcon,
  linux: LinuxIcon,
  firebase: FirebaseIcon,
  figma: FigmaIcon,
  codeforces: CodeforcesIcon,
  restapi: RestApiIcon,
  api: RestApiIcon,
  imagekit: ImageKitIcon,
  betterauth: BetterAuthIcon,
};

const lucideIcons: Record<string, IconComponent> = {
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  quote: Quote,
  search: Search,
  filetext: FileText,
  folderopen: FolderOpen,
  palette: Palette,
  eye: Eye,
  layouttemplate: LayoutTemplate,
  globe: Globe,
  users: Users,
  calendardays: CalendarDays,
  megaphone: Megaphone,
  bell: Bell,
  playcircle: PlayCircle,
  shuffle: Shuffle,
  slidershorizontal: SlidersHorizontal,
  trophy: Trophy,
  award: Award,
  medal: Medal,
  star: Star,
  gitpullrequest: GitPullRequest,
  mic: Mic,
  code2: Code2,
  hearthandshake: HeartHandshake,
  presentation: Presentation,
  graduationcap: GraduationCap,
  briefcase: Briefcase,
  rocket: Rocket,
  terminal: Terminal,
  cpu: Cpu,
  layers: Layers,
  sparkles: Sparkles,
  externallink: ExternalLink,
  mail: Mail,
};

function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function resolveIcon(name?: string): IconComponent | null {
  if (!name) return null;
  const key = normalizeKey(name);
  return brandIcons[key] || lucideIcons[key] || null;
}

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = resolveIcon(name) ?? Star;
  return <Cmp className={className} aria-hidden="true" />;
}

/**
 * Renders an authentic brand or technology icon if matched,
 * or returns null if no specific brand icon exists.
 */
export function TechIcon({
  name,
  className = 'h-3.5 w-3.5',
}: {
  name: string;
  className?: string;
}) {
  const Cmp = resolveIcon(name);
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden="true" />;
}
