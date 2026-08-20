'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, CheckCircle, AlertCircle, Info, Landmark, ArrowRight, RotateCcw, MapPin, Briefcase, UserCheck, IndianRupee, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { demoSchemes, type Scheme } from '@/data/demoSchemes';

const states = ['All States', 'Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh'];
const occupations = ['All Occupations', 'Student', 'Farmer', 'Self-employed', 'Salaried', 'Unemployed', 'Senior Citizen'];
const categories = ['All', 'Education', 'Skill Development', 'Entrepreneurship', 'Health', 'Agriculture'];

const ageRanges = [
  { id: 'all', label: 'All Ages', min: 0, max: 100 },
  { id: 'below-18', label: 'Below 18 years', min: 0, max: 17 },
  { id: '18-25', label: '18 – 25 years (Youth / College)', min: 18, max: 25 },
  { id: '26-40', label: '26 – 40 years (Young Adults)', min: 26, max: 40 },
  { id: '41-60', label: '41 – 60 years (Adults)', min: 41, max: 60 },
  { id: '60-plus', label: '60+ years (Senior Citizen)', min: 60, max: 100 },
];

const incomeRanges = [
  { id: 'all', label: 'All Incomes', maxLimit: 999 },
  { id: 'bpl', label: 'Below ₹2.5 Lakhs (BPL / Low)', maxLimit: 2.5 },
  { id: 'mid', label: 'Below ₹5.0 Lakhs', maxLimit: 5.0 },
  { id: 'high-mid', label: 'Below ₹8.0 Lakhs', maxLimit: 8.0 },
  { id: 'no-limit', label: 'Above ₹8.0 Lakhs / No Limit', maxLimit: 999 },
];

const matchConfig = {
  high: { icon: CheckCircle, label: 'High match', color: 'text-success', bg: 'bg-success/8 border-success/25', badge: 'bg-success/10 text-success' },
  medium: { icon: AlertCircle, label: 'Medium match', color: 'text-warning', bg: 'bg-warning/8 border-warning/25', badge: 'bg-warning/10 text-warning' },
  needs_info: { icon: Info, label: 'Needs more info', color: 'text-muted-foreground', bg: 'bg-muted/60 border-border', badge: 'bg-muted text-muted-foreground' },
};

