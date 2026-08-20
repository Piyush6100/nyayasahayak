'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, Share2, Plus, ArrowRight, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { type RTIFormData } from './RTIWizard';
import RTIDocumentPreview from './RTIDocumentPreview';
import { downloadRtiPdf } from '@/lib/utils/generateRtiPdf';

interface Props {
  formData: RTIFormData;
  onNew: () => void;
}

export default function RTISuccessStep({ formData, onNew }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    try {
      setIsDownloading(true);
      downloadRtiPdf(formData);
      toast.success('RTI Application PDF downloaded successfully!');
    } catch (err: any) {
      console.error('PDF generation error:', err);
      toast.error('Failed to generate PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `RTI Application for ${formData.department || 'Government Department'} regarding ${formData.informationNeeded || 'Information Request'}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My RTI Application — NyayaSahayak',
          text: shareText,
          url: window.location.href,
        });
        toast.success('Shared successfully');
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n\nPrepared on NyayaSahayak: ${window.location.href}`);
      setCopied(true);
      toast.success('Application details copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info('Details ready');
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-10">
      {/* Success banner */}
      <div className="bg-success/8 border border-success/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={24} className="text-success" />
        </div>
        <div className="flex-1">
          <h2 className="text-[18px] font-bold text-foreground mb-1">Your RTI application is ready.</h2>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Your application has been structured under Section 6(1) of the Right to Information Act, 2005. Review the document below, then download or print it to submit to the department.
          </p>
        </div>
      </div>

      {/* Next steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {[
          { id: 'next-print', step: '01', title: 'Print or save the document', description: 'Download the PDF and print a physical copy, or keep the digital version.' },
          { id: 'next-fee', step: '02', title: 'Attach RTI fee', description: `Attach ₹10/- via ${formData.feeMode}. BPL cardholders are exempt.` },
          { id: 'next-submit', step: '03', title: 'Submit to the PIO', description: 'Submit in person, by post, or via the department\'s online RTI portal.' },
        ].map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-[12px] font-bold text-primary">{item.step}</span>
            </div>
            <h3 className="text-[14px] font-semibold text-foreground mb-1.5">{item.title}</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 disabled:opacity-60 shadow-sm"
          aria-label="Download PDF"
        >
          {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-xl text-[14px] font-medium hover:bg-muted active:scale-95 transition-all duration-150"
          aria-label="Share document"
        >
          {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
          <span>{copied ? 'Copied Link' : 'Share'}</span>
        </button>
        <button
          onClick={onNew}
          className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-xl text-[14px] font-medium hover:bg-muted active:scale-95 transition-all duration-150"
          aria-label="Start new RTI application"
        >
          <Plus size={16} />
          New Application
        </button>
        <Link
          href="/ai-assistant"
          className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-xl text-[14px] font-medium hover:bg-muted active:scale-95 transition-all duration-150"
          aria-label="Go to AI Assistant"
        >
          Ask AI Assistant
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Important notice */}
      <div className="bg-muted/50 border border-border rounded-xl p-4 mb-8">
        <p className="text-[12px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Important: </strong>
          This is a demo document generated for informational purposes. Always verify the correct PIO name and address before submitting your actual RTI application. The department must respond within <strong>30 days</strong> of receipt under the RTI Act, 2005.
        </p>
      </div>

      {/* Document preview */}
      <div>
        <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">Generated Document</p>
        <div className="max-w-2xl">
          <RTIDocumentPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}