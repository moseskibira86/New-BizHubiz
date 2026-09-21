import React from 'react';
import {
  Wallet,
  FileCheck2,
  Package,
  MessageSquare,
  BarChart3,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface ProblemSectionProps {
  onLearnMore?: (challengeKey: string) => void;
  onExploreDemo?: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  onLearnMore,
  onExploreDemo,
}) => {
  const challenges = [
    {
      key: 'finance',
      title: 'Cash Flow & Finance',
      subtitle: 'Stop guessing your profit at the end of the month',
      desc: 'Real-time sales, expenses, net profit, opening and closing cash balances, professional invoices, and customer balances reconciled with M-Pesa.',
      bgClass: 'bg-[#E8F7EF]', // mint
      iconColor: 'text-[#0F7A4C]',
      icon: Wallet,
      benefits: ['Instant net profit calculation', 'M-Pesa Till & Paybill reconciliation', 'Low-cash balance alerts'],
    },
    {
      key: 'compliance',
      title: 'Tax & Compliance',
      subtitle: 'Avoid painful KRA penalties and permit shutdowns',
      desc: 'Automated statutory tax deadlines (VAT 20th, PAYE/SHIF/NSSF 9th), eTIMS receipt workflows, county single business permits, and regulatory calendars.',
      bgClass: 'bg-[#EAF3FB]', // sky
      iconColor: 'text-blue-700',
      icon: FileCheck2,
      benefits: ['eTIMS-compatible sales invoicing', 'Remittance due-date countdowns', 'Unified county permit tracking'],
      disclaimer: 'BizHubKE provides business information and workflow tools and does not replace professional tax or legal advice.',
    },
    {
      key: 'inventory',
      title: 'Inventory & Operations',
      subtitle: 'Know exactly what is on your shelves and what is running out',
      desc: 'Track products, stock adjustments, supplier purchases, critical low-stock alerts (🔴/🟡/🟢), total stock valuation, and dead-stock reports.',
      bgClass: 'bg-[#FDF1E4]', // peach
      iconColor: 'text-amber-700',
      icon: Package,
      benefits: ['Color-coded low-stock warnings', 'Supplier balance tracking', 'Shrinkage & dead-stock alerts'],
    },
    {
      key: 'crm',
      title: 'Customers & WhatsApp CRM',
      subtitle: 'Turn one-time buyers into loyal repeat customers',
      desc: 'Complete customer profiles, purchase history, VIP tags, conversation logs, and 1-click WhatsApp message templates for payments and promotions.',
      bgClass: 'bg-[#FBEAF1]', // blush
      iconColor: 'text-pink-700',
      icon: MessageSquare,
      benefits: ['VIP, Repeat, & Inactive customer tags', 'WhatsApp payment reminders', 'Broadcast promotions & follow-ups'],
    },
    {
      key: 'growth',
      title: 'Business Intelligence & Growth',
      subtitle: 'Actionable data to scale your Kenyan enterprise',
      desc: 'Track sales trends, top-selling products, customer lifetime value, and get your personalized "My Business Score" (0–100) with growth recommendations.',
      bgClass: 'bg-[#E8F7EF]', // mint
      iconColor: 'text-emerald-800',
      icon: BarChart3,
      benefits: ['My Business Score (0-100)', 'Fast-moving vs slow products', 'Ask BizHub AI data assistant'],
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C] bg-[#E8F7EF] px-3 py-1 rounded-full">
            Built For Reality On The Ground
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2440] mt-3 tracking-tight">
            Solve Your Biggest Business Challenges
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Running a duka, wholesale shop, or SME in Kenya comes with unique friction. BizHubKE solves the specific bottlenecks that cost you time, money, and sleep.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => {
            const IconComponent = c.icon;
            return (
              <div
                key={c.key}
                id={`problem-card-${c.key}`}
                className={`${c.bgClass} rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${c.iconColor}`}>
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Module
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2440] mb-1">
                    {c.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mb-3">
                    {c.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {c.desc}
                  </p>

                  {/* Bullet perks */}
                  <ul className="space-y-1.5 mb-4 text-xs text-slate-700 font-medium">
                    {c.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F7A4C]"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mandatory disclaimer for Tax & Compliance (§6 & §20) */}
                  {c.disclaimer && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 mb-4 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{c.disclaimer}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-300/60 flex items-center justify-between">
                  <button
                    id={`learn-more-${c.key}-btn`}
                    onClick={() => onLearnMore(c.key)}
                    className="text-xs font-bold text-[#0B2440] hover:text-[#0F7A4C] flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Explore Feature</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={onExploreDemo}
                    className="text-[11px] font-semibold text-[#0F7A4C] bg-white px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
                  >
                    View Demo
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
