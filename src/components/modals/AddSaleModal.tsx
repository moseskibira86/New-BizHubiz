import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { X, TrendingUp, DollarSign, Smartphone, Banknote, Building } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSaleModal: React.FC<AddSaleModalProps> = ({ isOpen, onClose }) => {
  const { addSale, customers, products } = useBusiness();

  const [customerName, setCustomerName] = useState('');
  const [productOrService, setProductOrService] = useState('');
  const [category, setCategory] = useState('Grains & Cereals');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState<number | string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('M-Pesa');
  const [reference, setReference] = useState('MPESA-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !amount) return;

    addSale({
      date: new Date().toISOString().slice(0, 10),
      customerName,
      productOrService: productOrService || 'General Merchandise',
      category,
      quantity: Number(quantity) || 1,
      amount: Number(amount),
      paymentMethod,
      reference,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0F7A4C] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0B2440]">Record New Sale</h3>
            <p className="text-xs text-slate-500">M-Pesa, Cash, or Bank Receipt</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Mama Boi Retail or Walk-in Customer"
              list="existing-customers"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
            />
            <datalist id="existing-customers">
              {customers.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Product / Service</label>
              <input
                type="text"
                value={productOrService}
                onChange={(e) => setProductOrService(e.target.value)}
                placeholder="e.g. Pembe Maize Meal (12x2kg)"
                list="existing-products"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
              <datalist id="existing-products">
                {products.map((p) => (
                  <option key={p.id} value={p.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
              >
                <option value="Grains & Cereals">Grains &amp; Cereals</option>
                <option value="Fats & Oils">Fats &amp; Oils</option>
                <option value="Sweeteners">Sweeteners</option>
                <option value="Beverages">Beverages</option>
                <option value="Household Supplies">Household Supplies</option>
                <option value="Services & Labour">Services &amp; Labour</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Amount (KES) *</label>
              <input
                type="number"
                required
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment Channel</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
              >
                <option value="M-Pesa">Lipa Na M-Pesa</option>
                <option value="Cash">Physical Cash</option>
                <option value="Bank Transfer">Bank Transfer / EFT</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Reference / Code</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. QDF8921"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
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
              Record Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
