import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogOut, LayoutDashboard, FileText, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{ background: 'rgba(238, 240, 251, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.7)' }}
      className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center h-[72px]">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4F46E5 100%)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
            <Shield className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>InsureApp</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link to="/my-policies"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${isActive('/my-policies') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            <FileText className="w-4 h-4" /> My Policies
          </Link>
          {isAdmin && (
            <Link to="/admin"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${isActive('/admin') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Settings className="w-4 h-4" /> Admin Console
            </Link>
          )}
        </div>

        {/* Right: user + logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ background: '#F8FAFC', border: '1px solid #E8EDF2' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1, #7C3AED)' }}>
              {user?.username?.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-[14px] font-bold text-gray-900 leading-none mb-0.5">{user?.username}</p>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest leading-none">
                {isAdmin ? 'Administrator' : 'Member'}
              </p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Log out">
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
