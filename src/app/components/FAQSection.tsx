'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Send, Mail, FileText, CheckCircle2, Loader2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is NyayaSahayak and how does it help citizens?',
    answer:
      'NyayaSahayak is an AI-powered civic and legal empowerment platform for Indian citizens. It explains your legal rights in simple terms, checks eligibility for welfare schemes, and generates ready-to-file RTI applications.',
  },
  {
    id: 'faq-2',
    question: 'Is NyayaSahayak a replacement for a practicing advocate?',
    answer:
      'No. NyayaSahayak provides legal literacy, statutory guidance, procedural roadmaps, and document draft generation. For contested court litigation or representation before a judge, consulting an advocate is recommended.',
  },
  {
    id: 'faq-3',
    question: 'How does the RTI Assistant work and can I download a PDF?',
    answer:
      'The RTI Assistant structures your request under Section 6(1) of the RTI Act, 2005, includes fee/exemption details, addresses the PIO, and generates a standardized printable A4 PDF ready for submission.',
  },
  {
    id: 'faq-4',
    question: 'What is the government response timeline for an RTI?',
    answer:
      'Under Section 7(1) of the RTI Act, 2005, the Public Information Officer (PIO) must respond within 30 days of receiving the request. For matters concerning life or liberty, the deadline is 48 hours.',
  },
  {
    id: 'faq-5',
    question: 'How does the Government Schemes eligibility finder work?',
    answer:
      'By matching state, occupation, age, and annual income criteria, NyayaSahayak identifies eligible Central and State welfare benefits and guides you through the application process.',
  },
  {
    id: 'faq-6',
    question: 'Is my personal information and consultation private?',
    answer:
      'Yes. Your conversations, document drafts, and personal data are encrypted and held strictly confidential. We never share your data with unauthorized third parties.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { user, profile } = useAuth();

  // Contact form state
  const email = user?.email || '';
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to send a message');
      return;
    }
    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      toast.success('Your message has been sent successfully! Our team will reach out soon.');
      setSubject('');
      setDescription('');
      
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while sending the message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-16 pb-8 lg:pt-20 lg:pb-10 bg-secondary/30 border-t border-border" aria-labelledby="faq-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-full px-3.5 py-1.5 mb-3.5 shadow-sm">
            <HelpCircle size={14} className="text-amber-600 dark:text-amber-400" />
            <span className="text-[12px] font-semibold text-amber-700 dark:text-amber-300 tracking-wider uppercase">
              Help & Support Center
            </span>
          </div>
          <h2 id="faq-heading" className="text-[2rem] lg:text-[2.4rem] font-bold text-foreground tracking-tight mb-2.5">
            Frequently Asked Questions & Contact
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Find quick answers to common legal and civic questions, or send a direct inquiry to our team.
          </p>
        </div>

        {/* 50/50 Equal Size & Width Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: FAQ Card */}
          <div className="bg-card/90 backdrop-blur-md border border-border/90 rounded-3xl p-6 lg:p-8 shadow-xl shadow-primary/5 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-primary text-[12px] font-bold uppercase tracking-wider mb-1">
                    <HelpCircle size={14} />
                    <span>Quick Answers</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-foreground">Frequently Asked Questions</h3>
                </div>
                <span className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-medium px-2.5 py-1 rounded-full">
                  6 Topics
                </span>
              </div>

              {/* Accordion list */}
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'bg-card border-primary/30 shadow-card'
                          : 'bg-secondary/40 border-border/70 hover:border-border hover:bg-card/80'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3.5 focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <span className="text-[14px] font-semibold text-foreground leading-snug">
                          {faq.question}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? 'bg-primary/10 text-primary rotate-180' : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <ChevronDown size={14} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-0 border-t border-border/40 text-[13px] text-muted-foreground leading-relaxed">
                          <p className="pt-2.5">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Us Card */}
          <div className="bg-card/90 backdrop-blur-md border border-border/90 rounded-3xl p-6 lg:p-8 shadow-xl shadow-primary/5 flex flex-col justify-between">
            <div>
              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-primary text-[12px] font-bold uppercase tracking-wider mb-1">
                    <Mail size={14} />
                    <span>Help Desk & Inquiries</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-foreground">Contact Us</h3>
                </div>
                {user && (
                  <span className="text-[11px] bg-success/10 border border-success/20 text-success font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Logged In
                  </span>
                )}
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-success/15 border border-success/25 flex items-center justify-center mx-auto text-success">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-[17px] font-bold text-foreground">Message Sent!</h4>
                  <p className="text-[13.5px] text-muted-foreground max-w-xs mx-auto">
                    Thank you for reaching out. We have logged your query and our team will get back to you shortly.
                  </p>
                </div>
              ) : !user ? (
                /* Not signed in — show lock prompt */
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                    <LogIn size={26} />
                  </div>
                  <h4 className="text-[17px] font-bold text-foreground">Sign In Required</h4>
                  <p className="text-[13.5px] text-muted-foreground max-w-xs mx-auto">
                    Please sign in to your account to send us a message.
                  </p>
                  <a
                    href="/login"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-primary/90 transition-all"
                  >
                    <LogIn size={15} />
                    Sign In
                  </a>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Email Field (read-only, from account) */}
                  <div>
                    <label className="block text-[12px] font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                      Email
                      <span className="text-[11px] font-normal text-muted-foreground lowercase ml-1">(from account)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                        <Mail size={15} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-[13.5px] text-muted-foreground outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-[12px] font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                        <FileText size={15} />
                      </div>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Question on RTI draft / Scheme status"
                        className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div>
                    <label className="block text-[12px] font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your query, feedback, or legal assistance question..."
                      rows={5}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-sm disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
