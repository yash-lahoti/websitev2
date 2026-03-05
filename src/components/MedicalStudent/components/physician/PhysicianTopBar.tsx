import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Menu, Play } from 'lucide-react';

export const PhysicianTopBar = () => {
    const { toggleSidebar } = useTheme();

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

        </div>
    );
};
