import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  FileText,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Send,
  Download,
  Building,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { Invoice, InvoiceStatus } from '../../types';

interface InvoicesViewProps {
  onOpenCreateInvoice: () => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ onOpenCreateInvoice }) => {
  const { invoices, updateInvoiceStatus, tenant } = useBusiness();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredInvoices = invoices.filter((inv) =>
    filterStatus === 'All' ? true : inv.status === filterStatus
  );

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.total, 0);
  const totalUnpaid = invoices
    .filter((i) => i.status === 'Unpaid' || i.status === 'Overdue')
    .reduce((acc, i) => acc + i.total, 0);
  const totalPaid = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, i) => acc + i.total, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Invoicing &amp; Customer Billing
          </h2>
          <p className="text-xs text-slate-500">
            Issue eTIMS-ready invoices with M-Pesa Paybill/Till instructions and track payments.
          </p>
        </div>

        <button
          id="create-invoice-btn"
          onClick={onOpenCreateInvoice}
          className="px-4 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Invoice</span>
        </button>
      </div>

      {/* Top 3 Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Total Invoiced</span>
          <div className="text-2xl font-black text-[#0B2440] mt-1">
            KSh {totalInvoiced.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">{invoices.length} invoices generated</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Outstanding / Unpaid</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            KSh {totalUnpaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-amber-700 font-bold">
            {invoices.filter((i) => i.status === 'Overdue').length} marked Overdue
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Collected &amp; Paid</span>
          <div className="text-2xl font-black text-[#0F7A4C] mt-1">
            KSh {totalPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">
            {invoices.filter((i) => i.status === 'Paid').length} cleared invoices
          </span>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="flex items-center gap-2">
        {['All', 'Paid', 'Unpaid', 'Overdue'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-[#0B2440] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-[#0B2440] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount (KES)</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0F7A4C]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#0B2440]">{inv.customerName}</div>
                    <div className="text-[10px] text-slate-400">{inv.customerPhone || inv.customerEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {inv.issueDate}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {inv.dueDate}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-[#0F7A4C]'
                          : inv.status === 'Unpaid'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-black text-[#0B2440] text-sm">
                    KSh {inv.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition-colors"
                        title="View / Print PDF Invoice"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      {/* Status toggle dropdown */}
                      <select
                        value={inv.status}
                        onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as InvoiceStatus)}
                        className="text-[10px] py-1 px-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Mark Paid</option>
                        <option value="Overdue">Mark Overdue</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No invoices matching this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice PDF & Print Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-6 relative">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0B2440] text-sm">Tax Invoice Preview</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    selectedInvoice.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {selectedInvoice.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Invoice Document Body */}
            <div id="printable-invoice" className="space-y-6 text-xs text-slate-700">
              
              {/* Header: Business info & Invoice Number */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-[#0B2440] uppercase">
                    {tenant.name}
                  </h3>
                  <p className="text-slate-500 mt-0.5">P.O. Box 48201, {tenant.county}, Kenya</p>
                  <p className="text-slate-500">Phone: {tenant.phone} · Email: {tenant.email}</p>
                  <p className="text-slate-500 font-mono text-[11px] mt-1">KRA PIN: P051892019Z (eTIMS Enabled)</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#0F7A4C]">INVOICE</div>
                  <div className="font-mono font-bold text-slate-800">{selectedInvoice.invoiceNumber}</div>
                  <div className="text-slate-400 text-[11px] mt-1">Date: {selectedInvoice.issueDate}</div>
                  <div className="text-slate-700 font-bold text-[11px]">Due: {selectedInvoice.dueDate}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Billed To (Client):
                </span>
                <div className="font-bold text-[#0B2440] text-sm">
                  {selectedInvoice.customerName}
                </div>
                {selectedInvoice.customerPhone && (
                  <div className="text-slate-500">Tel: {selectedInvoice.customerPhone}</div>
                )}
                {selectedInvoice.customerEmail && (
                  <div className="text-slate-500">Email: {selectedInvoice.customerEmail}</div>
                )}
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-[#0B2440] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 text-right">Total (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInvoice.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-medium">{it.description}</td>
                        <td className="py-2.5 px-3 text-center">{it.quantity}</td>
                        <td className="py-2.5 px-3 text-right">KSh {it.unitPrice.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#0B2440]">
                          KSh {(it.quantity * it.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>KSh {selectedInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>VAT (16% Included / Exempt):</span>
                    <span>KSh {selectedInvoice.taxTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-black text-[#0B2440] text-sm pt-2 border-t border-slate-200">
                    <span>Total Due:</span>
                    <span className="text-[#0F7A4C]">KSh {selectedInvoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions & eTIMS Footer */}
              <div className="bg-[#E8F7EF] rounded-xl p-4 border border-emerald-200 space-y-2">
                <div className="font-bold text-[#0F7A4C] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>Payment Instructions (Lipa Na M-Pesa &amp; Bank):</span>
                </div>
                <p className="text-slate-700 text-xs">
                  {selectedInvoice.paymentInstructions || 'Paybill: 400200 · Account: 011092849102 · Or M-Pesa Buy Goods Till: 892341 (Mama Njeri Supplies)'}
                </p>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-emerald-200/80 flex items-center justify-between">
                  <span>eTIMS Verification Control: eTIMS-KE-90182490</span>
                  <span>Thank you for your business!</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
