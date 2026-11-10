import { marked } from 'marked';

// Configure marked to support line breaks for normal text as well as GFM markdown
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Renders markdown or plain text with line breaks preserved into HTML.
 */
export function renderMarkdown(content: string = ''): string {
  if (!content) return '';
  return marked.parse(content, { async: false, breaks: true, gfm: true }) as string;
}

/**
 * Strips markdown tags, badges, images, and formatting, returning a clean plain text excerpt suitable for previews and cards.
 */
export function stripMarkdown(content: string = ''): string {
  if (!content) return '';
  return content
    // Remove complex linked badge/image patterns like [![Next.js](img)](url) or [!Next.js](img)](url)
    .replace(/\[?!?\!?\[[^\]]*\]\([^)]*\)\]?(\([^)]*\))?/gi, '')
    // Remove markdown image tags: ![alt](url)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // Remove standalone badge / shields URLs
    .replace(/\(https?:\/\/[^\s)]*(shields\.io|badge)[^\s)]*\)/gi, '')
    // Remove standalone links leftover
    .replace(/\(https?:\/\/[^\s)]+\)/g, '')
    // Remove markdown links but keep anchor text: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Remove leftover markdown brackets or image markers
    .replace(/\[!?[^\]]*\]/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove headers (#, ##, etc.) anywhere in the string
    .replace(/#{1,6}\s*/g, '')
    // Remove blockquotes and list markers
    .replace(/^\s*>\s*/gm, '')
    .replace(/>\s*/g, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove horizontal rules (--- or ***)
    .replace(/[-*_]{3,}/g, ' ')
    .replace(/---/g, ' ')
    // Remove bold and italic formatting
    .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, '$2')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Collapse multiple whitespace and linebreaks into a single space
    .replace(/\s+/g, ' ')
    .trim();
}
