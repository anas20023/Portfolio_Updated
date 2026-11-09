'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Mail,
  Trash2,
  Plus,
  MessageSquare,
  Clock,
  Loader2,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Note {
  text: string;
  createdAt: string;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'in_discussion' | 'won' | 'archived';
  priority: 'low' | 'normal' | 'high';
  notes: Note[];
  createdAt: string;
}

const statusOptions = [
  { value: 'all', label: 'All Inquiries' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_discussion', label: 'In Discussion' },
  { value: 'won', label: 'Won / Closed' },
  { value: 'archived', label: 'Archived' },
];

export default function LeadsCrmPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState<{ [leadId: string]: string }>({});
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: status as any } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdatePriority = async (id: string, priority: string) => {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, priority }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, priority: priority as any } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update priority:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleAddNote = async (id: string) => {
    const note = newNoteText[id]?.trim();
    if (!note) return;

    setUpdating(id);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, note }),
      });
      const data = await res.json();
      if (res.ok && data.lead) {
        setLeads((prev) => prev.map((l) => (l._id === id ? data.lead : l)));
        setNewNoteText((prev) => ({ ...prev, [id]: '' }));
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          CRM & Inquiries Pipeline
        </h2>
        <p className="text-sm text-muted">
          Manage inbound client messages, update deal stages, and track communication notes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface border border-border">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedStatus(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === opt.value
                  ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {opt.label}
              {opt.value !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-75">
                  ({leads.filter((l) => l.status === opt.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface py-2 pl-9 pr-3 text-xs text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="p-16 flex justify-center items-center gap-2 text-muted text-xs">
          <Loader2 className="h-5 w-5 animate-spin text-accent" />
          Loading pipeline...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center text-xs text-muted">
          No leads matching your current filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const isExpanded = expandedLeadId === lead._id;
            return (
              <div
                key={lead._id}
                className="rounded-xl border border-border bg-surface shadow-xs transition-all overflow-hidden"
              >
                {/* Main Lead Row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-foreground text-sm">{lead.name}</span>
                      <a
                        href={`mailto:${lead.email}?subject=Re: ${encodeURIComponent(
                          lead.subject
                        )}`}
                        className="text-xs text-accent hover:underline flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </a>
                      <span className="text-[11px] text-muted flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-foreground">{lead.subject}</p>
                    <p className="text-xs text-muted line-clamp-2">{lead.message}</p>
                  </div>

                  {/* Actions & Status Controls */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Status Dropdown */}
                    <select
                      value={lead.status}
                      disabled={updating === lead._id}
                      onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                      className={`text-xs font-semibold rounded-lg border px-2.5 py-1.5 focus:outline-none ${
                        lead.status === 'new'
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-500'
                          : lead.status === 'won'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                          : lead.status === 'in_discussion'
                          ? 'border-purple-500/30 bg-purple-500/10 text-purple-500'
                          : 'border-border bg-surface-raised text-muted'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_discussion">In Discussion</option>
                      <option value="won">Won / Closed</option>
                      <option value="archived">Archived</option>
                    </select>

                    {/* Priority Selector */}
                    <select
                      value={lead.priority}
                      disabled={updating === lead._id}
                      onChange={(e) => handleUpdatePriority(lead._id, e.target.value)}
                      className="text-xs rounded-lg border border-border bg-surface-raised px-2 py-1.5 text-foreground focus:outline-none"
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal</option>
                      <option value="high">High Priority</option>
                    </select>

                    {/* Toggle Details / Notes */}
                    <button
                      onClick={() => setExpandedLeadId(isExpanded ? null : lead._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-surface-raised transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-accent" />
                      <span>Notes ({lead.notes?.length || 0})</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3 ml-0.5" />
                      ) : (
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteLead(lead._id)}
                      title="Delete Lead"
                      className="p-2 text-muted hover:text-rose-500 rounded-lg hover:bg-surface-raised transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details & CRM Notes */}
                {isExpanded && (
                  <div className="border-t border-border bg-surface-raised/30 p-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                        Full Inbound Message
                      </h4>
                      <div className="p-3 rounded-lg bg-surface border border-border text-xs text-foreground whitespace-pre-wrap">
                        {lead.message}
                      </div>
                    </div>

                    {/* Notes List */}
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                        Internal CRM Notes & History
                      </h4>
                      {lead.notes && lead.notes.length > 0 ? (
                        <div className="space-y-2 mb-3">
                          {lead.notes.map((note, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-surface border border-border text-xs"
                            >
                              <p className="text-foreground">{note.text}</p>
                              <span className="text-[10px] text-muted mt-1 block">
                                {new Date(note.createdAt).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted mb-3 italic">
                          No internal notes recorded yet.
                        </p>
                      )}

                      {/* Add Note Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add private note (e.g., 'Sent portfolio proposal over email')..."
                          value={newNoteText[lead._id] || ''}
                          onChange={(e) =>
                            setNewNoteText({ ...newNoteText, [lead._id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddNote(lead._id);
                          }}
                          className="flex-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none"
                        />
                        <button
                          onClick={() => handleAddNote(lead._id)}
                          disabled={!newNoteText[lead._id]?.trim() || updating === lead._id}
                          className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

