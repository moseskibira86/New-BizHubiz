import React from 'react';
import {
  ShieldCheck,
  Headphones,
  Smartphone,
  FileSpreadsheet,
  Lock,
  Cloud,
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustPoints = [
    {
      icon: Headphones,
      title: 'Local Kenyan Support',
      desc: 'Nairobi-based team ready via WhatsApp, phone & email to help you set up.',
    },
    {
      icon: ShieldCheck,
      title: 'Bank-Grade Security',
      desc: 'Built on Google Cloud & Firebase Firestore with full tenant data isolation.',
    },
    {
      icon: Smartphone,
      title: 'Access Anywhere',
      desc: 'Works seamlessly on Android smartphones, iPhones, tablets, and shop laptops.',
    },
    {
      icon: FileSpreadsheet,
      title: '1-Click Data Exports',
      desc: 'Download your sales, expenses, and customer lists to Excel/CSV anytime.',
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((tp, idx) => {
            const Icon = tp.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F7EF] text-[#0F7A4C] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B2440] mb-1">
                    {tp.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tp.desc}
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
