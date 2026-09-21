import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Truck,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Package,
} from 'lucide-react';
import { Supplier } from '../../types';

export const SuppliersView: React.FC = () => {
  const { suppliers } = useBusiness();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const totalOwed = suppliers.reduce((acc, s) => acc + s.balanceOwed, 0);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Suppliers &amp; Vendor Accounts Payable (§19)
          </h2>
          <p className="text-xs text-slate-500">
            Track wholesale supply contracts, delivery terms, and outstanding restock balances.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 block font-semibold">Total Accounts Payable</span>
          <span className="text-base font-black text-rose-600">
            KSh {totalOwed.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-[#0B2440]">{sup.name}</h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sup.location}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                  {sup.category}
                </span>
              </div>

              <div className="space-y-1.5 my-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sup.phone} (Attn: {sup.contactPerson})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sup.email}</span>
                </div>
              </div>

              {/* Items supplied */}
              <div className="mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Products Supplied:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(sup.productsSupplied)
                    ? sup.productsSupplied
                    : typeof sup.productsSupplied === 'string'
                    ? sup.productsSupplied.split(',').map((s) => s.trim())
                    : []
                  ).map((prod, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700 font-medium"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Balances */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Payment Terms</span>
                  <strong className="text-slate-800">{sup.paymentTerms}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Balance Owed</span>
                  <strong className={sup.balanceOwed > 0 ? 'text-rose-600 font-black' : 'text-emerald-700 font-bold'}>
                    KSh {sup.balanceOwed.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Total orders: {sup.orderHistoryCount || 12}</span>
              <a
                href={`tel:${sup.phone.replace(/[^0-9+]/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold flex items-center gap-1 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call Vendor</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
