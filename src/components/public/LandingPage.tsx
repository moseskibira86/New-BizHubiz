import React, { useRef } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ProblemSection } from './ProblemSection';
import { PlatformShowcase } from './PlatformShowcase';
import { KeyFeatures } from './KeyFeatures';
import { KenyanContextSection } from './KenyanContextSection';
import { BusinessTypeSolutions } from './BusinessTypeSolutions';
import { NewsTrainingPreview } from './NewsTrainingPreview';
import { TrustStrip } from './TrustStrip';
import { PricingSection } from './PricingSection';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';
import { SubscriptionPlan } from '../../types';
import { Sparkles, ArrowRight, Store, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onStartFree: () => void;
  onOpenLogin: () => void;
  onExploreDemo: () => void;
  onSelectPlan: (plan: SubscriptionPlan) => void;
  onEnterDashboard?: () => void;
  isAuthenticated?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartFree,
  onOpenLogin,
  onExploreDemo,
  onSelectPlan,
  onEnterDashboard,
  isAuthenticated,
}) => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);

  const handleNavigateSection = (section: string) => {
    if (section === 'features') featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
    else if (section === 'solutions') solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    else if (section === 'pricing') pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    else if (section === 'news') newsRef.current?.scrollIntoView({ behavior: 'smooth' });
    else if (section === 'training') trainingRef.current?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F7A4C] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onStartFree={onStartFree}
        onLogin={onOpenLogin}
        onExploreDemo={onExploreDemo}
        onNavigateSection={handleNavigateSection}
      />

      {/* Authenticated user quick return banner */}
      {isAuthenticated && onEnterDashboard && (
        <div className="bg-[#0F7A4C] text-white px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2">
          <span>You are logged into your BizHubKE business workspace.</span>
          <button
            onClick={onEnterDashboard}
            className="underline hover:text-amber-200 cursor-pointer flex items-center gap-1"
          >
            <span>Enter Dashboard Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hero Section (§1) */}
      <Hero
        onStartFree={onStartFree}
        onExploreDemo={onExploreDemo}
        onSeeHowItWorks={() => handleNavigateSection('features')}
      />

      {/* The Problem Section (§2) */}
      <ProblemSection />

      {/* Platform Showcase & Modules (§3) */}
      <div ref={featuresRef}>
        <PlatformShowcase onLaunchDemo={onExploreDemo} />
        <KeyFeatures />
      </div>

      {/* Built for Kenya's Reality (§5) */}
      <KenyanContextSection />

      {/* Interactive Demo Banner: Mama Njeri Supplies Wholesale Persona (§7) */}
      <section className="py-12 bg-gradient-to-r from-emerald-900 to-[#0B2440] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B400] text-[#0B2440] text-[11px] font-black uppercase">
                <Store className="w-3.5 h-3.5" />
                <span>Live Interactive Demo Workspace (§7)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Test BizHubKE as Mama Njeri General Supplies
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Explore a live Kenyan wholesale business in Nairobi with KSh 744,000 in monthly revenue, 10 catalog SKUs, M-Pesa Till reconciliation, and real KRA VAT countdowns. No credit card or email required.
              </p>
            </div>

            <button
              id="hero-launch-mama-njeri-demo-btn"
              onClick={onExploreDemo}
              className="shrink-0 px-8 py-4 rounded-xl bg-[#F5B400] hover:bg-[#db9f00] text-[#0B2440] font-black text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#0B2440]" />
              <span>Launch Live Demo Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Solutions by Business Type (§30) */}
      <div ref={solutionsRef}>
        <BusinessTypeSolutions onSelectType={() => onExploreDemo()} />
      </div>

      {/* News & BizHubKE Academy (§21, §23) */}
      <div ref={newsRef}>
        <div ref={trainingRef}>
          <NewsTrainingPreview
            onOpenNews={onStartFree}
            onOpenAcademy={onStartFree}
          />
        </div>
      </div>

      {/* Trust & Kenyan SME Ecosystem Strip (§31) */}
      <TrustStrip />

      {/* Transparent Pricing in KES (§38, §39) */}
      <div ref={pricingRef}>
        <PricingSection onSelectPlan={onSelectPlan} />
      </div>

      {/* Final Call to Action (§46) */}
      <FinalCta
        onStartFree={onStartFree}
        onExploreFeatures={() => handleNavigateSection('features')}
      />

      {/* Dark Footer with Legal Disclaimer (§6, §20) */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenDemo={onExploreDemo}
      />
    </div>
  );
};
