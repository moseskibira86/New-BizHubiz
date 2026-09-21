import React from 'react';
import {
  Smartphone,
  WifiOff,
  Languages,
  ShieldAlert,
  Coins,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const KenyanContextSection: React.FC = () => {
  const points = [
    {
      icon: Smartphone,
      title: 'M-Pesa Native Workflow',
      desc: 'No foreign credit card assumptions. Built from day one around Buy Goods Till, Paybill, and Send Money workflows.',
    },
    {
      icon: ShieldAlert,
      title: 'KRA eTIMS & Tax Law Aligned',
      desc: 'Automatic eTIMS QR invoice code format and timely alerts so you avoid costly KRA penalties and audits.',
    },
    {
      icon: MapPin,
      title: '47 Counties Single Business Permits',
      desc: 'Tailored deadlines and guidance for Nairobi City County, Kiambu, Mombasa, Nakuru, Kisumu, and all 47 devolved counties.',
    },
    {
      icon: WifiOff,
      title: 'Offline-First & Low Data Mode',
      desc: 'Works reliably even when shop network is spotty. Syncs automatically when your mobile connection resumes.',
    },
    {
      icon: Languages,
      title: 'Swahili & English Natural Language',
      desc: 'Use natural Kenyan business phrasing and Sheng search terms when managing customers and inventory.',
    },
    {
      icon: Coins,
      title: 'Affordable Flat Pricing in KES',
      desc: 'No unpredictable USD exchange rate surprises. Transparent subscriptions billed conveniently via M-Pesa.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#F5B400] bg-amber-100 px-3.5 py-1.5 rounded-full text-amber-900">
            Kenya SME DNA (§5)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2440] mt-4 tracking-tight">
            Engineered Exclusively for Kenya’s Business Realities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Most international business software was designed for Western markets with Stripe and PayPal. BizHubKE is crafted ground-up for Nairobi dukas, Mombasa wholesalers, Eldoret agro-dealers, and Nakuru enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0F7A4C]/40 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F7A4C] flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2440] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
