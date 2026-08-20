'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, HelpCircle, User, ChevronDown, Home, MessageSquare, FileText, Landmark, FolderOpen } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';


const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'AI Assistant', href: '/ai-assistant' },
  { label: 'RTI Assistant', href: '/rti-assistant' },
  { label: 'Schemes', href: '/schemes' },
  { label: 'My Cases', href: '/cases' },
];

const mobileNavLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Assistant', href: '/ai-assistant', icon: MessageSquare },
  { label: 'RTI', href: '/rti-assistant', icon: FileText },
  { label: 'Schemes', href: '/schemes', icon: Landmark },
  { label: 'Cases', href: '/cases', icon: FolderOpen },
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'gu', label: 'ગુજરાતી' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages?.[0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-sm border-b border-border' : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav
          className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="NyayaSahayak home">
            <AppLogo size={32} />
            <span className="font-semibold text-[17px] text-primary tracking-tight hidden sm:block">
              NyayaSahayak
            </span>
          </Link>

          {/* Desktop center nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks?.map((link) => {
              const isActive = pathname === link?.href;
              return (
                <Link
                  key={`nav-${link?.href}`}
                  href={link?.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-primary' :'text-foreground/65 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link?.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-primary rounded-full" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Language selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                aria-label="Change language"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <Globe size={15} />
                <span>{selectedLang?.label}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-xl shadow-card-hover py-1 z-50"
                  role="listbox"
                  aria-label="Language options"
                >
                  {languages?.map((lang) => (
                    <button
                      key={`lang-${lang?.code}`}
                      role="option"
                      aria-selected={selectedLang?.code === lang?.code}
                      onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-[13px] transition-colors duration-100 ${
                        selectedLang?.code === lang?.code
                          ? 'text-primary font-medium bg-primary/5' :'text-foreground hover:bg-muted'
                      }`}
                    >
                      {lang?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/help"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              aria-label="Help"
            >
              <HelpCircle size={15} />
              <span>Help</span>
            </Link>

            <Link
              href="/profile"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              aria-label="Profile"
            >
              <User size={15} />
              <span>Profile</span>
            </Link>

            <Link
              href="/ai-assistant"
              className="hidden md:flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-[13.5px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-sm ml-1"
              aria-label="Get Help"
            >
              Get Help
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-card p-4 space-y-1">
            {navLinks?.map((link) => (
              <Link
                key={`mobile-nav-${link?.href}`}
                href={link?.href}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  pathname === link?.href
                    ? 'bg-primary/8 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2 space-y-1">
              <Link href="/help" className="block px-4 py-2.5 rounded-xl text-[14px] text-muted-foreground hover:bg-muted transition-colors">Help</Link>
              <Link href="/profile" className="block px-4 py-2.5 rounded-xl text-[14px] text-muted-foreground hover:bg-muted transition-colors">Profile</Link>
            </div>
            <div className="pt-2 border-t border-border mt-2">
              {languages?.map((lang) => (
                <button
                  key={`mobile-lang-${lang?.code}`}
                  onClick={() => { setSelectedLang(lang); setMobileOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-[14px] transition-colors ${
                    selectedLang?.code === lang?.code ? 'text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {lang?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card border-t border-border"
        aria-label="Mobile bottom navigation"
      >
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {mobileNavLinks?.map((link) => {
            const Icon = link?.icon;
            const isActive = pathname === link?.href;
            return (
              <Link
                key={`bottom-nav-${link?.href}`}
                href={link?.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-[52px] ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={link?.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
                <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>{link?.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}