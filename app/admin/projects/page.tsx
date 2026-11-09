'use client';

import { useEffect, useState } from 'react';
import {
  FolderGit2,
  Plus,
  Trash2,
  Pencil,
  ExternalLink,
  Upload,
  Star,
  Loader2,
  Search,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

interface Project {
  _id: string;
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  summary: string;
  status: 'Live' | 'In Progress' | 'Completed' | 'Archived';
  thumbnail: string;
  techStack: string[];
  links: { live?: string; github?: string };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Project Form State
  const initialForm = {
    title: '',
    slug: '',
    category: 'Full Stack',
    summary: '',
    status: 'Live',
    featured: false,
    thumbnail: '',
    techStack: 'React, Next.js, Node.js, MongoDB',
    liveUrl: '',
    githubUrl: '',
  };

  const [form, setForm] = useState(initialForm);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      summary: project.summary,
      status: project.status,
      featured: project.featured,
      thumbnail: project.thumbnail,
      techStack: project.techStack?.join(', ') || '',
      liveUrl: project.links?.live || '',
      githubUrl: project.links?.github || '',
    });
    setShowModal(true);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleFeatured = async (project: Project) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project._id,
          featured: !project.featured,
        }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, featured: !p.featured } : p
          )
        );
      }
    } catch (err) {
      console.error('Error toggling featured:', err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');
      setForm((prev) => ({ ...prev, thumbnail: result.url }));
    } catch (err: any) {
      alert(err.message || 'Cloudinary upload failed. Check credentials in .env');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: form.title,
        category: form.category,
        featured: form.featured,
        summary: form.summary,
        status: form.status,
        thumbnail: form.thumbnail,
        techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        links: {
          live: form.liveUrl,
          github: form.githubUrl,
        },
      };

      if (editingProject) {
        const res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject._id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update project');

        setProjects((prev) =>
          prev.map((p) => (p._id === editingProject._id ? data.project : p))
        );
      } else {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create project');

        setProjects((prev) => [data.project, ...prev]);
      }

      setShowModal(false);
      setEditingProject(null);
      setForm(initialForm);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Portfolio Projects CMS
          </h2>
          <p className="text-sm text-muted">
            Manage projects displayed on your public portfolio, update tech stacks, and toggle featured items.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface py-2 pl-9 pr-3 text-xs text-foreground focus:border-accent focus:outline-none"
        />
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="p-16 flex justify-center items-center gap-2 text-muted text-xs">
          <Loader2 className="h-5 w-5 animate-spin text-accent" />
          Loading projects...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center text-xs text-muted">
          No projects found. Use &quot;Add Project&quot; or go to Overview to seed from static files.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => (
            <div
              key={proj._id}
              className="rounded-xl border border-border bg-surface shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-surface-raised overflow-hidden">
                  {proj.thumbnail ? (
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                      No Image Provided
                    </div>
                  )}
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full backdrop-blur ${
                      proj.status === 'Live'
                        ? 'bg-emerald-500/80 text-white'
                        : 'bg-zinc-800/80 text-zinc-300'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-accent uppercase">
                      {proj.category}
                    </span>
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      title={proj.featured ? 'Unmark featured' : 'Mark featured'}
                      className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors ${
                        proj.featured
                          ? 'bg-amber-500/10 text-amber-500 font-semibold'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      <Star className={`h-3 w-3 ${proj.featured ? 'fill-amber-500' : ''}`} />
                      {proj.featured ? 'Featured' : 'Regular'}
                    </button>
                  </div>

                  <h3 className="font-bold text-foreground text-sm line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-muted line-clamp-2">{proj.summary}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-surface-raised text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {(proj.techStack?.length || 0) > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-muted">
                        +{(proj.techStack?.length || 0) - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {proj.links?.live && (
                    <a
                      href={proj.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-foreground flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> Live
                    </a>
                  )}
                  {proj.links?.github && (
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-foreground flex items-center gap-1"
                    >
                      Code
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="text-muted hover:text-accent p-1.5 rounded-md hover:bg-surface-raised transition-colors"
                    title="Edit Project"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj._id)}
                    className="text-muted hover:text-rose-500 p-1.5 rounded-md hover:bg-surface-raised transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl my-8">
            <h3 className="text-lg font-bold text-foreground">
              {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h3>
            <p className="text-xs text-muted mb-4">
              {editingProject
                ? 'Update project details, links, tech stack, and media.'
                : 'Fill in the details to publish or feature this project.'}
            </p>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. AI Workflow Platform"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated-if-empty"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Full Stack, Frontend, etc."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="Live">Live</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <MarkdownEditor
                label="Project Description / Summary (Markdown Supported) *"
                value={form.summary}
                onChange={(val) => setForm({ ...form, summary: val })}
                placeholder="Write description with rich formatting, bold, bullet points, links, etc..."
                rows={4}
              />

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  placeholder="Next.js, Tailwind CSS, TypeScript, MongoDB"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              {/* Thumbnail URL + Cloudinary Upload */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Thumbnail Image (URL or Cloudinary Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.thumbnail}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface-raised hover:bg-border/60 text-xs font-medium cursor-pointer transition-colors">
                    {uploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://myproject.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <label htmlFor="featured-check" className="text-xs text-foreground font-medium">
                  Feature this project on the homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs rounded-lg border border-border hover:bg-surface-raised"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {saving
                    ? 'Saving...'
                    : editingProject
                    ? 'Update Project'
                    : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

