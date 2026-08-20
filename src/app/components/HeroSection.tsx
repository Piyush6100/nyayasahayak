'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, ArrowRight, FileText, MessageSquare, ShieldCheck, Sparkles, Award } from 'lucide-react';
import CivicFlowViz from './CivicFlowViz';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-28 overflow-hidden bg-background" aria-labelledby="hero-heading">
      {/* Background Law Library Image with Scales & Gavel */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/images/hero_law_bg.jpg"
          alt="Legal law library background with Scales of Justice, Gavel, and Law Report books"
          fill
          priority
          unoptimized={true}
          className="object-cover object-right-top lg:object-center opacity-30 lg:opacity-40"
        />

        {/* Ambient atmospheric legal lighting gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Legal badge */}
            <div className="inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/25 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Scale size={15} className="text-amber-600 dark:text-amber-400" />
              <span className="text-[12px] font-semibold text-amber-700 dark:text-amber-300 tracking-wider uppercase">
                AI-Powered Legal & Civic Assistance
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-[2.8rem] lg:text-[3.6rem] font-extrabold text-foreground leading-[1.1] tracking-tight mb-5 drop-shadow-sm"
            >
              Legal and civic help,{' '}
              <span className="text-primary inline-flex items-center gap-2.5">
                <span>made simple.</span>
                <Scale className="inline-block text-amber-600 dark:text-amber-400 w-8 h-8 lg:w-10 lg:h-10 align-middle" aria-label="Scales of Justice" />
              </span>
            </h1>

            <p className="text-[17px] text-muted-foreground leading-relaxed mb-8 max-w-lg font-normal">
              Describe your problem in plain words. NyayaSahayak helps you understand your constitutional and legal rights, explore government schemes, prepare RTI drafts, and take the next step with confidence.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3.5 rounded-xl text-[15px] font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all duration-150"
              >
                <MessageSquare size={17} />
                <span>Ask AI Assistant</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/rti-assistant"
                className="inline-flex items-center gap-2 bg-card/85 hover:bg-card border border-border hover:border-amber-500/40 text-foreground hover:text-amber-700 dark:hover:text-amber-400 px-5 py-3.5 rounded-xl text-[15px] font-medium backdrop-blur-md shadow-sm active:scale-95 transition-all duration-150"
              >
                <FileText size={17} />
                <span>Prepare RTI Application</span>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border/70 max-w-md">
              <div className="bg-card/70 border border-border/80 rounded-xl p-3 backdrop-blur-md shadow-sm">
                <span className="block text-[19px] font-bold text-primary">12+</span>
                <span className="text-[12px] text-muted-foreground font-medium">Indian Languages</span>
              </div>
              <div className="bg-card/70 border border-border/80 rounded-xl p-3 backdrop-blur-md shadow-sm">
                <span className="block text-[19px] font-bold text-amber-600 dark:text-amber-400">RTI</span>
                <span className="text-[12px] text-muted-foreground font-medium">Application Builder</span>
              </div>
              <div className="bg-card/70 border border-border/80 rounded-xl p-3 backdrop-blur-md shadow-sm">
                <span className="block text-[19px] font-bold text-success">100%</span>
                <span className="text-[12px] text-muted-foreground font-medium">Source-Backed</span>
              </div>
            </div>
          </div>

          {/* Right: Flow Visualization */}
          <div className="hidden lg:flex items-center justify-center">
            <CivicFlowViz />
          </div>
        </div>
      </div>
    </section>
  );
}