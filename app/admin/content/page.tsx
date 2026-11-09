'use client';

import { useEffect, useState } from 'react';
import {
  Layers,
  Sparkles,
  GraduationCap,
  Users2,
  Code2,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
} from 'lucide-react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'services' | 'education' | 'leadership' | 'cp'>('skills');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [content, setContent] = useState<any>({
    skills: [],
    services: [],
    education: [],
    leadership: [],
    competitiveProgramming: { platform: 'Codeforces', solved: '0', achievements: [] },
  });

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (data.content) {
        setContent(data.content);
      }
    } catch (err) {
      console.error('Failed to load site content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSaveSection = async (sectionKey: string, sectionData: any) => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: sectionKey, data: sectionData }),
      });
      if (!res.ok) throw new Error('Failed to update content');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error saving section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 flex justify-center items-center gap-2 text-muted text-xs">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
        Loading content...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Site Content &amp; Skills CMS
          </h2>
          <p className="text-sm text-muted">
            Manage your skills categories, offered services, work history, leadership, and competitive programming stats.
          </p>
        </div>

        {savedSuccess && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            <CheckCircle className="h-4 w-4" /> Changes Saved Live!
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {[
          { key: 'skills', label: 'Skills Showcase', icon: Layers },
          { key: 'services', label: 'Services', icon: Sparkles },
          { key: 'education', label: 'Education & Career', icon: GraduationCap },
          { key: 'leadership', label: 'Leadership', icon: Users2 },
          { key: 'cp', label: 'Competitive Programming', icon: Code2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                  : 'text-muted hover:text-foreground hover:bg-surface-raised'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. SKILLS TAB */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Skill Categories</h3>
            <button
              onClick={() => {
                const next = [...content.skills, { category: 'New Category', icon: 'Code', items: ['Tech 1'] }];
                setContent({ ...content, skills: next });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium hover:bg-surface-raised cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add Category
            </button>
          </div>

          <div className="space-y-3">
            {content.skills.map((group: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-border bg-surface p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={group.category}
                    onChange={(e) => {
                      const next = [...content.skills];
                      next[idx].category = e.target.value;
                      setContent({ ...content, skills: next });
                    }}
                    placeholder="Category (e.g. Frontend)"
                    className="font-bold text-xs rounded-lg border border-border bg-background px-3 py-1.5 text-foreground focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={group.icon}
                    onChange={(e) => {
                      const next = [...content.skills];
                      next[idx].icon = e.target.value;
                      setContent({ ...content, skills: next });
                    }}
                    placeholder="Icon name"
                    className="w-28 text-xs rounded-lg border border-border bg-background px-3 py-1.5 text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const next = content.skills.filter((_: any, i: number) => i !== idx);
                      setContent({ ...content, skills: next });
                    }}
                    className="ml-auto text-muted hover:text-rose-500 p-1"
                    title="Delete Category"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1">
                    Technologies / Items (comma separated)
                  </label>
                  <input
                    type="text"
                    value={group.items?.join(', ') || ''}
                    onChange={(e) => {
                      const next = [...content.skills];
                      next[idx].items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      setContent({ ...content, skills: next });
                    }}
                    className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleSaveSection('skills', content.skills)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" /> Save Skills
          </button>
        </div>
      )}

      {/* 2. SERVICES TAB */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Services Offered</h3>
            <button
              onClick={() => {
                const next = [...content.services, { title: 'New Service', description: '', icon: 'Rocket' }];
                setContent({ ...content, services: next });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium hover:bg-surface-raised cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add Service
            </button>
          </div>

          <div className="space-y-3">
            {content.services.map((srv: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-border bg-surface p-4 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={srv.title}
                    onChange={(e) => {
                      const next = [...content.services];
                      next[idx].title = e.target.value;
                      setContent({ ...content, services: next });
                    }}
                    placeholder="Service Title"
                    className="flex-1 font-bold text-xs rounded-lg border border-border bg-background px-3 py-1.5 text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const next = content.services.filter((_: any, i: number) => i !== idx);
                      setContent({ ...content, services: next });
                    }}
                    className="text-muted hover:text-rose-500 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={srv.description}
                  onChange={(e) => {
                    const next = [...content.services];
                    next[idx].description = e.target.value;
                    setContent({ ...content, services: next });
                  }}
                  placeholder="Service Description"
                  className="w-full text-xs rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-accent focus:outline-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleSaveSection('services', content.services)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" /> Save Services
          </button>
        </div>
      )}

      {/* 3. EDUCATION & CAREER TAB */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Education &amp; Experience History</h3>
            <button
              onClick={() => {
                const next = [
                  { institution: 'Institution Name', degree: 'Role / Degree', duration: '2024 - Present', cgpa: '', highlights: [] },
                  ...content.education,
                ];
                setContent({ ...content, education: next });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium hover:bg-surface-raised cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add Entry
            </button>
          </div>

          <div className="space-y-3">
            {content.education.map((item: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-border bg-surface p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-accent">Entry #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const next = content.education.filter((_: any, i: number) => i !== idx);
                      setContent({ ...content, education: next });
                    }}
                    className="text-muted hover:text-rose-500 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => {
                      const next = [...content.education];
                      next[idx].institution = e.target.value;
                      setContent({ ...content, education: next });
                    }}
                    placeholder="Institution / Company"
                    className="text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => {
                      const next = [...content.education];
                      next[idx].degree = e.target.value;
                      setContent({ ...content, education: next });
                    }}
                    placeholder="Degree / Job Title"
                    className="text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => {
                      const next = [...content.education];
                      next[idx].duration = e.target.value;
                      setContent({ ...content, education: next });
                    }}
                    placeholder="Duration (e.g. 2023 - 2027)"
                    className="text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.cgpa || ''}
                    onChange={(e) => {
                      const next = [...content.education];
                      next[idx].cgpa = e.target.value;
                      setContent({ ...content, education: next });
                    }}
                    placeholder="CGPA / Grade (optional)"
                    className="text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1">
                    Highlights / Responsibilities (comma separated)
                  </label>
                  <input
                    type="text"
                    value={item.highlights?.join(', ') || ''}
                    onChange={(e) => {
                      const next = [...content.education];
                      next[idx].highlights = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      setContent({ ...content, education: next });
                    }}
                    className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleSaveSection('education', content.education)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" /> Save Education &amp; Career
          </button>
        </div>
      )}

      {/* 4. LEADERSHIP TAB */}
      {activeTab === 'leadership' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Leadership &amp; Activities</h3>
            <button
              onClick={() => {
                const next = [
                  ...content.leadership,
                  { title: 'Organization', role: 'Role', description: 'Description...' },
                ];
                setContent({ ...content, leadership: next });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium hover:bg-surface-raised cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add Leadership Role
            </button>
          </div>

          <div className="space-y-3">
            {content.leadership.map((item: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-border bg-surface p-4 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const next = [...content.leadership];
                      next[idx].title = e.target.value;
                      setContent({ ...content, leadership: next });
                    }}
                    placeholder="Organization / Event"
                    className="font-bold text-xs rounded-lg border border-border bg-background px-3 py-1.5 text-foreground focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => {
                      const next = [...content.leadership];
                      next[idx].role = e.target.value;
                      setContent({ ...content, leadership: next });
                    }}
                    placeholder="Role"
                    className="text-xs rounded-lg border border-border bg-background px-3 py-1.5 text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const next = content.leadership.filter((_: any, i: number) => i !== idx);
                      setContent({ ...content, leadership: next });
                    }}
                    className="text-muted hover:text-rose-500 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => {
                    const next = [...content.leadership];
                    next[idx].description = e.target.value;
                    setContent({ ...content, leadership: next });
                  }}
                  placeholder="Responsibilities & impact"
                  className="w-full text-xs rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-accent focus:outline-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleSaveSection('leadership', content.leadership)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" /> Save Leadership
          </button>
        </div>
      )}

      {/* 5. COMPETITIVE PROGRAMMING TAB */}
      {activeTab === 'cp' && (
        <div className="space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-foreground">Competitive Programming Achievements</h3>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Primary Platform
                </label>
                <input
                  type="text"
                  value={content.competitiveProgramming?.platform || 'Codeforces'}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      competitiveProgramming: {
                        ...content.competitiveProgramming,
                        platform: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Problems Solved Badge
                </label>
                <input
                  type="text"
                  value={content.competitiveProgramming?.solved || '820+'}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      competitiveProgramming: {
                        ...content.competitiveProgramming,
                        solved: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Achievements &amp; Contest Rankings (comma separated)
              </label>
              <textarea
                rows={4}
                value={content.competitiveProgramming?.achievements?.join('\n') || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    competitiveProgramming: {
                      ...content.competitiveProgramming,
                      achievements: e.target.value.split('\n').filter(Boolean),
                    },
                  })
                }
                placeholder="One achievement per line..."
                className="w-full text-xs rounded-lg border border-border bg-background p-3 text-foreground focus:border-accent focus:outline-none"
              />
              <span className="text-[11px] text-muted">Enter one achievement per line.</span>
            </div>
          </div>

          <button
            onClick={() =>
              handleSaveSection('competitiveProgramming', content.competitiveProgramming)
            }
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" /> Save CP Stats
          </button>
        </div>
      )}
    </div>
  );
}

