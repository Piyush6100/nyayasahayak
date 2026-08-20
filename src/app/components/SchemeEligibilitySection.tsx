'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Landmark, CheckCircle, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { demoSchemes } from '@/data/demoSchemes';

interface Profile {
  age: string;
  state: string;
  occupation: string;
  income: string;
}

const defaultProfile: Profile = {
  age: '21',
  state: 'Gujarat',
  occupation: 'Student',
  income: '2.5',
};

const matchConfig = {
  high: { icon: CheckCircle, label: 'High match', color: 'text-success', bg: 'bg-success/8 border-success/20' },
  medium: { icon: AlertCircle, label: 'Medium match', color: 'text-warning', bg: 'bg-warning/8 border-warning/20' },
  needs_info: { icon: Info, label: 'Needs more info', color: 'text-muted-foreground', bg: 'bg-muted border-border' },
};

export default function SchemeEligibilitySection() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [showResults, setShowResults] = useState(true);

  const matchedSchemes = useMemo(() => {
    const ageNum = parseInt(profile.age) || 20;
    const incomeNum = parseFloat(profile.income) || 3.0;

    return demoSchemes.filter((s) => {
      const matchState = s.state === 'All States' || s.state.toLowerCase() === profile.state.toLowerCase();
      const matchOcc = s.occupations.includes(profile.occupation) || s.occupations.length === 0;
      const matchAge = ageNum >= s.minAge && ageNum <= s.maxAge;
      const matchIncome = s.maxIncomeLakhs >= incomeNum || s.maxIncomeLakhs === 999;

      return matchState || (matchOcc && matchAge && matchIncome);
    }).slice(0, 4);
  }, [profile]);

  return (
    <section className="py-16 lg:py-24 bg-secondary/40" aria-labelledby="schemes-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-3 py-1 mb-4">
            <Landmark size={13} className="text-success" />
            <span className="text-[12px] font-semibold text-success uppercase tracking-wider">Scheme Eligibility</span>
          </div>
          <h2 id="schemes-heading" className="text-[1.75rem] lg:text-[2rem] font-bold text-foreground mb-3">
            Find what you may be eligible for.
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-xl">
            Enter your profile details to see which government schemes match your situation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile form */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6">
            <h3 className="text-[15px] font-semibold text-foreground mb-5">Your Profile</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scheme-age" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Age</label>
                  <input
                    id="scheme-age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    min="1"
                    max="100"
                    aria-label="Age"
                  />
                </div>
                <div>
                  <label htmlFor="scheme-state" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">State</label>
                  <select
                    id="scheme-state"
                    value={profile.state}
                    onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    aria-label="State"
                  >
                    {['Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh'].map((s) => (
                      <option key={`state-${s}`} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="scheme-occupation" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Occupation</label>
                <select
                  id="scheme-occupation"
                  value={profile.occupation}
                  onChange={(e) => setProfile((p) => ({ ...p, occupation: e.target.value }))}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  aria-label="Occupation"
                >
                  {['Student', 'Farmer', 'Self-employed', 'Salaried', 'Unemployed', 'Senior Citizen'].map((o) => (
                    <option key={`occ-${o}`} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="scheme-income" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Annual Family Income (₹ Lakhs)</label>
                <input
                  id="scheme-income"
                  type="number"
                  step="0.5"
                  value={profile.income}
                  onChange={(e) => setProfile((p) => ({ ...p, income: e.target.value }))}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-[14px] text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  aria-label="Annual family income in lakhs"
                />
              </div>
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150"
              >
                Check Eligibility
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[13px] font-semibold text-foreground">
                {showResults ? `Showing matches for ${profile.occupation} in ${profile.state} (Age ${profile.age})` : 'Fill your profile to see matches'}
              </p>
              <Link href="/schemes" className="text-[12px] text-primary font-semibold hover:underline flex items-center gap-1">
                <span>View All Schemes</span>
                <ArrowRight size={12} />
              </Link>
            </div>
            {showResults && (
              matchedSchemes.length > 0 ? (
                matchedSchemes.map((scheme) => {
                  const config = matchConfig[scheme.matchLevel];
                  const Icon = config.icon;
                  return (
                    <div key={scheme.id} className={`flex gap-4 p-4 rounded-xl border ${config.bg} transition-all duration-200 hover:shadow-card`}>
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon size={16} className={config.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-[13px] font-semibold text-foreground leading-snug">{scheme.title}</h4>
                          <span className={`text-[11px] font-medium flex-shrink-0 ${config.color}`}>{config.label}</span>
                        </div>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">{scheme.description}</p>
                        <p className="text-[11px] text-muted-foreground/70 mt-1">{scheme.ministry}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-card border border-border rounded-xl">
                  <p className="text-[13px] text-muted-foreground">No specific schemes found for this criteria. Explore all schemes on the Schemes page.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}