'use client';

import React, { useState } from 'react';
import ConversationSidebar from './ConversationSidebar';
import ChatArea from './ChatArea';
import { demoMessages, type Message, type MessageAttachment } from '@/data/demoConversations';
import { Menu, X } from 'lucide-react';

export default function AssistantLayout() {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  const processingStages = [
    'Analyzing your query & attached files...',
    'Reviewing legal provisions & official guidelines...',
    'Structuring actionable advice and document checklist...',
  ];

  const handleSend = async (content: string, attachments?: MessageAttachment[]) => {
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      attachments: attachments && attachments.length > 0 ? attachments : undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);
    setProcessingStage(0);

    // Call actual API
    const stageInterval = setInterval(() => {
      setProcessingStage((s) => {
        if (s >= processingStages.length - 1) {
          clearInterval(stageInterval);
          return s;
        }
        return s + 1;
      });
    }, 800);

    try {
      const { sendMessage } = await import('@/lib/api/assistant');
      const aiMsg = await sendMessage(content);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      clearInterval(stageInterval);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden absolute top-4 left-4 z-30 p-2 rounded-xl bg-card border border-border shadow-card"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-20 lg:z-auto w-72 h-full bg-card border-r border-border transition-transform duration-300 lg:transition-none flex flex-col`}
      >
        <ConversationSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea
          messages={messages}
          isProcessing={isProcessing}
          processingStage={processingStages[processingStage]}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}