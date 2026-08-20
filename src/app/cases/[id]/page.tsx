'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Edit3, FileText, ChevronRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

const statusConfig: Record<string, { label: string; bg: string; icon: React.ElementType }> = {
  'Draft':          { label: 'Draft',          bg: 'bg-muted text-muted-foreground',         icon: Edit3 },
  'Submitted':      { label: 'Submitted',       bg: 'bg-blue-50 text-blue-700',               icon: Clock },
  'Under Review':   { label: 'Under Review',    bg: 'bg-warning/10 text-warning',             icon: AlertCircle },
  'Action Required':{ label: 'Action Required', bg: 'bg-destructive/10 text-destructive',     icon: AlertCircle },
  'Resolved':       { label: 'Resolved',        bg: 'bg-success/10 text-success',             icon: CheckCircle },
  'Closed':         { label: 'Closed',          bg: 'bg-muted text-muted-foreground',         icon: CheckCircle },
};

interface CaseData {
  id: string;
  case_title: string;
  case_type: string;
  status: string;
  description?: string;
  next_action?: string;
  department?: string;
  tracking_number?: string;
  filing_date?: string;
  created_at: string;
  updated_at: string;
  documents: { title: string; type: string; status: string }[];
  metadata: any;
}

const getStatus = (status: string) => statusConfig[status] || statusConfig['Draft'];

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params?.id as string;
  const { user } = useAuth();

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user || !caseId) return;

    const fetchCase = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('id', caseId)
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setCaseData(data as CaseData);
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, [user, caseId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center pb-20 md:pb-0">
          <Loader2 size={32} className="animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !caseData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center pb-20 md:pb-0">
          <div className="text-center">
            <p className="text-[16px] font-semibold text-foreground mb-2">Case not found</p>
            <Link href="/cases" className="text-primary hover:underline text-[14px]">Back to My Cases</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const status = getStatus(caseData.status);
  const StatusIcon = status.icon;
  const documents: { title: string; type: string; status: string }[] = Array.isArray(caseData.documents) ? caseData.documents : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 md:pb-0" id="main-content">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
            <Link href="/cases" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-5">
              <ArrowLeft size={14} />
              My Cases
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.bg}`}>
                    <StatusIcon size={11} />
                    {status.label}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted text-muted-foreground">
                    {caseData.case_type}
                  </span>
                  {caseData.tracking_number && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-primary/8 text-primary">
                      #{caseData.tracking_number}
                    </span>
                  )}
                </div>
                <h1 className="text-[1.75rem] font-bold text-foreground mb-2">{caseData.case_title}</h1>
                <p className="text-[14px] text-muted-foreground">
                  Filed {formatDate(caseData.filing_date || caseData.created_at)} · Updated {formatDate(caseData.updated_at)}
                </p>
              </div>
              <Link
                href="/ai-assistant"
                className="flex-shrink-0 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-primary/90 transition-all"
              >
                Continue
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-foreground mb-3">Summary</h2>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {caseData.description || 'No description provided for this case.'}
                </p>
                {caseData.next_action && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-xl">
                    <p className="text-[12px] font-semibold text-primary uppercase tracking-wide mb-1">Next Step</p>
                    <p className="text-[13px] text-foreground">{caseData.next_action}</p>
                  </div>
                )}
              </div>

              {/* Details card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-foreground mb-4">Case Details</h2>
                <dl className="space-y-3">
                  {[
                    { label: 'Department', value: caseData.department },
                    { label: 'Case Type', value: caseData.case_type },
                    { label: 'Status', value: caseData.status },
                    { label: 'Filing Date', value: formatDate(caseData.filing_date) },
                  ].map(({ label, value }) =>
                    value ? (
                      <div key={label} className="flex items-start justify-between gap-4">
                        <dt className="text-[13px] text-muted-foreground">{label}</dt>
                        <dd className="text-[13px] font-medium text-foreground text-right">{value}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </div>
            </div>

            {/* Right: Documents + Quick Actions */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-foreground mb-4">Documents</h2>
                {documents.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground">No documents attached yet.</p>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText size={14} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-foreground leading-snug">{doc.title}</p>
                          <p className="text-[11px] text-muted-foreground">{doc.type}</p>
                          <p className="text-[11px] font-medium mt-0.5 text-success capitalize">{doc.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  href="/rti-assistant"
                  className="mt-4 w-full flex items-center justify-center gap-2 border border-border text-[13px] font-medium text-foreground py-2.5 rounded-xl hover:bg-muted transition-colors"
                >
                  <FileText size={14} />
                  Create Document
                </Link>
              </div>

              {/* Quick actions */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link href="/ai-assistant" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-[13px] text-foreground">
                    <span className="text-primary">→</span> Continue with AI Assistant
                  </Link>
                  <Link href="/rti-assistant" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-[13px] text-foreground">
                    <span className="text-primary">→</span> Open RTI Wizard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
