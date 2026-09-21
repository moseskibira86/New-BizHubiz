import React, { useState, useMemo } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Tag,
  MessageCircle,
  Calendar,
  DollarSign,
  UserCheck,
  UserX,
  Sparkles,
} from 'lucide-react';
import { Customer, CustomerTag } from '../../types';

interface CustomersViewProps {
  onOpenAddCustomer: () => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ onOpenAddCustomer }) => {
  const { customers } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

  const tagsList: CustomerTag[] = ['VIP', 'New', 'Repeat Customer', 'Inactive', 'Lead', 'Wholesale'];

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || c.tags.includes(selectedTag as CustomerTag);
      return matchesSearch && matchesTag;
    });
  }, [customers, searchQuery, selectedTag]);

  // CRM KPI calculations (§16)
  const totalCustomers = customers.length;
  const vipCount = customers.filter((c) => c.tags.includes('VIP')).length;
  const inactiveCount = customers.filter((c) => c.tags.includes('Inactive')).length;
  const totalCustomerSpend = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgLifetimeValue = totalCustomers > 0 ? Math.round(totalCustomerSpend / totalCustomers) : 0;

  const getTagColor = (tag: CustomerTag) => {
    switch (tag) {
      case 'VIP':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'New':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Repeat Customer':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Inactive':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Lead':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Wholesale':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const handleWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Habari ${name}! Greeting from ${customers[0] ? 'Mama Njeri Supplies' : 'BizHubKE'}. How may we assist your restocking today?`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Customer Database &amp; Relationship CRM
          </h2>
          <p className="text-xs text-slate-500">
            Segment buyers, track order frequency, and drive repeat WhatsApp orders.
          </p>
        </div>

        <button
          id="add-customer-btn"
          onClick={onOpenAddCustomer}
          className="px-4 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Customer</span>
        </button>
      </div>

      {/* CRM KPIs (§16) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Total Accounts</span>
          <div className="text-2xl font-black text-[#0B2440] mt-1">
            {totalCustomers.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">Active Kenyan Accounts</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">VIP Clients</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {vipCount}
          </div>
          <span className="text-[11px] text-slate-400">High-volume wholesale buyers</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Average Lifetime Value</span>
          <div className="text-2xl font-black text-[#0F7A4C] mt-1">
            KSh {avgLifetimeValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Per registered customer</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Inactive Candidates</span>
          <div className="text-2xl font-black text-slate-600 mt-1">
            {inactiveCount}
          </div>
          <span className="text-[11px] text-slate-400">Ready for WhatsApp reactivation</span>
        </div>
      </div>

      {/* Filter & Tag Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, or location..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedTag('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTag === 'All'
                ? 'bg-[#0B2440] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Tags
          </button>
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#0F7A4C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Name & Type */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-[#0B2440] leading-snug">
                    {cust.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cust.location}</span>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {cust.type}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {cust.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTagColor(t)}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-3 my-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Total Spent</span>
                  <span className="font-extrabold text-[#0F7A4C]">
                    KSh {cust.totalSpent.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Orders Count</span>
                  <span className="font-extrabold text-[#0B2440]">
                    {cust.ordersCount} purchases
                  </span>
                </div>
              </div>

              {cust.notes && (
                <p className="text-[11px] text-slate-500 italic line-clamp-2 mb-3">
                  "{cust.notes}"
                </p>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">
                Last: {cust.lastPurchaseDate}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWhatsApp(cust.phone, cust.name)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#0F7A4C] hover:bg-emerald-100 font-bold flex items-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => setActiveCustomer(cust)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors"
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            No customers found matching this filter.
          </div>
        )}
      </div>

      {/* Customer Profile Modal */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <h3 className="text-xl font-bold text-[#0B2440] mb-1">{activeCustomer.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{activeCustomer.location} · {activeCustomer.type}</p>

            <div className="space-y-2.5 text-xs text-slate-700 mb-6">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Phone Number:</span>
                <span className="font-bold">{activeCustomer.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Email:</span>
                <span className="font-medium">{activeCustomer.email || 'None on record'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Total Orders:</span>
                <span className="font-bold">{activeCustomer.ordersCount}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Total Lifetime Spend:</span>
                <span className="font-bold text-[#0F7A4C]">KSh {activeCustomer.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Last Purchase Date:</span>
                <span>{activeCustomer.lastPurchaseDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Account Notes:</span>
                <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-600 italic">
                  {activeCustomer.notes || 'No customer notes added yet.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleWhatsApp(activeCustomer.phone, activeCustomer.name)}
                className="flex-1 py-2.5 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
              <button
                onClick={() => setActiveCustomer(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
