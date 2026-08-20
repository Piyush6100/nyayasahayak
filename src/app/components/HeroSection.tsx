'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Paperclip, Globe, Send } from 'lucide-react';
import CivicFlowViz from './CivicFlowViz';

const examplePrompts = [
  { id: 'prompt-rti', text: 'I want to file an RTI', icon: '📄' },
  { id: 'prompt-deposit', text: 'My landlord hasn\'t returned my deposit', icon: '🏠' },
  { id: 'prompt-schemes', text: 'Which schemes might I be eligible for?', icon: '🏛️' },
  { id: 'prompt-consumer', text: 'My consumer complaint is unresolved', icon: '⚖️' },
];

export default function HeroSection() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handlePromptClick = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      router.push('/ai-assistant');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="hero-gradient pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-accent"></span>
              <span className="text-[12px] font-semibold text-accent tracking-wider uppercase">AI-Powered Civic Assistance</span>
            </div>

            <h1
              id="hero-heading"
              className="text-[2.8rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] tracking-tight mb-5"
            >
              Legal and civic help,{' '}
              <span className="text-primary">made simple.</span>
            </h1>

            <p className="text-[17px] text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Describe your problem in your own words. NyayaSahayak helps you understand your options, find relevant information, and take the next step.
            </p>

            {/* AI Input */}
            <div
              className={`relative bg-card rounded-2xl transition-all duration-200 ${
                isFocused ? 'shadow-input-focus' : 'shadow-input'
              }`}
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Tell us what happened..."
                className="w-full bg-transparent px-5 pt-4 pb-3 text-[15px] text-foreground placeholder:text-muted-foreground resize-none outline-none rounded-2xl min-h-[90px] max-h-[200px]"
                aria-label="Describe your civic or legal problem"
                rows={3}
              />
              <div className="flex items-center justify-between px-4 pb-4">
                <div className="flex items-center gap-1">
                  <p className="text-[12px] text-muted-foreground">You don&apos;t need to use legal terms.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>
                  <button
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Voice input"
                  >
                    <Mic size={16} />
                  </button>
                  <button
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Change language"
                  >
                    <Globe size={16} />
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                    className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all duration-150"
                    aria-label="Send message"
                  >
                    <Send size={14} />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Example prompts */}
            <div className="mt-4 flex flex-wrap gap-2">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handlePromptClick(prompt.text)}
                  className="flex items-center gap-1.5 bg-card border border-border text-[13px] text-foreground/70 px-3 py-1.5 rounded-full hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-150 active:scale-95"
                  aria-label={`Use example: ${prompt.text}`}
                >
                  <span>{prompt.icon}</span>
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center gap-6 flex-wrap">
              {[
                { value: '12+', label: 'Indian languages' },
                { value: 'RTI', label: 'Application builder' },
                { value: '100%', label: 'Source-backed' },
              ].map((stat) => (
                <div key={`hero-stat-${stat.label}`} className="flex items-center gap-2">
                  <span className="text-[18px] font-bold text-primary">{stat.value}</span>
                  <span className="text-[13px] text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="hidden lg:flex items-center justify-center">
            <CivicFlowViz />
          </div>
        </div>
      </div>
    </section>
  );
}