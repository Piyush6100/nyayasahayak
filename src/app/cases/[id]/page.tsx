'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Edit3, FileText, Download, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { demoCases, type CaseStatus } from '@/data/demoCases';

const statusConfig: Record<CaseStatus, { label: string; bg: string; icon: React.ElementType }> = {
  draft: { label: 'Draft', bg: 'bg-muted text-muted-foreground', icon: Edit3 },
  in_progress: { label: 'In Progress', bg: 'bg-blue-50 text-blue-700', icon: Clock },
  review: { label: 'Review', bg: 'bg-warning/10 text-warning', icon: AlertCircle },
  completed: { label: 'Completed', bg: 'bg-success/10 text-success', icon: CheckCircle },
  needs_attention: { label: 'Needs Attention', bg: 'bg-destructive/10 text-destructive', icon: AlertCircle },
};

const docStatusConfig = {
  draft: { label: 'Draft', color: 'text-muted-foreground' },
  ready: { label: 'Ready', color: 'text-success' },
  submitted: { label: 'Submitted', color: 'text-primary' },
};

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params?.id as string;
  const caseData = demoCases.find((c) => c.id === caseId);

  if (!caseData) {
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

  const status = statusConfig[caseData.status];
  const StatusIcon = status.icon;
  const completedSteps = caseData.timeline.filter((t) => t.completed).length;
  const progress = Math.round((completedSteps / caseData.timeline.length) * 100);

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
                    {caseData.category}
                  </span>
                </div>
                <h1 className="text-[1.75rem] font-bold text-foreground mb-2">{caseData.title}</h1>
                <p className="text-[14px] text-muted-foreground">Created {caseData.createdAt} · Updated {caseData.updatedAt}</p>
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
            {/* Left: Summary + Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-foreground mb-3">Summary</h2>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{caseData.summary}</p>
                {caseData.nextStep && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-xl">
                    <p className="text-[12px] font-semibold text-primary uppercase tracking-wide mb-1">Next Step</p>
                    <p className="text-[13px] text-foreground">{caseData.nextStep}</p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[15px] font-semibold text-foreground">Progress</h2>
                  <span className="text-[13px] text-muted-foreground">{completedSteps}/{caseData.timeline.length} steps</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-6">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                {/* Timeline events */}
                <div className="space-y-0">
                  {caseData.timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.completed ? 'bg-success text-white' : 'bg-muted border-2 border-border'
                        }`}>
                          {event.completed ? (
                            <CheckCircle size={14} />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-border" />
                          )}
                        </div>
                        {index < caseData.timeline.length - 1 && (
                          <div className={`w-px flex-1 my-1 ${event.completed ? 'bg-success/30' : 'bg-border'}`} />
                        )}
                      </div>
                      <div className={`pb-5 ${index === caseData.timeline.length - 1 ? 'pb-0' : ''}`}>
                        <p className={`text-[14px] font-semibold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {event.label}
                        </p>
                        <p className="text-[12px] text-muted-foreground mt-0.5">{event.description}</p>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Documents */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-foreground mb-4">Documents</h2>
                {caseData.documents.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground">No documents yet.</p>
                ) : (
                  <div className="space-y-3">
                    {caseData.documents.map((doc) => {
                      const docStatus = docStatusConfig[doc.status];
                      return (
                        <div key={doc.id} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText size={14} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-foreground leading-snug">{doc.title}</p>
                            <p className="text-[11px] text-muted-foreground">{doc.type}</p>
                            <p className={`text-[11px] font-medium mt-0.5 ${docStatus.color}`}>{docStatus.label}</p>
                          </div>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            aria-label={`Download ${doc.title}`}
                          >
                            <Download size={13} />
                          </button>
                        </div>
                      );
                    })}
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
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-[13px] text-foreground text-left">
                    <span className="text-muted-foreground">→</span> Share case
                  </button>
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
