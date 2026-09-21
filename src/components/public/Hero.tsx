import React from 'react';
import {
  ArrowRight,
  Play,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Receipt,
  Users,
  Boxes,
  FileCheck,
  GraduationCap,
  Sparkles,
  Smartphone,
} from 'lucide-react';

interface HeroProps {
  onStartTrial?: () => void;
  onStartFree?: () => void;
  onExploreDemo: () => void;
  onSelectFeature?: (featureId: string) => void;
  onSeeHowItWorks?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartTrial,
  onStartFree,
  onExploreDemo,
  onSelectFeature,
  onSeeHowItWorks,
}) => {
  const handleStart = () => {
    if (onStartFree) onStartFree();
    else if (onStartTrial) onStartTrial();
  };

  const handleFeatureClick = (featureId: string) => {
    if (onSelectFeature) onSelectFeature(featureId);
    else if (onSeeHowItWorks) onSeeHowItWorks();
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2440] via-[#0d2a4a] to-[#0B2440] text-white pt-10 pb-18 lg:pt-16 lg:pb-24">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0F7A4C]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#F5B400]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Yellow brush-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5B400] text-[#0B2440] font-extrabold text-xs tracking-wide uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built for Kenyan Businesses · Built for Growth</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              The Digital Business Partner for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-[#F5B400]">
                Kenyan SMEs
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Run your business. Understand your numbers. Get more customers. Stay compliant. Grow.
            </p>

            {/* Bullet trust list */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>M-Pesa & Bank Reconciled</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>KRA eTIMS & Tax Ready</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Mobile & Desktop Sync</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-start-trial-btn"
                onClick={handleStart}
                className="w-full sm:w-auto px-7 py-4 text-base font-bold rounded-xl bg-[#F5B400] text-[#0B2440] hover:bg-[#db9f00] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-watch-demo-btn"
                onClick={onExploreDemo}
                className="w-full sm:w-auto px-6 py-4 text-base font-semibold rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-sm"
              >
                <Play className="w-4 h-4 fill-[#F5B400] text-[#F5B400]" />
                <span>Explore Live Demo (Mama Njeri)</span>
              </button>
            </div>

            {/* Micro reassurance */}
            <p className="text-xs text-slate-400 pt-1">
              7-day free trial · No credit card required · Instant setup in under 5 minutes
            </p>
          </div>

          {/* Right Column: Interactive Dashboard Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="relative rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl p-4 sm:p-6 backdrop-blur-sm">
                
                {/* Header preview bar */}
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-xs font-semibold text-slate-300">
                      Mama Njeri Supplies · Nairobi
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Demo Workspace
                  </span>
                </div>

                {/* Simulated Business Score Banner */}
                <div className="rounded-xl bg-gradient-to-r from-[#0F7A4C] to-[#0c643e] p-3.5 mb-4 text-white flex items-center justify-between shadow-md">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-200">
                      My Business Score
                    </span>
                    <div className="text-xl font-black flex items-center gap-1.5">
                      <span>72 / 100</span>
                      <span className="text-xs font-medium text-emerald-200 bg-white/20 px-2 py-0.5 rounded-full">
                        Strong SME Health
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onExploreDemo}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#F5B400] text-[#0B2440] hover:bg-amber-400 transition-colors"
                  >
                    View Breakdown
                  </button>
                </div>

                {/* Metric cards grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                      <span>Total Sales</span>
                      <span className="text-emerald-400 font-bold">↑ 12%</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white">KSh 482,500</div>
                    <div className="text-[10px] text-slate-400">Past 30 days</div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                      <span>Net Profit</span>
                      <span className="text-emerald-400 font-bold">26.6% margin</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400">KSh 128,430</div>
                    <div className="text-[10px] text-slate-400">After KSh 354,070 exp.</div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                      <span>Customers</span>
                      <span className="text-blue-400 font-bold">1,284 total</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white">+38 new</div>
                    <div className="text-[10px] text-slate-400">WhatsApp & retail</div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                      <span>Invoices Due</span>
                      <span className="text-amber-400 font-bold">2 unpaid</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-amber-300">KSh 74,000</div>
                    <div className="text-[10px] text-slate-400">1-click M-Pesa link</div>
                  </div>
                </div>

                {/* Simulated Recent M-Pesa transaction bar */}
                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-white">Kiprono Hotel & Bakery</div>
                      <div className="text-[10px] text-slate-400">Cooking Oil (20L) · Ref: QKD8291</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">+ KSh 24,800</div>
                    <div className="text-[10px] text-slate-400">Today, 10:30 AM</div>
                  </div>
                </div>

              </div>

              {/* Floating tag badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-[#0B2440] px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0F7A4C] text-white flex items-center justify-center font-black text-sm">
                  KE
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">100% Kenyan Context</div>
                  <div className="text-[10px] text-slate-500">M-Pesa, eTIMS, Counties</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Five quick-feature strip beneath hero (§6) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
            Unified Kenyan Business Management Modules
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            <button
              id="strip-finance-btn"
              onClick={() => handleFeatureClick('finance')}
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#F5B400] transition-colors">
                  Finance & Invoicing
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">Sales, expenses, M-Pesa</p>
              </div>
            </button>

            <button
              id="strip-crm-btn"
              onClick={() => handleFeatureClick('crm')}
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#F5B400] transition-colors">
                  WhatsApp CRM
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">Customer profiles & follow-ups</p>
              </div>
            </button>

            <button
              id="strip-inventory-btn"
              onClick={() => handleFeatureClick('inventory')}
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-[#F5B400] group-hover:scale-110 transition-transform">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#F5B400] transition-colors">
                  Inventory & Stock
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">Low-stock alerts & suppliers</p>
              </div>
            </button>

            <button
              id="strip-compliance-btn"
              onClick={() => handleFeatureClick('compliance')}
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#F5B400] transition-colors">
                  Compliance & Tax
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">KRA eTIMS, VAT, Permits</p>
              </div>
            </button>

            <button
              id="strip-training-btn"
              onClick={() => handleFeatureClick('training')}
              className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#F5B400] transition-colors">
                  Academy & News
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">Kenya SME courses & grants</p>
              </div>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
