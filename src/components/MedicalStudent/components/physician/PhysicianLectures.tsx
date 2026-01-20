import React, { useState } from 'react';
import { lectures } from '../../lib/medical-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MonitorPlay, ChevronLeft, ChevronRight, Menu, Minus, X, Square } from 'lucide-react';

// Window Frame Component - macOS style
const WindowFrame = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="bg-slate-800/80 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Window Title Bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 border-b border-white/5">
            {/* Traffic light buttons */}
            <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
            </div>
            {/* Title */}
            <div className="flex-1 text-center">
                <span className="text-xs text-white/40 font-medium">{title}</span>
            </div>
            {/* Spacer for symmetry */}
            <div className="w-12" />
        </div>
        {/* Content */}
        <div className="bg-white">
            {children}
        </div>
    </div>
);

const LectureViewer = ({ lecture }: { lecture: typeof lectures[0] }) => {
    return (
        <div className="flex flex-col h-full">
            {/* PDF Viewer ON TOP - Grouped Window Style */}
            <div className="flex-1 min-h-0">
                <WindowFrame title={`${lecture.title}.pdf`}>
                    <div className="w-full" style={{ height: '480px' }}>
                        {lecture.slides && lecture.slides !== "#" ? (
                            <iframe
                                src={`${lecture.slides}#zoom=${lecture.zoom || 80}&view=FitH&toolbar=1`}
                                title={lecture.title}
                                className="w-full h-full"
                                style={{ border: 'none' }}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-400">
                                <MonitorPlay size={40} className="mb-3 opacity-50" />
                                <p className="text-sm">Preview unavailable</p>
                            </div>
                        )}
                    </div>
                </WindowFrame>
            </div>

            {/* Title & Info BELOW PDF */}
            <div className="mt-4 p-4 bg-white/[0.02] rounded-xl border border-white/10">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 text-[10px] font-semibold text-blue-400 uppercase tracking-widest">
                            <MonitorPlay size={12} />
                            <span>{lecture.event}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white leading-tight mb-2">
                            {lecture.title}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                            {lecture.description}
                        </p>
                    </div>
                    <a
                        href={lecture.slides}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full font-medium text-xs hover:bg-blue-500 transition-all shrink-0"
                    >
                        <Download size={14} /> Download
                    </a>
                </div>
            </div>
        </div>
    );
};

export const PhysicianLectures = () => {
    const [activeLectureId, setActiveLectureId] = useState(lectures[0].id);
    const [isTocOpen, setIsTocOpen] = useState(true);
    const activeLecture = lectures.find(l => l.id === activeLectureId) || lectures[0];

    return (
        <section id="publications" className="py-10 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />
            </div>

            <div className="max-w-[1600px] mx-auto px-4 relative z-10">
                {/* Mobile Header & Tabs - stacked on top */}
                <div className="md:hidden mb-4">
                    <div className="mb-3">
                        <h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-400 mb-0.5">Clinical Education</h3>
                        <h2 className="text-lg font-bold text-white leading-tight">Lectures & Keynotes</h2>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {lectures.map((lecture, index) => (
                            <button
                                key={lecture.id}
                                onClick={() => setActiveLectureId(lecture.id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${activeLectureId === lecture.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/5 text-white/60 border border-white/10'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop: Flex row with TOC + Viewer */}
                <div className="md:flex md:gap-4">
                    {/* Collapsible TOC - Desktop only */}
                    <AnimatePresence>
                        {isTocOpen && (
                            <motion.nav
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 200, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="hidden md:block shrink-0 overflow-hidden"
                            >
                                <div className="pr-2">
                                    {/* Inline Header */}
                                    <div className="mb-3 pb-2 border-b border-white/10">
                                        <h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-400 mb-0.5">Clinical Education</h3>
                                        <h2 className="text-sm font-bold text-white leading-tight">Lectures & Keynotes</h2>
                                    </div>
                                    {/* TOC Items */}
                                    <div className="space-y-0.5">
                                        {lectures.map((lecture, index) => (
                                            <button
                                                key={lecture.id}
                                                onClick={() => setActiveLectureId(lecture.id)}
                                                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium transition-all flex items-start gap-2 ${activeLectureId === lecture.id
                                                    ? 'bg-blue-500/20 text-white border-l-2 border-blue-500'
                                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${activeLectureId === lecture.id
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white/10 text-white/40'
                                                    }`}>
                                                    {index + 1}
                                                </span>
                                                <span className="leading-tight line-clamp-2">{lecture.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.nav>
                        )}
                    </AnimatePresence>

                    {/* Toggle button when TOC is hidden - Desktop only */}
                    {!isTocOpen && (
                        <button
                            onClick={() => setIsTocOpen(true)}
                            className="hidden md:flex shrink-0 w-8 h-8 items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-white transition-all self-start"
                        >
                            <ChevronRight size={16} />
                        </button>
                    )}

                    {/* Lecture Viewer */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLecture.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="h-full"
                            >
                                <LectureViewer lecture={activeLecture} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
