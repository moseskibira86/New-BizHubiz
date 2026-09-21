import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  MessageCircle,
  Send,
  Sparkles,
  Phone,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

export const WhatsAppCrmView: React.FC = () => {
  const { customers, tenant, invoices } = useBusiness();

  const [activeConversationId, setActiveConversationId] = useState<string>('c1');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl-restock');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Template definitions (§17)
  const templates = [
    {
      id: 'tpl-payment',
      title: 'Payment Reminder (Due / Overdue)',
      category: 'Invoicing',
      text: 'Habari {customer_name}! Kindly note invoice {invoice_number} of KSh {amount} for {business_name} was due on {due_date}. Please pay via Lipa Na M-Pesa Till: 892341. Thank you!',
    },
    {
      id: 'tpl-order',
      title: 'Order Confirmation & Dispatch',
      category: 'Fulfillment',
      text: 'Hello {customer_name}! Your wholesale order {order_number} from {business_name} has been processed and dispatched for delivery. Thank you for your continued partnership!',
    },
    {
      id: 'tpl-restock',
      title: 'Fresh Stock Arrival Alert',
      category: 'Sales',
      text: 'Jambo {customer_name}! Fresh supplies of cooking oil, sugar, and flour have arrived at {business_name} at wholesale prices. Order today before stock clears out! Call/reply here to book.',
    },
    {
      id: 'tpl-reengage',
      title: 'Re-engagement for Inactive Clients',
      category: 'Retention',
      text: 'Habari {customer_name}! We missed you at {business_name}. We have an exclusive 5% bonus discount on your next wholesale order this week. May we send you our updated price catalogue?',
    },
    {
      id: 'tpl-etims',
      title: 'eTIMS Receipt & Invoice Link',
      category: 'Compliance',
      text: 'Habari {customer_name}! Your valid eTIMS compliant tax receipt for transaction {order_number} from {business_name} is ready. Thank you for shopping with us!',
    },
  ];

  // Active customer
  const currentCustomer = customers.find((c) => c.id === activeConversationId) || customers[0];

  // Mock messages for conversation simulator
  const simulatedMessages = [
    {
      sender: 'customer',
      time: 'Yesterday 3:15 PM',
      text: `Hello ${tenant.name}, please confirm if you have 10 cartons of Pembe Maize Meal in stock?`,
    },
    {
      sender: 'business',
      time: 'Yesterday 3:18 PM',
      text: `Habari ${currentCustomer.name}! Yes, we have Pembe in stock ready for pickup or dispatch to your duka.`,
    },
    {
      sender: 'customer',
      time: 'Today 9:40 AM',
      text: `Awesome, kindly reserve 10 cartons. Sending M-Pesa payment shortly.`,
    },
  ];

  // Fill template variables
  const currentTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];
  const renderedMessage = currentTemplate.text
    .replace(/{customer_name}/g, currentCustomer.name)
    .replace(/{business_name}/g, tenant.name)
    .replace(/{amount}/g, '24,500')
    .replace(/{invoice_number}/g, 'INV-2025-001')
    .replace(/{order_number}/g, 'ORD-8912')
    .replace(/{due_date}/g, '25th of this month');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice('Copied template to clipboard!');
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = currentCustomer.phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(renderedMessage);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            WhatsApp CRM &amp; Smart Campaigns
          </h2>
          <p className="text-xs text-slate-500">
            Send bulk announcements, personalized payment reminders, and customer re-engagement scripts.
          </p>
        </div>

        {/* Ready for API Sandbox Badge (§17 requirement) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#0F7A4C]" />
          <span>Meta WhatsApp Business API: Ready / Sandbox Mode</span>
        </div>
      </div>

      {/* Main 2-Column Interface: Left Templates, Right Live Simulator & Click to Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Message Templates & Customer Selector */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Target Customer Selector */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold text-[#0B2440] mb-2">
              Select Target Recipient:
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {customers.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveConversationId(c.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    activeConversationId === c.id
                      ? 'bg-[#E8F7EF] border-[#0F7A4C] text-[#0F7A4C] font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.phone}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {c.tags[0] || 'Client'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-built Message Templates */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#0B2440] uppercase tracking-wider">
              Pre-built Kenyan SME Templates (§17)
            </h3>

            <div className="space-y-2">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedTemplateId === tpl.id
                      ? 'bg-amber-50 border-[#F5B400] text-amber-950 font-semibold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{tpl.title}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {tpl.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Message Customizer & Live Chat Simulator */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Template Editor / Preview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0B2440]">
                Live Rendered Message for {currentCustomer.name}
              </span>
              <button
                onClick={() => handleCopy(renderedMessage)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>

            {copiedNotice && (
              <div className="p-2 rounded-lg bg-emerald-50 text-[#0F7A4C] text-[11px] font-bold text-center">
                {copiedNotice}
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
              {renderedMessage}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenWhatsApp}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp ({currentCustomer.phone})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Chat Window Preview */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
            {/* WhatsApp Header bar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  {currentCustomer.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold">{currentCustomer.name}</div>
                  <div className="text-[10px] text-emerald-200">Online · {currentCustomer.phone}</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                WhatsApp Web
              </span>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 bg-[#0c1317] min-h-60 max-h-72 overflow-y-auto text-xs">
              {simulatedMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'business'
                        ? 'bg-[#005c4b] text-white rounded-tr-none'
                        : 'bg-[#202c33] text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-slate-300 block text-right mt-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick response helper footer */}
            <div className="p-2.5 bg-[#202c33] border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-300">
              <span>Send directly from your verified Kenyan SIM / WhatsApp Business number</span>
              <button
                onClick={handleOpenWhatsApp}
                className="text-[#25D366] font-bold hover:underline flex items-center gap-1"
              >
                <span>Launch App</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
