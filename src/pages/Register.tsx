import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="fixed inset-0 flex z-[100]" style={{ background: '#EEF0FB' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-10 overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #059669 0%, #10B981 55%, #34D399 100%)' }}>
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-80px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
              <Shield className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>InsureApp</span>
          </div>
          <h2 className="text-[2.6rem] font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Join 84,000+<br />protected members.
          </h2>
          <p className="text-green-100 text-lg leading-relaxed">
            Sign up in 60 seconds and get instant access to plans that actually protect you.
          </p>
          <div className="flex gap-3 mt-8">
            {[['₹0', 'Signup fee'], ['2 min', 'To activate'], ['24/7', 'Support']].map(([v, l]) => (
              <div key={l} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{v}</div>
                <div className="text-green-100 text-xs font-medium mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[400px]">
          <h1 className="text-[2rem] font-bold text-gray-900 mb-1" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>Create account</h1>
          <p className="text-gray-400 text-[15px] mb-6">Fill in the details below to get started.</p>

          <div className="card p-8">
            {error && (
              <div className="p-4 rounded-xl text-red-600 text-sm font-medium mb-6"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'username', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
              ].map(field => (
                <div key={field.id}>
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2">{field.label}</label>
                  <input id={field.id} type={field.type} value={(form as any)[field.id]}
                    onChange={handleChange} className="input-field" placeholder={field.placeholder} required />
                </div>
              ))}

              <button type="submit" disabled={loading} className="btn-primary w-full mt-2"
                style={{ padding: '16px', fontSize: '16px', borderRadius: '14px', marginTop: '8px' }}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>

            <p className="text-center text-[15px] text-gray-400 font-medium mt-8">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#6366f1', fontWeight: 700 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
