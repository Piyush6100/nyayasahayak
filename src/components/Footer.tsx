import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const productLinks = [
  { label: 'AI Assistant', href: '/ai-assistant' },
  { label: 'RTI Assistant', href: '/rti-assistant' },
  { label: 'Schemes', href: '/schemes' },
  { label: 'My Cases', href: '/cases' },
];

const resourceLinks = [
  { label: 'Help', href: '/help' },
  { label: 'Accessibility', href: '/profile' },
  { label: 'Privacy', href: '/' },
];

const legalLinks = [
  { label: 'Terms of Use', href: '/' },
  { label: 'Disclaimer', href: '/' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-14 pb-20 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={32} />
              <span className="font-semibold text-[17px] tracking-tight">NyayaSahayak</span>
            </div>
            <p className="text-primary-foreground/70 text-[14px] leading-relaxed">
              Understand your rights.<br />
              Know your options.<br />
              Take action.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-primary-foreground/50 mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks?.map((link) => (
                <li key={`footer-product-${link?.href}`}>
                  <Link href={link?.href} className="text-[14px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-primary-foreground/50 mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks?.map((link) => (
                <li key={`footer-resource-${link?.label}`}>
                  <Link href={link?.href} className="text-[14px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-primary-foreground/50 mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks?.map((link) => (
                <li key={`footer-legal-${link?.label}`}>
                  <Link href={link?.href} className="text-[14px] text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-primary-foreground/15 pt-8">
          <p className="text-[13px] text-primary-foreground/50 leading-relaxed max-w-3xl">
            <span className="font-semibold text-primary-foreground/70">Important Disclaimer: </span>
            NyayaSahayak provides informational assistance only and does not replace professional legal advice or official government services. Always verify important information with the relevant official source or consult a qualified legal professional.
          </p>
          <p className="text-[12px] text-primary-foreground/35 mt-4">
            © 2026 NyayaSahayak. Built for civic empowerment.
          </p>
        </div>
      </div>
    </footer>
  );
}