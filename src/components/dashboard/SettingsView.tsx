import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { useAuth } from '../../context/AuthContext';
import {
  Settings,
  Building2,
  Smartphone,
  ShieldCheck,
  CreditCard,
  Download,
  Trash2,
  CheckCircle2,
  Users,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { SubscriptionPlan } from '../../types';

export const SettingsView: React.FC = () => {
  const { tenant, updateTenantSettings, loadDemoTenant, loadUserTenant } = useBusiness();
  const { user } = useAuth();

  const [name, setName] = useState(tenant.name);
  const [ownerName, setOwnerName] = useState(tenant.ownerName);
  const [phone, setPhone] = useState(tenant.phone);
  const [county, setCounty] = useState(tenant.county);
  const [kraPin, setKraPin] = useState(tenant.kraPin || 'P051892019Z');
  const [mpesaTill, setMpesaTill] = useState(tenant.mpesaTillNumber || '892341');
  const [mpesaPaybill, setMpesaPaybill] = useState(tenant.mpesaPaybillNumber || '400200');
  const [lowCashThreshold, setLowCashThreshold] = useState(tenant.lowCashThreshold);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Active plan upgrade simulation
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(tenant.plan);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTenantSettings({
      name,
      ownerName,
      phone,
      county,
      kraPin,
      mpesaTillNumber: mpesaTill,
      mpesaPaybillNumber: mpesaPaybill,
      lowCashThreshold: Number(lowCashThreshold),
      plan: currentPlan,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportAllData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tenant, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BizHubKE-FullBackup-${tenant.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
          Business Settings &amp; Configuration (§28)
        </h2>
        <p className="text-xs text-slate-500">
          Manage your Kenyan business profile, KRA PIN, M-Pesa Till numbers, safety thresholds, and subscription tier.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#0F7A4C] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Business settings saved successfully and synced to Firebase!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Profile & KRA Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-[#0F7A4C]" />
            <h3 className="text-sm font-bold text-[#0B2440]">
              Business Identity &amp; Statutory Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Owner / Primary Contact</label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone (WhatsApp / Calls)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Operating County</label>
              <input
                type="text"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">KRA PIN (For eTIMS Invoices)</label>
              <input
                type="text"
                value={kraPin}
                onChange={(e) => setKraPin(e.target.value)}
                placeholder="e.g. P051892019Z"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Minimum Cash Safety Buffer (KES)
              </label>
              <input
                type="number"
                value={lowCashThreshold}
                onChange={(e) => setLowCashThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Triggers dashboard warning when projected cash falls below this amount.
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Lipa Na M-Pesa Settings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#0B2440]">
              Lipa Na M-Pesa Invoice Integration (§28)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                M-Pesa Buy Goods Till Number
              </label>
              <input
                type="text"
                value={mpesaTill}
                onChange={(e) => setMpesaTill(e.target.value)}
                placeholder="e.g. 892341"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Appears on client invoices and payment instructions.
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                M-Pesa Paybill Business Number (Optional)
              </label>
              <input
                type="text"
                value={mpesaPaybill}
                onChange={(e) => setMpesaPaybill(e.target.value)}
                placeholder="e.g. 400200"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Subscription & Tier Selector (§29) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-[#0B2440]">
                BizHubKE Subscription &amp; Billing
              </h3>
            </div>
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0F7A4C]">
              Active: {currentPlan} Tier ({tenant.trialDaysLeft} days remaining)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            {(['Free', 'Starter', 'Business', 'Professional', 'Enterprise'] as SubscriptionPlan[]).map((p) => (
              <div
                key={p}
                onClick={() => setCurrentPlan(p)}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  currentPlan === p
                    ? 'border-2 border-[#0F7A4C] bg-emerald-50 text-[#0F7A4C] font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="text-xs font-black">{p}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {p === 'Free' && 'KSh 0/mo'}
                  {p === 'Starter' && 'KSh 999/mo'}
                  {p === 'Business' && 'KSh 2,499/mo'}
                  {p === 'Professional' && 'KSh 4,999/mo'}
                  {p === 'Enterprise' && 'KSh 9,999/mo'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            id="save-settings-btn"
            className="px-8 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Save All Settings
          </button>
        </div>
      </form>

      {/* Data Export & Reset Actions (§28) */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
        <h4 className="text-xs font-bold text-[#0B2440] uppercase tracking-wider">
          Data Portability &amp; Tenant Controls
        </h4>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportAllData}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Business Backup (JSON)</span>
          </button>

          {tenant.isDemo ? (
            <button
              onClick={loadUserTenant}
              className="px-4 py-2 rounded-xl bg-emerald-100 text-[#0F7A4C] border border-emerald-300 text-xs font-bold transition-colors"
            >
              Switch to Clean Personal Tenant
            </button>
          ) : (
            <button
              onClick={loadDemoTenant}
              className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors"
            >
              Reset / Reload Mama Njeri Demo Data
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
