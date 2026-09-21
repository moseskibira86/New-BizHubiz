import React, { useState } from 'react';
import {
  ShoppingBag,
  Sprout,
  UtensilsCrossed,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface BusinessTypeSolutionsProps {
  onSelectType: (type: string) => void;
}

export const BusinessTypeSolutions: React.FC<BusinessTypeSolutionsProps> = ({ onSelectType }) => {
  const [activeTab, setActiveTab] = useState('retail');

  const types = [
    {
      id: 'retail',
      label: 'Retail & Wholesale',
      icon: ShoppingBag,
      headline: 'Dukas, Supermarkets, Hardware & Wholesalers',
      desc: 'Track fast-moving inventory, reconcile multi-counter cash with Lipa Na M-Pesa Tills, and send automated restocking orders to distributors.',
      perks: [
        'Barcode / SKU inventory tracking',
        'Lipa Na M-Pesa Till reconciliation',
        'Customer credit & debt ledger',
        'Supplier accounts payable tracking',
      ],
    },
    {
      id: 'agri',
      label: 'Agribusiness & Farm Input',
      icon: Sprout,
      headline: 'Agrovets, Farmers, Produce Aggregators & Co-ops',
      desc: 'Manage seasonal produce cycles, track fertilizer and seed batches with expiry dates, and issue receipt slips for farmer payments.',
      perks: [
        'Batch & shelf-life tracking for seed/chemicals',
        'Produce collection weight receipts',
        'Field agent disbursement logs',
        'Turnover Tax (TOT) compliant records',
      ],
    },
    {
      id: 'food',
      label: 'Hospitality & Food',
      icon: UtensilsCrossed,
      headline: 'Cafes, Restaurants, Bakeries & Butchery Shops',
      desc: 'Prevent food waste and ingredient leakage, track daily sales across shifts, and print kitchen item tickets and till receipts.',
      perks: [
        'Ingredient recipe cost calculation',
        'Daily cashier end-of-shift balancing',
        'Bulk meat & perishables shrinkage tracking',
        'County Public Health permit alerts',
      ],
    },
    {
      id: 'services',
      label: 'Services & Trades',
      icon: Briefcase,
      headline: 'Consultants, Agencies, Garages & Contractors',
      desc: 'Issue professional KRA eTIMS invoices, track milestone-based payments, and follow up overdue debts via automated WhatsApp nudges.',
      perks: [
        'Milestone-based service invoicing',
        'WhatsApp payment reminders with till details',
        'Withholding tax (WHT) record keeping',
        'Subcontractor expense tracking',
      ],
    },
  ];

  const current = types.find((t) => t.id === activeTab) || types[0];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C] bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Tailored Industry Workflows (§30)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2440] mt-4 tracking-tight">
            Built for Your Exact Line of Business
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Whether you operate a high-volume FMCG wholesale shop or provide professional trade services, BizHubKE configures to your workflow.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {types.map((t) => {
            const Icon = t.icon;
            const isSelected = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B2440] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F5B400]' : 'text-slate-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#0F7A4C] font-bold text-xs">
                <CurrentIcon className="w-5 h-5" />
                <span className="uppercase tracking-wider">{current.label}</span>
              </div>
              <h3 className="text-2xl font-black text-[#0B2440]">
                {current.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                {current.desc}
              </p>
            </div>

            <button
              onClick={() => onSelectType(current.id)}
              className="px-6 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <span>Explore {current.label} Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            {current.perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0F7A4C] shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
