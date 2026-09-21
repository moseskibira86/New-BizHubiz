import React, { useState } from 'react';
import {
  LayoutDashboard,
  Receipt,
  MessageCircle,
  Package,
  FileCheck,
  Sparkles,
  Bot,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface PlatformShowcaseProps {
  onExploreDemo?: () => void;
  onStartTrial?: () => void;
  onLaunchDemo?: () => void;
}

export const PlatformShowcase: React.FC<PlatformShowcaseProps> = ({
  onExploreDemo,
  onStartTrial,
  onLaunchDemo,
}) => {
  const handleDemo = () => {
    if (onLaunchDemo) onLaunchDemo();
    else if (onExploreDemo) onExploreDemo();
  };
  const [activeTab, setActiveTab] = useState<'finance' | 'crm' | 'inventory' | 'compliance' | 'ai'>('finance');

  const tabContents = {
    finance: {
      title: 'Finance & Invoicing Engine',
      badge: 'Cash Flow Reconciled',
      desc: 'Record cash, M-Pesa, and bank transfers in seconds. Generate eTIMS-ready professional invoices with downloadable PDF capability and automated overdue reminders.',
      stats: [
        { label: 'Sales Logged', value: 'KSh 482,500' },
        { label: 'Net Profit', value: 'KSh 128,430' },
        { label: 'M-Pesa Reconciliation', value: '100% Match' },
      ],
      features: [
        'Automatic gross & net profit margin calculation',
        'Downloadable invoice PDFs with M-Pesa Paybill / Till instructions',
        'Low cash balance threshold warning system',
      ],
    },
    crm: {
      title: 'Customer & WhatsApp CRM',
      badge: 'Turn Chats into Sales',
      desc: 'Organize customers with tags like VIP, Repeat, Wholesale, and Inactive. Launch WhatsApp payment reminders and promotional broadcasts without leaving your workflow.',
      stats: [
        { label: 'Total Customers', value: '1,284' },
        { label: 'VIP Accounts', value: '142' },
        { label: 'Average Spend', value: 'KSh 14,200' },
      ],
      features: [
        'Pre-formatted WhatsApp message templates for Kenyan traders',
        'One-click polite debt collection reminders',
        'Automatic customer lifetime value & order frequency',
      ],
    },
    inventory: {
      title: 'Real-time Stock & Supplier Control',
      badge: 'Zero Lost Sales',
      desc: 'Set minimum reorder points with color-coded alerts (🔴 Critical, 🟡 Low, 🟢 Healthy). Track dead stock, supplier balances, and inventory valuation seamlessly.',
      stats: [
        { label: 'Stock Valuation', value: 'KSh 860,000' },
        { label: 'Critical Items', value: '2 items' },
        { label: 'Active Suppliers', value: '8 verified' },
      ],
      features: [
        'Fast +/- stock adjustments from any mobile phone',
        'Supplier debt tracking and settlement logs',
        'Dead stock warning for goods stagnant over 60 days',
      ],
    },
    compliance: {
      title: 'KRA Tax & County Compliance Hub',
      badge: 'Zero Fines Guarantee',
      desc: 'Never miss a VAT deadline on the 20th or PAYE/SHIF/NSSF on the 9th. Step-by-step guides for eTIMS integration, Nil returns, and annual business permits.',
      stats: [
        { label: 'Next Filing Due', value: 'PAYE (3 Days)' },
        { label: 'County Permit', value: 'Active 2026' },
        { label: 'eTIMS Status', value: 'Connected' },
      ],
      features: [
        'Automated countdown clocks to statutory remittance dates',
        'County Single Business Permit verification guidelines',
        'Clear educational disclaimers on professional tax advice',
      ],
    },
    ai: {
      title: 'Ask BizHub AI Business Assistant',
      badge: 'Powered by Gemini AI',
      desc: 'Your private AI CFO and business consultant. Ask questions grounded in your actual sales numbers: "Why were transport expenses high this week?" or "Draft a wholesale promotion for rice."',
      stats: [
        { label: 'Grounding', value: 'Your Tenant Data' },
        { label: 'Languages', value: 'English & Swahili' },
        { label: 'Local Context', value: 'Kenyan Markets' },
      ],
      features: [
        'Data-grounded financial diagnostics and profit margin analysis',
        'AI Marketing copywriter for SMS, WhatsApp & Social media',
        'Safe, tenant-isolated architecture with strict confidentiality',
      ],
    },
  };

  const currentTab = tabContents[activeTab];

  return (
    <section id="features" className="py-20 bg-[#0B2440] text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#0F7A4C]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#F5B400]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#F5B400] bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Unified Kenyan Operating System
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Everything You Need in One Platform
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg">
            Say goodbye to fragmented paper notebooks, chaotic WhatsApp receipts, and lost inventory tallies. BizHubKE connects all the dots.
          </p>
        </div>

        {/* Tab selection pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('finance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'finance'
                ? 'bg-[#0F7A4C] text-white shadow-lg'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Finance & Invoicing</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'crm'
                ? 'bg-[#0F7A4C] text-white shadow-lg'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp CRM</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#0F7A4C] text-white shadow-lg'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventory & Stock</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'compliance'
                ? 'bg-[#0F7A4C] text-white shadow-lg'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>KRA & Compliance</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-[#F5B400] text-[#0B2440] shadow-lg'
                : 'bg-white/10 text-slate-300 hover:bg-white/15'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Ask BizHub AI</span>
          </button>
        </div>

        {/* Dynamic showcase display box */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Feature Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-[#F5B400]" />
                <span>{currentTab.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentTab.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                {currentTab.desc}
              </p>

              <div className="space-y-3">
                {currentTab.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={onExploreDemo}
                  className="px-6 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Test in Mama Njeri Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onStartTrial}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  Start 7-Day Trial
                </button>
              </div>
            </div>

            {/* Right Column: Live Data Snapshot Simulation */}
            <div className="lg:col-span-6 bg-slate-800/80 rounded-xl p-5 sm:p-6 border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Performance Metrics
                  </span>
                </div>
                <span className="text-[11px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Mama Njeri Supplies
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {currentTab.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block mb-1">{stat.label}</span>
                    <span className="text-base font-extrabold text-[#F5B400]">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Visual simulated UI snapshot */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                  <span>SYSTEM EVENT</span>
                  <span className="text-emerald-400">STATUS: ACTIVE</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt;</span> Syncing Firestore tenant: <span className="text-white">Mama Njeri Supplies</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt;</span> Auto-calculating Net Profit Margin: <span className="text-[#F5B400]">26.6%</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt;</span> Statutory compliance check: <span className="text-emerald-300">VAT &amp; PAYE on track</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt;</span> M-Pesa Till 892341: <span className="text-sky-300">Transactions reconciled</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
