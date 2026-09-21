import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  Newspaper,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { NewsArticle } from '../../types';

interface NewsViewProps {
  onNavigateSection?: (section: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigateSection }) => {
  const { newsArticles } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = [
    'All',
    'Tax & Regulatory',
    'Finance & Funding',
    'Technology & Digital',
    'Market Trends',
    'County-Specific News',
  ];

  const filteredNews = newsArticles.filter((article) =>
    selectedCategory === 'All' ? true : article.category === selectedCategory
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            Kenya SME Business News &amp; Regulatory Alerts
          </h2>
          <p className="text-xs text-slate-500">
            Plain-language policy breakdowns with actionable checklists for retailers, wholesalers, and employers.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#F5B400]" />
          <span>Action-Oriented SME Intelligence</span>
        </div>
      </div>

      {/* Category Pills (§21) */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0B2440] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Articles Grid with "What This Means For Your Business" (§22) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category & Date */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0F7A4C] font-black text-[10px] uppercase border border-emerald-200">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </span>
              </div>

              {/* Title & Excerpt */}
              <h3 className="text-base font-bold text-[#0B2440] mb-2 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {article.summary}
              </p>

              {/* Section §22: What This Means For Your Business Callout Box */}
              <div className="p-4 rounded-xl bg-[#EAF3FB] border border-blue-200 text-xs space-y-2 mb-4">
                <div className="flex items-center gap-1.5 font-black text-[#0B2440] text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>What This Means For Your Business (§22)</span>
                </div>

                <div>
                  <strong className="text-blue-950 font-bold block">Who is affected:</strong>
                  <span className="text-slate-700">{article.whoIsAffected}</span>
                </div>

                <div>
                  <strong className="text-blue-950 font-bold block">What should you do:</strong>
                  <span className="text-slate-700">{article.whatToDo}</span>
                </div>
              </div>
            </div>

            {/* Source & Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-medium">
                Source: <strong>{article.source}</strong>
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Official Gazette</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
