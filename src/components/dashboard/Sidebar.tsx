import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  FileText,
  Users,
  MessageCircle,
  Package,
  Truck,
  ShieldCheck,
  Megaphone,
  BarChart3,
  Newspaper,
  GraduationCap,
  Bot,
  Settings,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onNavigatePublic: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  onNavigatePublic,
  isOpen,
  onClose,
}) => {
  const { products, invoices, complianceTasks, tenant, loadDemoTenant } = useBusiness();

  // Counts for badges
  const lowStockCount = products.filter((p) => p.status === 'Critical' || p.status === 'Low').length;
  const overdueCount = invoices.filter((i) => i.status === 'Overdue').length;
  const dueSoonTasks = complianceTasks.filter((t) => t.status === 'Due Soon').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'invoices', label: 'Invoices', icon: FileText, badge: overdueCount > 0 ? overdueCount : undefined, badgeColor: 'bg-rose-500' },
    { id: 'customers', label: 'Customers CRM', icon: Users },
    { id: 'whatsapp', label: 'WhatsApp CRM', icon: MessageCircle },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: lowStockCount > 0 ? lowStockCount : undefined, badgeColor: 'bg-amber-500' },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'compliance', label: 'Compliance & Tax', icon: ShieldCheck, badge: dueSoonTasks > 0 ? 'Due' : undefined, badgeColor: 'bg-rose-500' },
    { id: 'marketing', label: 'Marketing Hub', icon: Megaphone },
    { id: 'analytics', label: 'Analytics & Score', icon: BarChart3 },
    { id: 'news', label: 'Business News', icon: Newspaper },
    { id: 'training', label: 'BizHubKE Academy', icon: GraduationCap },
    { id: 'ai', label: 'Ask BizHub AI', icon: Bot, isSpecial: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0B2440] text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
            <div
              onClick={onNavigatePublic}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Return to Public Site"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0F7A4C] flex items-center justify-center text-[#F5B400] shadow-sm group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">BizHub<span className="text-[#F5B400]">KE</span></span>
              </div>
            </div>
            <button
              onClick={onNavigatePublic}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              title="View Public Homepage"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    onSelectView(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F7A4C] text-white shadow-sm'
                      : item.isSpecial
                      ? 'text-amber-300 hover:bg-white/10'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${item.isSpecial ? 'text-[#F5B400]' : ''}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded-full text-white ${
                        item.badgeColor || 'bg-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Banner: Quick Demo Reset & Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white text-[11px] truncate">{tenant.name}</span>
              <span className="text-[10px] text-emerald-400 font-bold">KES</span>
            </div>
            <p className="text-[10px] text-slate-400 mb-2">
              Plan: <strong className="text-slate-200">{tenant.plan}</strong> ({tenant.trialDaysLeft}d trial)
            </p>
            {!tenant.isDemo && (
              <button
                onClick={loadDemoTenant}
                className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#F5B400]" />
                <span>Load Demo Data</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
