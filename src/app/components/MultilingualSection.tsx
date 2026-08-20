'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { id: 'lang-en', code: 'en', label: 'English' },
  { id: 'lang-hi', code: 'hi', label: 'हिन्दी' },
  { id: 'lang-gu', code: 'gu', label: 'ગુજરાતી' },
];

const conversations: Record<string, { user: string; ai: string }> = {
  en: {
    user: 'I want to file an RTI application.',
    ai: 'Yes, I can help you prepare an RTI application. Let me ask a few details to structure it correctly under the Right to Information Act, 2005.',
  },
  hi: {
    user: 'मुझे RTI दाखिल करनी है।',
    ai: 'हाँ, मैं आपको RTI आवेदन तैयार करने में मदद कर सकता हूँ। सूचना का अधिकार अधिनियम, 2005 के तहत इसे सही ढंग से संरचित करने के लिए मुझे कुछ विवरण चाहिए।',
  },
  gu: {
    user: 'મારે RTI ફાઇલ કરવી છે.',
    ai: 'હા, હું તમને RTI અરજી તૈયાર કરવામાં મદદ કરી શકું છું. Right to Information Act, 2005 અંતર્ગત તેને યોગ્ય રીતે ગોઠવવા માટે મને થોડી વિગતો જોઈએ.',
  },
};

export default function MultilingualSection() {
  const [selectedLang, setSelectedLang] = useState('en');
  const conv = conversations[selectedLang];

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground" aria-labelledby="multilingual-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-3 py-1.5 mb-6">
              <Globe size={13} className="text-primary-foreground/70" />
              <span className="text-[12px] font-semibold text-primary-foreground/70 uppercase tracking-wider">Multilingual</span>
            </div>
            <h2 id="multilingual-heading" className="text-[1.75rem] lg:text-[2rem] font-bold mb-4">
              Your language should never be a barrier.
            </h2>
            <p className="text-[15px] text-primary-foreground/70 leading-relaxed mb-8 max-w-md">
              NyayaSahayak works in English, Hindi, Gujarati, and more Indian languages. Describe your problem in the language you&apos;re most comfortable with.
            </p>

            {/* Language switcher */}
            <div className="flex gap-2 flex-wrap">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`px-5 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                    selectedLang === lang.code
                      ? 'bg-primary-foreground text-primary shadow-sm'
                      : 'bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20'
                  }`}
                  aria-pressed={selectedLang === lang.code}
                  aria-label={`Switch to ${lang.label}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demo conversation */}
          <div className="bg-primary-foreground/8 border border-primary-foreground/15 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-semibold text-primary-foreground/70">You</span>
                </div>
                <div className="bg-primary-foreground/12 border border-primary-foreground/15 rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] text-primary-foreground leading-relaxed transition-all duration-300">
                  {conv.user}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-white">NS</span>
                </div>
                <div className="bg-primary-foreground/8 border border-primary-foreground/15 rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] text-primary-foreground/85 leading-relaxed transition-all duration-300">
                  {conv.ai}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-primary-foreground/40 mt-4 text-center">
              Demo conversation — switch language above
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}