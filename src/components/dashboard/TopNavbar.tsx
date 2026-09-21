import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import {
  Bell,
  Search,
  Calendar,
  Sparkles,
  User,
  LogOut,
  ChevronDown,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface TopNavbarProps {
  onOpenQuickSale: () => void;
  onOpenQuickExpense: () => void;
  onOpenQuickInvoice: () => void;
  onNavigatePublic: () => void;
  activeView: string;
  onSelectView: (view: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenQuickSale,
  onOpenQuickExpense,
  onOpenQuickInvoice,
  onNavigatePublic,
  activeView,
  onSelectView,
}) => {
  const { user, isDemoMode, signOut } = useAuth();
  const {
    tenant,
    selectedDateRange,
    setSelectedDateRange,
    businessScore,
    products,
    invoices,
    complianceTasks,
    loadDemoTenant,
    loadUserTenant,
  } = useBusiness();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Compute active notification items
  const criticalProducts = products.filter((p) => p.status === 'Critical');
  const overdueInvoices = invoices.filter((i) => i.status === 'Overdue');
  const dueSoonTasks = complianceTasks.filter((t) => t.status === 'Due Soon');
  const totalNotifications = criticalProducts.length + overdueInvoices.length + dueSoonTasks.length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between">
      
      {/* Left: Tenant identity and date selector */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Business Title & Status Badge */}
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#0B2440] text-sm sm:text-base leading-tight">
                {tenant.name}
              </span>
              {tenant.isDemo ? (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Demo Workspace
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Live Cloud Sync
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 hidden sm:block">
              {tenant.county} County · {tenant.businessType}
            </div>
          </div>
        </div>

        {/* Date-Range Selector (§10: Today / 7 Days / 30 Days / 3 Months / 12 Months) */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {(['Today', '7 Days', '30 Days', '3 Months', '12 Months'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedDateRange(range)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedDateRange === range
                  ? 'bg-white text-[#0B2440] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* "My Business Score" Pill (§11) */}
        <button
          onClick={() => onSelectView('analytics')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E8F7EF] border border-emerald-300/80 text-xs font-bold text-[#0F7A4C] hover:bg-emerald-100 transition-colors"
          title="Click to view My Business Score breakdown"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Score: {businessScore.overallScore}/100</span>
        </button>

        {/* Quick Action Add (+) Menu */}
        <div className="relative">
          <button
            id="quick-add-btn"
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="px-3 py-1.5 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showQuickMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in text-xs font-semibold">
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenQuickSale();
                }}
                className="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-emerald-50 hover:text-[#0F7A4C] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Record New Sale</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenQuickExpense();
                }}
                className="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-emerald-50 hover:text-[#0F7A4C] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span>Add Business Expense</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenQuickInvoice();
                }}
                className="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-emerald-50 hover:text-[#0F7A4C] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Create New Invoice</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell (§32) */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:text-[#0B2440] hover:bg-slate-100 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {totalNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fade-in text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                <span className="font-bold text-[#0B2440]">Business Notifications</span>
                <span className="text-[11px] text-slate-500">{totalNotifications} pending</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {dueSoonTasks.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.authority} Statutory Deadline</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{t.title} due in {t.daysRemaining} days.</p>
                  </div>
                ))}

                {criticalProducts.map((p) => (
                  <div key={p.id} className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Low Stock Alert</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <strong>{p.name}</strong> only {p.quantity} units left (Min: {p.minStockLevel}).
                    </p>
                  </div>
                ))}

                {overdueInvoices.map((inv) => (
                  <div key={inv.id} className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-900">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Overdue Invoice</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {inv.customerName} owes <strong>KSh {inv.total.toLocaleString()}</strong> on {inv.invoiceNumber}.
                    </p>
                  </div>
                ))}

                {totalNotifications === 0 && (
                  <p className="text-center text-slate-400 py-4">All operations &amp; taxes are healthy!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User / Workspace Switcher Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0F7A4C] text-white flex items-center justify-center font-bold text-xs">
              {tenant.ownerName ? tenant.ownerName.charAt(0) : 'U'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fade-in text-xs">
              <div className="pb-3 border-b border-slate-100 mb-2">
                <div className="font-bold text-[#0B2440]">{tenant.ownerName}</div>
                <div className="text-[11px] text-slate-500 truncate">{user?.email || tenant.email}</div>
                <div className="mt-1 inline-block px-2 py-0.5 rounded bg-emerald-100 text-[#0F7A4C] font-bold text-[10px]">
                  {tenant.plan} Plan
                </div>
              </div>

              <div className="space-y-1">
                {tenant.isDemo ? (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      loadUserTenant();
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Switch to My Account</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#0F7A4C]" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      loadDemoTenant();
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Load Mama Njeri Demo</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigatePublic();
                  }}
                  className="w-full px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>View Public Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSelectView('settings');
                  }}
                  className="w-full px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Settings &amp; Business Profile
                </button>

                <hr className="border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    signOut();
                  }}
                  className="w-full px-3 py-2 text-left rounded-lg text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
