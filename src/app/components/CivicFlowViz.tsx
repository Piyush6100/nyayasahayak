'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Brain, Database, CheckCircle2, Scale } from 'lucide-react';

const steps = [
  {
    id: 'step-problem',
    icon: FileText,
    badge: 'Step 1',
    label: 'Describe in Plain Words',
    sublabel: 'Tell us your issue without worrying about legal jargon',
    accentColor: 'text-amber-600 dark:text-amber-400',
    bgActive: 'bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 'step-ai',
    icon: Brain,
    badge: 'Step 2',
    label: 'AI Analyzes Legal Context',
    sublabel: 'Identifies applicable statutes, sections & civil remedies',
    accentColor: 'text-blue-600 dark:text-blue-400',
    bgActive: 'bg-blue-500/10 border-blue-500/30',
  },
  {
    id: 'step-sources',
    icon: Database,
    badge: 'Step 3',
    label: 'Cites Verified Indian Acts',
    sublabel: 'RTI Act 2005, Consumer Protection Act, BNS & Schemes',
    accentColor: 'text-indigo-600 dark:text-indigo-400',
    bgActive: 'bg-indigo-500/10 border-indigo-500/30',
  },
  {
    id: 'step-action',
    icon: CheckCircle2,
    badge: 'Step 4',
    label: 'Generates Ready Drafts',
    sublabel: 'Ready-to-file RTI letters, complaints & step-by-step guides',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/10 border-emerald-500/30',
  },
];

export default function CivicFlowViz() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg bg-card/85 backdrop-blur-xl border border-border/80 rounded-3xl p-6 lg:p-7 shadow-2xl shadow-primary/10">
      {/* Header bar */}
      <div className="flex items-center gap-2.5 pb-5 border-b border-border/70 mb-5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <Scale size={16} className="text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="text-[14px] font-bold text-foreground">Civic & Legal Flow</h3>
          <p className="text-[11px] text-muted-foreground">From problem to official resolution</p>
        </div>
      </div>

      {/* Step pipeline */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <div key={step.id} className="relative">
              <div
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer w-full flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? `${step.bgActive} shadow-md scale-[1.02]`
                    : isCompleted
                    ? 'bg-card/90 border-border/70 hover:bg-card'
                    : 'bg-card/40 border-border/40 opacity-70 hover:opacity-90'
                }`}
              >
                {/* Icon avatar */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? 'bg-card shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon size={18} className={isActive ? step.accentColor : ''} />
                </div>

                {/* Text info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
                      {step.badge}
                    </span>
                    <p className={`text-[13.5px] font-bold truncate ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                      {step.label}
                    </p>
                  </div>
                  <p className="text-[12px] text-muted-foreground line-clamp-1">
                    {step.sublabel}
                  </p>
                </div>

                {/* Status indicator */}
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 ml-1" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping flex-shrink-0 ml-1" />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}