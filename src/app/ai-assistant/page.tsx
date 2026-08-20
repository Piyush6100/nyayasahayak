import React from 'react';
import Navbar from '@/components/Navbar';
import AssistantLayout from './components/AssistantLayout';

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col pt-16 pb-16 md:pb-0" id="main-content">
        <AssistantLayout />
      </main>
    </div>
  );
}