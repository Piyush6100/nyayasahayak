'use client';

import React from 'react';
import { ChevronLeft, Loader2, FileText, CheckCircle } from 'lucide-react';
import { type RTIFormData } from './RTIWizard';

interface Props {
  formData: RTIFormData;
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const reviewSections = [
  {
    id: 'review-info',
    title: 'Information Requested',
    fields: [{ label: 'What you need', key: 'informationNeeded' }],
  },
  {
    id: 'review-dept',
    title: 'Department',
    fields: [
      { label: 'Department', key: 'department' },
      { label: 'Office Address', key: 'officeAddress' },
    ],
  },
  {
    id: 'review-loc',
    title: 'Location',
    fields: [
      { label: 'State', key: 'state' },
      { label: 'City', key: 'city' },
      { label: 'Fee Mode', key: 'feeMode' },
    ],
  },
  {
    id: 'review-applicant',
    title: 'Applicant Details',
    fields: [
      { label: 'Name', key: 'applicantName' },
      { label: 'Address', key: 'applicantAddress' },
      { label: 'Phone', key: 'applicantPhone' },
      { label: 'Email', key: 'applicantEmail' },
    ],
  },
];

export default function RTIReviewStep({ formData, onBack, onGenerate, isGenerating }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-foreground mb-1">Review your application</h2>
        <p className="text-[13px] text-muted-foreground">Check all details before generating your RTI application.</p>
      </div>

      <div className="space-y-5">
        {reviewSections.map((section) => (
          <div key={section.id} className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2.5 bg-secondary/50 border-b border-border">
              <p className="text-[12px] font-semibold text-foreground uppercase tracking-wider">{section.title}</p>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              {section.fields.map((field) => {
                const value = formData[field.key as keyof RTIFormData];
                return value ? (
                  <div key={`review-${field.key}`} className="flex gap-3">
                    <p className="text-[12px] text-muted-foreground w-28 flex-shrink-0">{field.label}</p>
                    <p className="text-[12px] text-foreground flex-1 leading-relaxed">{value}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="mt-6 space-y-2.5">
        <p className="text-[12px] font-semibold text-foreground uppercase tracking-wider mb-3">Before you generate</p>
        {[
          'I have described the information I need clearly',
          'The department name and address are correct',
          'My name and address are accurate',
          'I understand this is a demo document for review',
        ].map((item, i) => (
          <div key={`checklist-${i}`} className="flex items-start gap-2.5">
            <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={onBack}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-[14px] font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
          aria-label="Go back"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all duration-150 min-w-[160px] justify-center"
          aria-label={isGenerating ? 'Generating application...' : 'Generate RTI application'}
        >
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <FileText size={16} />
              <span>Generate Application</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}