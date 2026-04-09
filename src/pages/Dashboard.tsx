import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Check, ArrowRight, Star, SlidersHorizontal, Car, Heart, Home, Plane, Briefcase, Globe, Zap, BadgeCheck, Clock, X, ChevronDown } from 'lucide-react';

interface Policy {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  coverage: number;
  description: string;
  features: string[];
  popular?: boolean;
  featured?: boolean;
  rating: number;
  reviews: number;
  color: string;
  gradient: string;
  bgColor: string;
  textColor: string;
}

const mockPolicies: Policy[] = [
  {
    id: '1', name: 'Auto Shield Pro', tagline: 'Complete vehicle protection',
    category: 'Auto', price: 999, coverage: 2500000,
    description: 'Comprehensive zero-deductible auto coverage. Includes collision, theft, liability & roadside assistance.',
    features: ['Zero deductible', 'Roadside assistance 24/7', 'Rental car coverage', 'Accident forgiveness'],
    popular: true, featured: true,
    rating: 4.9, reviews: 2840,
    color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #4F46E5 100%)',
    bgColor: '#EEF2FF', textColor: '#4338CA',
  },
  {
    id: '2', name: 'Family Health 360', tagline: 'Whole-family coverage',
    category: 'Health', price: 2499, coverage: 5000000,
    description: 'Comprehensive health plan covering all family members with dental, vision & worldwide emergency care.',
    features: ['Dental & vision included', 'Worldwide emergency cover', 'Mental health support', 'Prescription benefits'],
    rating: 4.8, reviews: 1920,
    color: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
    bgColor: '#FDF2F8', textColor: '#9D174D',
  },
  {
    id: '3', name: 'Home Safe Plus', tagline: 'Your home, fully protected',
    category: 'Home', price: 749, coverage: 10000000,
    description: 'Full property & contents coverage against fire, flood, theft and natural disasters. Activate instantly.',
    features: ['Natural disaster cover', 'Contents insurance', 'Temporary accommodation', 'Smart home protection'],
    rating: 4.7, reviews: 1340,
    color: '#059669', gradient: 'linear-gradient(135deg, #059669 0%, #065F46 100%)',
    bgColor: '#ECFDF5', textColor: '#065F46',
  },
  {
    id: '4', name: 'Legacy Life Plan', tagline: "Secure your family's future",
    category: 'Life', price: 399, coverage: 10000000,
    description: 'Affordable term life insurance ensuring lifelong financial security. Guaranteed payout, no medical exam.',
    features: ['No medical exam required', '₹1 Cr coverage', 'Fixed premiums', 'Guaranteed payout'],
    rating: 4.9, reviews: 3120,
    color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    bgColor: '#FFFBEB', textColor: '#92400E',
  },
  {
    id: '5', name: 'Global Travel Guard', tagline: 'Covered wherever you go',
    category: 'Travel', price: 299, coverage: 2500000,
    description: 'Single-trip or annual travel insurance with medical evacuation, trip cancellation & lost baggage.',
    features: ['Medical evacuation', 'Trip cancellation', 'Lost baggage ₹1.5L', 'Flight delay cover'],
    rating: 4.6, reviews: 890,
    color: '#0EA5E9', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
    bgColor: '#F0F9FF', textColor: '#075985',
  },
  {
    id: '6', name: 'Business Shield Pro', tagline: 'Enterprise-grade protection',
    category: 'Business', price: 4999, coverage: 20000000,
    description: 'Comprehensive business insurance covering liability, property, employee benefits & cyber threats.',
    features: ['General liability', 'Cyber breach coverage', 'Employee benefits', 'Business interruption'],
    popular: false, featured: false,
    rating: 4.8, reviews: 540,
    color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    bgColor: '#F5F3FF', textColor: '#5B21B6',
  },
  {
    id: '7', name: 'Pet Care Essential', tagline: 'Because pets deserve care too',
    category: 'Pet', price: 249, coverage: 200000,
    description: 'Comprehensive pet insurance covering accidents, illnesses, surgery & routine wellness visits.',
    features: ['Accidents & illness', 'Surgery & hospitalization', 'Routine wellness', 'Dental care'],
    rating: 4.7, reviews: 2100,
    color: '#F97316', gradient: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
    bgColor: '#FFF7ED', textColor: '#9A3412',
  },
  {
    id: '8', name: 'Critical Illness Plus', tagline: 'When it matters most',
    category: 'Health', price: 599, coverage: 2500000,
    description: 'Lump-sum payout on diagnosis of 36 critical illnesses including cancer, heart attack & stroke.',
    features: ['36 critical conditions', 'Lump-sum payout', 'No hospitalization needed', 'Income replacement'],
    rating: 4.9, reviews: 1650,
    color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    bgColor: '#FEF2F2', textColor: '#991B1B',
  },
];

