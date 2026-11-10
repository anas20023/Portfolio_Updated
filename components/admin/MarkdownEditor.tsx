'use client';

import { useState, useRef } from 'react';
import { renderMarkdown } from '@/lib/markdown';
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
  Link as LinkIcon,
  Eye,
  Edit3,
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write markdown description here...',
  rows = 5,
  label,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertSyntax = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const replacement = `${before}${selectedText}${after}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const previewHtml = renderMarkdown(value || '');

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-medium text-foreground">{label}</label>}

      <div className="rounded-xl border border-border bg-background overflow-hidden focus-within:border-accent transition-colors">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-2.5 py-1.5 text-muted">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertSyntax('**', '**')}
              title="Bold"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('*', '*')}
              title="Italic"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('### ')}
              title="Heading"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <span className="h-3.5 w-px bg-border mx-1" />
            <button
              type="button"
              onClick={() => insertSyntax('- ')}
              title="Bullet List"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('1. ')}
              title="Numbered List"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('`', '`')}
              title="Code"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <Code className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('> ')}
              title="Quote"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('[', '](https://)')}
              title="Link"
              className="p-1 rounded hover:bg-surface-raised hover:text-foreground transition-colors"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Write / Preview Tab Switcher */}
          <div className="flex items-center gap-1 bg-surface-raised p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeTab === 'write'
                  ? 'bg-surface text-foreground shadow-xs font-semibold'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Edit3 className="h-3 w-3" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-surface text-foreground shadow-xs font-semibold'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'write' ? (
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent p-3 text-xs text-foreground focus:outline-none resize-y"
          />
        ) : (
          <div
            className="prose prose-sm dark:prose-invert max-w-none p-3 text-xs text-foreground min-h-[100px] max-h-[300px] overflow-y-auto leading-relaxed break-words [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-2 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-3 [&_blockquote]:italic [&_code]:bg-surface-raised [&_code]:px-1 [&_code]:rounded [&_a]:text-accent [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: previewHtml || '<p class="text-muted italic">Nothing to preview</p>' }}
          />
        )}
      </div>
    </div>
  );
}

