import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'NyayaSahayak — Civic & Legal Help Made Simple',
  description: 'Understand civic processes, explore your options, prepare RTI applications and navigate government services with AI-powered assistance.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" richColors />

        <Script
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fnyayasahay1878back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20"
          strategy="lazyOnload"
        />
        <Script
          src="https://static.rocket.new/rocket-shot.js?v=0.0.2"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}