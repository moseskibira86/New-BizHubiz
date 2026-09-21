import React from 'react';
import {
  Newspaper,
  GraduationCap,
  Clock,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
} from 'lucide-react';
import { DEMO_NEWS_ARTICLES, DEMO_COURSES } from '../../lib/mockData';

interface NewsTrainingPreviewProps {
  onOpenNews?: () => void;
  onOpenTraining?: () => void;
  onOpenAcademy?: () => void;
}

export const NewsTrainingPreview: React.FC<NewsTrainingPreviewProps> = ({
  onOpenNews,
  onOpenTraining,
  onOpenAcademy,
}) => {
  const handleTraining = onOpenAcademy || onOpenTraining;
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C] bg-[#E8F7EF] px-3 py-1 rounded-full">
              Knowledge Is Working Capital
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2440] mt-3 tracking-tight">
              Stay Informed. Keep Learning. Grow Faster.
            </h2>
            <p className="text-slate-600 mt-2 text-base max-w-2xl">
              Curated Kenyan business news with practical action steps, paired with bite-sized training courses for entrepreneurs.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={onOpenNews}
              className="text-xs font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
            >
              <span>All News &amp; Updates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onOpenTraining}
              className="text-xs font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
            >
              <span>BizHubKE Academy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column Split: News on Left, Academy Courses on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Kenyan Business News */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-[#0B2440]">
              <Newspaper className="w-5 h-5 text-[#0F7A4C]" />
              <h3 className="text-lg font-bold">Latest Kenya SME Business News</h3>
            </div>

            {DEMO_NEWS_ARTICLES.slice(0, 2).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold px-2.5 py-0.5 rounded-full bg-[#EAF3FB] text-blue-700">
                    {article.category}
                  </span>
                  <span className="text-slate-400">{article.date} · {article.source}</span>
                </div>

                <h4 className="text-base font-bold text-[#0B2440] leading-snug">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {article.summary}
                </p>

                {/* Section §22: What This Means for Your Business Block */}
                <div className="bg-[#E8F7EF] rounded-xl p-3 border border-emerald-200/60 text-xs space-y-1.5">
                  <div className="font-bold text-[#0F7A4C] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0F7A4C]"></span>
                    <span>What This Means For Your Business</span>
                  </div>
                  <p className="text-slate-700">
                    <strong className="text-[#0B2440]">Action: </strong>
                    {article.whatItMeans?.whatYouShouldDo || article.whatToDo || 'Check compliance guidelines and update your records.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={onOpenNews}
                    className="font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
                  >
                    Read full analysis &amp; guides
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <span>Original source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: BizHubKE Academy Courses */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-[#0B2440]">
              <GraduationCap className="w-5 h-5 text-[#0F7A4C]" />
              <h3 className="text-lg font-bold">BizHubKE Academy</h3>
            </div>

            {DEMO_COURSES.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold px-2.5 py-0.5 rounded-full bg-[#E8F7EF] text-[#0F7A4C]">
                      {course.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.durationMinutes} mins</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#0B2440] mb-1.5">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                    <Award className="w-4 h-4 text-[#F5B400]" />
                    <span>Badge: {course.badge}</span>
                  </div>
                  <button
                    onClick={handleTraining || onOpenNews}
                    className="text-xs font-bold text-[#0F7A4C] hover:text-[#0c643e] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Start Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
