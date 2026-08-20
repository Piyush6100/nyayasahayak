'use client';

import React, { useState } from 'react';
import { User, Globe, Accessibility, Shield, Bell, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'gu', label: 'ગુજરાતી' },
];

export default function ProfilePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [textSize, setTextSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [voiceAssist, setVoiceAssist] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 md:pb-0" id="main-content">
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-[1.75rem] font-bold text-foreground">My Profile</h1>
                <p className="text-[14px] text-muted-foreground">Manage your preferences and settings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar tabs */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs?.map((tab) => {
                  const Icon = tab?.icon;
                  return (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors text-left ${
                        activeTab === tab?.id
                          ? 'bg-primary/8 text-primary' :'text-foreground/70 hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} />
                      {tab?.label}
                      {activeTab === tab?.id && <ChevronRight size={14} className="ml-auto" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-[16px] font-semibold text-foreground mb-6">Profile Information</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Name</label>
                      <input type="text" defaultValue="Demo User" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Email</label>
                      <input type="email" defaultValue="demo@nyayasahayak.in" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">State</label>
                      <select className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                        {['Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu']?.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-primary/90 transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-[16px] font-semibold text-foreground mb-2">Language Preference</h2>
                  <p className="text-[13px] text-muted-foreground mb-6">Choose the language for the interface and AI responses.</p>
                  <div className="space-y-3 max-w-sm">
                    {languages?.map((lang) => (
                      <button
                        key={lang?.code}
                        onClick={() => setSelectedLang(lang?.code)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-[14px] font-medium transition-all ${
                          selectedLang === lang?.code
                            ? 'border-primary bg-primary/5 text-primary' :'border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        {lang?.label}
                        {selectedLang === lang?.code && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'accessibility' && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-[16px] font-semibold text-foreground mb-2">Accessibility Settings</h2>
                  <p className="text-[13px] text-muted-foreground mb-6">Customize the interface for your needs.</p>
                  <div className="space-y-5 max-w-md">
                    <div>
                      <label className="block text-[13px] font-semibold text-foreground mb-3">Text Size</label>
                      <div className="flex gap-2">
                        {['small', 'normal', 'large', 'x-large']?.map((size) => (
                          <button
                            key={size}
                            onClick={() => setTextSize(size)}
                            className={`px-3 py-2 rounded-lg border text-[12px] font-medium transition-colors capitalize ${
                              textSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:bg-muted'
                            }`}
                          >
                            {size === 'x-large' ? 'XL' : size?.charAt(0)?.toUpperCase() + size?.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    {[
                      { key: 'highContrast', label: 'High Contrast', desc: 'Increase contrast for better readability', value: highContrast, setter: setHighContrast },
                      { key: 'reducedMotion', label: 'Reduced Motion', desc: 'Minimize animations and transitions', value: reducedMotion, setter: setReducedMotion },
                      { key: 'voiceAssist', label: 'Voice Assistance', desc: 'Enable voice input and text-to-speech', value: voiceAssist, setter: setVoiceAssist },
                    ]?.map((setting) => (
                      <div key={setting?.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-[14px] font-medium text-foreground">{setting?.label}</p>
                          <p className="text-[12px] text-muted-foreground">{setting?.desc}</p>
                        </div>
                        <button
                          onClick={() => setting?.setter(!setting?.value)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${setting?.value ? 'bg-primary' : 'bg-muted'}`}
                          role="switch"
                          aria-checked={setting?.value}
                          aria-label={setting?.label}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${setting?.value ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-[16px] font-semibold text-foreground mb-2">Privacy Settings</h2>
                  <p className="text-[13px] text-muted-foreground mb-6">Control how your data is used.</p>
                  <div className="space-y-4 max-w-md">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-[13px] font-semibold text-foreground mb-1">Data Storage</p>
                      <p className="text-[12px] text-muted-foreground">In demo mode, your conversations and cases are stored locally in your browser only. No data is sent to external servers.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-[13px] font-semibold text-foreground mb-1">Personal Information</p>
                      <p className="text-[12px] text-muted-foreground">Only provide information necessary for your request. Avoid sharing sensitive personal details unless required.</p>
                    </div>
                    <button className="text-[13px] text-destructive hover:underline font-medium">
                      Clear all local data
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-[16px] font-semibold text-foreground mb-2">Notification Preferences</h2>
                  <p className="text-[13px] text-muted-foreground mb-6">Choose what updates you want to receive.</p>
                  <div className="space-y-4 max-w-md">
                    {[
                      { label: 'Case updates', desc: 'Get notified when your case status changes' },
                      { label: 'Document ready', desc: 'Alert when a document is generated' },
                      { label: 'Scheme alerts', desc: 'New schemes matching your profile' },
                    ]?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-[14px] font-medium text-foreground">{item?.label}</p>
                          <p className="text-[12px] text-muted-foreground">{item?.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(!notifications)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-muted'}`}
                          role="switch"
                          aria-checked={notifications}
                          aria-label={item?.label}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
