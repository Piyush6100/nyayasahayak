'use client';

import React, { useState, useRef } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

interface Props {
  onSend: (content: string) => void;
  disabled?: boolean;
}

const suggestedPrompts = [
  { id: 'sugg-rti', text: 'Help me file an RTI' },
  { id: 'sugg-deposit', text: 'Landlord deposit issue' },
  { id: 'sugg-consumer', text: 'Consumer complaint' },
  { id: 'sugg-scheme', text: 'Check my scheme eligibility' },
];

export default function MessageComposer({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-3">
      {/* Suggested prompts */}
      <div className="flex gap-2 flex-wrap">
        {suggestedPrompts.map((p) => (
          <button
            key={p.id}
            onClick={() => { setValue(p.text); textareaRef.current?.focus(); }}
            disabled={disabled}
            className="text-[12px] px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Use suggestion: ${p.text}`}
          >
            {p.text}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={`relative bg-card rounded-2xl transition-all duration-200 ${isFocused ? 'shadow-input-focus' : 'shadow-input'}`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your situation..."
          disabled={disabled}
          className="w-full bg-transparent px-5 pt-4 pb-3 text-[14px] text-foreground placeholder:text-muted-foreground resize-none outline-none rounded-2xl min-h-[72px] max-h-[160px] disabled:opacity-50"
          aria-label="Type your message"
          rows={2}
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <p className="text-[11px] text-muted-foreground">Don&apos;t worry about using legal terms.</p>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40" disabled={disabled} aria-label="Attach file">
              <Paperclip size={15} />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40" disabled={disabled} aria-label="Voice input">
              <Mic size={15} />
            </button>
            <button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all duration-150"
              aria-label="Send message"
            >
              <Send size={13} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}