import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustSection from '@/app/components/TrustSection';

// Lazy-load below-the-fold sections to reduce initial bundle size
const QuickActionsSection = dynamic(() => import('@/app/components/QuickActionsSection'));
const HowItWorksSection = dynamic(() => import('@/app/components/HowItWorksSection'));
const FAQSection = dynamic(() => import('@/app/components/FAQSection'));
const FinalCTASection = dynamic(() => import('@/app/components/FinalCTASection'));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pb-16 md:pb-0">
        <HeroSection />
        <TrustSection />
        <QuickActionsSection />
        <HowItWorksSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}