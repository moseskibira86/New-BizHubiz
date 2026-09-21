import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  FileText,
  Menu,
} from 'lucide-react';

interface MobileBottomNavProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onToggleSidebar: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  onSelectView,
  onToggleSidebar,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'invoices', label: 'Invoices', icon: FileText },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0B2440] text-slate-300 border-t border-slate-800 px-2 py-1 flex items-center justify-around shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;
        return (
          <button
            key={tab.id}
            id={`mobile-tab-${tab.id}`}
            onClick={() => onSelectView(tab.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              isActive ? 'text-[#F5B400] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}

      <button
        id="mobile-tab-menu"
        onClick={onToggleSidebar}
        className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-slate-400 hover:text-white"
      >
        <Menu className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">More</span>
      </button>
    </div>
  );
};
