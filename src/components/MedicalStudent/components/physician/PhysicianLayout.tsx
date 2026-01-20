import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PhysicianTopBar } from './PhysicianTopBar';
import { PhysicianSidebar } from './PhysicianSidebar';
import { PhysicianStatusBar } from './PhysicianStatusBar';

export const PhysicianLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { viewMode, isSidebarOpen, closeSidebar } = useTheme();

    return (
        // Dynamic styling based on data-mode - Updated to dark theme
        <div className="flex flex-col h-screen w-screen overflow-hidden transition-colors duration-300 bg-slate-950 text-white" style={{ fontFamily: 'var(--font-display)' }}>

            {/* Navigation Bar */}
            <PhysicianTopBar />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar - Compact with hover expand on desktop, drawer on mobile */}
                <aside
                    className={`
                        hidden md:block relative z-20 h-full transition-all duration-300 ease-in-out
                        w-14 hover:w-52 group/sidebar
                        bg-slate-900/80 backdrop-blur-xl border-r border-white/10
                    `}
                >
                    <PhysicianSidebar />
                </aside>

                {/* Mobile Sidebar Drawer */}
                <aside
                    className={`
                        md:hidden absolute z-20 h-full transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'}
                        bg-slate-900/95 backdrop-blur-xl border-r border-white/10
                    `}
                >
                    <PhysicianSidebar expanded />
                </aside>

                {/* Overlay for Mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black/60 z-10 md:hidden"
                        onClick={closeSidebar}
                    />
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto w-full">
                    {children}
                </main>
            </div>

            {/* Footer Status Bar */}
            <PhysicianStatusBar />
        </div>
    );
};
