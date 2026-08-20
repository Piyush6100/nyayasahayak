import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustSection from '@/app/components/TrustSection';

// Lazy-load below-the-fold sections to reduce initial bundle size
const QuickActionsSection = dynamic(() => import('@/app/components/QuickActionsSection'));
const ProblemCategoriesSection = dynamic(() => import('@/app/components/ProblemCategoriesSection'));
const HowItWorksSection = dynamic(() => import('@/app/components/HowItWorksSection'));
const RTIInteractiveSection = dynamic(() => import('@/app/components/RTIInteractiveSection'));
const MultilingualSection = dynamic(() => import('@/app/components/MultilingualSection'));
const SchemeEligibilitySection = dynamic(() => import('@/app/components/SchemeEligibilitySection'));
const CaseTrackingPreview = dynamic(() => import('@/app/components/CaseTrackingPreview'));
const FinalCTASection = dynamic(() => import('@/app/components/FinalCTASection'));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pb-16 md:pb-0">
        <HeroSection />
        <TrustSection />
        <QuickActionsSection />
        <ProblemCategoriesSection />
        <HowItWorksSection />
        <RTIInteractiveSection />
        <MultilingualSection />
        <SchemeEligibilitySection />
        <CaseTrackingPreview />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}