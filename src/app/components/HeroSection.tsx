'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, FileText, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import CivicFlowViz from './CivicFlowViz';

export default function HeroSection() {
  return (
    <section className="hero-gradient pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3.5 py-1.5 mb-6 shadow-sm">
              <Scale size={14} className="text-accent" />
              <span className="text-[12px] font-semibold text-accent tracking-wider uppercase">AI-Powered Legal & Civic Assistance</span>
            </div>

            <h1
              id="hero-heading"
              className="text-[2.8rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] tracking-tight mb-5"
            >
              Legal and civic help,{' '}
              <span className="text-primary inline-flex items-center gap-2.5">
                <span>made simple.</span>
                <Scale className="inline-block text-primary w-8 h-8 lg:w-9 lg:h-9 align-middle opacity-90" aria-label="Lawyer Symbol" />
              </span>
            </h1>

            <p className="text-[17px] text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Describe your problem in your own words. NyayaSahayak helps you understand your options, find relevant information, and take the next step.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-md"
              >
                <MessageSquare size={17} />
                <span>Ask AI Assistant</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/rti-assistant"
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground hover:border-primary/40 hover:text-primary px-5 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-150 shadow-sm active:scale-95"
              >
                <FileText size={17} />
                <span>Prepare RTI Application</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 flex-wrap pt-4 border-t border-border/60">
              {[
                { value: '12+', label: 'Indian languages' },
                { value: 'RTI', label: 'Application builder' },
                { value: '100%', label: 'Source-backed' },
              ].map((stat) => (
                <div key={`hero-stat-${stat.label}`} className="flex items-center gap-2">
                  <span className="text-[18px] font-bold text-primary">{stat.value}</span>
                  <span className="text-[13px] text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="hidden lg:flex items-center justify-center">
            <CivicFlowViz />
          </div>
        </div>
      </div>
    </section>
  );
}