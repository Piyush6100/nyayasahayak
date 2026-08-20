'use client';

import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const questions = [
  { id: 'rti-dept', label: 'Department', placeholder: 'e.g. Municipal Corporation', field: 'department' },
  { id: 'rti-loc', label: 'Location / Office', placeholder: 'e.g. Mumbai, Zone 3', field: 'location' },
  { id: 'rti-date', label: 'Date of original request', placeholder: 'e.g. 15 July 2026', field: 'date' },
  { id: 'rti-info', label: 'Information required', placeholder: 'e.g. Reasons for rejection of application', field: 'information' },
];

const defaultValues: Record<string, string> = {
  department: 'Municipal Corporation of Greater Mumbai',
  location: 'Mumbai, Zone 3 — Goregaon East',
  date: '15 July 2026',
  information: 'Reasons for rejection of road repair application',
};

export default function RTIInteractiveSection() {
  const [values, setValues] = useState<Record<string, string>>(defaultValues);

  return (
    <section className="py-16 lg:py-24" aria-labelledby="rti-section-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 py-1 mb-4">
            <FileText size={13} className="text-primary" />
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">RTI Assistant</span>
          </div>
          <h2 id="rti-section-heading" className="text-[1.75rem] lg:text-[2rem] font-bold text-foreground mb-3">
            Turn a question into an RTI application.
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-xl">
            Explain what information you need. NyayaSahayak helps structure it into a proper RTI application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Conversation + form */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            {/* Chat area */}
            <div className="p-6 border-b border-border bg-secondary/30">
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-semibold text-foreground">You</span>
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] text-foreground leading-relaxed">
                  I want to know why my municipal road repair request was rejected.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">NS</span>
                </div>
                <div className="bg-primary/8 border border-primary/15 rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] text-foreground leading-relaxed">
                  I can help prepare an RTI request. Let me ask a few details to structure the application correctly.
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div className="p-6 space-y-4">
              {questions.map((q) => (
                <div key={q.id}>
                  <label htmlFor={q.id} className="block text-[12px] font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                    {q.label}
                  </label>
                  <input
                    id={q.id}
                    type="text"
                    value={values[q.field] || ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, [q.field]: e.target.value }))}
                    placeholder={q.placeholder}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    aria-label={q.label}
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-[13px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150">
                  Generate Application
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-[13px] font-medium text-foreground hover:bg-muted transition-colors">
                  <Eye size={14} />
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* Right: Document preview */}
          <div className="bg-muted/30 rounded-2xl border border-border p-4 lg:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-[12px] text-muted-foreground hover:bg-card transition-colors">
                <Download size={12} />
                Download PDF
              </button>
            </div>

            {/* A4 Document */}
            <div className="document-paper rounded-xl p-6 lg:p-8 text-[12px] leading-relaxed flex-1 overflow-auto">
              <div className="text-center mb-6">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Right to Information Act, 2005</p>
                <h3 className="text-[16px] font-bold text-foreground">RTI APPLICATION</h3>
              </div>

              <div className="space-y-4 text-[12px]">
                <div>
                  <p className="font-semibold text-foreground">To:</p>
                  <p className="text-muted-foreground">The Public Information Officer</p>
                  <p className="text-foreground">{values.department || '[Department]'}</p>
                  <p className="text-muted-foreground">{values.location || '[Location]'}</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">Subject:</p>
                  <p className="text-foreground">Request for information regarding {values.information || '[information required]'}</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1.5">Information Requested:</p>
                  <ol className="space-y-1.5 text-foreground/80 list-decimal list-inside">
                    <li>Certified copy of the decision/order regarding the application dated {values.date || '[date]'}.</li>
                    <li>Reasons for the decision, with reference to applicable rules or guidelines.</li>
                    <li>Name and designation of the reviewing officer.</li>
                    <li>Current status of the matter and any pending actions.</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-foreground">Applicant:</p>
                  <p className="text-muted-foreground">[Applicant Name]</p>
                  <p className="text-muted-foreground">[Address]</p>
                </div>

                <div className="border-t border-border pt-3 flex justify-between text-[11px] text-muted-foreground">
                  <span>Date: 20 August 2026</span>
                  <span className="text-accent font-medium">Demo Document</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}