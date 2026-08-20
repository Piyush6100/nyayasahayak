import React from 'react';
import Navbar from '@/components/Navbar';
import RTIWizard from './components/RTIWizard';

export default function RTIAssistantPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-16 md:pb-0" id="main-content">
        <RTIWizard />
      </main>
    </div>
  );
}