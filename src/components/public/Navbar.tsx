import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import {
  TrendingUp,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onNavigateToApp?: () => void;
  activePublicSection?: string;
  onSelectPublicSection?: (section: string) => void;
  onStartFree?: () => void;
  onLogin?: () => void;
  onExploreDemo?: () => void;
  onNavigateSection?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateToApp,
  activePublicSection = 'hero',
  onSelectPublicSection,
  onStartFree,
  onLogin,
  onExploreDemo,
  onNavigateSection,
}) => {
  const { user, isDemoMode, signOut } = useAuth();
  const { loadDemoTenant, tenant } = useBusiness();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStart = () => {
    if (onStartFree) onStartFree();
    else if (onOpenAuth) onOpenAuth('signup');
  };

  const handleLogin = () => {
    if (onLogin) onLogin();
    else if (onOpenAuth) onOpenAuth('login');
  };

  const handleDemo = () => {
    loadDemoTenant();
    if (onExploreDemo) onExploreDemo();
    else if (onNavigateToApp) onNavigateToApp();
  };

  const handleSection = (section: string) => {
    if (onNavigateSection) onNavigateSection(section);
    else if (onSelectPublicSection) onSelectPublicSection(section);
  };

  const navLinks = [
    { id: 'features', label: 'Features' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'news', label: 'News' },
    { id: 'training', label: 'Training' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLaunchDemo = () => {
    loadDemoTenant();
    onNavigateToApp();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B2440] text-white border-b border-slate-800 shadow-sm">
      {/* Top micro banner */}
      <div className="bg-[#0F7A4C] py-1.5 px-4 text-xs text-center font-medium text-white flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#F5B400] animate-pulse"></span>
        <span>Karibu! The all-in-one business software built specifically for Kenyan SMEs & Dukas</span>
        <span className="hidden md:inline font-bold underline cursor-pointer" onClick={() => handleSection('pricing')}>
          Try 7 days free
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleSection('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F7A4C] to-[#0c643e] flex items-center justify-center text-[#F5B400] shadow-md group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white">BizHub<span className="text-[#F5B400]">KE</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-emerald-300">
                  Kenya
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-tight hidden sm:block">
                Digital Business Partner for Kenyan SMEs
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => {
                  handleSection(link.id);
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm font-medium transition-colors hover:text-[#F5B400] ${
                  activePublicSection === link.id ? 'text-[#F5B400] font-semibold' : 'text-slate-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="quick-demo-launch-btn"
              onClick={handleDemo}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/10 text-emerald-300 hover:bg-white/20 border border-emerald-500/30 transition-all flex items-center gap-1.5"
              title="Explore with preloaded Mama Njeri Supplies demo figures"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B400]" />
              <span>Explore Demo</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-go-to-dashboard"
                  onClick={onNavigateToApp || handleDemo}
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#0F7A4C] text-white hover:bg-[#0c643e] transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Go to App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="nav-user-signout"
                  onClick={() => signOut()}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  id="nav-login-btn"
                  onClick={handleLogin}
                  className="px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  id="nav-get-started-btn"
                  onClick={handleStart}
                  className="px-4.5 py-2.5 text-sm font-bold rounded-xl bg-[#F5B400] text-[#0B2440] hover:bg-[#db9f00] transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e2c4d] border-b border-slate-700 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  handleSection(link.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left py-2 px-3 text-sm text-slate-200 hover:bg-white/10 rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-700 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDemo();
              }}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-white/10 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F5B400]" />
              Explore Demo (Mama Njeri Supplies)
            </button>

            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToApp) onNavigateToApp();
                  else handleDemo();
                }}
                className="w-full py-2.5 text-sm font-bold rounded-xl bg-[#0F7A4C] text-white flex items-center justify-center gap-2"
              >
                Enter App Dashboard
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogin();
                  }}
                  className="py-2.5 text-sm font-semibold rounded-xl bg-white/10 text-white text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleStart();
                  }}
                  className="py-2.5 text-sm font-bold rounded-xl bg-[#F5B400] text-[#0B2440] text-center"
                >
                  Start Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
