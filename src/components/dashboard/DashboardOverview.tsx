import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  TrendingUp,
  Receipt,
  FileText,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Info,
} from 'lucide-react';

interface DashboardOverviewProps {
  onOpenQuickSale: () => void;
  onOpenQuickExpense: () => void;
  onOpenQuickInvoice: () => void;
  onSelectView: (view: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onOpenQuickSale,
  onOpenQuickExpense,
  onOpenQuickInvoice,
  onSelectView,
}) => {
  const {
    tenant,
    sales,
    expenses,
    invoices,
    customers,
    products,
    complianceTasks,
    businessScore,
    selectedDateRange,
  } = useBusiness();

  // Financial calculations
  const totalSales = sales.reduce((acc, s) => acc + s.amount, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const netProfit = totalSales - totalExpenses;
  const netProfitMargin = totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : '0';

  const outstandingInvoices = invoices
    .filter((i) => i.status === 'Unpaid' || i.status === 'Overdue')
    .reduce((acc, i) => acc + i.total, 0);

  const inventoryValue = products.reduce((acc, p) => acc + p.purchasePrice * p.quantity, 0);

  // Critical items
  const criticalProducts = products.filter((p) => p.status === 'Critical');
  const dueSoonTasks = complianceTasks.filter((t) => t.status === 'Due Soon');

  // Low balance cash threshold warning (§14)
  const isBelowThreshold = netProfit < tenant.lowCashThreshold;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Welcome & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Habari, {tenant.ownerName}! 👋
          </h2>
          <p className="text-xs text-slate-500">
            Overview for <strong>{tenant.name}</strong> · Range: <strong>{selectedDateRange}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuickSale}
            className="px-4 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Sale</span>
          </button>
          <button
            onClick={onOpenQuickExpense}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Cash-Flow Low-Balance Warning (§14) */}
      {isBelowThreshold && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-sm">Low Projected Cash Balance Warning</strong>
              <p className="mt-0.5 text-amber-800">
                Your current projected operating balance (KSh {netProfit.toLocaleString()}) is below your preferred minimum safety buffer of KSh {tenant.lowCashThreshold.toLocaleString()}. Consider following up on outstanding client invoices or delaying non-essential stock purchases.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectView('invoices')}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
          >
            View Unpaid Invoices
          </button>
        </div>
      )}

      {/* Section §10: 6 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Total Sales */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">Total Sales</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0F7A4C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-[#0B2440]">
            KSh {totalSales.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>↑ 12% vs last period</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">Expenses</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-[#0B2440]">
            KSh {totalExpenses.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>{expenses.length} recorded items</span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">Net Profit</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0F7A4C] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-xl font-black ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            KSh {netProfit.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <span>{netProfitMargin}% net margin</span>
          </div>
        </div>

        {/* Outstanding Invoices */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">Unpaid Invoices</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-amber-600">
            KSh {outstandingInvoices.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-700">
            <span>{invoices.filter((i) => i.status !== 'Paid').length} invoices pending</span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">Total Customers</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-[#0B2440]">
            {customers.length.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-blue-600">
            <span>{customers.filter((c) => c.tags.includes('VIP')).length} VIP partners</span>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">Inventory Value</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-[#0B2440]">
            KSh {inventoryValue.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>{products.length} catalog items</span>
          </div>
        </div>

      </div>

      {/* Section §11: "My Business Score" Feature Banner */}
      <div className="bg-gradient-to-r from-[#0B2440] via-[#0e2f54] to-[#0B2440] rounded-2xl p-6 text-white border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Score number and badge */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-700/80 pb-6 lg:pb-0 lg:pr-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5B400]">
              Internal Health Metric
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {businessScore.overallScore}
              </span>
              <span className="text-slate-400 font-bold text-lg">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              My Business Score evaluates your margins, customer retention, stock stability, and statutory compliance.
            </p>
          </div>

          {/* Sub-score percentage bars */}
          <div className="lg:col-span-8 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Finance</span>
                  <span className="font-bold text-emerald-400">{businessScore.financialHealth}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${businessScore.financialHealth}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Customers</span>
                  <span className="font-bold text-blue-400">{businessScore.customerManagement}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: `${businessScore.customerManagement}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Operations</span>
                  <span className="font-bold text-amber-400">{businessScore.operations}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${businessScore.operations}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Marketing</span>
                  <span className="font-bold text-pink-400">{businessScore.marketing}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-400" style={{ width: `${businessScore.marketing}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Compliance</span>
                  <span className="font-bold text-purple-400">{businessScore.compliance}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400" style={{ width: `${businessScore.compliance}%` }}></div>
                </div>
              </div>
            </div>

            {/* Opportunity callout (§11) */}
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5B400] shrink-0" />
                <span>
                  <strong>Top Opportunity:</strong> {businessScore.biggestOpportunity}
                </span>
              </div>
              <button
                onClick={() => onSelectView('analytics')}
                className="shrink-0 px-3 py-1 rounded-lg bg-[#F5B400] text-[#0B2440] font-bold text-xs hover:bg-[#db9f00] transition-colors"
              >
                See Recommendations
              </button>
            </div>

            {/* Mandatory score disclaimer (§11) */}
            <p className="text-[10px] text-slate-400 italic">
              "This score is an internal business-management indicator based on the information you provide. It is not a bank credit rating or financial assessment."
            </p>
          </div>

        </div>
      </div>

      {/* Two-Column Lower Hub: Recent Sales & Operational Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Sales & Transactions */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0B2440]">Recent Sales Transactions</h3>
              <p className="text-[11px] text-slate-500">M-Pesa, Cash, and Bank Transfer receipts</p>
            </div>
            <button
              onClick={() => onSelectView('sales')}
              className="text-xs font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {sales.slice(0, 5).map((sale) => (
              <div
                key={sale.id}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F7A4C] flex items-center justify-center font-bold text-xs">
                    {sale.paymentMethod === 'M-Pesa' ? 'M' : sale.paymentMethod === 'Cash' ? 'C' : 'B'}
                  </div>
                  <div>
                    <div className="font-bold text-[#0B2440]">{sale.customerName}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-xs">
                      {sale.productOrService} {sale.reference ? `· ${sale.reference}` : ''}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-[#0F7A4C]">
                    + KSh {sale.amount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">{sale.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Critical Stock & Tax Countdowns */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Statutory Tax Deadlines card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-sm font-bold text-[#0B2440] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F7A4C]" />
                <span>Statutory Tax &amp; Compliance Due</span>
              </h3>
              <button
                onClick={() => onSelectView('compliance')}
                className="text-xs font-bold text-[#0F7A4C] hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-2.5">
              {complianceTasks.slice(0, 2).map((task) => (
                <div key={task.id} className="p-3 rounded-xl bg-[#EAF3FB] border border-blue-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#0B2440] mb-0.5">
                    <span>{task.authority}: {task.title}</span>
                    <span className="text-blue-700 bg-white px-2 py-0.5 rounded text-[10px]">
                      {task.daysRemaining} days left
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{task.actionRequired}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-sm font-bold text-[#0B2440] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Inventory Reorder Status</span>
              </h3>
              <button
                onClick={() => onSelectView('inventory')}
                className="text-xs font-bold text-[#0F7A4C] hover:underline"
              >
                Stock List
              </button>
            </div>

            {criticalProducts.length > 0 ? (
              <div className="space-y-2">
                {criticalProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-rose-900">{p.name}</div>
                      <div className="text-[10px] text-rose-700">
                        Stock: {p.quantity} units · Min Level: {p.minStockLevel}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white">
                      CRITICAL
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-2">All product inventory is at healthy stock levels.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
