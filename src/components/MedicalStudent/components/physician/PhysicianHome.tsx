import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { clinicalExperience, researchHighlights, expertise } from '../../lib/medical-data';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Activity } from 'lucide-react';
import { PhysicianLectures } from './PhysicianLectures';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
    >
        <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500/50" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">{subtitle}</h3>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-500/50" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h2>
    </motion.div>
);

// Experience Card - Horizontal layout with left border accent
const ExperienceCard = ({ experience, index }: { experience: typeof clinicalExperience[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/[0.03] backdrop-blur-sm border-l-4 border-l-blue-500 border border-white/10 rounded-r-xl p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300"
        >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{experience.title}</h3>
                    <p className="text-blue-400 font-medium text-sm">{experience.organization}</p>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                        {experience.date}
                    </span>
                    <span className="text-xs text-white/40">{experience.location}</span>
                </div>
            </div>
            <ul className="space-y-2">
                {experience.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 bg-blue-500/50 rounded-full shrink-0" />
                        <span className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{point}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const ResearchCard = ({ project, index }: { project: typeof researchHighlights[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 h-full flex flex-col"
        >
            <div className="h-52 overflow-hidden bg-slate-800 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest bg-blue-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-500/30">
                        {project.category}
                    </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-blue-400">
                        <project.icon size={18} />
                    </div>
                </div>
            </div>

            <div className="p-7 flex flex-col flex-1 relative">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 text-white/60 text-xs font-medium rounded-full border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-5 border-t border-white/10 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-blue-400 font-medium">
                        <Activity size={16} />
                        {project.metrics}
                    </div>
                    <span className="text-xs text-white/40 font-medium uppercase tracking-wide">{project.status}</span>
                </div>
            </div>
        </motion.div>
    );
};

export const PhysicianHome = () => {
    const { viewMode } = useTheme();

    return (
        <div className="w-full overflow-hidden selection:bg-blue-500/30" style={{ fontFamily: 'var(--font-display)' }}>

            {/* Hero Section - Premium Dark */}
            <section className="min-h-screen flex flex-col justify-center items-center relative px-6 md:px-20 text-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 -left-32 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl"
                        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto relative z-10"
                >
                    {/* Glassmorphic Badge */}
                    <motion.span
                        className="inline-flex items-center gap-3 px-6 py-2.5 mb-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-blue-300 font-medium text-xs tracking-[0.2em] uppercase shadow-lg shadow-blue-900/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Sparkles size={14} className="text-blue-400" />
                        Ophthalmology • Clinical AI • Vision Science
                    </motion.span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.05]">
                        Restoring Sight.<br />
                        <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400">
                            Advancing Care.
                            <motion.svg
                                className="absolute -bottom-2 left-0 w-full h-4 text-blue-500/50"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </motion.svg>
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-14" style={{ fontFamily: 'var(--font-body)' }}>
                        Ophthalmology research bridging <span className="font-medium text-white">clinical insight</span> with precision diagnostics.
                        <br className="hidden md:block" />
                        From disease detection to surgical innovation—technology in service of patient outcomes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.button
                            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold tracking-wide overflow-hidden shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">View Clinical Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                        <motion.button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold tracking-wide hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Explore Research
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
                >
                    <ArrowDown size={28} strokeWidth={1.5} />
                </motion.div>
            </section>

            {/* Narrative Section - PRIME Study (Summary) */}
            <section id="readme" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-white/[0.03] backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/10 text-center relative"
                    >
                        {/* Decorative quotes */}
                        <div className="absolute top-10 left-10 text-8xl font-serif text-white/5 pointer-events-none select-none">“</div>

                        <div className="inline-block p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl mb-8 border border-amber-500/20">
                            <Sparkles className="w-8 h-8 text-amber-400" />
                        </div>

                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-8">The Spark of Hope</h3>

                        <blockquote className="text-xl md:text-3xl font-light text-white/90 leading-relaxed mb-10 relative z-10" style={{ fontFamily: 'var(--font-body)' }}>
                            "I was inspired by the recent PRIME study on retinal implants.
                            Seeing the possibility of <span className="font-medium text-blue-400">restoring sight</span> makes my eyes brighten and sparkle.
                            It represents the blend of human curiosity, compassion, and persistence."
                        </blockquote>

                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />

                        <p className="text-white/40 font-medium tracking-wide uppercase text-xs">
                            This hope drives my passion for the partnership between humanity and technology.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* Clinical Experience (Experience) */}
            <section id="experience" className="py-16 bg-slate-950 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="max-w-5xl mx-auto px-6">
                    <SectionHeader title="Clinical Journey" subtitle="From Bench to Bedside" />
                    <div className="space-y-4">
                        {clinicalExperience.map((exp, index) => (
                            <ExperienceCard key={index} experience={exp} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Portfolio (Projects) */}
            <section id="projects" className="py-20 bg-slate-900 relative overflow-hidden">
                {/* Background glows */}
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeader title="Innovation Portfolio" subtitle="Clinical Research & Diagnostics" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {researchHighlights.map((project, index) => (
                            <ResearchCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lectures & Articles (Publications/Gallery) */}
            <div id="publications">
                <PhysicianLectures />
            </div>

            {/* Footer / Contact */}
            <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white text-center relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block p-4 bg-blue-500/10 rounded-2xl mb-8 border border-blue-500/20">
                            <Sparkles className="w-10 h-10 text-blue-400" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Advancing Patient Care</h2>
                        <p className="text-white/50 text-lg md:text-xl font-light mb-14 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                            Clinical collaborations in ophthalmology, vision research, and diagnostic AI.
                        </p>
                        <motion.a
                            href="mailto:yash.lahoti@icahn.mssm.edu"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full font-semibold text-lg shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Contact Me <ArrowDown className="rotate-[-45deg]" size={20} />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};
