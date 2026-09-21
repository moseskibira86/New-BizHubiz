import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Banknote,
  Building,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const {
    tenant,
    sales,
    expenses,
    invoices,
    products,
    customers,
    businessScore,
  } = useBusiness();

  const totalSales = sales.reduce((a, s) => a + s.amount, 0);
  const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
  const netProfit = totalSales - totalExpenses;

  // Category totals
  const categoryMap: Record<string, number> = {};
  sales.forEach((s) => {
    categoryMap[s.category] = (categoryMap[s.category] || 0) + s.amount;
  });
  const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  // Payment method breakdown
  const mpesaTotal = sales.filter((s) => s.paymentMethod === 'M-Pesa').reduce((a, s) => a + s.amount, 0);
  const cashTotal = sales.filter((s) => s.paymentMethod === 'Cash').reduce((a, s) => a + s.amount, 0);
  const bankTotal = sales.filter((s) => s.paymentMethod === 'Bank Transfer').reduce((a, s) => a + s.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
          Analytics &amp; My Business Score™
        </h2>
        <p className="text-xs text-slate-500">
          Executive financial health diagnosis, payment reconciliation, and growth opportunities for Kenyan SMEs.
        </p>
      </div>

      {/* MY BUSINESS SCORE DEEP DIVE (§11) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C] bg-emerald-50 px-3 py-1 rounded-full">
              Comprehensive SME Health Audit
            </span>
            <h3 className="text-2xl font-black text-[#0B2440] mt-2">
              My Business Score: {businessScore.overallScore} / 100
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Calculated across real liquidity, customer retention, inventory turnover, and regulatory compliance.
            </p>
          </div>

          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#0F7A4C] to-emerald-400 text-white flex flex-col items-center justify-center shadow-lg shrink-0">
            <span className="text-3xl font-black">{businessScore.overallScore}</span>
            <span className="text-[10px] uppercase font-bold text-emerald-100">Score</span>
          </div>
        </div>

        {/* 5 Dimensional Pillars (§11) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">1. Financial Health</span>
            <div className="text-2xl font-black text-[#0F7A4C]">{businessScore.financialHealth}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#0F7A4C]" style={{ width: `${businessScore.financialHealth}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">Net margin: {totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : 0}%</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">2. Customer CRM</span>
            <div className="text-2xl font-black text-blue-600">{businessScore.customerManagement}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${businessScore.customerManagement}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">{customers.length} total accounts</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">3. Operations &amp; Stock</span>
            <div className="text-2xl font-black text-amber-600">{businessScore.operations}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: `${businessScore.operations}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">{products.length} catalog items</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">4. Marketing Reach</span>
            <div className="text-2xl font-black text-purple-600">{businessScore.marketing}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: `${businessScore.marketing}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">WhatsApp broadcast</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">5. Statutory Tax</span>
            <div className="text-2xl font-black text-teal-600">{businessScore.compliance}%</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500" style={{ width: `${businessScore.compliance}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">KRA &amp; county filings</p>
          </div>
        </div>

        {/* Opportunity Callout (§11) */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-xs text-amber-950">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-sm block mb-0.5">Top Identified Opportunity:</strong>
            <p className="leading-relaxed">
              {businessScore.biggestOpportunity}
            </p>
          </div>
        </div>

        {/* Mandatory Score Disclaimer (§11) */}
        <p className="text-[11px] text-slate-400 italic">
          "This score is an internal business-management indicator based on the information you provide. It is not a bank credit rating or financial assessment."
        </p>
      </div>

      {/* Financial Breakdown: Category & Payment Channel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sales by Category */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-[#0B2440]">Revenue by Product Category</h4>
          
          <div className="space-y-3 text-xs">
            {sortedCategories.map(([cat, amount]) => {
              const pct = totalSales > 0 ? ((amount / totalSales) * 100).toFixed(0) : '0';
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">{cat}</span>
                    <span className="font-bold">KSh {amount.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F7A4C]" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Channels (M-Pesa vs Cash vs Bank) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-[#0B2440]">Payment Method Distribution</h4>

          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-bold text-[#0B2440]">Lipa Na M-Pesa</div>
                  <div className="text-[10px] text-emerald-700">Till / Paybill Reconciled</div>
                </div>
              </div>
              <div className="text-right font-black text-emerald-800 text-sm">
                KSh {mpesaTotal.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Banknote className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-bold text-[#0B2440]">Physical Cash</div>
                  <div className="text-[10px] text-amber-700">Over the counter receipts</div>
                </div>
              </div>
              <div className="text-right font-black text-amber-800 text-sm">
                KSh {cashTotal.toLocaleString()}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-bold text-[#0B2440]">Bank Transfer / EFT</div>
                  <div className="text-[10px] text-blue-700">Corporate &amp; bulk orders</div>
                </div>
              </div>
              <div className="text-right font-black text-blue-800 text-sm">
                KSh {bankTotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
