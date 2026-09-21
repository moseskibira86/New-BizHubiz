import React from 'react';
import { TrendingUp, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (section: string) => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenDemo }) => {
  return (
    <footer className="bg-[#0B2440] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0F7A4C] flex items-center justify-center text-[#F5B400]">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-white">BizHub<span className="text-[#F5B400]">KE</span></span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The Digital Business Partner for Kenyan SMEs. Helping retailers, wholesalers, dukas, and service providers run cash flow, inventory, invoices, and customer growth effortlessly.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Google Firebase Secured</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-amber-300">
                <span>🇰🇪 Made in Kenya</span>
              </div>
            </div>

            {/* Nairobi Contacts */}
            <div className="space-y-1.5 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Delta Corner Tower, Westlands, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+254 700 882 440 (WhatsApp &amp; Calls)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>support@bizhubke.co.ke</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigateSection('solutions')} className="hover:text-white transition-colors">Retail &amp; Dukas</button></li>
              <li><button onClick={() => onNavigateSection('solutions')} className="hover:text-white transition-colors">Wholesale Distributors</button></li>
              <li><button onClick={() => onNavigateSection('solutions')} className="hover:text-white transition-colors">Hotels &amp; Bakeries</button></li>
              <li><button onClick={() => onNavigateSection('solutions')} className="hover:text-white transition-colors">Salons &amp; Beauty Hubs</button></li>
              <li><button onClick={() => onNavigateSection('solutions')} className="hover:text-white transition-colors">Hardware &amp; Construction</button></li>
              <li><button onClick={onOpenDemo} className="text-[#F5B400] font-bold hover:underline">Launch Mama Njeri Demo</button></li>
            </ul>
          </div>

          {/* Col 3: Modules */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Modules</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigateSection('features')} className="hover:text-white transition-colors">Sales &amp; Cash Flow</button></li>
              <li><button onClick={() => onNavigateSection('features')} className="hover:text-white transition-colors">Invoices &amp; eTIMS</button></li>
              <li><button onClick={() => onNavigateSection('features')} className="hover:text-white transition-colors">Customer &amp; WhatsApp CRM</button></li>
              <li><button onClick={() => onNavigateSection('features')} className="hover:text-white transition-colors">Inventory &amp; Dead Stock</button></li>
              <li><button onClick={() => onNavigateSection('features')} className="hover:text-white transition-colors">KRA Compliance Calendar</button></li>
              <li><button onClick={() => onNavigateSection('features')} className="hover:text-white transition-colors">Ask BizHub AI Assistant</button></li>
            </ul>
          </div>

          {/* Col 4: Resources & Academy */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigateSection('news')} className="hover:text-white transition-colors">Kenya SME News</button></li>
              <li><button onClick={() => onNavigateSection('training')} className="hover:text-white transition-colors">BizHubKE Academy</button></li>
              <li><button onClick={() => onNavigateSection('pricing')} className="hover:text-white transition-colors">Pricing &amp; Plans</button></li>
              <li><a href="https://itax.kra.go.ke" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">KRA iTax Portal <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://sha.go.ke" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">SHA / SHIF Portal <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

        </div>

        {/* Legal & Regulatory Disclaimer (§6 & §20) */}
        <div className="pt-8 pb-4 text-slate-400 text-[11px] leading-relaxed border-b border-slate-800/80">
          <p className="font-semibold text-slate-300 mb-1">
            Official Compliance &amp; Legal Notice:
          </p>
          <p>
            BizHubKE provides business information, management workflows, and calculation tools and does not replace certified legal, tax, or accounting advice. Always verify statutory requirements and deadlines with the Kenya Revenue Authority (KRA), County Governments, Social Health Authority (SHA), or a qualified certified public accountant (CPA-K).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-3">
          <div>
            &copy; {new Date().getFullYear()} BizHubKE Technologies Ltd. All rights reserved. Registered in the Republic of Kenya.
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
            <span className="cursor-pointer hover:text-white">Security &amp; Encryption</span>
            <span className="cursor-pointer hover:text-white">M-Pesa Integration Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
