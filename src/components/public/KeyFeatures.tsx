import React from 'react';
import {
  Smartphone,
  FileCheck2,
  Users,
  MessageCircle,
  Package,
  Truck,
  Building,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Receipt,
} from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'M-Pesa First Reconciliation',
      desc: 'Seamlessly capture Buy Goods Till and Paybill transactions with instant matching and payment receipts.',
      badge: 'Lipa Na M-Pesa',
      color: 'text-emerald-700 bg-emerald-50',
    },
    {
      icon: FileCheck2,
      title: 'eTIMS Compliant Invoicing',
      desc: 'Generate KRA eTIMS-ready tax invoices with QR verification codes and instant WhatsApp sharing.',
      badge: 'Tax Law Ready',
      color: 'text-blue-700 bg-blue-50',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Business CRM',
      desc: 'Send order status, overdue invoice reminders, and bulk broadcast deals directly via WhatsApp.',
      badge: 'High Conversion',
      color: 'text-emerald-700 bg-emerald-50',
    },
    {
      icon: Package,
      title: 'Real-Time Inventory Control',
      desc: 'Never run out of high-velocity goods with automatic reorder triggers and slow-moving stock warnings.',
      badge: 'Zero Waste',
      color: 'text-amber-700 bg-amber-50',
    },
    {
      icon: Receipt,
      title: 'Expense & Cash Flow Ledger',
      desc: 'Categorize shop rent, transport, salaries, and inventory supplies to prevent cash crunches.',
      badge: 'PnL Tracking',
      color: 'text-rose-700 bg-rose-50',
    },
    {
      icon: ShieldCheck,
      title: 'Kenya Statutory Tax Tracker',
      desc: 'Interactive countdowns for VAT, PAYE, SHA/SHIF, NSSF, Housing Levy, and County Business Permits.',
      badge: 'Avoid Penalties',
      color: 'text-teal-700 bg-teal-50',
    },
    {
      icon: GraduationCap,
      title: 'BizHubKE Academy',
      desc: 'Practical micro-learning courses on bookkeeping, pricing for profit, and Kenyan commercial law.',
      badge: 'Free Training',
      color: 'text-purple-700 bg-purple-50',
    },
    {
      icon: Sparkles,
      title: 'Ask BizHub AI Advisor',
      desc: 'Intelligent business copilot trained on Kenyan commerce, labor laws, and your live sales metrics.',
      badge: 'AI Powered',
      color: 'text-[#0B2440] bg-amber-50',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C] bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Complete SME Capability Matrix (§4)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2440] mt-4 tracking-tight">
            Every Tool Kenyan Small Businesses Need to Flourish
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Eliminate messy paper counter books, missed KRA deadlines, and untracked debts with one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B2440] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
