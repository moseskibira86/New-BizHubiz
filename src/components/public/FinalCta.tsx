import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

interface FinalCtaProps {
  onStartFree: () => void;
  onExploreFeatures: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  onStartFree,
  onExploreFeatures,
}) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0B2440] via-[#0d2e52] to-[#0B2440] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0F7A4C]/25 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#F5B400]/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#F5B400]" />
          <span>Transform Your Business Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Your Business. One Powerful Platform.
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Stop managing your business from scattered notebooks, spreadsheets and WhatsApp chats. Bring your business together with BizHubKE.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-start-free-btn"
            onClick={onStartFree}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-[#F5B400] text-[#0B2440] hover:bg-[#db9f00] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Free Today</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="final-cta-explore-btn"
            onClick={onExploreFeatures}
            className="w-full sm:w-auto px-7 py-4 text-base font-semibold rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
          >
            Explore Features
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>7-day free trial</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Setup in 5 minutes</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Cancel or change plans anytime</span>
          </span>
        </div>
      </div>
    </section>
  );
};
