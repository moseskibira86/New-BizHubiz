import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Megaphone,
  Sparkles,
  MessageCircle,
  Copy,
  CheckCircle2,
  Share2,
  Smartphone,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const MarketingView: React.FC = () => {
  const { tenant, products } = useBusiness();
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Marketing campaign generator states
  const [productFocus, setProductFocus] = useState(products[0]?.name || 'Cooking Oil & Flour');
  const [discountPercent, setDiscountPercent] = useState('10%');
  const [campaignTone, setCampaignTone] = useState<'Friendly & Urgent' | 'Wholesale Exclusive' | 'End of Month Sale'>('Wholesale Exclusive');

  const generatedWhatsAppCopy = `🔥 WHOLESALE FLASH DEAL — ${tenant.name.toUpperCase()} 🔥\n\nHabari valued partner! For the next 48 hours only, enjoy up to ${discountPercent} OFF on bulk orders of *${productFocus}*!\n\n✅ Premium verified quality\n✅ Same-day dispatch to your shop/duka in ${tenant.county}\n✅ Pay securely via Lipa Na M-Pesa Buy Goods Till: 892341\n\nLimited stock available! Reply *ORDER* to this chat or call ${tenant.phone} right now to lock in your crates before stock runs dry!`;

  const generatedSmsCopy = `${tenant.name}: Special wholesale restock on ${productFocus}! Get ${discountPercent} off today. Till: 892341. Call ${tenant.phone} to order. Ts&Cs apply.`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Marketing &amp; Sales Promotion Hub (§27)
          </h2>
          <p className="text-xs text-slate-500">
            Generate high-converting WhatsApp status updates, SMS blasts, and customer discount flyers.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#F5B400]" />
          <span>Kenyan SME Campaign Copywriter</span>
        </div>
      </div>

      {copiedNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 text-[#0F7A4C] border border-emerald-200 text-xs font-bold text-center">
          {copiedNotice}
        </div>
      )}

      {/* Generator Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#0B2440]">
          Configure Instant Campaign Copy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Featured Product / Service
            </label>
            <input
              type="text"
              value={productFocus}
              onChange={(e) => setProductFocus(e.target.value)}
              placeholder="e.g. Pembe Maize Flour & Sugar"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Offer / Incentive
            </label>
            <input
              type="text"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="e.g. 10% Discount or Free Delivery"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Campaign Tone
            </label>
            <select
              value={campaignTone}
              onChange={(e) => setCampaignTone(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
            >
              <option value="Wholesale Exclusive">Wholesale Exclusive</option>
              <option value="Friendly & Urgent">Friendly &amp; Urgent</option>
              <option value="End of Month Sale">End of Month Sale</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Outputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Broadcast Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-[#0B2440]">
                  WhatsApp Broadcast &amp; Status Script
                </h4>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                High Conversion
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed">
              {generatedWhatsAppCopy}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Ready for WhatsApp Web &amp; Broadcast Lists</span>
            <button
              onClick={() => handleCopy(generatedWhatsAppCopy, 'WhatsApp message')}
              className="px-4 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Broadcast Copy</span>
            </button>
          </div>
        </div>

        {/* SMS Short Blast Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-[#0B2440]">
                  Bulk SMS Text (160 Characters)
                </h4>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Safaricom / Airtel
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-sans leading-relaxed">
              {generatedSmsCopy}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">{generatedSmsCopy.length} chars (1 SMS credit)</span>
            <button
              onClick={() => handleCopy(generatedSmsCopy, 'SMS text')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy SMS Script</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
