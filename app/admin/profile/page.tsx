'use client';

import { useEffect, useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Upload,
  Loader2,
  Save,
  CheckCircle,
  Link as LinkIcon,
  Award,
} from 'lucide-react';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    title: '',
    headline: '',
    motto: '',
    tagline: '',
    bio: '',
    summary: '',
    location: '',
    availability: '',
    currentFocus: '',
    email: '',
    phone: '',
    resumeUrl: '',
    image: '',
    github: '',
    linkedin: '',
    techBadges: '',
    stats: {
      problemsSolved: 0,
      githubRepos: 0,
      githubStars: 0,
      projects: 0,
    },
    about: {
      whoIAm: '',
      whatIDo: '',
    },
  });

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setForm({
            ...data.profile,
            techBadges: data.profile.techBadges?.join(', ') || '',
            stats: data.profile.stats || {
              problemsSolved: 0,
              githubRepos: 0,
              githubStars: 0,
              projects: 0,
            },
            about: data.profile.about || { whoIAm: '', whatIDo: '' },
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setForm((prev) => ({ ...prev, image: result.url }));
    } catch (err: any) {
      alert(err.message || 'ImageKit upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const payload = {
        ...form,
        techBadges: form.techBadges
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save profile');

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 flex justify-center items-center gap-2 text-muted text-xs">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
        Loading profile details...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Profile &amp; Personal Info CMS
          </h2>
          <p className="text-sm text-muted">
            Edit all publicly displayed biographical details, metrics, and links.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : savedSuccess ? (
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{saving ? 'Saving...' : savedSuccess ? 'Saved Live!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Core Personal Details */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <User className="h-4 w-4 text-accent" /> Core Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Professional Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Software Engineer"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-foreground mb-1">Hero Headline</label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-foreground mb-1">Motto / Tagline</label>
            <input
              type="text"
              value={form.motto}
              onChange={(e) => setForm({ ...form, motto: e.target.value, tagline: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Availability</label>
            <input
              type="text"
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              placeholder="e.g. Open to opportunities"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Profile Avatar / Photo */}
        <div className="pt-2 border-t border-border">
          <label className="block text-xs font-medium text-foreground mb-1">
            Avatar / Profile Photo
          </label>
          <div className="flex items-center gap-4">
            {form.image && (
              <img
                src={form.image}
                alt="Profile Avatar"
                className="h-14 w-14 rounded-full object-cover border border-border"
              />
            )}
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Image URL or upload below"
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
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Numerical Stats & Badges */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" /> Live Stats &amp; Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-muted mb-1">
              Problems Solved
            </label>
            <input
              type="number"
              value={form.stats.problemsSolved}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, problemsSolved: Number(e.target.value) },
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-muted mb-1">
              GitHub Repos
            </label>
            <input
              type="number"
              value={form.stats.githubRepos}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, githubRepos: Number(e.target.value) },
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-muted mb-1">
              GitHub Stars
            </label>
            <input
              type="number"
              value={form.stats.githubStars}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, githubStars: Number(e.target.value) },
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-muted mb-1">
              Total Projects
            </label>
            <input
              type="number"
              value={form.stats.projects}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: { ...form.stats, projects: Number(e.target.value) },
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Top Tech Badges (comma separated)
          </label>
          <input
            type="text"
            value={form.techBadges}
            onChange={(e) => setForm({ ...form, techBadges: e.target.value })}
            placeholder="Next.js, Node.js, C++, MongoDB, Competitive Programming"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-accent" /> Contact &amp; Social Links
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Resume File / URL</label>
            <input
              type="text"
              value={form.resumeUrl}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">GitHub URL</label>
            <input
              type="url"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* About Descriptions */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-accent" /> About Section Copy
        </h3>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Who I Am</label>
          <textarea
            rows={3}
            value={form.about?.whoIAm || ''}
            onChange={(e) =>
              setForm({
                ...form,
                about: { ...form.about, whoIAm: e.target.value },
              })
            }
            className="w-full rounded-lg border border-border bg-background p-3 text-xs text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">What I Do</label>
          <textarea
            rows={3}
            value={form.about?.whatIDo || ''}
            onChange={(e) =>
              setForm({
                ...form,
                about: { ...form.about, whatIDo: e.target.value },
              })
            }
            className="w-full rounded-lg border border-border bg-background p-3 text-xs text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}

