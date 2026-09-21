import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  FileSpreadsheet,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Course } from '../../types';

export const AcademyView: React.FC = () => {
  const { courses, completeCourseLesson, tenant } = useBusiness();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const getCourseProgress = (c: Course) => {
    if (typeof c.progress === 'number') return c.progress;
    const total = c.lessonsCount || 5;
    const done = c.completedLessons || 0;
    return Math.round((done / total) * 100);
  };

  const getCourseLessons = (c: Course) => {
    if (c.lessons && c.lessons.length > 0) return c.lessons;
    return [
      { id: 'l-1', title: 'Introduction & Kenyan Context', duration: '5 min', content: 'Comprehensive overview of practical approaches for Kenyan entrepreneurs.', completed: true },
      { id: 'l-2', title: 'Step-by-Step Operations Guide', duration: '8 min', content: 'Actionable steps and frameworks to streamline your cash flows and team execution.', completed: false },
      { id: 'l-3', title: 'Compliance & Growth Checklist', duration: '6 min', content: 'Key takeaways, official templates, and statutory filing guidelines.', completed: false },
    ];
  };

  const completedCoursesCount = courses.filter((c) => getCourseProgress(c) === 100).length;

  const handleOpenCourse = (c: Course) => {
    setSelectedCourse(c);
    setActiveLessonIdx(0);
    setShowCertificate(false);
  };

  const handleFinishLesson = (courseId: string, lessonId: string) => {
    completeCourseLesson(courseId, lessonId);
    if (selectedCourse) {
      const lessons = getCourseLessons(selectedCourse);
      if (activeLessonIdx < lessons.length - 1) {
        setActiveLessonIdx((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B2440] tracking-tight">
            BizHubKE Academy &amp; SME Capacity Building
          </h2>
          <p className="text-xs text-slate-500">
            Bite-sized micro-courses on Kenyan bookkeeping, KRA taxes, cash flow, and WhatsApp selling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
            <Award className="w-4 h-4 text-[#F5B400]" />
            <span>{completedCoursesCount} of {courses.length} Certified</span>
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid (§23) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-50 text-[#0F7A4C]">
                  {course.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0B2440] mb-2 leading-snug">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                {course.description}
              </p>

              {/* Progress bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Progress</span>
                  <span className="text-[#0F7A4C]">{getCourseProgress(course)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F7A4C] transition-all"
                    style={{ width: `${getCourseProgress(course)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCourse(course)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                getCourseProgress(course) === 100
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-[#0F7A4C] hover:bg-[#0c643e] text-white shadow-xs'
              }`}
            >
              {getCourseProgress(course) === 100 ? (
                <>
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>View Certificate</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{getCourseProgress(course) > 0 ? 'Continue Lesson' : 'Start Course'}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Course Player Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-6 relative max-h-[90vh] flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0F7A4C] bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedCourse.category}
                </span>
                <h3 className="text-lg font-black text-[#0B2440] mt-1">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>

            {/* Course Body or Certificate */}
            {selectedCourse.progress === 100 && showCertificate ? (
              <div className="p-8 text-center bg-gradient-to-b from-amber-50 to-white border-2 border-[#F5B400] rounded-2xl space-y-4 my-4">
                <Award className="w-16 h-16 text-[#F5B400] mx-auto" />
                <span className="text-xs font-black uppercase tracking-widest text-[#0F7A4C]">
                  Certificate of SME Competency
                </span>
                <h2 className="text-2xl font-black text-[#0B2440]">
                  {tenant.ownerName} ({tenant.name})
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Has successfully completed all lessons, practical worksheets, and quizzes for:
                  <strong className="block text-slate-800 mt-1">{selectedCourse.title}</strong>
                </p>
                <div className="pt-2 text-[10px] text-slate-400">
                  Issued by BizHubKE Academy · Nairobi, Kenya · Accredited Training Material
                </div>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Back to Course Lessons
                </button>
              </div>
            ) : (
              (() => {
                const lessons = getCourseLessons(selectedCourse);
                const currentLesson = lessons[activeLessonIdx] || lessons[0];
                return (
                  <div className="space-y-4 overflow-y-auto pr-2">
                    {/* Lesson Navigation Strip */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {lessons.map((lesson, idx) => (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonIdx(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                            activeLessonIdx === idx
                              ? 'bg-[#0B2440] text-white shadow-xs'
                              : lesson.completed
                              ? 'bg-emerald-50 text-[#0F7A4C]'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {lesson.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          <span>Lesson {idx + 1}</span>
                        </button>
                      ))}
                    </div>

                    {/* Active Lesson Content */}
                    {currentLesson && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-[#0B2440]">
                            {currentLesson.title}
                          </h4>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{currentLesson.duration}</span>
                          </span>
                        </div>

                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                          {currentLesson.content}
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">
                            {currentLesson.completed
                              ? 'Lesson completed'
                              : 'Read and apply this lesson'}
                          </span>
                          <button
                            onClick={() =>
                              handleFinishLesson(selectedCourse.id, currentLesson.id)
                            }
                            className="px-5 py-2 rounded-xl bg-[#0F7A4C] hover:bg-[#0c643e] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Mark Done &amp; Next</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Overall Course Completion: {selectedCourse.progress}%</span>
              {selectedCourse.progress === 100 && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="font-bold text-[#0F7A4C] hover:underline flex items-center gap-1"
                >
                  <Award className="w-4 h-4 text-[#F5B400]" />
                  <span>Show Certificate</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
