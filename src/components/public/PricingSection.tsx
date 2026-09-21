import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { SubscriptionPlan } from '../../types';

interface PricingSectionProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free' as SubscriptionPlan,
      priceKES: 0,
      period: 'forever',
      description: 'Essential toolkit for sole proprietors & startups testing the waters.',
      popular: false,
      features: [
        'Basic sales & expense recording',
        'Up to 25 customers & 20 products',
        'Standard mobile & web dashboard',
        'Kenyan business news & guides',
        'Community forum support',
      ],
      ctaText: 'Start Free Forever',
      highlightBadge: null,
    },
    {
      name: 'Starter' as SubscriptionPlan,
      priceKES: 499,
      annualKES: 4990, // 2 months free
      period: 'per month',
      description: 'Ideal for small dukas, boutique shops, and single-location kiosks.',
      popular: false,
      features: [
        'Unlimited sales & expense tracking',
        'Full cash flow & profit margin analysis',
        'Customer database (up to 150)',
        'Basic low-stock alerts',
        'CSV/Excel data exports',
        'Priority WhatsApp support',
      ],
      ctaText: 'Start 7-Day Free Trial',
      highlightBadge: null,
    },
    {
      name: 'Business' as SubscriptionPlan,
      priceKES: 999,
      annualKES: 9990,
      period: 'per month',
      description: 'The complete SME suite for retail shops, wholesalers, & restaurants.',
      popular: true,
      features: [
        'Everything in Starter, plus:',
        'Unlimited Invoices & PDF generation',
        'Full Customer CRM with VIP tags',
        'WhatsApp payment reminder templates',
        'Multi-supplier purchase & debt tracking',
        'KRA eTIMS & tax deadline alerts',
        'My Business Score & growth insights',
      ],
      ctaText: 'Start 7-Day Free Trial',
      highlightBadge: 'MOST POPULAR',
    },
    {
      name: 'Professional' as SubscriptionPlan,
      priceKES: 1999,
      annualKES: 19990,
      period: 'per month',
      description: 'Advanced intelligence, AI Assistant, & multi-staff control.',
      popular: false,
      features: [
        'Everything in Business, plus:',
        'Ask BizHub AI business assistant',
        'AI Marketing copywriter (WhatsApp/SMS)',
        'Staff multi-user access (up to 5 staff)',
        'Dead-stock & shrinkage audits',
        'Advanced financial trend analytics',
        'All BizHubKE Academy certificates',
      ],
      ctaText: 'Start 7-Day Free Trial',
      highlightBadge: null,
    },
    {
      name: 'Enterprise' as SubscriptionPlan,
      priceKES: 4999,
      annualKES: 49990,
      period: 'per month',
      description: 'For multi-branch retailers, distributors, and fast-scaling enterprises.',
      popular: false,
      features: [
        'Everything in Professional, plus:',
        'Multiple businesses & branches in one login',
        'Unlimited staff & custom permission roles',
        'Custom POS & accounting integrations',
        'Dedicated Kenyan account manager',
        'Custom staff training workshops',
      ],
      ctaText: 'Contact Enterprise Sales',
      highlightBadge: 'CUSTOM ENTERPRISE',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C] bg-[#E8F7EF] px-3 py-1 rounded-full">
            Simple, Transparent Pricing in KSh
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2440] mt-3 tracking-tight">
            Plans Built for Businesses of Every Size
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            All paid plans include a 7-day full free trial. No card required to start. Pay conveniently via M-Pesa or Card when ready.
          </p>

          {/* Billing switcher */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0B2440] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#0F7A4C] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-[#F5B400] text-[#0B2440] px-1.5 py-0.5 rounded font-extrabold">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {plans.map((p) => {
            const price = billingCycle === 'annual' && p.annualKES ? Math.round(p.annualKES / 12) : p.priceKES;
            return (
              <div
                key={p.name}
                id={`pricing-card-${p.name.toLowerCase()}`}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all relative ${
                  p.popular
                    ? 'border-2 border-[#0F7A4C] shadow-xl bg-gradient-to-b from-emerald-50/40 via-white to-white'
                    : 'border-slate-200 shadow-sm hover:shadow-md bg-white'
                }`}
              >
                {/* Popular / Enterprise Badge */}
                {p.highlightBadge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0F7A4C] text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md whitespace-nowrap">
                    {p.highlightBadge}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-[#0B2440] mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 min-h-[32px]">
                    {p.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-slate-500">KSh</span>
                      <span className="text-2xl sm:text-3xl font-black text-[#0B2440]">
                        {price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {p.priceKES === 0 ? 'Free forever' : billingCycle === 'annual' ? 'per month (billed yearly)' : 'per month'}
                    </span>
                  </div>

                  <hr className="border-slate-100 mb-4" />

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Included features:
                    </p>
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#0F7A4C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`select-plan-${p.name.toLowerCase()}`}
                  onClick={() => onSelectPlan(p.name)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    p.popular
                      ? 'bg-[#0F7A4C] text-white hover:bg-[#0c643e] shadow-md'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* M-Pesa payment guarantee note */}
        <div className="mt-12 text-center p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-600">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F7A4C] flex items-center justify-center font-bold text-xs">
            M
          </div>
          <span>
            Accepted payment methods: <strong>Lipa Na M-Pesa</strong>, Airtel Money, Visa/Mastercard, &amp; Bank EFT.
          </span>
        </div>

      </div>
    </section>
  );
};
