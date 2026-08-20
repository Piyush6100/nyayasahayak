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

    const stageInterval = setInterval(() => {
      setProcessingStage((s) => {
        if (s >= processingStages.length - 1) {
          clearInterval(stageInterval);
          return s;
        }
        return s + 1;
      });
    }, 800);

    await new Promise((r) => setTimeout(r, 2400));
    clearInterval(stageInterval);
    setIsProcessing(false);

    // Generate intelligent contextual response
    let understandingText = 'I have reviewed your query regarding your civic/legal matter.';
    if (attachments && attachments.length > 0) {
      const fileNames = attachments.map(a => a.name).join(', ');
      understandingText = `I have received and processed your attached document (${fileNames}). Based on the provided details, here is a structured breakdown of your rights, statutory options, and recommended next steps.`;
    } else if (content.toLowerCase().includes('rti')) {
      understandingText = 'You are seeking to file an application under the Right to Information (RTI) Act, 2005. Public authorities are required by law to provide requested information within 30 days of receiving the application.';
    } else if (content.toLowerCase().includes('deposit') || content.toLowerCase().includes('landlord') || content.toLowerCase().includes('rent')) {
      understandingText = 'Your tenancy issue involves security deposit withholding. Under the Model Tenancy Act and Indian contract law, landlords must return deposits after legitimate verified deductions within 30 days.';
    }

    const aiMsg: Message = {
      id: `msg-ai-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      sources: [
        { id: `src-1-${Date.now()}`, title: 'Right to Information Act, 2005', section: 'Section 6(1)', type: 'act' },
        { id: `src-2-${Date.now()}`, title: 'Consumer Protection Act, 2019', section: 'Section 35', type: 'act' },
        { id: `src-3-${Date.now()}`, title: 'Citizen Charter Guidelines', section: 'Standard Redressal Timelines', type: 'guideline' },
      ],
      structured: {
        understanding: understandingText,
        options: [
          'Submit a formal written petition or RTI application with the competent authority',
          'Send a legal demand notice with a 15-day statutory response period',
          'Lodge a grievance on the National Consumer Helpline or State Citizen Portal (e-Gram / CPGRAMS)',
          'Escalate to the District Ombudsman / Appellate Authority if unresolved',
        ],
        documents: [
          'Proof of transaction / receipts / bank statements',
          'Written communications (emails, letters, formal notices)',
          'Identity and address verification (Aadhaar / Voter ID)',
          attachments && attachments.length > 0 ? `Attached file: ${attachments[0].name}` : 'Relevant application / complaint forms',
        ],
        nextSteps: [
          'Download or draft the formal application using NyayaSahayak generator',
          'Attach self-attested copies of the listed supporting evidence',
          'Submit via Registered Post with Acknowledgment Due (RPAD) or online portal',
          'Track reference number on the "My Cases" page for status updates',
        ],
      },
    };
    setMessages((prev) => [...prev, aiMsg]);
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