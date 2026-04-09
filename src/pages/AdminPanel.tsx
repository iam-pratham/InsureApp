import React, { useState } from 'react';
import {
  Users, FileText, TrendingUp, Plus, Edit, Trash2, BarChart3,
  ArrowUpRight, Zap, Search, Filter, CheckCircle, XCircle,
  Clock, Shield, Activity, Bell, Download, Eye, UserCheck,
  AlertTriangle, RefreshCw, ChevronDown,
} from 'lucide-react';

type Tab = 'overview' | 'policies' | 'users' | 'claims';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [search, setSearch] = useState('');
  const [claimFilter, setClaimFilter] = useState('All');

  const stats = [
    { label: 'Total Users', value: '12,450', change: '+12%', icon: Users, color: '#6366f1', bg: '#EEF2FF' },
    { label: 'Active Policies', value: '84,092', change: '+8%', icon: FileText, color: '#059669', bg: '#ECFDF5' },
    { label: 'Monthly Revenue', value: '₹1.18 Cr', change: '+18%', icon: TrendingUp, color: '#EC4899', bg: '#FDF2F8' },
    { label: 'Claims Settled', value: '99.2%', change: '+0.3%', icon: BarChart3, color: '#F59E0B', bg: '#FFFBEB' },
  ];

  const policies = [
    { id: '1', name: 'Auto Shield Pro', category: 'Auto', price: 999, subscribers: 3240, color: '#6366f1', status: 'Active' },
    { id: '2', name: 'Family Health 360', category: 'Health', price: 2499, subscribers: 2100, color: '#EC4899', status: 'Active' },
    { id: '3', name: 'Home Safe Plus', category: 'Home', price: 749, subscribers: 1850, color: '#059669', status: 'Active' },
    { id: '4', name: 'Legacy Life Plan', category: 'Life', price: 399, subscribers: 980, color: '#F59E0B', status: 'Active' },
    { id: '5', name: 'Global Travel Guard', category: 'Travel', price: 299, subscribers: 620, color: '#0EA5E9', status: 'Active' },
    { id: '6', name: 'Business Shield Pro', category: 'Business', price: 4999, subscribers: 310, color: '#8B5CF6', status: 'Draft' },
    { id: '7', name: 'Pet Care Essential', category: 'Pet', price: 249, subscribers: 440, color: '#F97316', status: 'Active' },
    { id: '8', name: 'Critical Illness Plus', category: 'Health', price: 599, subscribers: 870, color: '#EF4444', status: 'Active' },
  ];

  const users = [
    { id: 'U001', name: 'Raj Patel', email: 'raj@example.com', policies: 2, joined: 'Jan 12, 2024', status: 'Active', premium: 3498 },
    { id: 'U002', name: 'Priya Sharma', email: 'priya@example.com', policies: 1, joined: 'Feb 5, 2024', status: 'Active', premium: 749 },
    { id: 'U003', name: 'Arjun Mehta', email: 'arjun@example.com', policies: 3, joined: 'Mar 20, 2024', status: 'Active', premium: 4096 },
    { id: 'U004', name: 'Sunita Rao', email: 'sunita@example.com', policies: 1, joined: 'Dec 1, 2023', status: 'Inactive', premium: 399 },
    { id: 'U005', name: 'Vikram Singh', email: 'vikram@example.com', policies: 2, joined: 'Apr 1, 2024', status: 'Active', premium: 1598 },
    { id: 'U006', name: 'Meera Nair', email: 'meera@example.com', policies: 1, joined: 'Mar 8, 2024', status: 'Suspended', premium: 2499 },
  ];

  const claims = [
    { id: 'CLM-001', user: 'Raj Patel', policy: 'Auto Shield Pro', amount: 85000, filed: 'Apr 8, 2024', status: 'Approved', priority: 'High' },
    { id: 'CLM-002', user: 'Priya Sharma', policy: 'Home Safe Plus', amount: 120000, filed: 'Apr 7, 2024', status: 'Under Review', priority: 'Medium' },
    { id: 'CLM-003', user: 'Arjun Mehta', policy: 'Family Health 360', amount: 45000, filed: 'Apr 6, 2024', status: 'Approved', priority: 'Low' },
    { id: 'CLM-004', user: 'Vikram Singh', policy: 'Critical Illness Plus', amount: 250000, filed: 'Apr 5, 2024', status: 'Under Review', priority: 'High' },
    { id: 'CLM-005', user: 'Sunita Rao', policy: 'Legacy Life Plan', amount: 1000000, filed: 'Apr 4, 2024', status: 'Rejected', priority: 'High' },
    { id: 'CLM-006', user: 'Meera Nair', policy: 'Family Health 360', amount: 32000, filed: 'Apr 3, 2024', status: 'Approved', priority: 'Low' },
  ];

  const activity = [
    { event: 'Auto Shield Pro purchased', user: 'Raj Patel', time: '2m ago', type: 'purchase', color: '#6366f1' },
    { event: 'Home Safe Plus policy renewed', user: 'Priya Sharma', time: '8m ago', type: 'renewal', color: '#059669' },
    { event: 'Claim CLM-004 escalated', user: 'Vikram Singh', time: '15m ago', type: 'alert', color: '#F59E0B' },
    { event: 'New user registered', user: 'Deepa Krishnan', time: '22m ago', type: 'user', color: '#EC4899' },
    { event: 'Claim CLM-003 approved', user: 'System', time: '30m ago', type: 'claim', color: '#10B981' },
    { event: 'Business Shield Pro plan updated', user: 'Admin', time: '1h ago', type: 'update', color: '#8B5CF6' },
  ];

  const claimStatusStyle: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    'Approved':     { bg: '#ECFDF5', text: '#059669', icon: <CheckCircle className="w-3.5 h-3.5" /> },
    'Under Review': { bg: '#FFFBEB', text: '#D97706', icon: <Clock className="w-3.5 h-3.5" /> },
    'Rejected':     { bg: '#FEF2F2', text: '#DC2626', icon: <XCircle className="w-3.5 h-3.5" /> },
  };

  const priorityStyle: Record<string, { bg: string; text: string }> = {
    High:   { bg: '#FEF2F2', text: '#DC2626' },
    Medium: { bg: '#FFFBEB', text: '#D97706' },
    Low:    { bg: '#ECFDF5', text: '#059669' },
  };

  const userStatusStyle: Record<string, { bg: string; text: string; dot: string }> = {
    Active:    { bg: '#ECFDF5', text: '#059669', dot: '#10B981' },
    Inactive:  { bg: '#F1F5F9', text: '#64748B', dot: '#94A3B8' },
    Suspended: { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { key: 'policies', label: 'Plans & Pricing', icon: <Shield className="w-4 h-4" /> },
    { key: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { key: 'claims', label: 'Claims', icon: <FileText className="w-4 h-4" /> },
  ];

  const filteredClaims = claims.filter(c =>
    (claimFilter === 'All' || c.status === claimFilter) &&
    (c.user.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in-up pt-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-6" style={{ borderBottom: '1.5px solid #E8EDF2' }}>
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
            Admin Console
          </h1>
          <p className="text-gray-400 mt-1 text-[15px]">Full platform insights and policy management.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-500 hover:bg-white transition-all"
            style={{ border: '1.5px solid #E2E8F0' }}>
            <Download className="w-4 h-4" /> Export
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live
          </div>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(({ key, label, icon }) => (
          <button key={key} onClick={() => { setActiveTab(key); setSearch(''); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200"
            style={activeTab === key
              ? { background: 'linear-gradient(135deg, #6366f1, #4F46E5)', color: 'white', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }
              : { background: 'white', color: '#64748B', border: '1.5px solid #E2E8F0' }
            }>{icon}{label}</button>
        ))}
      </div>

      {/* ── OVERVIEW ──────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
              <div key={label} className="card p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: bg, color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: '#ECFDF5', color: '#059669' }}>
                    <ArrowUpRight className="w-3 h-3" />{change}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
                <p className="text-[1.75rem] font-bold text-gray-900 leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2 card p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[17px] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Live Activity</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">Real-time</span>
              </div>
              <div className="space-y-3">
                {activity.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3.5 rounded-2xl transition-all hover:bg-gray-50 group">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                      style={{ background: item.color }}>
                      {item.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-gray-900 truncate">{item.event}</p>
                      <p className="text-gray-400 text-[12px] font-medium">{item.user}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-300 shrink-0">
                      <Zap className="w-3 h-3" />{item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats sidebar */}
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="text-[15px] font-bold text-gray-900 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Plan Distribution</h3>
                <div className="space-y-3.5">
                  {[
                    { name: 'Auto', pct: 38, color: '#6366f1' },
                    { name: 'Health', pct: 29, color: '#EC4899' },
                    { name: 'Home', pct: 18, color: '#059669' },
                    { name: 'Other', pct: 15, color: '#F59E0B' },
                  ].map(({ name, pct, color }) => (
                    <div key={name}>
                      <div className="flex justify-between text-[13px] font-semibold text-gray-600 mb-1.5">
                        <span>{name}</span><span>{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-[15px] font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Pending Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Claims awaiting review', count: 2, color: '#F59E0B', bg: '#FFFBEB', icon: <Clock className="w-4 h-4" /> },
                    { label: 'Flagged accounts', count: 1, color: '#EF4444', bg: '#FEF2F2', icon: <AlertTriangle className="w-4 h-4" /> },
                    { label: 'Plan updates pending', count: 3, color: '#6366f1', bg: '#EEF2FF', icon: <RefreshCw className="w-4 h-4" /> },
                    { label: 'New registrations', count: 8, color: '#10B981', bg: '#ECFDF5', icon: <UserCheck className="w-4 h-4" /> },
                  ].map(({ label, count, color, bg, icon }) => (
                    <div key={label} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: bg }}>
                      <div style={{ color }}>{icon}</div>
                      <span className="flex-1 text-[13px] font-semibold text-gray-700">{label}</span>
                      <span className="text-[13px] font-bold" style={{ color }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PLANS & PRICING ───────────────────────────── */}
      {activeTab === 'policies' && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-6 gap-4 flex-wrap" style={{ borderBottom: '1.5px solid #E8EDF2' }}>
            <h3 className="text-[17px] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Plans & Pricing</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search plans..." className="input-field pl-10" style={{ padding: '10px 16px 10px 36px', fontSize: '14px', borderRadius: '12px', width: '220px' }} />
              </div>
              <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '14px', borderRadius: '12px' }}>
                <Plus className="w-4 h-4" /> Add Plan
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF2' }}>
                  {['Plan', 'Category', 'Monthly Premium', 'Subscribers', 'Status', 'Revenue', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((p, i) => (
                  <tr key={p.id} className="group hover:bg-indigo-50/30 transition-colors"
                    style={{ borderBottom: i < filteredPolicies.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${p.color}18`, color: p.color }}>
                          <Shield className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-gray-900 text-[14px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                        style={{ background: `${p.color}18`, color: p.color }}>{p.category}</span>
                    </td>
                    <td className="px-6 py-4 text-[15px] font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-[14px] font-semibold text-gray-500">{p.subscribers.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                        style={p.status === 'Active' ? { background: '#ECFDF5', color: '#059669' } : { background: '#F1F5F9', color: '#94A3B8' }}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-semibold text-gray-700">
                      ₹{(p.price * p.subscribers / 100000).toFixed(1)}L/mo
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── USERS ─────────────────────────────────────── */}
      {activeTab === 'users' && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-6 gap-4 flex-wrap" style={{ borderBottom: '1.5px solid #E8EDF2' }}>
            <div>
              <h3 className="text-[17px] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>User Management</h3>
              <p className="text-gray-400 text-[13px] mt-0.5">{users.length} total users · {users.filter(u => u.status === 'Active').length} active</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search users..." className="input-field pl-10" style={{ padding: '10px 16px 10px 36px', fontSize: '14px', borderRadius: '12px', width: '220px' }} />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                style={{ border: '1.5px solid #E2E8F0' }}>
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF2' }}>
                  {['User', 'Email', 'Policies', 'Monthly Premium', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => {
                  const s = userStatusStyle[u.status];
                  return (
                    <tr key={u.id} className="group hover:bg-indigo-50/30 transition-colors"
                      style={{ borderBottom: i < filteredUsers.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #7C3AED)' }}>
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-gray-900">{u.name}</p>
                            <p className="text-[12px] text-gray-400 font-mono">{u.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-gray-500 font-medium">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="text-[14px] font-bold text-gray-900">{u.policies}</span>
                        <span className="text-[12px] text-gray-400 ml-1">plan{u.policies !== 1 ? 's' : ''}</span>
                      </td>
                      <td className="px-6 py-4 text-[14px] font-bold text-gray-900">₹{u.premium.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 text-[13px] text-gray-400 font-medium">{u.joined}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold w-fit"
                          style={{ background: s.bg, color: s.text }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Edit className="w-3.5 h-3.5" /></button>
                          <button className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CLAIMS ────────────────────────────────────── */}
      {activeTab === 'claims' && (
        <div className="space-y-5">
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Claims', value: claims.length, color: '#6366f1', bg: '#EEF2FF', icon: <FileText className="w-5 h-5" /> },
              { label: 'Under Review', value: claims.filter(c => c.status === 'Under Review').length, color: '#F59E0B', bg: '#FFFBEB', icon: <Clock className="w-5 h-5" /> },
              { label: 'Approved This Week', value: claims.filter(c => c.status === 'Approved').length, color: '#059669', bg: '#ECFDF5', icon: <CheckCircle className="w-5 h-5" /> },
            ].map(({ label, value, color, bg, icon }) => (
              <div key={label} className="card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>{icon}</div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-6 gap-4 flex-wrap" style={{ borderBottom: '1.5px solid #E8EDF2' }}>
              <h3 className="text-[17px] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Claims Management</h3>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search claims..." className="input-field pl-10" style={{ padding: '10px 16px 10px 36px', fontSize: '14px', borderRadius: '12px', width: '200px' }} />
                </div>
                {/* Status filter */}
                <div className="relative">
                  <select value={claimFilter} onChange={e => setClaimFilter(e.target.value)}
                    className="appearance-none pr-8 pl-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-600 cursor-pointer outline-none"
                    style={{ border: '1.5px solid #E2E8F0', background: 'white' }}>
                    {['All', 'Approved', 'Under Review', 'Rejected'].map(f => <option key={f}>{f}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                  style={{ border: '1.5px solid #E2E8F0' }}>
                  <Bell className="w-4 h-4" /> Notify
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF2' }}>
                    {['Claim ID', 'User', 'Policy', 'Amount', 'Filed', 'Priority', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map((c, i) => {
                    const ss = claimStatusStyle[c.status];
                    const ps = priorityStyle[c.priority];
                    return (
                      <tr key={c.id} className="group hover:bg-indigo-50/30 transition-colors"
                        style={{ borderBottom: i < filteredClaims.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <td className="px-6 py-4 font-mono text-[13px] font-bold text-indigo-600">{c.id}</td>
                        <td className="px-6 py-4 text-[14px] font-semibold text-gray-900">{c.user}</td>
                        <td className="px-6 py-4 text-[13px] text-gray-500">{c.policy}</td>
                        <td className="px-6 py-4 text-[14px] font-bold text-gray-900">₹{c.amount.toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 text-[13px] text-gray-400">{c.filed}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold" style={{ background: ps.bg, color: ps.text }}>{c.priority}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold w-fit"
                            style={{ background: ss.bg, color: ss.text }}>
                            {ss.icon}{c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1.5">
                            <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                            <button className="p-2 rounded-xl text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all"><CheckCircle className="w-3.5 h-3.5" /></button>
                            <button className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><XCircle className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
