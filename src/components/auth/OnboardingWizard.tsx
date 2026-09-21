import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  Banknote,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { BusinessType, KenyanCounty } from '../../types';

interface OnboardingWizardProps {
  onFinish: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onFinish }) => {
  const { user } = useAuth();
  const { completeOnboarding, tenant } = useBusiness();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [businessName, setBusinessName] = useState(tenant.name || '');
  const [ownerName, setOwnerName] = useState(user?.displayName || tenant.ownerName || '');
  const [phone, setPhone] = useState(tenant.phone || '+254 7');
  const [county, setCounty] = useState<KenyanCounty | string>(tenant.county || 'Nairobi');
  const [businessType, setBusinessType] = useState<BusinessType>(tenant.businessType || 'Retail');
  const [employeeCount, setEmployeeCount] = useState(tenant.employeeCount || '1 - 3');
  const [monthlySalesRange, setMonthlySalesRange] = useState(tenant.monthlySalesRange || 'KSh 100,000 - KSh 300,000');

  // Step 2 Challenges
  const allChallenges = [
    'Cash flow',
    'Getting customers',
    'Managing stock',
    'Tax/compliance',
    'Marketing',
    'Customer retention',
    'Business planning',
    'Understanding finances',
  ];
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>(['Cash flow', 'Managing stock']);

  // Step 3 Data preference
  const [useSampleData, setUseSampleData] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const countiesList: KenyanCounty[] = [
    'Nairobi',
    'Mombasa',
    'Kisumu',
    'Nakuru',
    'Kiambu',
    'Uasin Gishu',
    'Machakos',
    'Meru',
    'Kilifi',
    'Kajiado',
    'Nyeri',
    'Murang\'a',
    'Kakamega',
    'Bungoma',
    'Kisii',
    'Kericho',
    'Trans Nzoia',
    'Laikipia',
    'Embu',
    'Kitui',
    'Other County',
  ];

  const businessTypes: BusinessType[] = [
    'Retail',
    'Restaurant',
    'Wholesale',
    'Professional Services',
    'Construction',
    'Transport',
    'Beauty & Wellness',
    'E-commerce',
    'Manufacturing',
    'Agriculture',
    'Other',
  ];

  const toggleChallenge = (item: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await completeOnboarding(
        {
          name: businessName || 'My Kenya Business',
          ownerName: ownerName || 'Business Owner',
          phone,
          county,
          businessType,
          employeeCount,
          monthlySalesRange,
          challenges: selectedChallenges,
        },
        useSampleData
      );
      setStep(4);
    } catch (err) {
      console.error('Onboarding complete error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 my-8">
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>STEP {step} OF 4</span>
            <span className="text-[#0F7A4C]">
              {step === 1 && 'Business Profile'}
              {step === 2 && 'Key Challenges'}
              {step === 3 && 'Initial Setup'}
              {step === 4 && 'Launch'}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="bg-[#0F7A4C] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: BUSINESS PROFILE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-[#0B2440]">
                Tell us about your business
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This helps customize your tax deadlines, currency formats, and dashboard metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Mama Njeri General Supplies"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Owner / Contact Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Grace Njeri Mwangi"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Phone (M-Pesa / WhatsApp)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 712 345 678"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  County in Kenya *
                </label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
                >
                  {countiesList.map((c) => (
                    <option key={c} value={c}>
                      {c} County
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Category *
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
                >
                  {businessTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Employees
                </label>
                <select
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
                >
                  <option value="1 (Just me)">1 (Just me)</option>
                  <option value="2 - 5">2 - 5 staff</option>
                  <option value="6 - 15">6 - 15 staff</option>
                  <option value="16 - 50">16 - 50 staff</option>
                  <option value="50+">50+ staff</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Monthly Sales Range
              </label>
              <select
                value={monthlySalesRange}
                onChange={(e) => setMonthlySalesRange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none bg-white"
              >
                <option value="Under KSh 100,000">Under KSh 100,000</option>
                <option value="KSh 100,000 - KSh 300,000">KSh 100,000 - KSh 300,000</option>
                <option value="KSh 300,000 - KSh 1,000,000">KSh 300,000 - KSh 1,000,000</option>
                <option value="KSh 1,000,000 - KSh 5,000,000">KSh 1,000,000 - KSh 5,000,000</option>
                <option value="Over KSh 5,000,000">Over KSh 5,000,000</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BIGGEST CHALLENGES */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-[#0B2440]">
                What are your biggest business challenges right now?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select all that apply. We will configure your alerts and recommendation priorities accordingly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allChallenges.map((item) => {
                const isSelected = selectedChallenges.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => toggleChallenge(item)}
                    className={`p-4 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E8F7EF] border-[#0F7A4C] text-[#0F7A4C] shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{item}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#0F7A4C] text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Step 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONNECT / IMPORT DATA */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-[#0B2440]">
                How would you like to start?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose how to initialize your products, customers, and financial records.
              </p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => setUseSampleData(true)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  useSampleData
                    ? 'bg-[#E8F7EF] border-2 border-[#0F7A4C] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F7A4C] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#0B2440]">
                        Load Kenyan SME Sample Data (Recommended)
                      </h4>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F5B400] text-[#0B2440]">
                        Best for fast learning
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Preloads realistic sales, expenses, invoices, and stock (Mama Njeri Supplies dataset) so you can immediately see live charts and test features. You can edit or clear it anytime.
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setUseSampleData(false)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  !useSampleData
                    ? 'bg-[#E8F7EF] border-2 border-[#0F7A4C] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#0B2440]">
                      Start with Clean Blank Workspace
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Start with zero transactions. Add your real products, customers, and log sales from scratch.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleComplete}
                disabled={isSubmitting}
                className="px-7 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Configuring your workspace...' : 'Initialize Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & LAUNCH */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0F7A4C] to-emerald-400 text-white flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#0F7A4C] bg-[#E8F7EF] px-3 py-1 rounded-full">
                Setup Complete
              </span>
              <h3 className="text-3xl font-black text-[#0B2440] mt-3">
                Your BizHubKE Business Dashboard is ready!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Welcome, <strong>{ownerName}</strong>. <strong>{businessName}</strong> has been configured with local Kenyan tax reminders, M-Pesa reconciliation, and full analytics.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Tenant Location:</span>
                <strong className="text-[#0B2440]">{county} County, Kenya</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Active Plan:</span>
                <strong className="text-[#0F7A4C]">Business Plan (7-Day Trial)</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Database Sync:</span>
                <strong className="text-blue-700">Firebase Firestore Cloud</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                id="enter-dashboard-final-btn"
                onClick={onFinish}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F5B400] hover:bg-[#db9f00] text-[#0B2440] font-black text-sm shadow-xl flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <span>Enter Business Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
