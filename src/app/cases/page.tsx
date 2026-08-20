'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderOpen, Plus, ChevronRight, Clock, CheckCircle, AlertCircle, Edit3, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

type CaseStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Action Required' | 'Resolved' | 'Closed';

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  'Draft':          { label: 'Draft',          color: 'text-muted-foreground', bg: 'bg-muted text-muted-foreground',             icon: Edit3 },
  'Submitted':      { label: 'Submitted',       color: 'text-blue-700',         bg: 'bg-blue-50 text-blue-700',                   icon: Clock },
  'Under Review':   { label: 'Under Review',    color: 'text-warning',          bg: 'bg-warning/10 text-warning',                 icon: AlertCircle },
  'Action Required':{ label: 'Action Required', color: 'text-destructive',      bg: 'bg-destructive/10 text-destructive',         icon: AlertCircle },
  'Resolved':       { label: 'Resolved',        color: 'text-success',          bg: 'bg-success/10 text-success',                 icon: CheckCircle },
  'Closed':         { label: 'Closed',          color: 'text-muted-foreground', bg: 'bg-muted text-muted-foreground',             icon: CheckCircle },
};

const categoryColors: Record<string, string> = {
  RTI:        'bg-primary/8 text-primary',
  Consumer:   'bg-blue-50 text-blue-700',
  Tenancy:    'bg-accent/8 text-accent',
  Scheme:     'bg-success/8 text-success',
  Municipal:  'bg-purple-50 text-purple-700',
  Other:      'bg-muted text-muted-foreground',
};

interface Case {
  id: string;
  case_title: string;
  case_type: string;
  status: string;
  description?: string;
  next_action?: string;
  created_at: string;
  updated_at: string;
  documents: any[];
}

const getStatus = (status: string) => statusConfig[status] || statusConfig['Draft'];

export default function CasesPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  useEffect(() => {
    if (!user) return;

    const fetchCases = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setCases(data || []);
      } catch (err) {
        console.error('Error fetching cases:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [user]);

  const stats = {
    active:          cases.filter((c) => c.status === 'Submitted' || c.status === 'Under Review').length,
    draft:           cases.filter((c) => c.status === 'Draft').length,
    resolved:        cases.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length,
    needs_attention: cases.filter((c) => c.status === 'Action Required').length,
  };

  const filtered = activeTab === 'all' ? cases : cases.filter((c) => c.status === activeTab);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (new Date().toDateString() === d.toDateString()) return 'Today';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
                { label: 'Active',          value: stats.active,          color: 'text-blue-700',    bg: 'bg-blue-50' },
                { label: 'Draft',           value: stats.draft,           color: 'text-muted-foreground', bg: 'bg-muted' },
                { label: 'Resolved',        value: stats.resolved,        color: 'text-success',     bg: 'bg-success/10' },
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
          <div className="flex gap-1 mb-6 bg-muted/50 rounded-xl p-1 w-fit overflow-x-auto">
            {(['all', 'Draft', 'Submitted', 'Under Review', 'Action Required', 'Resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'all' ? 'All' : tab}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
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
                const status = getStatus(c.status);
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
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${categoryColors[c.case_type] || 'bg-muted text-muted-foreground'}`}>
                            {c.case_type}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                          {c.case_title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{c.description}</p>
                        {c.next_action && (
                          <p className="text-[12px] text-primary font-medium mt-2">
                            → {c.next_action}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="text-right">
                          <p className="text-[11px] text-muted-foreground">{formatDate(c.updated_at)}</p>
                          <p className="text-[11px] text-muted-foreground/60">{(c.documents || []).length} doc{(c.documents || []).length !== 1 ? 's' : ''}</p>
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