// Format coverage in Indian units (Lakh / Cr)
const formatCoverage = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(0)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} Lakh`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const categoryConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  All:      { icon: <Shield className="w-4 h-4" />, label: 'All Plans' },
  Auto:     { icon: <Car className="w-4 h-4" />, label: 'Auto' },
  Health:   { icon: <Heart className="w-4 h-4" />, label: 'Health' },
  Home:     { icon: <Home className="w-4 h-4" />, label: 'Home' },
  Life:     { icon: <Zap className="w-4 h-4" />, label: 'Life' },
  Travel:   { icon: <Plane className="w-4 h-4" />, label: 'Travel' },
  Business: { icon: <Briefcase className="w-4 h-4" />, label: 'Business' },
  Pet:      { icon: <Globe className="w-4 h-4" />, label: 'Pet' },
};

const StarRating: React.FC<{ rating: number; reviews: number; color: string }> = ({ rating, reviews, color }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-3.5 h-3.5"
          style={{ color: i <= Math.round(rating) ? color : '#E2E8F0', fill: i <= Math.round(rating) ? color : '#E2E8F0' }} />
      ))}
    </div>
    <span className="text-[13px] font-semibold" style={{ color }}>{rating}</span>
    <span className="text-[12px] text-gray-400 font-medium">({reviews.toLocaleString()})</span>
  </div>
);

const Dashboard: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'popular'>('default');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minCoverage, setMinCoverage] = useState(0);

  useEffect(() => {
    setTimeout(() => { setPolicies(mockPolicies); setLoading(false); }, 700);
  }, []);

  const categories = Object.keys(categoryConfig);
  const filtered = policies
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeFilter === 'All' || p.category === activeFilter;
      const matchPrice = p.price <= maxPrice;
      const matchCoverage = p.coverage >= minCoverage;
      return matchSearch && matchCat && matchPrice && matchCoverage;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      if (sortBy === 'popular')    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  const activeFilterCount = (sortBy !== 'default' ? 1 : 0) + (maxPrice < 5000 ? 1 : 0) + (minCoverage > 0 ? 1 : 0);
  const resetFilters = () => { setSortBy('default'); setMaxPrice(5000); setMinCoverage(0); };

  // Split: featured card first if exists
  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className="space-y-8 pt-2">

      {/* ── Hero Banner ─────────────────────────────── */}
      <div className="rounded-[28px] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #312E81 0%, #4C1D95 30%, #7C3AED 65%, #6366f1 100%)', minHeight: '360px' }}>
        {/* Decorative mesh */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.08) 0%, transparent 40%)' }} />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-40px] left-[30%] w-[300px] h-[300px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

        <div className="relative z-10 p-10 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-sm font-semibold text-yellow-200"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Star className="w-4 h-4 fill-current text-yellow-300" /> Rated #1 Insurance Platform · 2024
            </div>
            <h1 className="text-4xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.025em' }}>
              Find the perfect<br />
              <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>insurance</span>
              {' '}plan.
            </h1>
            <p className="text-indigo-200 text-[17px] leading-relaxed mb-8 max-w-md">
              Transparent pricing, zero jargon. Get covered in under 2 minutes with plans that actually fit your life.
            </p>

            {/* Search */}
            <div className="flex gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by plan name or type..."
                  style={{
                    background: 'white', border: 'none', borderRadius: '14px',
                    padding: '15px 18px 15px 46px', width: '100%', fontSize: '15px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)', outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }} />
              </div>
              <button
                onClick={() => setFilterOpen(o => !o)}
                style={{
                  background: filterOpen || activeFilterCount > 0 ? '#6366f1' : 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)', borderRadius: '14px',
                  padding: '15px 20px',
                  color: 'white', fontWeight: 600, fontSize: '15px',
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 0.2s',
                }}>
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '999px', padding: '1px 7px', fontSize: '12px', fontWeight: 700 }}>
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className="w-4 h-4" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { value: '84,000+', label: 'Active Policies', icon: <BadgeCheck className="w-5 h-5" />, sub: 'Across all categories' },
              { value: '99.2%', label: 'Claims Settled', icon: <Clock className="w-5 h-5" />, sub: 'Average 48hr resolution' },
              { value: '8 Plans', label: 'Coverage Types', icon: <Shield className="w-5 h-5" />, sub: 'Auto · Health · Life · More' },
              { value: '₹0 Fees', label: 'No Hidden Costs', icon: <Star className="w-5 h-5" />, sub: 'Cancel any time, no penalty' },
            ].map(({ value, label, icon, sub }) => (
              <div key={label} className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="flex items-center gap-2 text-indigo-200 mb-3">
                  {icon}
                  <span className="text-[13px] font-semibold">{label}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</div>
                <div className="text-[12px] text-indigo-300 font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats pill */}
        <div className="lg:hidden relative z-10 pb-8 px-10">
          <div className="inline-flex items-stretch rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            {[
              { value: '84,000+', label: 'Active Policies' },
              { value: '99.2%', label: 'Claims Settled' },
              { value: 'Under 2 min', label: 'To Get Covered' },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', alignSelf: 'stretch', margin: '12px 0' }} />}
                <div className="px-6 py-4 text-center">
                  <div className="text-[20px] font-bold text-white leading-none mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</div>
                  <div className="text-[12px] font-medium text-indigo-200 leading-none">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Filter panel */}
        {filterOpen && (
          <div className="relative z-10 mx-10 lg:mx-14 mb-6 rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-bold text-[15px]">Filter & Sort</p>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-indigo-200 hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" /> Reset all
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Sort */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-300 mb-2">Sort by</p>
                <div className="flex flex-col gap-1.5">
                  {([
                    ['default',    'Recommended'],
                    ['popular',    'Most Popular'],
                    ['rating',     'Highest Rated'],
                    ['price-asc',  'Price: Low → High'],
                    ['price-desc', 'Price: High → Low'],
                  ] as const).map(([val, lbl]) => (
                    <button key={val} onClick={() => setSortBy(val)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold text-left transition-all"
                      style={sortBy === val
                        ? { background: 'rgba(255,255,255,0.25)', color: 'white' }
                        : { background: 'transparent', color: 'rgba(255,255,255,0.6)' }}>
                      <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: sortBy === val ? 'white' : 'rgba(255,255,255,0.3)' }}>
                        {sortBy === val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max price */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-300 mb-2">
                  Max Monthly Premium — <span className="text-white not-italic">₹{maxPrice.toLocaleString('en-IN')}</span>
                </p>
                <input type="range" min={249} max={5000} step={50} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-400" />
                <div className="flex justify-between text-[11px] text-indigo-300 mt-1">
                  <span>₹249</span><span>₹5,000</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[999, 1999, 3000, 5000].map(v => (
                    <button key={v} onClick={() => setMaxPrice(v)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                      style={maxPrice === v
                        ? { background: 'rgba(255,255,255,0.3)', color: 'white' }
                        : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                      ≤₹{v.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min coverage */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-300 mb-2">
                  Min Coverage — <span className="text-white">{minCoverage === 0 ? 'Any' : minCoverage >= 10000000 ? `₹${minCoverage / 10000000} Cr` : `₹${minCoverage / 100000} Lakh`}</span>
                </p>
                <div className="flex flex-col gap-1.5">
                  {([
                    [0,        'Any coverage'],
                    [200000,   '₹2 Lakh+'],
                    [2500000,  '₹25 Lakh+'],
                    [5000000,  '₹50 Lakh+'],
                    [10000000, '₹1 Cr+'],
                  ] as const).map(([val, lbl]) => (
                    <button key={val} onClick={() => setMinCoverage(val)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold text-left transition-all"
                      style={minCoverage === val
                        ? { background: 'rgba(255,255,255,0.25)', color: 'white' }
                        : { background: 'transparent', color: 'rgba(255,255,255,0.6)' }}>
                      <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: minCoverage === val ? 'white' : 'rgba(255,255,255,0.3)' }}>
                        {minCoverage === val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Category Filter ─────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => {
          const cfg = categoryConfig[cat];
          const isActive = activeFilter === cat;
          return (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200"
              style={isActive
                ? { background: 'linear-gradient(135deg, #6366f1, #4F46E5)', color: 'white', boxShadow: '0 4px 12px rgba(99,102,241,0.3)', border: '1.5px solid transparent' }
                : { background: 'white', color: '#64748B', border: '1.5px solid #E2E8F0' }
              }>
              {cfg.icon} {cfg.label}
            </button>
          );
        })}
      </div>

      {/* ── Cards ───────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-7 animate-pulse">
              <div className="flex gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl" style={{ background: '#F1F5F9' }} />
                <div className="flex-1">
                  <div className="h-5 rounded-lg mb-2 w-2/3" style={{ background: '#F1F5F9' }} />
                  <div className="h-3.5 rounded w-1/2" style={{ background: '#F1F5F9' }} />
                </div>
              </div>
              <div className="h-9 rounded-lg mb-1.5 w-1/3" style={{ background: '#E8EDF2' }} />
              <div className="h-4 rounded mb-6 w-2/5" style={{ background: '#F1F5F9' }} />
              <div className="space-y-2.5 mb-7">
                {[...Array(3)].map((_, j) => <div key={j} className="h-4 rounded" style={{ background: '#F1F5F9' }} />)}
              </div>
              <div className="h-11 rounded-2xl" style={{ background: '#F1F5F9' }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured card (full width) */}
          {featured && activeFilter === 'All' && (
            <div className="card group overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #312E81 0%, #4F46E5 50%, #6366f1 100%)', border: 'none' }}>
              <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                      <Star className="w-3 h-3 fill-current text-yellow-300" /> MOST POPULAR
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-[12px] font-bold"
                      style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
                      {featured.category.toUpperCase()}
                    </div>
                  </div>
                  <h2 className="text-[2rem] font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{featured.name}</h2>
                  <p className="text-indigo-200 text-[15px] mb-6 leading-relaxed">{featured.description}</p>
                  <div className="flex items-center gap-1.5 mb-8">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />)}
                    </div>
                    <span className="text-white font-bold text-[14px]">{featured.rating}</span>
                    <span className="text-indigo-300 text-[13px]">({featured.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {featured.features.map(f => (
                      <div key={f} className="flex items-center gap-2.5 text-[14px] font-medium text-indigo-100">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(255,255,255,0.2)' }}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link to={`/purchase/${featured.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[16px] transition-all hover:-translate-y-0.5"
                    style={{ background: 'white', color: '#4F46E5', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}>
                    Get started — ₹{featured.price.toLocaleString('en-IN')}/mo <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="hidden md:grid grid-cols-2 gap-4">
                  {[
                    { label: 'Coverage', value: formatCoverage(featured.coverage) },
                    { label: 'Deductible', value: '₹0' },
                    { label: 'Active users', value: '12,400+' },
                    { label: 'Avg claim time', value: '48 hrs' },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-2xl p-5"
                      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <p className="text-indigo-300 text-[12px] font-semibold uppercase tracking-wider mb-2">{label}</p>
                      <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Regular grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((policy) => (
              <div key={policy.id} className="card group flex flex-col" style={{ padding: 0 }}>
                <div className="h-1.5 w-full" style={{ background: policy.gradient }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                        style={{ background: policy.bgColor, color: policy.color }}>
                        {policy.category === 'Auto' ? <Car className="w-5 h-5" /> :
                         policy.category === 'Health' ? <Heart className="w-5 h-5" /> :
                         policy.category === 'Home' ? <Home className="w-5 h-5" /> :
                         policy.category === 'Life' ? <Zap className="w-5 h-5" /> :
                         policy.category === 'Travel' ? <Plane className="w-5 h-5" /> :
                         policy.category === 'Business' ? <Briefcase className="w-5 h-5" /> :
                         policy.category === 'Pet' ? <Globe className="w-5 h-5" /> :
                         <Shield className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{policy.name}</h3>
                        <p className="text-gray-400 text-[12px] font-medium mt-0.5">{policy.tagline}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
                      style={{ background: policy.bgColor, color: policy.textColor }}>
                      {policy.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={policy.rating} reviews={policy.reviews} color={policy.color} />
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <div className="flex items-end gap-1.5">
                      <span className="text-[36px] font-bold text-gray-900 leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>₹{policy.price.toLocaleString('en-IN')}</span>
                      <span className="text-gray-400 font-medium text-[15px] pb-1">/month</span>
                    </div>
                    <p className="text-[13px] text-gray-400 font-medium mt-1">
                      Up to <strong className="text-gray-600">{formatCoverage(policy.coverage)}</strong> coverage
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-[14px] leading-relaxed mb-5">{policy.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-1">
                    {policy.features.map(f => (
                      <div key={f} className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium">
                        <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: policy.bgColor, minWidth: '18px', height: '18px' }}>
                          <Check className="w-2.5 h-2.5" style={{ color: policy.color }} />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to={`/purchase/${policy.id}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-[14px] transition-all duration-300 mt-auto group-hover:shadow-md"
                    style={{
                      background: policy.bgColor, color: policy.color,
                      border: `1.5px solid ${policy.color}20`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = policy.gradient;
                      (e.currentTarget as HTMLElement).style.color = 'white';
                      (e.currentTarget as HTMLElement).style.border = '1.5px solid transparent';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = policy.bgColor;
                      (e.currentTarget as HTMLElement).style.color = policy.color;
                      (e.currentTarget as HTMLElement).style.border = `1.5px solid ${policy.color}20`;
                    }}>
                    Get started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 card">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No plans match</h3>
                <p className="text-gray-400">Try different keywords or pick another category.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
