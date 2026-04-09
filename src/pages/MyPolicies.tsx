import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, FileText, Download, Calendar, Zap, Plus, ChevronRight,
  Car, Heart, Home, Plane, Briefcase, Globe, Shield, TrendingUp,
  Clock, CheckCircle, AlertCircle, XCircle, MoreHorizontal, Eye, RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PurchasedPolicy {
  id: string;
  policyName: string;
  category: string;
  status: 'Active' | 'Pending' | 'Expired';
  purchaseDate: string;
  nextPaymentDate: string;
  premium: number;
  coverage: number;
  color: string;
  gradient: string;
  bgColor: string;
  policyNumber: string;
  claimsUsed: number;
  claimsAllowed: number;
}

const mockPolicies: PurchasedPolicy[] = [
  {
    id: 'pol-12345', policyName: 'Auto Shield Pro', category: 'Auto',
    status: 'Active', purchaseDate: 'Oct 15, 2023', nextPaymentDate: 'May 15, 2024',
    premium: 999, coverage: 2500000, color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4F46E5 100%)',
    bgColor: '#EEF2FF', policyNumber: 'ASP-2023-001', claimsUsed: 1, claimsAllowed: 3,
  },
  {
    id: 'pol-67890', policyName: 'Family Health 360', category: 'Health',
    status: 'Pending', purchaseDate: 'Mar 1, 2024', nextPaymentDate: 'May 1, 2024',
    premium: 2499, coverage: 5000000, color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
    bgColor: '#FDF2F8', policyNumber: 'FHR-2024-005', claimsUsed: 0, claimsAllowed: 5,
  },
  {
    id: 'pol-11223', policyName: 'Legacy Life Plan', category: 'Life',
    status: 'Active', purchaseDate: 'Jan 8, 2023', nextPaymentDate: 'Jun 8, 2024',
    premium: 399, coverage: 10000000, color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    bgColor: '#FFFBEB', policyNumber: 'LLP-2023-089', claimsUsed: 0, claimsAllowed: 1,
  },
];

