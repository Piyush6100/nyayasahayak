import React from 'react';
import { Shield, BookOpen, Globe, Zap } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const trustItems = [
  {
    id: 'trust-source',
    icon: Shield,
    title: 'Source-backed information',
    description: 'Every AI response is grounded in official government documents, acts, and guidelines — not generic web content.',
  },
  {
    id: 'trust-simple',
    icon: BookOpen,
    title: 'Simple language',
    description: 'Complex legal and civic procedures are explained in plain, everyday language anyone can understand.',
  },
  {
    id: 'trust-multilingual',
    icon: Globe,
    title: 'Multilingual support',
    description: 'Use NyayaSahayak in English, Hindi, Gujarati, and more Indian languages — your language is never a barrier.',
  },
  {
    id: 'trust-action',
    icon: Zap,
    title: 'Action-oriented guidance',
    description: 'Not just answers — structured next steps, document generation, and application assistance.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-20 bg-card border-y border-border" aria-labelledby="trust-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="text-center mb-12">
          <h2 id="trust-heading" className="text-[1.75rem] lg:text-[2rem] font-bold text-foreground mb-3">
            Built around clarity, evidence and action.
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-xl mx-auto">
            NyayaSahayak is designed to be trustworthy, accessible, and genuinely useful for every citizen.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems?.map((item) => {
            const Icon = item?.icon;
            return (
              <div key={item?.id} className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{item?.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{item?.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}