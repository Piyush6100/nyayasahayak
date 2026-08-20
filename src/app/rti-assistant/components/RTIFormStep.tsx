'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { type RTIFormData } from './RTIWizard';

interface Props {
  step: number;
  form: UseFormReturn<RTIFormData>;
  onNext: () => void;
  onBack: () => void;
}

const stateOptions = [
  'Andhra Pradesh', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal', 'Delhi',
];

const feeModeOptions = [
  { value: 'IPO', label: 'Indian Postal Order (IPO)' },
  { value: 'DD', label: 'Demand Draft' },
  { value: 'Cash', label: 'Cash (at office)' },
  { value: 'Online', label: 'Online payment' },
  { value: 'BPL', label: 'BPL — Fee exempt' },
];

export default function RTIFormStep({ step, form, onNext, onBack }: Props) {
  const { register, formState: { errors } } = form;

  const handleBack = () => {
    if (step > 1) onBack();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-bold text-foreground mb-1">What information do you need?</h2>
              <p className="text-[13px] text-muted-foreground">Describe what you want to know. Write in plain language — we&apos;ll structure it properly.</p>
            </div>
            <div>
              <label htmlFor="informationNeeded" className="block text-[13px] font-semibold text-foreground mb-1.5">
                Describe the information you need <span className="text-destructive" aria-label="required">*</span>
              </label>
              <p className="text-[12px] text-muted-foreground mb-2">Be specific. Include what happened, when it happened, and what you want to know.</p>
              <textarea
                id="informationNeeded"
                {...register('informationNeeded', { required: 'Please describe the information you need', minLength: { value: 20, message: 'Please provide more detail (at least 20 characters)' } })}
                rows={5}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px]text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                aria-describedby="informationNeeded-error"
                placeholder="e.g. I want to know why my road repair application submitted on 15 July 2026 was rejected by the municipal corporation."
              />
              {errors.informationNeeded && (
                <p id="informationNeeded-error" className="text-[12px] text-destructive mt-1.5" role="alert">{errors.informationNeeded.message}</p>
              )}
            </div>
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-4">
              <HelpCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-primary mb-0.5">Tip</p>
                <p className="text-[12px] text-muted-foreground leading-relaxed">Under the RTI Act, you can request certified copies of documents, inspection of records, or information in electronic form. You do not need to give a reason for your request.</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-bold text-foreground mb-1">Which department or authority?</h2>
              <p className="text-[13px] text-muted-foreground">Identify the public authority that holds the information you need.</p>
            </div>
            <div>
              <label htmlFor="department" className="block text-[13px] font-semibold text-foreground mb-1.5">
                Department / Public Authority <span className="text-destructive" aria-label="required">*</span>
              </label>
              <p className="text-[12px] text-muted-foreground mb-2">e.g. Municipal Corporation, District Collector&apos;s Office, Public Works Department</p>
              <input
                id="department"
                type="text"
                {...register('department', { required: 'Department name is required' })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="e.g. Municipal Corporation of Greater Mumbai (MCGM)"
                aria-describedby="department-error"
              />
              {errors.department && (
                <p id="department-error" className="text-[12px] text-destructive mt-1.5" role="alert">{errors.department.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="officeAddress" className="block text-[13px] font-semibold text-foreground mb-1.5">Office Address</label>
              <p className="text-[12px] text-muted-foreground mb-2">The address of the Public Information Officer&apos;s office.</p>
              <input
                id="officeAddress"
                type="text"
                {...register('officeAddress')}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="e.g. Mahapalika Marg, Mumbai — 400 001"
              />
            </div>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <HelpCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-blue-700 leading-relaxed">
                Your RTI application should be addressed to the <strong>Public Information Officer (PIO)</strong> of the relevant department. If you don&apos;t know who the PIO is, address it to the Head of the Department — they are required to forward it.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-bold text-foreground mb-1">Where is the office located?</h2>
              <p className="text-[13px] text-muted-foreground">This helps determine which RTI fee applies and the correct addressing format.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-[13px] font-semibold text-foreground mb-1.5">
                  State <span className="text-destructive" aria-label="required">*</span>
                </label>
                <select
                  id="state"
                  {...register('state', { required: 'State is required' })}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  aria-describedby="state-error"
                >
                  <option value="">Select state</option>
                  {stateOptions.map((s) => (
                    <option key={`rti-state-${s}`} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && (
                  <p id="state-error" className="text-[12px] text-destructive mt-1.5" role="alert">{errors.state.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="block text-[13px] font-semibold text-foreground mb-1.5">
                  City / District <span className="text-destructive" aria-label="required">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="e.g. Mumbai"
                  aria-describedby="city-error"
                />
                {errors.city && (
                  <p id="city-error" className="text-[12px] text-destructive mt-1.5" role="alert">{errors.city.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="applicationDate" className="block text-[13px] font-semibold text-foreground mb-1.5">Date of original application / request (if any)</label>
              <p className="text-[12px] text-muted-foreground mb-2">Leave blank if this is your first request on this matter.</p>
              <input
                id="applicationDate"
                type="date"
                {...register('applicationDate')}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label htmlFor="feeMode" className="block text-[13px] font-semibold text-foreground mb-1.5">RTI Fee Payment Mode</label>
              <p className="text-[12px] text-muted-foreground mb-2">Central government RTI fee is ₹10. State fees may vary. BPL cardholders are exempt.</p>
              <select
                id="feeMode"
                {...register('feeMode')}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              >
                {feeModeOptions.map((opt) => (
                  <option key={`fee-${opt.value}`} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-bold text-foreground mb-1">Your details</h2>
              <p className="text-[13px] text-muted-foreground">The RTI application must include your name and address. Only provide what is necessary.</p>
            </div>
            <div>
              <label htmlFor="applicantName" className="block text-[13px] font-semibold text-foreground mb-1.5">
                Full Name <span className="text-destructive" aria-label="required">*</span>
              </label>
              <input
                id="applicantName"
                type="text"
                {...register('applicantName', { required: 'Your name is required' })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="As it should appear on the application"
                aria-describedby="applicantName-error"
              />
              {errors.applicantName && (
                <p id="applicantName-error" className="text-[12px] text-destructive mt-1.5" role="alert">{errors.applicantName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="applicantAddress" className="block text-[13px] font-semibold text-foreground mb-1.5">
                Postal Address <span className="text-destructive" aria-label="required">*</span>
              </label>
              <p className="text-[12px] text-muted-foreground mb-2">The department will send the response to this address.</p>
              <textarea
                id="applicantAddress"
                {...register('applicantAddress', { required: 'Your address is required' })}
                rows={3}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                placeholder="Full address including pin code"
                aria-describedby="applicantAddress-error"
              />
              {errors.applicantAddress && (
                <p id="applicantAddress-error" className="text-[12px] text-destructive mt-1.5" role="alert">{errors.applicantAddress.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="applicantPhone" className="block text-[13px] font-semibold text-foreground mb-1.5">Phone (optional)</label>
                <input
                  id="applicantPhone"
                  type="tel"
                  {...register('applicantPhone')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="Mobile number"
                />
              </div>
              <div>
                <label htmlFor="applicantEmail" className="block text-[13px] font-semibold text-foreground mb-1.5">Email (optional)</label>
                <input
                  id="applicantEmail"
                  type="email"
                  {...register('applicantEmail')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="For email updates"
                />
              </div>
            </div>
            <div>
              <label htmlFor="additionalContext" className="block text-[13px] font-semibold text-foreground mb-1.5">Additional context (optional)</label>
              <p className="text-[12px] text-muted-foreground mb-2">Any background that helps clarify your request.</p>
              <textarea
                id="additionalContext"
                {...register('additionalContext')}
                rows={3}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                placeholder="Optional background information"
              />
            </div>
            <div className="flex items-start gap-3 bg-muted border border-border rounded-xl p-4">
              <HelpCircle size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                <strong>Privacy note:</strong> Only provide information necessary for your RTI request. You are not required to provide your email or phone number. Your details will only be used to generate this document.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 lg:p-8">
      {renderStep()}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-[14px] font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
          aria-label="Go back"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150"
          aria-label="Continue to next step"
        >
          Continue
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}