import React, { useState, useRef, useEffect } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  FileText,
  ShieldCheck,
  Package,
  HelpCircle,
  Copy,
  CheckCircle2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistantView: React.FC = () => {
  const {
    tenant,
    sales,
    expenses,
    invoices,
    products,
    complianceTasks,
    businessScore,
  } = useBusiness();

  // Metrics to ground responses
  const totalSales = sales.reduce((a, s) => a + s.amount, 0);
  const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
  const netProfit = totalSales - totalExpenses;
  const netMargin = totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : '0';
  const unpaidInvoices = invoices.filter((i) => i.status !== 'Paid');
  const criticalProducts = products.filter((p) => p.status === 'Critical');
  const upcomingTax = complianceTasks[0];

  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'assistant',
      text: `Jambo ${tenant.ownerName}! I am BizHub AI, your dedicated digital business advisor for **${tenant.name}**. I have analyzed your current business numbers (KSh ${totalSales.toLocaleString()} sales, ${netMargin}% net margin, ${criticalProducts.length} low-stock alerts).\n\nHow can I help you today? You can ask about cash flow, KRA tax rules, staff laws, or draft WhatsApp messages.`,
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Suggested quick prompts (§25)
  const quickPrompts = [
    "What's my profit margin this month?",
    "When is my next KRA filing due?",
    "How do I handle an employee who hasn't shown up for 3 days under Kenyan law?",
    "Draft a message to follow up on Invoice INV-2025-001",
    "Which of my products has the highest margin?",
    "How much cash will I need next month based on current trends?",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('profit') || q.includes('margin')) {
        reply = `**Profitability Analysis for ${tenant.name}:**\n\n• **Total Sales Recorded:** KSh ${totalSales.toLocaleString()}\n• **Operating Expenses:** KSh ${totalExpenses.toLocaleString()}\n• **Net Operating Profit:** KSh ${netProfit.toLocaleString()}\n• **Net Margin:** **${netMargin}%**\n\n**Recommendation:** Your net margin is healthy for wholesale/retail (benchmarked at 15-20% in Kenya). Consider following up on KSh ${unpaidInvoices.reduce((a, i) => a + i.total, 0).toLocaleString()} in unpaid client invoices to lock in liquidity.`;
      } else if (q.includes('kra') || q.includes('tax') || q.includes('filing')) {
        const taxDeadline = upcomingTax?.deadline || upcomingTax?.dueDate || 'End of Month';
        const taxDays = upcomingTax?.daysRemaining || 14;
        reply = `**Upcoming KRA & Statutory Compliance Deadlines:**\n\n• **Next Priority:** **${upcomingTax?.authority || 'KRA'} - ${upcomingTax?.title || 'VAT Return'}**\n• **Statutory Deadline:** **${taxDeadline}** (${taxDays} days remaining)\n• **Requirement:** ${upcomingTax?.actionRequired || 'File return on iTax'}\n\nRemember that eTIMS invoices are mandatory to claim deductible business purchases. You can generate verified invoice summaries in the Invoices tab!`;
      } else if (q.includes('employee') || q.includes('staff') || q.includes('absent') || q.includes('3 days')) {
        reply = `**Kenyan Employment Act (Cap 226) Guidance:**\n\nUnder Section 44(4)(a) of the Kenyan Employment Act 2007, an employee who absents themselves from work without leave or lawful cause commits gross misconduct (desertion).\n\n**Best-Practice Procedural Steps:**\n1. **Do not terminate verbally or immediately on day 3.**\n2. Attempt contact via phone/WhatsApp/SMS and document the call logs.\n3. Issue a formal **Show-Cause Letter** requesting written explanation within 3 to 7 days.\n4. If no response is received, conduct an internal disciplinary hearing before issuing a formal certificate of service and terminal dues calculation.\n\n*Note: Always maintain written attendance records to avoid unfair dismissal claims at the Employment and Labour Relations Court (ELRC).*`;
      } else if (q.includes('invoice') || q.includes('draft') || q.includes('inv-2025-001') || q.includes('follow up')) {
        reply = `Here is a courteous yet firm WhatsApp reminder template for **Invoice INV-2025-001**:\n\n---\n*Jambo John,*\n\n*Trust you are having a productive week! Kindly note that Invoice INV-2025-001 for KSh 24,500 issued by ${tenant.name} was due on 25th February.*\n\n*Kindly expedite payment via Lipa Na M-Pesa Buy Goods Till: 892341 or let us know if you require another copy of the invoice.* \n\n*Thank you for your valued business!*\n---`;
      } else if (q.includes('highest margin') || q.includes('product') || q.includes('stock')) {
        // Calculate highest margin
        const sorted = [...products].sort((a, b) => {
          const mA = ((a.sellingPrice - a.purchasePrice) / a.sellingPrice);
          const mB = ((b.sellingPrice - b.purchasePrice) / b.sellingPrice);
          return mB - mA;
        });
        const top = sorted[0];
        const topMargin = (((top.sellingPrice - top.purchasePrice) / top.sellingPrice) * 100).toFixed(0);

        reply = `**Highest Margin Product in your Catalog:**\n\n• **Product:** **${top.name}**\n• **Category:** ${top.category}\n• **Wholesale Cost:** KSh ${top.purchasePrice.toLocaleString()} / Selling: KSh ${top.sellingPrice.toLocaleString()}\n• **Gross Margin:** **${topMargin}%**\n\n**Action Item:** Promote this product prominently on your WhatsApp status and bundles, as every unit sold generates the highest cash return.`;
      } else if (q.includes('cash') || q.includes('need') || q.includes('next month')) {
        const monthlyRunRate = Math.round(totalExpenses * 1.1);
        reply = `**Projected Cash Requirement for Next Month:**\n\n• **Estimated Fixed & Operational Overheads:** KSh ${monthlyRunRate.toLocaleString()} (Rent, salaries, restock buffer, KRA dues)\n• **Current Net Buffer:** KSh ${netProfit.toLocaleString()}\n• **Your Safety Cash Threshold:** KSh ${tenant.lowCashThreshold.toLocaleString()}\n\nTo ensure your operating balance remains safe, collect at least KSh 45,000 from current outstanding invoices before the 10th of next month.`;
      } else {
        reply = `I have analyzed that question with respect to Kenyan SME operations and your business (**${tenant.name}** in ${tenant.county} County).\n\nBased on your current operations:\n• Keep daily cash reconciliations between M-Pesa and physical cash receipts.\n• Keep adequate safety buffers for high-velocity goods.\n• Ensure all client invoices are sent with clear payment instructions.\n\nWould you like me to draft an action plan or help calculate specific figures?`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
              Ask BizHub AI
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] uppercase">
              Kenya SME Expert
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Real-time business insights grounded in your actual sales, expenses, taxes, and Kenyan commercial law.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Sparkles className="w-4 h-4 text-[#F5B400]" />
          <span>Grounded in: <strong>{tenant.name}</strong> records</span>
        </div>
      </div>

      {/* Suggested Question Chips (§25) */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          One-Click Instant Queries (§25)
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-[#0F7A4C] text-slate-700 hover:text-[#0F7A4C] text-xs font-semibold transition-all text-left cursor-pointer shadow-2xs"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px]">
        
        {/* Messages Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#0F7A4C] text-[#F5B400] flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#0B2440] text-white rounded-br-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-none shadow-2xs'
                }`}
              >
                <div>{msg.text}</div>
                <span className={`block text-[9px] mt-2 ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-[#0F7A4C] text-[#F5B400] flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0F7A4C] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#0F7A4C] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#0F7A4C] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your sales, tax deadlines, staff laws, or inventory..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-[#0F7A4C] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