export default function SchemesPage() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedOccupation, setSelectedOccupation] = useState('All Occupations');
  const [selectedIncome, setSelectedIncome] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(true);
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const selectedAgeObj = ageRanges.find((a) => a.id === selectedAge) || ageRanges[0];
  const selectedIncomeObj = incomeRanges.find((i) => i.id === selectedIncome) || incomeRanges[0];

  const filtered = useMemo(() => {
    return demoSchemes.filter((scheme) => {
      // 1. Search filter
      const matchesSearch =
        !search.trim() ||
        scheme.title.toLowerCase().includes(search.toLowerCase()) ||
        scheme.description.toLowerCase().includes(search.toLowerCase()) ||
        scheme.ministry.toLowerCase().includes(search.toLowerCase()) ||
        scheme.category.toLowerCase().includes(search.toLowerCase());

      // 2. Category filter
      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;

      // 3. State filter
      const matchesState =
        selectedState === 'All States' ||
        scheme.state === 'All States' ||
        scheme.state.toLowerCase() === selectedState.toLowerCase();

      // 4. Occupation filter
      const matchesOccupation =
        selectedOccupation === 'All Occupations' ||
        scheme.occupations.includes(selectedOccupation) ||
        scheme.occupations.length === 0;

      // 5. Age filter (check overlap between selected age range and scheme age range)
      const matchesAge =
        selectedAge === 'all' ||
        (selectedAgeObj.min <= scheme.maxAge && selectedAgeObj.max >= scheme.minAge);

      // 6. Income filter
      const matchesIncome =
        selectedIncome === 'all' ||
        scheme.maxIncomeLakhs >= selectedIncomeObj.maxLimit ||
        scheme.maxIncomeLakhs === 999;

      return matchesSearch && matchesCategory && matchesState && matchesOccupation && matchesAge && matchesIncome;
    });
  }, [search, selectedCategory, selectedState, selectedOccupation, selectedAge, selectedIncome, selectedAgeObj, selectedIncomeObj]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedState !== 'All States') count++;
    if (selectedAge !== 'all') count++;
    if (selectedOccupation !== 'All Occupations') count++;
    if (selectedIncome !== 'all') count++;
    if (selectedCategory !== 'All') count++;
    return count;
  }, [selectedState, selectedAge, selectedOccupation, selectedIncome, selectedCategory]);

  const handleResetFilters = () => {
    setSelectedState('All States');
    setSelectedAge('all');
    setSelectedOccupation('All Occupations');
    setSelectedIncome('all');
    setSelectedCategory('All');
    setSearch('');
  };

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
            <h1 className="text-[2rem] lg:text-[2.25rem] font-bold text-foreground mb-2">Find schemes that fit your profile.</h1>
            <p className="text-[15px] text-muted-foreground max-w-xl">
              Search and filter government schemes tailored to your state, age group, occupation, and family income.
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
          {/* Search bar + Filter Toggle */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search schemes by name, keyword, or benefits..."
                className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                aria-label="Search schemes"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground p-1"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-[14px] font-medium transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-foreground hover:bg-muted'
              }`}
              aria-label="Toggle filters"
            >
              <Filter size={15} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-5 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-primary" />
                  <h3 className="text-[15px] font-semibold text-foreground">Filter by Profile Criteria</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[12px] text-accent font-medium hover:underline flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    Reset All Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. State Filter */}
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <MapPin size={13} className="text-primary" />
                    <span>State</span>
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by state"
                  >
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Age (Durations / Ranges) Filter */}
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <UserCheck size={13} className="text-primary" />
                    <span>Age (Duration)</span>
                  </label>
                  <select
                    value={selectedAge}
                    onChange={(e) => setSelectedAge(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by age duration"
                  >
                    {ageRanges.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Occupation Filter */}
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <Briefcase size={13} className="text-primary" />
                    <span>Occupation</span>
                  </label>
                  <select
                    value={selectedOccupation}
                    onChange={(e) => setSelectedOccupation(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by occupation"
                  >
                    {occupations.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Income Filter */}
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <IndianRupee size={13} className="text-primary" />
                    <span>Family Income Limit</span>
                  </label>
                  <select
                    value={selectedIncome}
                    onChange={(e) => setSelectedIncome(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Filter by income"
                  >
                    {incomeRanges.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <Tag size={14} className="text-muted-foreground mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card border border-border text-foreground/70 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> scheme{filtered.length !== 1 ? 's' : ''} matching your profile
            </p>
          </div>

          {/* Scheme cards */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-2xl p-8">
                <Landmark size={44} className="text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-[16px] font-semibold text-foreground mb-2">No matching schemes found</h3>
                <p className="text-[13px] text-muted-foreground mb-5 max-w-md mx-auto leading-relaxed">
                  No schemes match your exact combination of State ({selectedState}), Age, Occupation ({selectedOccupation}), and Income.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-primary/90 transition-all"
                >
                  <RotateCcw size={13} />
                  Reset Filters & Show All Schemes
                </button>
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
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/5 text-primary border border-primary/10">
                              📍 {scheme.state}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted text-muted-foreground">
                              👤 Age: {scheme.minAge}–{scheme.maxAge} yrs
                            </span>
                          </div>
                          <h3 className="text-[16px] font-semibold text-foreground mb-1 leading-snug">{scheme.title}</h3>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">{scheme.description}</p>
                          
                          {scheme.benefitAmount && (
                            <p className="text-[12px] font-semibold text-success mt-2">
                              💰 Benefit: {scheme.benefitAmount}
                            </p>
                          )}
                          <p className="text-[11px] text-muted-foreground/70 mt-1.5">{scheme.ministry}</p>
                        </div>
                        <button
                          onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                          className="flex-shrink-0 px-3.5 py-1.5 rounded-lg border border-border text-[12px] font-medium text-foreground hover:bg-muted transition-colors"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? 'Less' : 'Details'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-150">
                          <div>
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Eligibility Criteria</p>
                            <ul className="space-y-1.5">
                              {scheme.eligibility.map((e, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] text-foreground">
                                  <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                                  <span>{e}</span>
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
                                  <span>{d}</span>
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
                            <Link
                              href="/cases"
                              className="px-4 py-2 rounded-xl border border-border text-[13px] font-medium text-foreground hover:bg-muted transition-colors"
                            >
                              View My Cases
                            </Link>
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