const formatCoverage = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(0)} Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(0)} Lakh`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const categoryIcon: Record<string, React.ReactNode> = {
  Auto:     <Car className="w-5 h-5" />,
  Health:   <Heart className="w-5 h-5" />,
  Home:     <Home className="w-5 h-5" />,
  Life:     <Zap className="w-5 h-5" />,
  Travel:   <Plane className="w-5 h-5" />,
  Business: <Briefcase className="w-5 h-5" />,
  Pet:      <Globe className="w-5 h-5" />,
};

const statusConfig: Record<string, { bg: string; text: string; dot: string; borderColor: string; icon: React.ReactNode }> = {
  Active:  { bg: '#ECFDF5', text: '#059669', dot: '#10B981', borderColor: '#A7F3D0', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  Pending: { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B', borderColor: '#FDE68A', icon: <Clock className="w-3.5 h-3.5" /> },
  Expired: { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', borderColor: '#FECACA', icon: <XCircle className="w-3.5 h-3.5" /> },
};

const MyPolicies: React.FC = () => {
  const [policies, setPolicies] = useState<PurchasedPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setTimeout(() => { setPolicies(mockPolicies); setLoading(false); }, 900); }, []);

  const totalPremium = policies.reduce((sum, p) => sum + p.premium, 0);
  const activePolicies = policies.filter(p => p.status === 'Active').length;

  return (
    <div className="space-y-8 animate-fade-in-up pt-2">

      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-end justify-between pb-6" style={{ borderBottom: '1.5px solid #E8EDF2' }}>
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>My Policies</h1>
          <p className="text-gray-400 mt-1 text-[15px]">Your active insurance portfolio.</p>
        </div>
        <Link to="/" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}>
          <Plus className="w-4 h-4" /> Add Policy
        </Link>
      </div>

      {/* ── Summary Strip ───────────────────────────── */}
      {!loading && policies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Policies', value: String(policies.length), sub: `${activePolicies} currently active`, icon: <Shield className="w-5 h-5" />, color: '#6366f1', bg: '#EEF2FF' },
            { label: 'Monthly Outflow', value: `₹${totalPremium.toLocaleString('en-IN')}`, sub: 'Total premiums combined', icon: <TrendingUp className="w-5 h-5" />, color: '#EC4899', bg: '#FDF2F8' },
            { label: 'Next Renewal', value: 'May 1, 2024', sub: 'Family Health 360', icon: <Clock className="w-5 h-5" />, color: '#F59E0B', bg: '#FFFBEB' },
          ].map(({ label, value, sub, icon, color, bg }) => (
            <div key={label} className="card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>{icon}</div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                <p className="text-[1.4rem] font-bold text-gray-900 leading-tight mt-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                <p className="text-[12px] text-gray-400 font-medium">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Cards ───────────────────────────────────── */}
      {loading ? (
        <div className="space-y-5">
          {[0, 1, 2].map(i => (
            <div key={i} className="card p-8 animate-pulse">
              <div className="flex gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-100" />
                <div className="flex-1">
                  <div className="h-5 rounded-lg mb-2 w-1/3 bg-gray-100" />
                  <div className="h-3.5 rounded w-1/5 bg-gray-100" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, j) => <div key={j} className="h-10 rounded-xl bg-gray-100" />)}
              </div>
            </div>
          ))}
        </div>
      ) : policies.length > 0 ? (
        <div className="space-y-5">
          {policies.map(policy => {
            const s = statusConfig[policy.status];
            const isOpen = expanded === policy.id;
            const claimsPct = (policy.claimsUsed / policy.claimsAllowed) * 100;

            return (
              <div key={policy.id} className="card group overflow-hidden">
                {/* Gradient top bar */}
                <div className="h-1" style={{ background: policy.gradient }} />

                <div className="p-7">
                  {/* ── Top row ── */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: policy.bgColor, color: policy.color }}>
                        {categoryIcon[policy.category] ?? <Shield className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                          <h3 className="text-[19px] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                            {policy.policyName}
                          </h3>
                          <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: s.bg, color: s.text, border: `1px solid ${s.borderColor}` }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                            {policy.status}
                          </span>
                        </div>
                        <p className="text-[12px] font-mono font-semibold text-gray-400">
                          {policy.policyNumber}
                        </p>
                      </div>
                    </div>

                    {/* Right: premium + category */}
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg mb-2 inline-block"
                        style={{ background: policy.bgColor, color: policy.color }}>
                        {policy.category}
                      </span>
                      <p className="text-[2rem] font-bold text-gray-900 leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                        ₹{policy.premium.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[12px] text-gray-400 font-medium">/month</p>
                    </div>
                  </div>

                  {/* ── Metrics grid ── */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Coverage', value: formatCoverage(policy.coverage), icon: <ShieldCheck className="w-4 h-4" /> },
                      { label: 'Issued', value: policy.purchaseDate, icon: <Calendar className="w-4 h-4" /> },
                      { label: 'Next Renewal', value: policy.nextPaymentDate, icon: <Clock className="w-4 h-4" /> },
                      { label: 'Claims Left', value: `${policy.claimsAllowed - policy.claimsUsed} / ${policy.claimsAllowed}`, icon: <AlertCircle className="w-4 h-4" /> },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="rounded-2xl p-4" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                        <div className="flex items-center gap-1.5 text-gray-400 mb-2">
                          {icon}
                          <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
                        </div>
                        <p className="text-[14px] font-bold text-gray-900 leading-snug">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* ── Claims usage bar ── */}
                  <div className="mb-6">
                    <div className="flex justify-between text-[12px] font-semibold text-gray-400 mb-2">
                      <span>Claims used this year</span>
                      <span style={{ color: policy.color }}>{policy.claimsUsed} of {policy.claimsAllowed}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${claimsPct}%`, background: policy.gradient }} />
                    </div>
                  </div>

                  {/* ── Actions row ── */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button className="btn-primary flex items-center gap-2" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}>
                      <Download className="w-4 h-4" /> Download Certificate
                    </button>
                    <button className="btn-secondary flex items-center gap-2" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}>
                      <FileText className="w-4 h-4" /> View Details
                    </button>
                    <button className="btn-secondary flex items-center gap-2" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}>
                      <RefreshCw className="w-4 h-4" /> Renew
                    </button>
                    <button
                      onClick={() => setExpanded(isOpen ? null : policy.id)}
                      className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all"
                      style={{ border: '1.5px solid #E8EDF2' }}>
                      <Eye className="w-4 h-4" />
                      {isOpen ? 'Less' : 'More info'}
                    </button>
                  </div>

                  {/* ── Expanded details ── */}
                  {isOpen && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl p-5" style={{ background: policy.bgColor }}>
                          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: policy.color }}>Coverage Breakdown</p>
                          <div className="space-y-2">
                            {[
                              ['Third-party liability', 'Included'],
                              ['Own damage', 'Included'],
                              ['Roadside assistance', 'Included'],
                              ['Cashless garages', '6,500+'],
                            ].map(([k, v]) => (
                              <div key={k} className="flex justify-between text-[13px]">
                                <span className="text-gray-500 font-medium">{k}</span>
                                <span className="font-bold" style={{ color: policy.color }}>{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl p-5" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Policy Timeline</p>
                          <div className="space-y-3">
                            {[
                              { label: 'Policy issued', date: policy.purchaseDate, done: true },
                              { label: 'Last payment', date: 'Apr 15, 2024', done: true },
                              { label: 'Next renewal', date: policy.nextPaymentDate, done: false },
                            ].map(({ label, date, done }) => (
                              <div key={label} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                  style={{ background: done ? policy.bgColor : '#F1F5F9' }}>
                                  {done
                                    ? <CheckCircle className="w-3.5 h-3.5" style={{ color: policy.color }} />
                                    : <Clock className="w-3.5 h-3.5 text-gray-300" />}
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold text-gray-700">{label}</p>
                                  <p className="text-[12px] text-gray-400">{date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card p-20 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: '#F1F5F9' }}>
            <ShieldCheck className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>No coverage yet</h3>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            You haven't purchased any policies. Explore our plans and get covered in minutes.
          </p>
          <Link to="/" className="btn-primary inline-flex">Explore Plans <ChevronRight className="w-4 h-4" /></Link>
        </div>
      )}
    </div>
  );
};

export default MyPolicies;
