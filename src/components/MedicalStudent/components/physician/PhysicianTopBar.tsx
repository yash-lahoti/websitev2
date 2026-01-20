import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Menu, Play, Code, Activity } from 'lucide-react';

export const PhysicianTopBar = () => {
    const { toggleSidebar, viewMode, toggleViewMode } = useTheme();

    const handleRun = () => {
        window.location.href = "mailto:yash@example.com";
    };

    return (
        <div className="h-10 flex items-center justify-between px-4 border-b bg-slate-900/80 backdrop-blur-xl border-white/10" style={{ fontFamily: 'var(--font-display)' }}>

            <div className="flex items-center gap-4">
                {/* Hamburger Menu - Visible only on mobile/tablet */}
                <button onClick={toggleSidebar} className="md:hidden p-1 hover:bg-white/10 rounded text-white/70">
                    <Menu size={20} />
                </button>
                <span className="font-semibold text-sm hidden md:block text-white">
                    Dr. Yash Lahoti
                </span>
            </div>

            {/* Toggle positioned identically to IDE - using ml-auto */}
            <div className="ml-auto flex items-center">
                {/* Mode Toggle - Pill style with icons */}
                <button
                    onClick={toggleViewMode}
                    className="flex items-center gap-0 rounded-full bg-slate-800 border border-white/10 overflow-hidden h-8"
                >
                    {/* Dev Button */}
                    <div className={`flex items-center justify-center gap-1.5 px-3 h-full transition-all ${viewMode === 'developer'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-white/40 hover:text-white/60'
                        }`}>
                        <Code size={14} />
                        <span className="text-xs font-semibold">Dev</span>
                    </div>
                    {/* MD Button */}
                    <div className={`flex items-center justify-center gap-1.5 px-3 h-full transition-all ${viewMode === 'physician'
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-white/40 hover:text-white/60'
                        }`}>
                        <Activity size={14} />
                        <span className="text-xs font-semibold">MD</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
