'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import RTIStepHeader from './RTIStepHeader';
import RTIFormStep from './RTIFormStep';
import RTIDocumentPreview from './RTIDocumentPreview';
import RTIReviewStep from './RTIReviewStep';
import RTISuccessStep from './RTISuccessStep';

export interface RTIFormData {
  informationNeeded: string;
  department: string;
  officeAddress: string;
  state: string;
  city: string;
  applicationDate: string;
  additionalContext: string;
  applicantName: string;
  applicantAddress: string;
  applicantPhone: string;
  applicantEmail: string;
  feeMode: string;
}

const defaultValues: RTIFormData = {
  informationNeeded: 'I want to know why my road repair application submitted on 15 July 2026 was rejected by the municipal corporation.',
  department: 'Municipal Corporation of Greater Mumbai (MCGM)',
  officeAddress: 'Mahapalika Marg, Mumbai — 400 001',
  state: 'Maharashtra',
  city: 'Mumbai',
  applicationDate: '2026-07-15',
  additionalContext: 'The application was submitted through the online portal and no acknowledgment was received.',
  applicantName: 'Rajesh Kumar Sharma',
  applicantAddress: 'Flat 4B, Shivaji Nagar, Goregaon East, Mumbai — 400 063',
  applicantPhone: '98765 43210',
  applicantEmail: 'rajesh.sharma@email.com',
  feeMode: 'IPO',
};

export const steps = [
  { id: 'step-info', number: 1, label: 'Information', shortLabel: 'Info' },
  { id: 'step-dept', number: 2, label: 'Department', shortLabel: 'Dept' },
  { id: 'step-location', number: 3, label: 'Location', shortLabel: 'Location' },
  { id: 'step-details', number: 4, label: 'Details', shortLabel: 'Details' },
  { id: 'step-review', number: 5, label: 'Review', shortLabel: 'Review' },
  { id: 'step-generate', number: 6, label: 'Generate', shortLabel: 'Generate' },
];

export default function RTIWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const form = useForm<RTIFormData>({ defaultValues, mode: 'onChange' });
  const watchedValues = form.watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof RTIFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ['informationNeeded'];
    if (currentStep === 2) fieldsToValidate = ['department'];
    if (currentStep === 3) fieldsToValidate = ['state', 'city'];
    if (currentStep === 4) fieldsToValidate = ['applicantName', 'applicantAddress'];

    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    if (currentStep < steps.length) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // BACKEND INTEGRATION POINT: Replace with POST /api/rti/generate
    await new Promise((r) => setTimeout(r, 2200));
    setIsGenerating(false);
    setIsGenerated(true);
    toast.success('RTI Application generated successfully');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved');
  };

  if (isGenerated) {
    return <RTISuccessStep formData={watchedValues} onNew={() => { setIsGenerated(false); setCurrentStep(1); form.reset(defaultValues); }} />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 lg:px-8 xl:px-10 py-6">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] font-bold text-foreground mb-1">RTI Assistant</h1>
              <p className="text-[14px] text-muted-foreground">Turn your question into a structured RTI application.</p>
            </div>
            <button
              onClick={handleSaveDraft}
              className="flex-shrink-0 px-4 py-2 rounded-xl border border-border text-[13px] font-medium text-foreground hover:bg-muted transition-colors"
              aria-label="Save draft"
            >
              Save Draft
            </button>
          </div>
          <RTIStepHeader currentStep={currentStep} steps={steps} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-6 lg:px-8 xl:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div>
            {currentStep < 5 ? (
              <RTIFormStep
                step={currentStep}
                form={form}
                onNext={handleNext}
                onBack={handleBack}
              />
            ) : currentStep === 5 ? (
              <RTIReviewStep
                formData={watchedValues}
                onBack={handleBack}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            ) : null}
          </div>

          {/* Right: Document preview */}
          <div className="hidden lg:block">
            <RTIDocumentPreview formData={watchedValues} />
          </div>
        </div>

        {/* Mobile preview */}
        <div className="lg:hidden mt-8">
          <details className="group">
            <summary className="cursor-pointer flex items-center gap-2 text-[14px] font-semibold text-primary mb-4 list-none">
              <span>View Document Preview</span>
              <span className="group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <RTIDocumentPreview formData={watchedValues} />
          </details>
        </div>
      </div>
    </div>
  );
}