'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, CheckCircle, AlertCircle, Info, Landmark, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { demoSchemes, type Scheme } from '@/data/demoSchemes';

const states = ['All States', 'Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh'];
const occupations = ['All Occupations', 'Student', 'Farmer', 'Self-employed', 'Salaried', 'Unemployed', 'Senior Citizen'];
const categories = ['All', 'Education', 'Skill Development', 'Entrepreneurship', 'Health', 'Agriculture'];

const matchConfig = {
  high: { icon: CheckCircle, label: 'High match', color: 'text-success', bg: 'bg-success/8 border-success/25', badge: 'bg-success/10 text-success' },
  medium: { icon: AlertCircle, label: 'Medium match', color: 'text-warning', bg: 'bg-warning/8 border-warning/25', badge: 'bg-warning/10 text-warning' },
  needs_info: { icon: Info, label: 'Needs more info', color: 'text-muted-foreground', bg: 'bg-muted/60 border-border', badge: 'bg-muted text-muted-foreground' },
};

export default function SchemesPage() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedOccupation, setSelectedOccupation] = useState('All Occupations');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const filtered = demoSchemes.filter((s) => {
    const matchesSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasActiveFilters = selectedState !== 'All States' || selectedOccupation !== 'All Occupations' || selectedCategory !== 'All';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 md:pb-0" id="main-content">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-10">
            <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-3 py-1 mb-4">
              <Landmark size={13} className="text-success" />
              <span className="text-[12px] font-semibold text-success uppercase tracking-wider">Scheme Discovery</span>
            </div>
            <h1 className="text-[2rem] lg:text-[2.25rem] font-bold text-foreground mb-2">Find schemes that may fit your profile.</h1>
            <p className="text-[15px] text-muted-foreground max-w-xl">
              Search and filter government schemes based on your profile. Results are illustrative — verify eligibility with official sources.
            </p>
            <p className="text-[12px] text-accent font-medium mt-2">
              ⚠ Demo data only — not verified government information.
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
          {/* Search + Filter bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search schemes..."
                className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                aria-label="Search schemes"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-[14px] font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-foreground hover:bg-muted'
              }`}
              aria-label="Toggle filters"
            >
              <Filter size={15} />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-accent" />}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold text-foreground">Filter Schemes</h3>
                {hasActiveFilters && (
                  <button
                    onClick={() => { setSelectedState('All States'); setSelectedOccupation('All Occupations'); setSelectedCategory('All'); }}
                    className="text-[12px] text-accent hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by state"
                  >
                    {states.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Occupation</label>
                  <select
                    value={selectedOccupation}
                    onChange={(e) => setSelectedOccupation(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by occupation"
                  >
                    {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by category"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground/70 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> schemes
            </p>
            <span className="text-[11px] text-accent font-medium">Demo data</span>
          </div>

          {/* Scheme cards */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Landmark size={40} className="text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-[15px] font-semibold text-foreground mb-2">No schemes found</p>
                <p className="text-[13px] text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              filtered.map((scheme) => {
                const config = matchConfig[scheme.matchLevel];
                const MatchIcon = config.icon;
                const isExpanded = expandedScheme === scheme.id;
                return (
                  <div key={scheme.id} className={`bg-card border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-card ${config.bg}`}>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${config.badge}`}>
                              <MatchIcon size={11} />
                              {config.label}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted text-muted-foreground">
                              {scheme.category}
                            </span>
                          </div>
                          <h3 className="text-[15px] font-semibold text-foreground mb-1 leading-snug">{scheme.title}</h3>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">{scheme.description}</p>
                          <p className="text-[11px] text-muted-foreground/70 mt-1.5">{scheme.ministry}</p>
                        </div>
                        <button
                          onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-border text-[12px] font-medium text-foreground hover:bg-muted transition-colors"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? 'Less' : 'Details'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Eligibility Criteria</p>
                            <ul className="space-y-1.5">
                              {scheme.eligibility.map((e, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-foreground">
                                  <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                                  {e}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Documents Required</p>
                            <ul className="space-y-1.5">
                              {scheme.documents.map((d, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-foreground">
                                  <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="sm:col-span-2 flex gap-3 pt-2">
                            <Link
                              href="/ai-assistant"
                              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-[13px] font-semibold hover:bg-primary/90 active:scale-95 transition-all"
                            >
                              Get Help Applying
                              <ArrowRight size={13} />
                            </Link>
                            <button className="px-4 py-2 rounded-xl border border-border text-[13px] font-medium text-foreground hover:bg-muted transition-colors">
                              Save to Cases
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
