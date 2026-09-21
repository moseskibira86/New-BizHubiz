import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import {
  BusinessTenant,
  Sale,
  Expense,
  Invoice,
  Customer,
  ProductItem,
  Supplier,
  ComplianceTask,
  NewsArticle,
  TrainingCourse,
  Opportunity,
  WhatsAppTemplate,
  WhatsAppConversation,
  BusinessScoreBreakdown,
  InvoiceStatus,
} from '../types';
import {
  DEMO_TENANT,
  DEMO_SALES,
  DEMO_EXPENSES,
  DEMO_INVOICES,
  DEMO_CUSTOMERS,
  DEMO_PRODUCTS,
  DEMO_SUPPLIERS,
  DEMO_COMPLIANCE_TASKS,
  DEMO_NEWS_ARTICLES,
  DEMO_COURSES,
  DEMO_OPPORTUNITIES,
  DEMO_WHATSAPP_TEMPLATES,
  DEMO_CONVERSATIONS,
} from '../lib/mockData';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface BusinessContextType {
  tenant: BusinessTenant;
  sales: Sale[];
  expenses: Expense[];
  invoices: Invoice[];
  customers: Customer[];
  products: ProductItem[];
  suppliers: Supplier[];
  complianceTasks: ComplianceTask[];
  news: NewsArticle[];
  newsArticles: NewsArticle[];
  courses: TrainingCourse[];
  opportunities: Opportunity[];
  conversations: WhatsAppConversation[];
  templates: WhatsAppTemplate[];
  businessScore: BusinessScoreBreakdown;
  selectedDateRange: 'Today' | '7 Days' | '30 Days' | '3 Months' | '12 Months';
  setSelectedDateRange: (range: 'Today' | '7 Days' | '30 Days' | '3 Months' | '12 Months') => void;
  
  // CRUD & Actions
  addSale: (sale: Omit<Sale, 'id'>) => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Promise<void>;
  createInvoice: (invoice: Omit<Invoice, 'id'>) => Promise<void>;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => Promise<void>;
  addProduct: (product: Omit<ProductItem, 'id'>) => Promise<void>;
  updateStockQuantity: (productId: string, delta: number) => Promise<void>;
  updateProductStock: (productId: string, newQuantity: number) => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Promise<void>;
  toggleSaveOpportunity: (id: string) => void;
  toggleComplianceTask: (id: string) => void;
  completeCourseLesson: (courseId: string, lessonId?: string) => void;
  updateTenantSettings: (settings: Partial<BusinessTenant>) => Promise<void>;
  completeOnboarding: (data: Partial<BusinessTenant>, useSampleData: boolean) => Promise<void>;
  loadDemoTenant: () => void;
  loadUserTenant: () => void;
  isSyncing: boolean;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isDemoMode, setIsDemoMode } = useAuth();
  
  const [tenant, setTenant] = useState<BusinessTenant>(DEMO_TENANT);
  const [sales, setSales] = useState<Sale[]>(DEMO_SALES);
  const [expenses, setExpenses] = useState<Expense[]>(DEMO_EXPENSES);
  const [invoices, setInvoices] = useState<Invoice[]>(DEMO_INVOICES);
  const [customers, setCustomers] = useState<Customer[]>(DEMO_CUSTOMERS);
  const [products, setProducts] = useState<ProductItem[]>(DEMO_PRODUCTS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(DEMO_SUPPLIERS);
  const [complianceTasks, setComplianceTasks] = useState<ComplianceTask[]>(DEMO_COMPLIANCE_TASKS);
  const [news] = useState<NewsArticle[]>(DEMO_NEWS_ARTICLES);
  const [courses, setCourses] = useState<TrainingCourse[]>(DEMO_COURSES);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [conversations] = useState<WhatsAppConversation[]>(DEMO_CONVERSATIONS);
  const [templates] = useState<WhatsAppTemplate[]>(DEMO_WHATSAPP_TEMPLATES);
  const [selectedDateRange, setSelectedDateRange] = useState<'Today' | '7 Days' | '30 Days' | '3 Months' | '12 Months'>('30 Days');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Firestore sync when logged in as a real user
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || isDemoMode || !db) return;
      
      setIsSyncing(true);
      try {
        const tenantRef = doc(db, 'businesses', user.uid);
        const docSnap = await getDoc(tenantRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.tenant) setTenant(data.tenant);
          if (data.sales) setSales(data.sales);
          if (data.expenses) setExpenses(data.expenses);
          if (data.invoices) setInvoices(data.invoices);
          if (data.customers) setCustomers(data.customers);
          if (data.products) setProducts(data.products);
          if (data.suppliers) setSuppliers(data.suppliers);
        } else {
          // Fresh user default business
          const newTenant: BusinessTenant = {
            id: user.uid,
            name: user.displayName ? `${user.displayName}'s Business` : 'My Kenya Business',
            ownerName: user.displayName || 'Business Owner',
            email: user.email || '',
            phone: '+254 700 000 000',
            county: 'Nairobi',
            businessType: 'Retail',
            employeeCount: '1 - 3',
            monthlySalesRange: 'KSh 100,000 - KSh 300,000',
            plan: 'Business',
            trialDaysLeft: 7,
            lowCashThreshold: 30000,
            challenges: ['Cash flow', 'Managing stock'],
            ownerId: user.uid,
            createdAt: new Date().toISOString(),
            isDemo: false,
          };
          setTenant(newTenant);
        }
      } catch (error) {
        console.error('Error fetching Firestore business data:', error);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchUserData();
  }, [user, isDemoMode]);

  // Persist to Firestore helper
  const syncToFirestore = async (overrideData?: Partial<any>) => {
    if (!user || isDemoMode || !db) return;
    try {
      const tenantRef = doc(db, 'businesses', user.uid);
      await setDoc(
        tenantRef,
        {
          tenant,
          sales,
          expenses,
          invoices,
          customers,
          products,
          suppliers,
          updatedAt: new Date().toISOString(),
          ...overrideData,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }
  };

  const loadDemoTenant = () => {
    setIsDemoMode(true);
    setTenant(DEMO_TENANT);
    setSales(DEMO_SALES);
    setExpenses(DEMO_EXPENSES);
    setInvoices(DEMO_INVOICES);
    setCustomers(DEMO_CUSTOMERS);
    setProducts(DEMO_PRODUCTS);
    setSuppliers(DEMO_SUPPLIERS);
    setComplianceTasks(DEMO_COMPLIANCE_TASKS);
  };

  const loadUserTenant = () => {
    setIsDemoMode(false);
  };

  const completeOnboarding = async (data: Partial<BusinessTenant>, useSampleData: boolean) => {
    const updatedTenant: BusinessTenant = {
      ...tenant,
      ...data,
      isDemo: false,
      ownerId: user?.uid,
    };
    setTenant(updatedTenant);

    if (useSampleData) {
      setSales(DEMO_SALES);
      setExpenses(DEMO_EXPENSES);
      setInvoices(DEMO_INVOICES);
      setCustomers(DEMO_CUSTOMERS);
      setProducts(DEMO_PRODUCTS);
      setSuppliers(DEMO_SUPPLIERS);
    } else {
      setSales([]);
      setExpenses([]);
      setInvoices([]);
      setCustomers([]);
      setProducts([]);
      setSuppliers([]);
    }

    if (user && db) {
      await syncToFirestore({
        tenant: updatedTenant,
        sales: useSampleData ? DEMO_SALES : [],
        expenses: useSampleData ? DEMO_EXPENSES : [],
        invoices: useSampleData ? DEMO_INVOICES : [],
        customers: useSampleData ? DEMO_CUSTOMERS : [],
        products: useSampleData ? DEMO_PRODUCTS : [],
        suppliers: useSampleData ? DEMO_SUPPLIERS : [],
      });
    }
  };

  const addSale = async (saleData: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...saleData,
      id: `sale-${Date.now()}`,
    };
    const updated = [newSale, ...sales];
    setSales(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ sales: updated });
    }
  };

  const addExpense = async (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ expenses: updated });
    }
  };

  const deleteExpense = async (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ expenses: updated });
    }
  };

  const addInvoice = async (invoiceData: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
    };
    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ invoices: updated });
    }
  };

  const updateInvoiceStatus = async (id: string, status: InvoiceStatus) => {
    const updated = invoices.map((inv) => (inv.id === id ? { ...inv, status } : inv));
    setInvoices(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ invoices: updated });
    }
  };

  const addProduct = async (productData: Omit<ProductItem, 'id'>) => {
    const newProduct: ProductItem = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ products: updated });
    }
  };

  const updateStockQuantity = async (productId: string, delta: number) => {
    const updated = products.map((prod) => {
      if (prod.id === productId) {
        const newQty = Math.max(0, prod.quantity + delta);
        let status: 'Healthy' | 'Low' | 'Critical' = 'Healthy';
        if (newQty <= prod.minStockLevel / 2) {
          status = 'Critical';
        } else if (newQty <= prod.minStockLevel) {
          status = 'Low';
        }
        return { ...prod, quantity: newQty, status };
      }
      return prod;
    });
    setProducts(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ products: updated });
    }
  };

  const addCustomer = async (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
    };
    const updated = [newCustomer, ...customers];
    setCustomers(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ customers: updated });
    }
  };

  const addSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: `sup-${Date.now()}`,
    };
    const updated = [newSupplier, ...suppliers];
    setSuppliers(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ suppliers: updated });
    }
  };

  const toggleSaveOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, isSaved: !opp.isSaved } : opp))
    );
  };

  const toggleComplianceTask = (id: string) => {
    setComplianceTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const isDone = task.status === 'Completed' || task.status === 'Compliant';
          return { ...task, status: isDone ? 'Upcoming' : 'Completed' };
        }
        return task;
      })
    );
  };

  const updateProductStock = async (productId: string, newQuantity: number) => {
    const target = products.find((p) => p.id === productId);
    if (target) {
      const delta = newQuantity - target.quantity;
      await updateStockQuantity(productId, delta);
    }
  };

  const completeCourseLesson = (courseId: string, _lessonId?: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const totalLessons = c.lessonsCount || 5;
          const current = c.completedLessons || 0;
          const nextVal = Math.min(totalLessons, current + 1);
          const nextProgress = Math.round((nextVal / totalLessons) * 100);
          return {
            ...c,
            completedLessons: nextVal,
            progress: nextProgress,
          };
        }
        return c;
      })
    );
  };

  const updateTenantSettings = async (settings: Partial<BusinessTenant>) => {
    const updated = { ...tenant, ...settings };
    setTenant(updated);
    if (user && !isDemoMode) {
      await syncToFirestore({ tenant: updated });
    }
  };

  // Section §11: Calculate "My Business Score" dynamically
  const businessScore: BusinessScoreBreakdown = useMemo(() => {
    const totalSales = sales.reduce((acc, s) => acc + s.amount, 0);
    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
    const netProfit = totalSales - totalExpenses;
    const profitMargin = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;
    
    // Financial Health score (0 - 100)
    let financialScore = 50;
    if (profitMargin > 20) financialScore += 35;
    else if (profitMargin > 10) financialScore += 20;
    else if (profitMargin > 0) financialScore += 10;
    else financialScore -= 20;

    // Customer score (0 - 100)
    const repeatCustomers = customers.filter((c) => c.tags.includes('Repeat Customer') || c.tags.includes('VIP')).length;
    const customerRatio = customers.length > 0 ? (repeatCustomers / customers.length) * 100 : 30;
    const customerScore = Math.min(95, Math.max(30, Math.round(customerRatio * 0.9 + 25)));

    // Operations (low stock items, inventory valuation)
    const criticalStock = products.filter((p) => p.status === 'Critical').length;
    const opsScore = Math.max(40, 90 - criticalStock * 15);

    // Marketing (active customers, repeat engagement)
    const marketingScore = customers.length > 10 ? 78 : 60;

    // Compliance (tasks on schedule)
    const dueSoon = complianceTasks.filter((t) => t.status === 'Due Soon').length;
    const complianceScore = Math.max(50, 95 - dueSoon * 12);

    const overallScore = Math.round(
      financialScore * 0.3 +
      customerScore * 0.2 +
      opsScore * 0.2 +
      marketingScore * 0.15 +
      complianceScore * 0.15
    );

    let biggestOpportunity = 'Follow up on outstanding invoices to boost immediate working capital.';
    const recs: string[] = [];

    if (invoices.some((i) => i.status === 'Overdue')) {
      biggestOpportunity = 'Overdue invoices detected: sending polite WhatsApp payment reminders can unlock critical cash flow.';
      recs.push('Send 1-click WhatsApp payment reminders with your M-Pesa Till number');
    } else if (criticalStock > 0) {
      biggestOpportunity = `${criticalStock} fast-moving products are in critical stock. Reorder promptly to avoid lost sales.`;
      recs.push('Contact your primary suppliers to place replenishment orders before weekend rush');
    } else if (profitMargin < 15) {
      biggestOpportunity = 'Operating expenses represent over 75% of revenue. Review supplier terms and transport costs.';
      recs.push('Audit recurring supplier prices and negotiate bulk purchase volume discounts');
    } else {
      biggestOpportunity = 'Customer repeat rate is strong. Launch a loyalty promotion to increase average basket size.';
      recs.push('Broadcast a weekly special wholesale catalogue to VIP and repeat retail accounts');
    }

    recs.push('Verify September KRA VAT and PAYE filing status before the 20th deadline');

    return {
      overallScore: Math.min(98, Math.max(25, overallScore)),
      financialHealth: Math.min(100, Math.max(20, Math.round(financialScore))),
      customerManagement: Math.min(100, Math.max(20, Math.round(customerScore))),
      operations: Math.min(100, Math.max(20, Math.round(opsScore))),
      marketing: Math.min(100, Math.max(20, Math.round(marketingScore))),
      compliance: Math.min(100, Math.max(20, Math.round(complianceScore))),
      biggestOpportunity,
      recommendations: recs,
    };
  }, [sales, expenses, customers, products, invoices, complianceTasks]);

  return (
    <BusinessContext.Provider
      value={{
        tenant,
        sales,
        expenses,
        invoices,
        customers,
        products,
        suppliers,
        complianceTasks,
        news,
        newsArticles: news,
        courses,
        opportunities,
        conversations,
        templates,
        businessScore,
        selectedDateRange,
        setSelectedDateRange,
        addSale,
        addExpense,
        deleteExpense,
        addInvoice,
        createInvoice: addInvoice,
        updateInvoiceStatus,
        addProduct,
        updateStockQuantity,
        updateProductStock,
        addCustomer,
        addSupplier,
        toggleSaveOpportunity,
        toggleComplianceTask,
        completeCourseLesson,
        updateTenantSettings,
        completeOnboarding,
        loadDemoTenant,
        loadUserTenant,
        isSyncing,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
