import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const [roleMode, setRoleMode] = useState<'User' | 'Admin'>('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (roleMode === 'Admin') {
        login({ id: '1', username: 'Admin User', role: 'Admin' }, 'fake-jwt-token');
      } else {
        login({ id: '2', username: 'John Doe', role: 'User' }, 'fake-jwt-token');
      }
      navigate('/');
    }, 900);
  };

  return (
    <div className="fixed inset-0 flex z-[100]" style={{ background: '#EEF0FB' }}>
      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-10 overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #4F46E5 0%, #7C3AED 55%, #6366f1 100%)' }}>
        <div className="absolute top-[-60px] right-[-60px] w-[340px] h-[340px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-80px] left-[-40px] w-[280px] h-[280px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>InsureApp</span>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h2 className="text-[2.6rem] font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Your protection,<br />our priority.
          </h2>
          <p className="text-indigo-200 text-[15px] leading-relaxed">
            Comprehensive insurance coverage tailored to your life. Simple, transparent, always by your side.
          </p>
        </div>

        {/* Trust badges */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[
            { label: 'Policies Active', value: '84,000+' },
            { label: 'Claims Settled', value: '99.2%' },
            { label: 'Client Rating', value: '4.9 ★' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
              <div className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
              <div className="text-indigo-200 text-[11px] font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #4F46E5)' }}>
              <Shield className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>InsureApp</span>
          </div>

          <h1 className="text-[2rem] font-bold text-gray-900 mb-1" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
            Welcome back
          </h1>
          <p className="text-gray-400 text-[15px] mb-7">Sign in to your account to continue.</p>

          {/* Role toggle */}
          <div className="flex p-1 rounded-2xl mb-6 gap-1" style={{ background: '#E8EDF5' }}>
            {(['User', 'Admin'] as const).map((mode) => (
              <button key={mode} onClick={() => setRoleMode(mode)}
                className="flex-1 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-300"
                style={roleMode === mode
                  ? { background: 'white', color: '#0D1117', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
                  : { background: 'transparent', color: '#64748B' }
                }>
                {mode === 'User' ? 'Personal' : 'Administrator'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input-field" placeholder="you@example.com" required />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[13px] font-semibold text-gray-600">Password</label>
                <a href="#" className="text-[13px] font-semibold" style={{ color: '#6366f1' }}>Forgot password?</a>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="input-field" placeholder="••••••••" required />
            </div>

            {/* Keep me signed in — custom toggle */}
            <div className="flex items-center justify-between py-3 px-4 rounded-2xl"
              style={{ background: '#F8FAFC', border: '1.5px solid #E8EDF2' }}>
              <div>
                <p className="text-[13px] font-semibold text-gray-700">Keep me signed in</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Stay logged in on this device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
                <input type="checkbox" id="remember" className="sr-only peer" />
                <div className="w-10 h-6 rounded-full peer-checked:bg-indigo-500 transition-colors duration-300 peer-focus:ring-2 peer-focus:ring-indigo-300"
                  style={{ background: '#E2E8F0' }} />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-4" />
              </label>
            </div>

            <button type="submit" disabled={isLoading}
              className="btn-primary w-full"
              style={{ borderRadius: '14px', padding: '15px', fontSize: '15px' }}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign in as {roleMode} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-[14px] text-gray-500 font-medium mt-6">
            New to InsureApp?{' '}
            <Link to="/register" style={{ color: '#6366f1', fontWeight: 700 }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
