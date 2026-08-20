import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="pt-8 pb-16 lg:pt-10 lg:pb-24" aria-labelledby="final-cta-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="final-cta-heading" className="text-[2rem] lg:text-[2.5rem] font-bold text-foreground mb-4 leading-tight">
            Your problem doesn&apos;t need legal jargon.
          </h2>
          <p className="text-[16px] text-muted-foreground leading-relaxed mb-10">
            Start with what happened. We&apos;ll help you understand what comes next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/ai-assistant"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-[15px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-sm"
            >
              Get Help
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/rti-assistant"
              className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-8 py-4 rounded-2xl text-[15px] font-semibold hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95 transition-all duration-150"
            >
              <FileText size={16} />
              Try RTI Assistant
            </Link>
          </div>
          <p className="text-[12px] text-muted-foreground mt-6">
            Informational guidance only. Always verify with official sources.
          </p>
        </div>
      </div>
    </section>
  );
}