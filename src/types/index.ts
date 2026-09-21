export type BusinessType =
  | 'Retail'
  | 'Restaurant'
  | 'Wholesale'
  | 'Professional Services'
  | 'Construction'
  | 'Transport'
  | 'Beauty & Wellness'
  | 'E-commerce'
  | 'Manufacturing'
  | 'Agriculture'
  | 'Other';

export type KenyanCounty =
  | 'Nairobi'
  | 'Mombasa'
  | 'Kisumu'
  | 'Nakuru'
  | 'Kiambu'
  | 'Uasin Gishu'
  | 'Machakos'
  | 'Meru'
  | 'Kilifi'
  | 'Kajiado'
  | 'Nyeri'
  | 'Murang\'a'
  | 'Kakamega'
  | 'Bungoma'
  | 'Kisii'
  | 'Kericho'
  | 'Trans Nzoia'
  | 'Laikipia'
  | 'Embu'
  | 'Kitui'
  | 'Other County';

export type SubscriptionPlan = 'Free' | 'Starter' | 'Business' | 'Professional' | 'Enterprise';

export interface BusinessTenant {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  county: KenyanCounty | string;
  businessType: BusinessType;
  employeeCount: string;
  monthlySalesRange: string;
  plan: SubscriptionPlan;
  trialDaysLeft: number;
  lowCashThreshold: number;
  challenges: string[];
  ownerId?: string;
  createdAt: string;
  isDemo?: boolean;
  kraPin?: string;
  mpesaTillNumber?: string;
  mpesaPaybillNumber?: string;
}

export type PaymentMethod = 'M-Pesa' | 'Cash' | 'Bank Transfer' | 'Card';

export interface Sale {
  id: string;
  date: string;
  customerName: string;
  productOrService: string;
  category: string;
  quantity: number;
  amount: number;
  paymentMethod: PaymentMethod;
  reference?: string;
  notes?: string;
}

export type ExpenseCategory =
  | 'Rent'
  | 'Utilities'
  | 'Transport'
  | 'Salaries'
  | 'Marketing'
  | 'Stock'
  | 'Equipment'
  | 'Bank charges'
  | 'Taxes'
  | 'Other';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  payee: string;
  amount: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  hasReceipt?: boolean;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g. 16% VAT or 0%
}

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  status: InvoiceStatus;
  notes?: string;
  paymentInstructions?: string;
}

export type CustomerTag = 'VIP' | 'New' | 'Repeat Customer' | 'Inactive' | 'Lead' | 'Wholesale';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  type: 'Individual' | 'Wholesale' | 'Retail' | 'Corporate';
  tags: CustomerTag[];
  totalSpent: number;
  ordersCount: number;
  lastPurchaseDate: string;
  notes?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  minStockLevel: number;
  supplier?: string;
  location?: string;
  status: 'Healthy' | 'Low' | 'Critical' | 'Adequate' | 'Out of Stock' | 'Excess';
  unit?: string;
  daysWithoutSale?: number;
}

export type Product = ProductItem;
export type StockStatus = 'Healthy' | 'Low' | 'Critical' | 'Adequate' | 'Out of Stock' | 'Excess';

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  productsSupplied: string | string[];
  totalPurchased?: number;
  balanceOwed: number;
  paymentTerms: string;
  location?: string;
  category?: string;
  orderHistoryCount?: number;
}

export interface ComplianceTask {
  id: string;
  title: string;
  authority: string;
  dueDate: string;
  deadline?: string;
  daysRemaining: number;
  status: 'Upcoming' | 'Due Soon' | 'Completed' | 'Compliant';
  description: string;
  actionRequired: string;
  officialLink?: string;
  portalUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  whoIsAffected?: string;
  whatToDo?: string;
  whatItMeans?: {
    whatHappened: string;
    whoIsAffected: string;
    whatYouShouldDo: string;
    deadline?: string;
    officialSource: string;
  };
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  completed: boolean;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes?: number;
  duration?: string;
  lessonsCount?: number;
  completedLessons?: number;
  description: string;
  badge?: string;
  isPremium?: boolean;
  progress?: number;
  lessons?: CourseLesson[];
}

export type Course = TrainingCourse;

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Grant' | 'Funding' | 'Tender' | 'Competition' | 'Training';
  amountRange: string;
  deadline: string;
  eligibility: string;
  location: string;
  description: string;
  applicationLink: string;
  isSaved?: boolean;
}

export interface BusinessScoreBreakdown {
  overallScore: number;
  financialHealth: number;
  customerManagement: number;
  operations: number;
  marketing: number;
  compliance: number;
  biggestOpportunity: string;
  recommendations: string[];
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'New Enquiry' | 'Order Confirmation' | 'Payment Reminder' | 'Thank You' | 'Birthday' | 'Promotion';
  content: string;
  variables: string[];
}

export interface WhatsAppConversation {
  id: string;
  customerName: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'Open' | 'Resolved' | 'Follow-up Due';
  messages: {
    id: string;
    sender: 'business' | 'customer';
    text: string;
    time: string;
  }[];
}
