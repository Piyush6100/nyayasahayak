'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Scale, Landmark, FileCheck, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const actions = [
  {
    id: 'action-rti',
    icon: FileText,
    title: 'RTI Assistant',
    description: 'Turn your question into a structured RTI application ready to submit.',
    cta: 'Start RTI',
    href: '/rti-assistant',
    accent: 'bg-primary/6 border-primary/15 hover:border-primary/30',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    ctaStyle: 'bg-primary text-primary-foreground hover:bg-primary/90',
  },
  {
    id: 'action-rights',
    icon: Scale,
    title: 'Civic & Legal Guidance',
    description: 'Understand possible options for everyday civic and legal issues in simple language.',
    cta: 'Explore',
    href: '/ai-assistant',
    accent: 'bg-blue-50/60 border-blue-200/60 hover:border-blue-300',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    ctaStyle: 'bg-blue-700 text-white hover:bg-blue-800',
  },
  {
    id: 'action-schemes',
    icon: Landmark,
    title: 'Scheme Eligibility',
    description: 'Explore schemes that may match your profile and situation.',
    cta: 'Check eligibility',
    href: '/schemes',
    accent: 'bg-success/5 border-success/15 hover:border-success/30',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    ctaStyle: 'bg-success text-white hover:bg-success/90',
  },
  {
    id: 'action-document',
    icon: FileCheck,
    title: 'Document Generator',
    description: 'Create structured civic applications, complaints, and legal notices.',
    cta: 'Create document',
    href: '/rti-assistant',
    accent: 'bg-accent/5 border-accent/15 hover:border-accent/30',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    ctaStyle: 'bg-accent text-white hover:bg-accent/90',
  },
];

export default function QuickActionsSection() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="quick-actions-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="mb-10">
          <h2 id="quick-actions-heading" className="text-[1.75rem] lg:text-[2rem] font-bold text-foreground mb-3">
            What can we help you with?
          </h2>
          <p className="text-[15px] text-muted-foreground">
            Choose a starting point or describe your situation to the AI assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {actions?.map((action) => {
            const Icon = action?.icon;
            return (
              <div
                key={action?.id}
                className={`group flex flex-col gap-5 p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${action?.accent}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${action?.iconBg}`}>
                  <Icon size={22} className={action?.iconColor} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold text-foreground mb-2">{action?.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{action?.description}</p>
                </div>
                <Link
                  href={action?.href}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 active:scale-95 self-start ${action?.ctaStyle}`}
                >
                  {action?.cta}
                  <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}