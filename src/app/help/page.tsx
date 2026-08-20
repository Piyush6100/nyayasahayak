'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, FileText, MessageSquare, Landmark, FolderOpen, Globe, Scale } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';


const faqs = [
  {
    id: 'faq-1',
    question: 'What is NyayaSahayak?',
    answer: 'NyayaSahayak is an AI-powered civic and legal empowerment platform. It helps ordinary citizens understand their rights, explore government schemes, create RTI applications, and navigate civic processes — all in simple, accessible language. It is not a substitute for professional legal advice.',
  },
  {
    id: 'faq-2',
    question: 'How does the AI assistant work?',
    answer: 'The AI assistant understands your problem described in plain language and provides structured guidance: what the situation means, what your possible options are, what documents you may need, and what your next steps could be. All responses are grounded in official sources and clearly labeled as informational guidance.',
  },
  {
    id: 'faq-3',
    question: 'How do I create an RTI application?',
    answer: 'Go to the RTI Assistant page. You will be guided through a 6-step wizard: describe the information you need, select the department, provide location details, add additional context, review the application, and generate the final document. The document preview updates in real-time as you fill in the form.',
  },
  {
    id: 'faq-4',
    question: 'How do I save a case?',
    answer: 'When you use the AI Assistant or RTI Wizard, your conversations and documents are automatically saved as cases. You can view all your cases on the My Cases page, track their progress, and access your documents at any time.',
  },
  {
    id: 'faq-5',
    question: 'How do I change the language?',
    answer: 'Click the language selector in the top navigation bar (the globe icon). You can switch between English, Hindi (हिन्दी), and Gujarati (ગુજરાતી). The interface and example conversations will update to reflect your selected language.',
  },
  {
    id: 'faq-6',
    question: 'Is this legal advice?',
    answer: 'No. NyayaSahayak provides informational guidance only. It helps you understand possible options and navigate civic processes, but it does not provide professional legal advice. For important legal matters, always consult a qualified legal professional and verify information with the relevant official source.',
  },
  {
    id: 'faq-7',
    question: 'Are the government schemes shown real?',
    answer: 'The scheme information shown in the demo is illustrative only and may not reflect current, accurate government scheme details. Always verify scheme eligibility and details directly with the relevant government ministry or official portal.',
  },
  {
    id: 'faq-8',
    question: 'Is my data private?',
    answer: 'NyayaSahayak is designed with privacy in mind. Only provide information necessary for your request. In the current demo version, data is stored locally in your browser. We recommend not entering sensitive personal information in demo mode.',
  },
];

const quickLinks = [
  { icon: MessageSquare, label: 'AI Assistant', href: '/ai-assistant', description: 'Get help with any civic or legal question' },
  { icon: FileText, label: 'RTI Assistant', href: '/rti-assistant', description: 'Create an RTI application step by step' },
  { icon: Landmark, label: 'Schemes', href: '/schemes', description: 'Find government schemes you may be eligible for' },
  { icon: FolderOpen, label: 'My Cases', href: '/cases', description: 'Track your requests and documents' },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 md:pb-0" id="main-content">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-12">
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 py-1 mb-4">
              <HelpCircle size={13} className="text-primary" />
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">Help Center</span>
            </div>
            <h1 className="text-[2rem] lg:text-[2.25rem] font-bold text-foreground mb-2">How can we help?</h1>
            <p className="text-[15px] text-muted-foreground max-w-xl">
              Find answers to common questions about NyayaSahayak and how to use the platform.
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* FAQ */}
            <div className="lg:col-span-2">
              <h2 className="text-[18px] font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs?.map((faq) => {
                  const isOpen = openFaq === faq?.id;
                  return (
                    <div
                      key={faq?.id}
                      className={`bg-card border rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen ? 'border-primary/25 shadow-card' : 'border-border'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : faq?.id)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-[14px] font-semibold leading-snug pr-4 ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                          {faq?.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={16} className="text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-border/60">
                          <p className="text-[14px] text-muted-foreground leading-relaxed pt-4">{faq?.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <div className="mt-8 p-5 bg-muted/50 border border-border rounded-2xl">
                <div className="flex items-start gap-3">
                  <Scale size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-semibold text-foreground mb-1">Important Notice</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      NyayaSahayak provides informational guidance only. It does not constitute legal advice and should not be relied upon as a substitute for professional legal counsel. Always verify important information with the relevant official source.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Quick links */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-bold text-foreground mb-4">Quick Links</h2>
                <div className="space-y-3">
                  {quickLinks?.map((link) => {
                    const Icon = link?.icon;
                    return (
                      <Link
                        key={link?.href}
                        href={link?.href}
                        className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/25 hover:shadow-card transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">{link?.label}</p>
                          <p className="text-[12px] text-muted-foreground mt-0.5">{link?.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={16} className="text-primary" />
                  <p className="text-[14px] font-semibold text-foreground">Need more help?</p>
                </div>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
                  Describe your problem to the AI assistant and get structured guidance tailored to your situation.
                </p>
                <Link
                  href="/ai-assistant"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-[13px] font-semibold hover:bg-primary/90 transition-all"
                >
                  Ask AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
