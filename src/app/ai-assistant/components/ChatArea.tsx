'use client';

import React, { useRef, useEffect } from 'react';
import { type Message, type MessageAttachment } from '@/data/demoConversations';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';
import MessageComposer from './MessageComposer';

interface Props {
  messages: Message[];
  isProcessing: boolean;
  processingStage: string;
  onSend: (content: string, attachments?: MessageAttachment[]) => void;
}

export default function ChatArea({ messages, isProcessing, processingStage, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
        <h1 className="text-[18px] font-semibold text-foreground">How can we help?</h1>
        <p className="text-[13px] text-muted-foreground">Describe your situation, attach documents, or use your microphone.</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 lg:px-8 py-6 space-y-6">
        {messages.map((msg) =>
          msg.role === 'user' ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <AIMessage key={msg.id} message={msg} />
          )
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-primary-foreground">NS</span>
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex gap-1" aria-label="AI is processing" role="status">
                  <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
                </div>
                <p className="text-[13px] text-muted-foreground">{processingStage}</p>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-4 lg:px-8 py-4 border-t border-border bg-card/80 backdrop-blur-sm">
        <MessageComposer onSend={onSend} disabled={isProcessing} />
      </div>
    </div>
  );
}