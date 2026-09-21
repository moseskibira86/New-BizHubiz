import React, { useState, useMemo } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Package,
  Plus,
  Minus,
  Search,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Clock,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { Product, StockStatus } from '../../types';

interface InventoryViewProps {
  onOpenAddProduct: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ onOpenAddProduct }) => {
  const { products, updateProductStock } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'inventory' | 'deadstock' | 'reorder'>('inventory');

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchQuery, selectedStatus]);

  // Inventory valuation (§18)
  const totalCostValue = products.reduce((acc, p) => acc + p.purchasePrice * p.quantity, 0);
  const totalRetailValue = products.reduce((acc, p) => acc + p.sellingPrice * p.quantity, 0);
  const potentialProfit = totalRetailValue - totalCostValue;

  // Reorder list (§18)
  const reorderList = products.filter(
    (p) => p.status === 'Critical' || p.status === 'Low' || p.quantity <= p.minStockLevel
  );

  // Dead stock report (§18: products with daysWithoutSale >= 30)
  const deadStockProducts = products.filter((p) => p.daysWithoutSale && p.daysWithoutSale >= 30);

  const getStatusBadge = (status: StockStatus) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold';
      case 'Low':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'Out of Stock':
        return 'bg-slate-200 text-slate-800 border-slate-400 font-bold';
      case 'Adequate':
      case 'Excess':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Inventory &amp; Stock Control
          </h2>
          <p className="text-xs text-slate-500">
            Real-time quantity adjustments, wholesale margins, low-stock reorder lists, and dead-stock reports.
          </p>
        </div>

        <button
          id="add-product-btn"
          onClick={onOpenAddProduct}
          className="px-4 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Product</span>
        </button>
      </div>

      {/* Valuation Metrics (§18) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Total Stock Cost Value</span>
          <div className="text-2xl font-black text-[#0B2440] mt-1">
            KSh {totalCostValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Capital tied up in inventory</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Total Retail Value</span>
          <div className="text-2xl font-black text-[#0F7A4C] mt-1">
            KSh {totalRetailValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">Projected sales revenue</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Potential Margin / Profit</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            KSh {potentialProfit.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">
            Avg markup: {totalCostValue > 0 ? ((potentialProfit / totalCostValue) * 100).toFixed(1) : 0}%
          </span>
        </div>
      </div>

      {/* Tabs: Master Inventory / Auto Reorder List / Dead Stock */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-[#0B2440] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Catalog Items ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('reorder')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'reorder'
              ? 'bg-[#0B2440] text-white shadow-xs'
              : 'text-rose-600 hover:bg-rose-50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          <span>Reorder Needed ({reorderList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deadstock')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'deadstock'
              ? 'bg-[#0B2440] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Dead Stock &gt;30d ({deadStockProducts.length})</span>
        </button>
      </div>

      {/* TAB 1: MASTER INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, SKU, or category..."
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
            >
              <option value="All">All Stock Levels</option>
              <option value="Critical">🔴 Critical Stock</option>
              <option value="Low">🟡 Low Stock</option>
              <option value="Adequate">🟢 Adequate</option>
              <option value="Excess">Excess</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-[#0B2440] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Item &amp; SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Cost vs Selling</th>
                    <th className="py-3 px-4">Margin %</th>
                    <th className="py-3 px-4 text-center">In Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Quick Adjust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                    const margin = p.sellingPrice > 0 ? (((p.sellingPrice - p.purchasePrice) / p.sellingPrice) * 100).toFixed(0) : '0';
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#0B2440]">{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku} · {p.unit}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#0B2440]">KSh {p.sellingPrice.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400">Cost: KSh {p.purchasePrice.toLocaleString()}</div>
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-700">
                          {margin}%
                        </td>
                        <td className="py-3 px-4 text-center font-black text-sm text-[#0B2440]">
                          {p.quantity} <span className="text-[10px] text-slate-400 font-normal">/ min {p.minStockLevel}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getStatusBadge(p.status)}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => updateProductStock(p.id, -1)}
                              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 flex items-center justify-center font-bold text-xs transition-colors"
                              title="-1 Stock Out"
                            >
                              -
                            </button>
                            <button
                              onClick={() => updateProductStock(p.id, 5)}
                              className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F7A4C] flex items-center justify-center font-bold text-xs transition-colors"
                              title="+5 Restock"
                            >
                              +5
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REORDER NEEDED */}
      {activeTab === 'reorder' && (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
            <div>
              <strong className="font-bold block">Auto-Generated Reorder List (§18)</strong>
              <p className="mt-0.5 text-amber-800">
                These items are currently at or below safe buffer thresholds. Send these to your suppliers for restock.
              </p>
            </div>
            <span className="font-black text-amber-800 text-sm px-3 py-1 rounded-lg bg-white">
              {reorderList.length} items to order
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reorderList.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#0B2440] text-sm">{item.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-600 text-white">
                    {item.status}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Balance:</span>
                    <strong className="text-rose-700">{item.quantity} {item.unit}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Min Buffer Level:</span>
                    <strong className="text-slate-700">{item.minStockLevel} {item.unit}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-slate-200">
                    <span>Suggested Order:</span>
                    <span>+{Math.max(item.minStockLevel * 2 - item.quantity, 10)} {item.unit}</span>
                  </div>
                </div>

                <button
                  onClick={() => updateProductStock(item.id, 20)}
                  className="w-full py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Receive Shipment (+20)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEAD STOCK REPORT */}
      {activeTab === 'deadstock' && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-blue-900 text-xs">
            <strong className="font-bold block">Dead-Stock Report (§18)</strong>
            <p className="mt-0.5 text-blue-800">
              Products with no customer sales recorded in the past 30, 60, or 90 days. Free up cash flow by bundling or running promotional discounts.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-[#0B2440] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Days Inactive</th>
                  <th className="py-3 px-4">Units in Shelf</th>
                  <th className="py-3 px-4">Tied Capital (KES)</th>
                  <th className="py-3 px-4">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deadStockProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0B2440]">{p.name}</td>
                    <td className="py-3 px-4 font-bold text-amber-700">{p.daysWithoutSale} days idle</td>
                    <td className="py-3 px-4">{p.quantity} {p.unit}</td>
                    <td className="py-3 px-4 font-extrabold text-rose-600">
                      KSh {(p.purchasePrice * p.quantity).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-bold">
                        Discount 10% or Bundle Promo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
