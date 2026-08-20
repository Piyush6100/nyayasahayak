import React from 'react';
import Link from 'next/link';
import { FolderOpen, ArrowRight, Edit3, Clock, CheckCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const previewCases = [
  { id: 'prev-1', title: 'RTI Application', subtitle: 'Municipal Corporation', status: 'Draft', statusColor: 'text-muted-foreground', statusBg: 'bg-muted', icon: Edit3 },
  { id: 'prev-2', title: 'Consumer Issue', subtitle: 'Electricity billing complaint', status: 'In Progress', statusColor: 'text-blue-700', statusBg: 'bg-blue-50', icon: Clock },
  { id: 'prev-3', title: 'Scheme Application', subtitle: 'Education support', status: 'Completed', statusColor: 'text-success', statusBg: 'bg-success/10', icon: CheckCircle },
];

export default function CaseTrackingPreview() {
  return (
    <section className="py-14 lg:py-20 bg-secondary/40" aria-labelledby="case-tracking-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 py-1 mb-4">
              <FolderOpen size={13} className="text-primary" />
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">Case Tracking</span>
            </div>
            <h2 id="case-tracking-heading" className="text-[1.75rem] lg:text-[2rem] font-bold text-foreground mb-3">
              Keep track of your requests.
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-md">
              Every RTI application, complaint, and document you create is saved as a case. Track progress, access documents, and pick up where you left off.
            </p>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all"
            >
              View My Cases
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Preview cards */}
          <div className="space-y-3">
            {previewCases?.map((c) => {
              const Icon = c?.icon;
              return (
                <div key={c?.id} className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-card transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <FolderOpen size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-foreground">{c?.title}</p>
                    <p className="text-[12px] text-muted-foreground">{c?.subtitle}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 ${c?.statusBg} ${c?.statusColor}`}>
                    <Icon size={10} />
                    {c?.status}
                  </span>
                </div>
              );
            })}
            <Link
              href="/cases"
              className="block text-center text-[13px] text-primary font-medium hover:underline pt-1"
            >
              View all cases →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
