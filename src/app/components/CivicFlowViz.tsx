'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Brain, Database, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const steps = [
  { id: 'step-problem', icon: FileText, label: 'Your Problem', sublabel: 'In your own words', color: 'bg-muted border-border text-foreground' },
  { id: 'step-ai', icon: Brain, label: 'AI Understands', sublabel: 'Context & intent', color: 'bg-primary/8 border-primary/20 text-primary' },
  { id: 'step-sources', icon: Database, label: 'Verified Sources', sublabel: 'Official documents', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'step-options', icon: Lightbulb, label: 'Your Options', sublabel: 'Clear & actionable', color: 'bg-warning/8 border-warning/20 text-warning' },
  { id: 'step-action', icon: CheckCircle, label: 'Next Step', sublabel: 'Document & action', color: 'bg-success/8 border-success/20 text-success' },
];

export default function CivicFlowViz() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps?.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm" aria-hidden="true">
      <div className="flex flex-col items-center gap-3">
        {steps?.map((step, index) => {
          const Icon = step?.icon;
          const isActive = index === activeStep;
          const isPast = index < activeStep;
          return (
            <React.Fragment key={step?.id}>
              <div
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-500 ${
                  isActive
                    ? `${step?.color} shadow-card-hover scale-105`
                    : isPast
                    ? 'bg-success/5 border-success/15 opacity-60' :'bg-card border-border opacity-40'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isActive ? 'bg-white/80' : 'bg-muted'}`}>
                  <Icon size={18} className={isActive ? '' : 'text-muted-foreground'} />
                </div>
                <div>
                  <p className={`text-[14px] font-semibold ${isActive ? '' : 'text-foreground/60'}`}>{step?.label}</p>
                  <p className={`text-[12px] ${isActive ? 'opacity-80' : 'text-muted-foreground'}`}>{step?.sublabel}</p>
                </div>
                {isPast && <CheckCircle size={16} className="ml-auto text-success" />}
              </div>
              {index < steps?.length - 1 && (
                <div className={`transition-colors duration-500 ${index < activeStep ? 'text-success' : 'text-border'}`}>
                  <ArrowRight size={16} className="rotate-90" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Floating source indicators */}
      <div className="absolute -right-8 top-1/3 flex flex-col gap-2 opacity-60">
        {['RTI Act', 'IPC §420', 'MTA 2021']?.map((src) => (
          <div key={`float-src-${src}`} className="bg-card border border-border rounded-lg px-2 py-1 text-[10px] text-muted-foreground shadow-sm">
            {src}
          </div>
        ))}
      </div>
    </div>
  );
}