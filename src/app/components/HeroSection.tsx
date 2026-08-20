'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Paperclip, Globe, Send, X, FileText } from 'lucide-react';
import { toast } from 'sonner';
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
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handlePromptClick = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      toast.info('Voice input stopped');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error('Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Listening... Speak your query');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        if (transcript) {
          setInputValue((prev) => {
            const separator = prev && !prev.endsWith(' ') ? ' ' : '';
            return `${prev}${separator}${transcript.trim()}`;
          });
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast.error('Microphone permission denied.');
        } else if (event.error !== 'no-speech') {
          toast.error(`Voice error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      toast.error('Could not start voice input: ' + (err.message || 'Unknown error'));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    setAttachedFile({ name: file.name, size: sizeStr });
    toast.success(`Attached: ${file.name}`);
  };

  const handleSubmit = () => {
    if (inputValue.trim() || attachedFile) {
      if (typeof window !== 'undefined') {
        const queryText = inputValue.trim() || (attachedFile ? `I have attached document: ${attachedFile.name}` : '');
        sessionStorage.setItem('nyaya_initial_prompt', queryText);
      }
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
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

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
              className={`relative bg-card rounded-2xl transition-all duration-200 ${isFocused ? 'shadow-input-focus' : 'shadow-input'
                } ${isListening ? 'ring-2 ring-accent border-accent' : ''}`}
            >
              {/* Voice recording live badge */}
              {isListening && (
                <div className="flex items-center justify-between px-4 pt-3 pb-1 text-accent text-[12px] font-semibold animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                    <span>Listening to your voice... Speak now</span>
                  </div>
                  <button
                    onClick={toggleListening}
                    className="text-xs bg-accent text-white px-2 py-0.5 rounded-full"
                  >
                    Stop
                  </button>
                </div>
              )}

              {/* Attachment chip */}
              {attachedFile && (
                <div className="px-4 pt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-lg text-[12px] font-medium">
                    <FileText size={13} />
                    <span className="truncate max-w-[180px]">{attachedFile.name}</span>
                    <span className="text-[10px] opacity-75">({attachedFile.size})</span>
                    <button
                      onClick={() => setAttachedFile(null)}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}

              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening..." : "Tell us what happened..."}
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
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-2 rounded-lg transition-colors ${attachedFile ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    title="Attach file (PDF, Word, Images)"
                    aria-label="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2 rounded-lg transition-all ${isListening
                      ? 'bg-accent text-white shadow-md animate-bounce'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    title={isListening ? 'Stop voice input' : 'Voice input'}
                    aria-label="Voice input"
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toast.info('Language can be switched in top navbar or AI assistant');
                    }}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Change language"
                  >
                    <Globe size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!inputValue.trim() && !attachedFile}
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