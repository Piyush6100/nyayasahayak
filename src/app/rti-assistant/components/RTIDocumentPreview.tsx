import React from 'react';
import { type RTIFormData } from './RTIWizard';

interface Props {
  formData: RTIFormData;
}

export default function RTIDocumentPreview({ formData }: Props) {
  const today = '20 August 2026';

  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Live Document Preview</p>
        <span className="text-[11px] text-accent font-medium bg-accent/10 border border-accent/20 rounded-full px-2.5 py-0.5">Demo Document</span>
      </div>

      <div className="document-paper rounded-2xl overflow-hidden">
        <div className="p-8 lg:p-10 text-[12px] leading-relaxed text-foreground space-y-5 min-h-[600px]">
          {/* Header */}
          <div className="text-center border-b border-border pb-5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Right to Information Act, 2005</p>
            <h3 className="text-[18px] font-bold text-foreground">APPLICATION FOR INFORMATION</h3>
            <p className="text-[11px] text-muted-foreground mt-1">Under Section 6(1) of the RTI Act, 2005</p>
          </div>

          {/* To */}
          <div>
            <p className="font-semibold text-foreground mb-1">To,</p>
            <p className="text-muted-foreground">The Public Information Officer</p>
            <p className="font-medium text-foreground">{formData.department || '[Department Name]'}</p>
            {formData.officeAddress && <p className="text-muted-foreground">{formData.officeAddress}</p>}
            {formData.city && formData.state && (
              <p className="text-muted-foreground">{formData.city}, {formData.state}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <p className="font-semibold text-foreground mb-1">Subject:</p>
            <p className="text-foreground">
              Request for information under the Right to Information Act, 2005 — regarding{' '}
              {formData.informationNeeded
                ? formData.informationNeeded.substring(0, 80) + (formData.informationNeeded.length > 80 ? '...' : '')
                : '[information required]'}
            </p>
          </div>

          {/* Body */}
          <div>
            <p className="text-foreground leading-relaxed mb-3">
              Respected Sir/Madam,
            </p>
            <p className="text-foreground leading-relaxed mb-3">
              I, <strong>{formData.applicantName || '[Applicant Name]'}</strong>, a citizen of India, hereby request the following information under Section 6(1) of the Right to Information Act, 2005:
            </p>
          </div>

          {/* Information requested */}
          <div>
            <p className="font-semibold text-foreground mb-2">Information Requested:</p>
            <ol className="space-y-2 text-foreground/85 list-decimal list-inside">
              <li>{formData.informationNeeded || '[Describe the information you need]'}</li>
              {formData.additionalContext && (
                <li>Additional context: {formData.additionalContext}</li>
              )}
              <li>Certified copies of any relevant orders, notices, or correspondence related to the above.</li>
              <li>Names and designations of officers responsible for the above matter.</li>
            </ol>
          </div>

          {/* Fee */}
          <div>
            <p className="font-semibold text-foreground mb-1">Application Fee:</p>
            <p className="text-foreground/80">
              {formData.feeMode === 'BPL' ?'Applicant is a BPL cardholder and is exempt from RTI fee. BPL card copy enclosed.'
                : `RTI application fee of ₹10/- enclosed via ${formData.feeMode || 'Indian Postal Order'}.`}
            </p>
          </div>

          {/* Applicant details */}
          <div className="border-t border-border pt-4">
            <p className="font-semibold text-foreground mb-2">Applicant Details:</p>
            <p className="text-foreground">{formData.applicantName || '[Name]'}</p>
            <p className="text-muted-foreground">{formData.applicantAddress || '[Address]'}</p>
            {formData.applicantPhone && <p className="text-muted-foreground">Phone: {formData.applicantPhone}</p>}
            {formData.applicantEmail && <p className="text-muted-foreground">Email: {formData.applicantEmail}</p>}
          </div>

          {/* Date and signature */}
          <div className="flex justify-between items-end pt-4 border-t border-border">
            <div>
              <p className="text-muted-foreground text-[11px]">Date:</p>
              <p className="font-medium text-foreground">{today}</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-foreground/30 mb-1 h-8" />
              <p className="text-[11px] text-muted-foreground">Signature of Applicant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}