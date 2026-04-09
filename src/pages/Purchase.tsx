import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, CreditCard, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Purchase: React.FC = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setProcessing(true);
    setTimeout(() => { navigate('/my-policies'); }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pt-2">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-[14px] font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to plans
      </Link>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-3">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#EEF2FF' }}>
                <CreditCard className="w-5 h-5 text-indigo-500" />
              </div>
              <h2 className="text-[20px] font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Payment Details</h2>
            </div>

            {/* Card brand row */}
            <div className="flex gap-2 mb-8">
              {['VISA', 'MC', 'AMEX', 'UPI'].map(b => (
                <div key={b} className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-400"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>{b}</div>
              ))}
              <div className="ml-auto flex items-center gap-1.5 text-[13px] font-semibold text-green-600">
                <Lock className="w-3.5 h-3.5" /> Secured
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">Cardholder Name</label>
                <input type="text" className="input-field" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">Card Number</label>
                <input type="text" className="input-field font-mono" placeholder="XXXX  XXXX  XXXX  XXXX" required />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">Expiry</label>
                  <input type="text" className="input-field text-center font-mono" placeholder="MM / YY" required />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">CVC</label>
                  <input type="text" className="input-field text-center font-mono" placeholder="• • •" required />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl cursor-pointer select-none transition-all"
                style={{ background: agreed ? '#EEF2FF' : '#F8FAFC', border: `1.5px solid ${agreed ? '#6366f1' : '#E2E8F0'}` }}
                onClick={() => setAgreed(!agreed)}>
                <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all"
                  style={{ background: agreed ? '#6366f1' : 'white', border: `2px solid ${agreed ? '#6366f1' : '#CBD5E1'}` }}>
                  {agreed && <Check className="w-3 h-3 text-white" />}
                </div>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                  I agree to the <span className="text-indigo-600 font-semibold">Terms of Service</span>. I authorize recurring monthly billing until cancelled.
                </p>
              </div>

              <button type="submit" disabled={!agreed || processing}
                className="btn-primary w-full"
                style={{ padding: '18px', fontSize: '17px', borderRadius: '16px', opacity: !agreed ? 0.5 : 1, cursor: !agreed ? 'not-allowed' : 'pointer' }}>
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <><Lock className="w-5 h-5" /> Subscribe for ₹999/month</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Summary panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Plan card */}
          <div className="card p-6" style={{ background: 'linear-gradient(145deg, #4F46E5, #7C3AED)', border: 'none' }}>
            <p className="text-indigo-200 text-[12px] font-bold uppercase tracking-widest mb-4">Your Selected Plan</p>
            <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Auto Shield Pro</h3>
            <p className="text-indigo-200 text-sm mb-6">Comprehensive auto coverage</p>

            <div className="space-y-3 mb-6">
              {[['Coverage', '₹25 Lakh'], ['Deductible', '₹0'], ['GST (18%)', '₹179.82']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-[14px]">
                  <span className="text-indigo-200">{k}</span>
                  <span className="font-bold text-white">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="font-bold text-white">Total / Month</span>
              <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>₹999</span>
            </div>
          </div>

          {/* Security badges */}
          <div className="card p-6">
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-5">Guaranteed Security</p>
            <div className="space-y-4">
              {[
                ['256-bit SSL Encryption', 'Bank-level security on all transactions'],
                ['No data sharing', 'Your card details are never stored'],
                ['Instant cancellation', 'No fees when you cancel subscription'],
              ].map(([title, sub]) => (
                <div key={title} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#ECFDF5' }}>
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{title}</p>
                    <p className="text-[13px] text-gray-400 font-medium">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
