'use client';

import React, { useState } from 'react';
import { Copy, Volume2, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { type Message } from '@/data/demoConversations';
import { toast } from 'sonner';

interface Props {
  message: Message;
}

const sourceTypeLabel: Record<string, string> = {
  official: 'Official Document',
  act: 'Act / Statute',
  guideline: 'Government Guideline',
};

const sourceTypeColor: Record<string, string> = {
  official: 'bg-blue-50 border-blue-200 text-blue-700',
  act: 'bg-primary/8 border-primary/20 text-primary',
  guideline: 'bg-success/8 border-success/20 text-success',
};

export default function AIMessage({ message }: Props) {
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const handleCopy = () => {
    const text = message.structured
      ? `${message.structured.understanding}\n\nOptions:\n${message.structured.options.join('\n')}`
      : message.content;
    navigator.clipboard.writeText(text).catch(() => {});
    toast.success('Copied to clipboard');
  };

  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-bold text-primary-foreground">NS</span>
      </div>
      <div className="flex-1 min-w-0 space-y-4">
        {/* Structured response */}
        {message.structured && (
          <>
            {/* Understanding */}
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm shadow-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-primary/5">
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">Understanding Your Situation</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-[14px] text-foreground leading-relaxed">{message.structured.understanding}</p>
              </div>
            </div>

            {/* Options */}
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-blue-50/60">
                <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Possible Options</p>
              </div>
              <div className="px-5 py-4">
                <ol className="space-y-2.5">
                  {message.structured.options.map((option, i) => (
                    <li key={`option-${message.id}-${i}`} className="flex gap-3 text-[13px] text-foreground leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Documents needed */}
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-warning/5">
                <p className="text-[11px] font-semibold text-warning uppercase tracking-wider">What You May Need</p>
              </div>
              <div className="px-5 py-4">
                <ul className="space-y-2">
                  {message.structured.documents.map((doc, i) => (
                    <li key={`doc-${message.id}-${i}`} className="flex items-start gap-2.5 text-[13px] text-foreground">
                      <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-success/5">
                <p className="text-[11px] font-semibold text-success uppercase tracking-wider">Next Steps</p>
              </div>
              <div className="px-5 py-4">
                <ol className="space-y-2.5">
                  {message.structured.nextSteps.map((step, i) => (
                    <li key={`step-${message.id}-${i}`} className="flex gap-3 text-[13px] text-foreground leading-relaxed">
                      <span className="text-accent flex-shrink-0 font-bold">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        )}

        {/* Plain text response */}
        {!message.structured && message.content && (
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-4 shadow-card">
            <p className="text-[14px] text-foreground leading-relaxed">{message.content}</p>
          </div>
        )}

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">Sources</p>
            {message.sources.map((source) => (
              <div
                key={source.id}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${sourceTypeColor[source.type]}`}
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  onClick={() => setExpandedSource(expandedSource === source.id ? null : source.id)}
                  aria-expanded={expandedSource === source.id}
                  aria-label={`${expandedSource === source.id ? 'Collapse' : 'Expand'} source: ${source.title}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{sourceTypeLabel[source.type]}</span>
                    <span className="text-[13px] font-semibold">{source.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] opacity-70">{source.section}</span>
                    {expandedSource === source.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>
                {expandedSource === source.id && (
                  <div className="px-4 pb-3 border-t border-current/10">
                    <p className="text-[12px] opacity-80 leading-relaxed mt-2">
                      Cited section: <strong>{source.section}</strong> of {source.title}. This source supports the information provided above.
                    </p>
                    <button className="flex items-center gap-1 text-[11px] font-medium mt-2 opacity-70 hover:opacity-100 transition-opacity">
                      <ExternalLink size={11} />
                      View source reference
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Copy response"
          >
            <Copy size={12} />
            Copy
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Listen to response"
          >
            <Volume2 size={12} />
            Listen
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-[12px] text-muted-foreground hover:text-success hover:border-success/30 hover:bg-success/5 transition-colors"
            aria-label="Mark as helpful"
          >
            <ThumbsUp size={12} />
            Helpful
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-[12px] text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-colors"
            aria-label="Mark as not helpful"
          >
            <ThumbsDown size={12} />
            Not helpful
          </button>
          <p className="text-[11px] text-muted-foreground/60 ml-1">{message.timestamp}</p>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-muted-foreground/60 border-l-2 border-border pl-3 py-0.5 italic">
          This is informational guidance based on the information provided. Verify important details with official sources or a qualified professional.
        </p>
      </div>
    </div>
  );
}