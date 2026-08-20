'use client';

import React from 'react';
import { Mic, X, Check, Keyboard, ShieldAlert, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (text: string) => void;
}

export default function VoiceHelperModal({ isOpen, onClose, onSelectSample }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-card border border-border rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Mic size={18} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-foreground">Microphone & Voice Input</h3>
              <p className="text-[12px] text-muted-foreground">Options to speak your query</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Windows built-in shortcut tip */}
        <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-primary text-[13px] font-semibold">
            <Keyboard size={16} />
            <span>Windows Built-in Dictation</span>
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Press <kbd className="px-1.5 py-0.5 bg-card border border-border rounded font-mono text-[11px] font-semibold text-foreground">Win</kbd> + <kbd className="px-1.5 py-0.5 bg-card border border-border rounded font-mono text-[11px] font-semibold text-foreground">H</kbd> anywhere in Windows to activate system voice typing in any language.
          </p>
        </div>

        {/* Windows Microphone permissions */}
        <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-foreground text-[13px] font-semibold">
            <ShieldAlert size={16} className="text-warning" />
            <span>Microphone Permission in Windows</span>
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            If your browser doesn&apos;t detect audio, check <strong>Windows Settings &gt; Privacy &amp; Security &gt; Microphone</strong> and ensure &quot;Let apps access your microphone&quot; is enabled.
          </p>
        </div>

        {/* Try voice query samples */}
        <div className="space-y-2">
          <p className="text-[12px] font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles size={14} className="text-accent" />
            <span>Or insert sample voice queries:</span>
          </p>
          <div className="space-y-1.5">
            {[
              'I want to file an RTI application for my municipal road repair request.',
              'My landlord has not returned my security deposit for 3 months.',
              'Which government welfare schemes am I eligible for as a student?',
            ].map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectSample(sample);
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/30 text-[12px] text-foreground transition-all flex items-center justify-between group"
              >
                <span className="truncate pr-2">{sample}</span>
                <span className="text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity font-semibold">Insert</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-[13px] font-semibold hover:bg-primary/90 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
