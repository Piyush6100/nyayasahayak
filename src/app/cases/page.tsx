'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FolderOpen, Plus, ChevronRight, Clock, CheckCircle, AlertCircle, Edit3 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { demoCases, type Case, type CaseStatus } from '@/data/demoCases';

const statusConfig: Record<CaseStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  draft: { label: 'Draft', color: 'text-muted-foreground', bg: 'bg-muted text-muted-foreground', icon: Edit3 },
  in_progress: { label: 'In Progress', color: 'text-blue-700', bg: 'bg-blue-50 text-blue-700', icon: Clock },
  review: { label: 'Review', color: 'text-warning', bg: 'bg-warning/10 text-warning', icon: AlertCircle },
  completed: { label: 'Completed', color: 'text-success', bg: 'bg-success/10 text-success', icon: CheckCircle },
  needs_attention: { label: 'Needs Attention', color: 'text-destructive', bg: 'bg-destructive/10 text-destructive', icon: AlertCircle },
};

const categoryColors: Record<string, string> = {
  RTI: 'bg-primary/8 text-primary',
  Consumer: 'bg-blue-50 text-blue-700',
  Tenant: 'bg-accent/8 text-accent',
  Schemes: 'bg-success/8 text-success',
  Civic: 'bg-purple-50 text-purple-700',
  Documents: 'bg-muted text-muted-foreground',
  Rights: 'bg-warning/8 text-warning',
};

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState<'all' | CaseStatus>('all');

  const stats = {
    active: demoCases.filter((c) => c.status === 'in_progress').length,
    draft: demoCases.filter((c) => c.status === 'draft').length,
    completed: demoCases.filter((c) => c.status === 'completed').length,
    needs_attention: demoCases.filter((c) => c.status === 'needs_attention').length,
  };

  const filtered = activeTab === 'all' ? demoCases : demoCases.filter((c) => c.status === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 md:pb-0" id="main-content">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 py-1 mb-4">
                  <FolderOpen size={13} className="text-primary" />
                  <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">My Cases</span>
                </div>
                <h1 className="text-[2rem] lg:text-[2.25rem] font-bold text-foreground mb-2">My Cases</h1>
                <p className="text-[15px] text-muted-foreground">Track your RTI applications, complaints, and civic requests.</p>
              </div>
              <Link
                href="/ai-assistant"
                className="flex-shrink-0 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Case</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Active', value: stats.active, color: 'text-blue-700', bg: 'bg-blue-50' },
                { label: 'Draft', value: stats.draft, color: 'text-muted-foreground', bg: 'bg-muted' },
                { label: 'Completed', value: stats.completed, color: 'text-success', bg: 'bg-success/10' },
                { label: 'Needs Attention', value: stats.needs_attention, color: 'text-destructive', bg: 'bg-destructive/10' },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.bg} rounded-2xl px-5 py-4`}>
                  <p className={`text-[2rem] font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[13px] text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-muted/50 rounded-xl p-1 w-fit">
            {(['all', 'draft', 'in_progress', 'needs_attention', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'in_progress' ? 'In Progress' : tab === 'needs_attention' ? 'Attention' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Cases */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen size={48} className="text-muted-foreground/25 mx-auto mb-4" />
              <p className="text-[16px] font-semibold text-foreground mb-2">No cases yet</p>
              <p className="text-[14px] text-muted-foreground mb-6 max-w-sm mx-auto">
                Start an RTI request or ask for civic assistance and your cases will appear here.
              </p>
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 transition-all"
              >
                Get Help
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((c) => {
                const status = statusConfig[c.status];
                const StatusIcon = status.icon;
                return (
                  <Link
                    key={c.id}
                    href={`/cases/${c.id}`}
                    className="block bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.bg}`}>
                            <StatusIcon size={11} />
                            {status.label}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${categoryColors[c.category] || 'bg-muted text-muted-foreground'}`}>
                            {c.category}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{c.summary}</p>
                        {c.nextStep && (
                          <p className="text-[12px] text-primary font-medium mt-2">
                            → {c.nextStep}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="text-right">
                          <p className="text-[11px] text-muted-foreground">{c.updatedAt}</p>
                          <p className="text-[11px] text-muted-foreground/60">{c.documents.length} doc{c.documents.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
