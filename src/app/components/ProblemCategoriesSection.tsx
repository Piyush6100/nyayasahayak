'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Scale, Home, Landmark, MessageSquare, FileCheck, Globe, Shield } from 'lucide-react';

const categories = [
  { id: 'cat-rti', label: 'RTI', icon: FileText, prompt: 'I want help filing an RTI application.', color: 'bg-primary/8 border-primary/20 text-primary hover:bg-primary/12' },
  { id: 'cat-consumer', label: 'Consumer Issues', icon: Scale, prompt: 'I have a consumer complaint I need help with.', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
  { id: 'cat-tenant', label: 'Tenant Issues', icon: Home, prompt: 'I have a problem with my landlord or tenancy.', color: 'bg-accent/8 border-accent/20 text-accent hover:bg-accent/12' },
  { id: 'cat-schemes', label: 'Government Schemes', icon: Landmark, prompt: 'Which government schemes might I be eligible for?', color: 'bg-success/8 border-success/20 text-success hover:bg-success/12' },
  { id: 'cat-civic', label: 'Civic Complaints', icon: MessageSquare, prompt: 'I want to file a civic complaint about a local issue.', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' },
  { id: 'cat-forms', label: 'Government Forms', icon: FileCheck, prompt: 'I need help filling out a government form or application.', color: 'bg-muted border-border text-foreground hover:bg-secondary' },
  { id: 'cat-rights', label: 'General Rights', icon: Shield, prompt: 'I want to understand my rights as a citizen.', color: 'bg-warning/8 border-warning/20 text-warning hover:bg-warning/12' },
  { id: 'cat-multilingual', label: 'Language Help', icon: Globe, prompt: 'मुझे हिंदी में सहायता चाहिए।', color: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100' },
];

export default function ProblemCategoriesSection() {
  const router = useRouter();

  const handleCategoryClick = (prompt: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nyaya_initial_prompt', prompt);
    }
    router.push('/ai-assistant');
  };

  return (
    <section className="py-14 lg:py-20" aria-labelledby="categories-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="mb-8">
          <h2 id="categories-heading" className="text-[1.5rem] lg:text-[1.75rem] font-bold text-foreground mb-2">
            What are you trying to solve?
          </h2>
          <p className="text-[14px] text-muted-foreground">
            Select a category to get started with a relevant prompt.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.prompt)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13.5px] font-medium transition-all duration-150 active:scale-95 ${cat.color}`}
                aria-label={`Get help with ${cat.label}`}
              >
                <Icon size={15} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
