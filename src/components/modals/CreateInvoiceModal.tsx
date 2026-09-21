import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { X, FileText, Plus, Trash2 } from 'lucide-react';
import { InvoiceItem } from '../../types';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose }) => {
  const { createInvoice, customers, tenant } = useBusiness();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [dueDate, setDueDate] = useState('2025-03-31');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 'item-1', description: 'Wholesale Maize Meal (Cartons)', quantity: 5, unitPrice: 2400, taxRate: 0.16 },
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: `item-${Date.now()}`, description: '', quantity: 1, unitPrice: 1000, taxRate: 0.16 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unitPrice || 0), 0);
  const total = subtotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || items.length === 0) return;

    createInvoice({
      invoiceNumber: 'INV-' + Math.floor(1000 + Math.random() * 9000),
      issueDate: new Date().toISOString().slice(0, 10),
      customerName,
      customerPhone,
      customerEmail,
      items,
      subtotal,
      taxTotal: 0,
      total,
      dueDate,
      status: 'Unpaid',
      paymentInstructions: `Lipa Na M-Pesa Buy Goods Till: ${tenant.mpesaTillNumber || '892341'} (${tenant.name})`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0B2440]">Create New Invoice</h3>
            <p className="text-xs text-slate-500">eTIMS-Ready Voucher with M-Pesa Instructions</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Customer / Client Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kiprono Enterprises"
                list="invoice-customers"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
              <datalist id="invoice-customers">
                {customers.map((c) => (
                  <option key={c.id} value={c.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Due Date *</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Client Phone (WhatsApp)</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+254 7..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Client Email (Optional)</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="accounts@client.co.ke"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>
          </div>

          {/* Line items */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700">Invoice Items</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-[11px] font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input
                  type="text"
                  required
                  placeholder="Item description"
                  value={it.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={it.quantity}
                  onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                  className="w-16 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-center bg-white"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Price"
                  value={it.unitPrice}
                  onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                  className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-right bg-white font-bold"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Total Preview */}
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 flex justify-between items-center text-xs">
            <span className="font-bold text-[#0F7A4C]">Total Invoice Amount:</span>
            <span className="text-base font-black text-[#0F7A4C]">
              KSh {total.toLocaleString()}
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold transition-colors shadow-xs"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
