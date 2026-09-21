import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ComplianceTask } from '../../types';

export const ComplianceView: React.FC = () => {
  const { complianceTasks, toggleComplianceTask } = useBusiness();
  const [filterAuthority, setFilterAuthority] = useState<string>('All');

  const authorities = ['All', 'KRA', 'SHA', 'NSSF', 'Ministry of Lands / KRA', 'County Government'];

  const filteredTasks = complianceTasks.filter((t) =>
    filterAuthority === 'All' ? true : t.authority === filterAuthority
  );

  const dueSoonCount = complianceTasks.filter((t) => t.status === 'Due Soon').length;
  const completedCount = complianceTasks.filter((t) => t.status === 'Completed' || t.status === 'Compliant').length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Kenya Compliance &amp; Statutory Tax Calendar
          </h2>
          <p className="text-xs text-slate-500">
            Official deadlines for KRA iTax (VAT, PAYE, TOT), SHA / SHIF, NSSF, Housing Levy, and County Business Permits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://itax.kra.go.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>KRA iTax Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://ecitizen.go.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>eCitizen Services</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mandatory Statutory Disclaimer (§20) */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-black text-amber-900 block mb-0.5">
            Official Statutory Notice &amp; Disclaimer (§20):
          </strong>
          <p>
            "BizHubKE provides business management and workflow tools. It does not provide certified legal or professional tax filing advice. Always verify official tax deadlines with the Kenya Revenue Authority (KRA) or a qualified certified public accountant."
          </p>
        </div>
      </div>

      {/* Summary KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Tracked Statutory Obligations</span>
          <div className="text-2xl font-black text-[#0B2440] mt-1">
            {complianceTasks.length}
          </div>
          <span className="text-[11px] text-slate-400">Recurring national &amp; county filings</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Immediate Action Required</span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {dueSoonCount}
          </div>
          <span className="text-[11px] text-rose-700 font-bold">Due within 14 days</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-xs font-semibold">Marked Filed / Compliant</span>
          <div className="text-2xl font-black text-[#0F7A4C] mt-1">
            {completedCount}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">This billing cycle</span>
        </div>
      </div>

      {/* Authority Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {authorities.map((auth) => (
          <button
            key={auth}
            onClick={() => setFilterAuthority(auth)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterAuthority === auth
                ? 'bg-[#0B2440] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {auth}
          </button>
        ))}
      </div>

      {/* Interactive Compliance Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'Completed' || task.status === 'Compliant';
          return (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-5 border transition-all shadow-xs flex flex-col justify-between ${
                isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Authority & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-black uppercase">
                    {task.authority}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : task.status === 'Due Soon'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {isDone ? 'Filed' : `Due in ${task.daysRemaining} days`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B2440] mb-1">
                  {task.title}
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {task.description}
                </p>

                {/* Next deadline date */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-3 bg-slate-50 p-2.5 rounded-xl">
                  <Calendar className="w-4 h-4 text-[#0F7A4C]" />
                  <span>Statutory Deadline: <strong>{task.deadline || task.dueDate}</strong></span>
                </div>

                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800">Action Step:</strong> {task.actionRequired}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={task.portalUrl || task.officialLink || 'https://itax.kra.go.ke'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
                >
                  <span>Open {task.authority} Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => toggleComplianceTask(task.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{isDone ? 'Marked Filed' : 'Mark as Filed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* eTIMS Readiness Checklist Section (§20) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#0F7A4C]">
          <FileCheck className="w-5 h-5" />
          <h3 className="text-base font-black text-[#0B2440]">
            KRA Electronic Tax Invoice Management System (eTIMS) Readiness Guide
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Under Section 23A of the Tax Procedures Act, all Kenyan businesses must transmit electronic invoice records to the KRA to ensure business expenses remain deductible for corporate income tax.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <strong className="font-bold text-[#0B2440] block mb-1">1. eTIMS Registration</strong>
            <p className="text-slate-600 text-[11px]">Sign into iTax with your PIN, apply under eTIMS Online, and download your client certificate.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <strong className="font-bold text-[#0B2440] block mb-1">2. QR Verification Stamp</strong>
            <p className="text-slate-600 text-[11px]">Ensure all buyer invoices include customer PIN, item description, and system invoice control key.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <strong className="font-bold text-[#0B2440] block mb-1">3. BizHubKE Export Sync</strong>
            <p className="text-slate-600 text-[11px]">Download your unified CSV from the Invoices tab to upload directly into the KRA eTIMS Excel client.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
