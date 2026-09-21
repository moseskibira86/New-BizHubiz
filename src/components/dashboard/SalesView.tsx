import React, { useState, useMemo } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  TrendingUp,
  Plus,
  Search,
  Download,
  Filter,
  DollarSign,
  Calendar,
  Smartphone,
  Banknote,
  Building,
} from 'lucide-react';
import { PaymentMethod, Sale } from '../../types';

interface SalesViewProps {
  onOpenAddSale: () => void;
}

export const SalesView: React.FC<SalesViewProps> = ({ onOpenAddSale }) => {
  const { sales, selectedDateRange } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All');

  // Filtered sales
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const matchesSearch =
        sale.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.productOrService.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sale.reference && sale.reference.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || sale.category === selectedCategory;
      const matchesPayment = selectedPaymentMethod === 'All' || sale.paymentMethod === selectedPaymentMethod;
      return matchesSearch && matchesCategory && matchesPayment;
    });
  }, [sales, searchQuery, selectedCategory, selectedPaymentMethod]);

  const totalAmount = filteredSales.reduce((acc, s) => acc + s.amount, 0);

  // Category breakdown
  const categoryTotals = useMemo(() => {
    const map: Record<string, number> = {};
    sales.forEach((s) => {
      map[s.category] = (map[s.category] || 0) + s.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [sales]);

  // CSV Export (§12)
  const handleExportCSV = () => {
    const headers = ['Sale ID', 'Date', 'Customer', 'Product/Service', 'Category', 'Quantity', 'Amount (KES)', 'Payment Method', 'Reference', 'Notes'];
    const rows = filteredSales.map((s) => [
      s.id,
      s.date,
      `"${s.customerName}"`,
      `"${s.productOrService}"`,
      `"${s.category}"`,
      s.quantity,
      s.amount,
      s.paymentMethod,
      s.reference || '',
      `"${s.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BizHubKE-Sales-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ['All', ...Array.from(new Set(sales.map((s) => s.category)))];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Sales &amp; Revenue Hub
          </h2>
          <p className="text-xs text-slate-500">
            Log, track, and reconcile transactions across M-Pesa, Cash, and Bank Transfer.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            id="record-sale-btn"
            onClick={onOpenAddSale}
            className="px-4 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Record New Sale</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Total Filtered Sales</span>
          <div className="text-2xl font-black text-[#0B2440] mt-1">
            KSh {totalAmount.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">{filteredSales.length} total orders</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">M-Pesa Volume</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            KSh {filteredSales.filter((s) => s.paymentMethod === 'M-Pesa').reduce((a, s) => a + s.amount, 0).toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">Lipa Na M-Pesa Reconciled</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Top Category</span>
          <div className="text-xl font-black text-[#0B2440] mt-1 truncate">
            {categoryTotals[0] ? categoryTotals[0][0] : 'N/A'}
          </div>
          <span className="text-[11px] text-slate-400">
            {categoryTotals[0] ? `KSh ${categoryTotals[0][1].toLocaleString()}` : ''}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, product, or M-Pesa reference..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
          >
            <option value="All">All Payment Methods</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-[#0B2440] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Item / Service</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Amount (KES)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {s.date}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0B2440]">
                    {s.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {s.productOrService} (x{s.quantity})
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        s.paymentMethod === 'M-Pesa'
                          ? 'bg-emerald-100 text-[#0F7A4C]'
                          : s.paymentMethod === 'Cash'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {s.paymentMethod === 'M-Pesa' && <Smartphone className="w-3 h-3" />}
                      {s.paymentMethod === 'Cash' && <Banknote className="w-3 h-3" />}
                      {s.paymentMethod === 'Bank Transfer' && <Building className="w-3 h-3" />}
                      <span>{s.paymentMethod}</span>
                    </span>
                    {s.reference && (
                      <span className="block text-[9px] text-slate-400 font-mono mt-0.5">
                        Ref: {s.reference}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#0F7A4C] text-sm">
                    KSh {s.amount.toLocaleString()}
                  </td>
                </tr>
              ))}

              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No matching sales found. Record your first sale using the button above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
