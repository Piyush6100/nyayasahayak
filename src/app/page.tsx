import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustSection from '@/app/components/TrustSection';
import QuickActionsSection from '@/app/components/QuickActionsSection';
import ProblemCategoriesSection from '@/app/components/ProblemCategoriesSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import RTIInteractiveSection from '@/app/components/RTIInteractiveSection';
import MultilingualSection from '@/app/components/MultilingualSection';
import SchemeEligibilitySection from '@/app/components/SchemeEligibilitySection';
import CaseTrackingPreview from '@/app/components/CaseTrackingPreview';
import FinalCTASection from '@/app/components/FinalCTASection';

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