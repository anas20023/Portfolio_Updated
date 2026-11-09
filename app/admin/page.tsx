'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Inbox,
  Clock,
  CheckCircle,
  FolderGit2,
  ArrowRight,
  Database,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface Stats {
  totalLeads: number;
  newLeads: number;
  inDiscussion: number;
  won: number;
  totalProjects: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    inDiscussion: 0,
    won: 0,
    totalProjects: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, projectsRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/projects'),
      ]);

      const leadsData = await leadsRes.json();
      const projectsData = await projectsRes.json();

      const leads = leadsData.leads || [];
      const projects = projectsData.projects || [];

      setRecentLeads(leads.slice(0, 5));
      setStats({
        totalLeads: leads.length,
        newLeads: leads.filter((l: any) => l.status === 'new').length,
        inDiscussion: leads.filter((l: any) => l.status === 'in_discussion').length,
        won: leads.filter((l: any) => l.status === 'won').length,
        totalProjects: projects.length,
      });
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      setSeedMessage(data.message || 'Seeded successfully');
      fetchData();
    } catch (err: any) {
      setSeedMessage('Failed to seed projects');
    } finally {
      setSeeding(false);
    }
  };

  const statCards = [
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      label: 'New Inquiries',
      value: stats.newLeads,
      icon: Inbox,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      label: 'In Discussion',
      value: stats.inDiscussion,
      icon: Clock,
      color: 'text-purple-500 bg-purple-500/10',
    },
    {
      label: 'Deals Won / Closed',
      value: stats.won,
      icon: CheckCircle,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      label: 'Portfolio Projects',
      value: stats.totalProjects,
      icon: FolderGit2,
      color: 'text-accent bg-accent/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Pipeline & Content Overview
          </h2>
          <p className="text-sm text-muted">
            Monitor client inquiries, CRM pipeline status, and portfolio content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-border bg-surface hover:bg-surface-raised transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          {stats.totalProjects === 0 && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity cursor-pointer"
            >
              {seeding ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Database className="h-3.5 w-3.5" />
              )}
              Seed Initial Site Data
            </button>
          )}
        </div>
      </div>

      {seedMessage && (
        <div className="p-3 text-xs rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium">
          {seedMessage}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl border border-border bg-surface p-5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">{card.label}</span>
                <span className={`p-2 rounded-lg ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries Section */}
      <div className="rounded-xl border border-border bg-surface shadow-xs">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-sm">Recent CRM Inquiries</h3>
            <p className="text-xs text-muted">Latest submissions from your contact form</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
          >
            View all in CRM <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-muted text-xs flex justify-center items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-accent" />
            Loading recent leads...
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="p-12 text-center text-muted text-xs">
            No inquiries received yet. Submissions from the contact form will appear here.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <div
                key={lead._id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-raised/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                    <span className="text-xs text-muted">({lead.email})</span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        lead.status === 'new'
                          ? 'bg-amber-500/10 text-amber-500'
                          : lead.status === 'won'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : lead.status === 'in_discussion'
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'bg-muted/20 text-muted'
                      }`}
                    >
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-foreground font-medium mt-1">{lead.subject}</p>
                  <p className="text-xs text-muted line-clamp-1 mt-0.5">{lead.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-muted">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href="/admin/leads"
                    className="text-xs text-accent hover:underline font-medium mt-1 inline-block"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

