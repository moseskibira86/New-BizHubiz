import React, { useState, useMemo } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Receipt,
  Plus,
  Search,
  Trash2,
  FileSpreadsheet,
  Paperclip,
  TrendingDown,
  Building,
  Smartphone,
  Banknote,
} from 'lucide-react';
import { ExpenseCategory, PaymentMethod } from '../../types';

interface ExpensesViewProps {
  onOpenAddExpense: () => void;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({ onOpenAddExpense }) => {
  const { expenses, deleteExpense } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: ExpenseCategory[] = [
    'Rent',
    'Utilities',
    'Transport',
    'Salaries',
    'Marketing',
    'Stock',
    'Equipment',
    'Bank charges',
    'Taxes',
    'Other',
  ];

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchesSearch =
        e.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.notes && e.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchQuery, selectedCategory]);

  const totalExpenses = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  // Category totals
  const categorySummary = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const handleExportCSV = () => {
    const headers = ['Expense ID', 'Date', 'Category', 'Payee', 'Amount (KES)', 'Payment Method', 'Notes'];
    const rows = filteredExpenses.map((e) => [
      e.id,
      e.date,
      e.category,
      `"${e.payee}"`,
      e.amount,
      e.paymentMethod,
      `"${e.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `BizHubKE-Expenses-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Operating Expenses &amp; Cash Outflows
          </h2>
          <p className="text-xs text-slate-500">
            Track business overheads, supplier restocks, staff payroll, rent, and KRA taxes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            id="add-expense-btn"
            onClick={onOpenAddExpense}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Expense</span>
          </button>
        </div>
      </div>

      {/* Top 3 Breakdown Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Total Expenses Logged</span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            KSh {totalExpenses.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">{filteredExpenses.length} total payouts</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Largest Category</span>
          <div className="text-xl font-black text-[#0B2440] mt-1 truncate">
            {categorySummary[0] ? categorySummary[0][0] : 'N/A'}
          </div>
          <span className="text-[11px] text-slate-500">
            {categorySummary[0] ? `KSh ${categorySummary[0][1].toLocaleString()}` : ''}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Tax &amp; Government Paid</span>
          <div className="text-xl font-black text-[#0B2440] mt-1">
            KSh {expenses.filter((e) => e.category === 'Taxes').reduce((a, e) => a + e.amount, 0).toLocaleString()}
          </div>
          <span className="text-[11px] text-purple-700 font-semibold">KRA VAT &amp; PAYE Remittances</span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payee or notes (e.g. Nyayo Plaza, KPLC, Staff)..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-[#0B2440] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payee / Recipient</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-right">Amount (KES)</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {exp.date}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0B2440]">
                    {exp.payee}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                      {exp.paymentMethod === 'M-Pesa' && <Smartphone className="w-3.5 h-3.5 text-emerald-600" />}
                      {exp.paymentMethod === 'Cash' && <Banknote className="w-3.5 h-3.5 text-amber-600" />}
                      {exp.paymentMethod === 'Bank Transfer' && <Building className="w-3.5 h-3.5 text-blue-600" />}
                      <span>{exp.paymentMethod}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                    {exp.notes || '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-rose-600 text-sm">
                    - KSh {exp.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete expense entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No expense records found.
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
