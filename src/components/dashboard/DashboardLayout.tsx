import React, { useState } from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { DashboardOverview } from './DashboardOverview';
import { SalesView } from './SalesView';
import { ExpensesView } from './ExpensesView';
import { InvoicesView } from './InvoicesView';
import { CustomersView } from './CustomersView';
import { WhatsAppCrmView } from './WhatsAppCrmView';
import { InventoryView } from './InventoryView';
import { SuppliersView } from './SuppliersView';
import { ComplianceView } from './ComplianceView';
import { MarketingView } from './MarketingView';
import { AnalyticsView } from './AnalyticsView';
import { NewsView } from './NewsView';
import { AcademyView } from './AcademyView';
import { AiAssistantView } from './AiAssistantView';
import { SettingsView } from './SettingsView';

// Modals
import { AddSaleModal } from '../modals/AddSaleModal';
import { AddExpenseModal } from '../modals/AddExpenseModal';
import { CreateInvoiceModal } from '../modals/CreateInvoiceModal';
import { AddCustomerModal } from '../modals/AddCustomerModal';
import { AddProductModal } from '../modals/AddProductModal';

interface DashboardLayoutProps {
  onNavigatePublic: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onNavigatePublic }) => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Modal states
  const [isAddSaleOpen, setIsAddSaleOpen] = useState<boolean>(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState<boolean>(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        onNavigatePublic={onNavigatePublic}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        {/* Top Navbar */}
        <TopNavbar
          activeView={activeView}
          onSelectView={setActiveView}
          onOpenQuickSale={() => setIsAddSaleOpen(true)}
          onOpenQuickExpense={() => setIsAddExpenseOpen(true)}
          onOpenQuickInvoice={() => setIsCreateInvoiceOpen(true)}
          onNavigatePublic={onNavigatePublic}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeView === 'dashboard' && (
            <DashboardOverview
              onOpenQuickSale={() => setIsAddSaleOpen(true)}
              onOpenQuickExpense={() => setIsAddExpenseOpen(true)}
              onOpenQuickInvoice={() => setIsCreateInvoiceOpen(true)}
              onSelectView={setActiveView}
            />
          )}

          {activeView === 'sales' && (
            <SalesView onOpenAddSale={() => setIsAddSaleOpen(true)} />
          )}

          {activeView === 'expenses' && (
            <ExpensesView onOpenAddExpense={() => setIsAddExpenseOpen(true)} />
          )}

          {activeView === 'invoices' && (
            <InvoicesView onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)} />
          )}

          {activeView === 'customers' && (
            <CustomersView onOpenAddCustomer={() => setIsAddCustomerOpen(true)} />
          )}

          {activeView === 'whatsapp' && <WhatsAppCrmView />}

          {activeView === 'inventory' && (
            <InventoryView onOpenAddProduct={() => setIsAddProductOpen(true)} />
          )}

          {activeView === 'suppliers' && <SuppliersView />}

          {activeView === 'compliance' && <ComplianceView />}

          {activeView === 'marketing' && <MarketingView />}

          {activeView === 'analytics' && <AnalyticsView />}

          {activeView === 'news' && <NewsView />}

          {activeView === 'training' && <AcademyView />}

          {activeView === 'ai' && <AiAssistantView />}

          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Bottom Bar (§33) */}
      <MobileBottomNav
        activeView={activeView}
        onSelectView={setActiveView}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Quick Action Modals */}
      <AddSaleModal
        isOpen={isAddSaleOpen}
        onClose={() => setIsAddSaleOpen(false)}
      />
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />
      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
      />
      <AddCustomerModal
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
      />
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
    </div>
  );
};
