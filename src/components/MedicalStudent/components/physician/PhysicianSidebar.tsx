import React from 'react';
import { FileText, Award, Layers, Zap, Image, Mail, Home } from 'lucide-react';

// Navigation items
const items = [
    { name: 'Summary', icon: Home, id: 'readme' },
    { name: 'Publications', icon: FileText, id: 'publications' },
    { name: 'Projects', icon: Zap, id: 'projects' },
    { name: 'Contact', icon: Mail, id: 'contact' },
];

interface SidebarProps {
    expanded?: boolean;
}

export const PhysicianSidebar: React.FC<SidebarProps> = ({ expanded = false }) => {
    return (
        <div className="h-full py-4 overflow-y-auto overflow-x-hidden text-white" style={{ fontFamily: 'var(--font-display)' }}>
            {/* Header - hidden when collapsed */}
            <div className={`px-3 mb-4 ${expanded ? 'block' : 'hidden group-hover/sidebar:block'}`}>
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] whitespace-nowrap">Nav</h3>
            </div>

            <nav className="space-y-0.5 px-1.5">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="w-full flex items-center gap-3 px-2.5 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-all text-white/60 hover:text-white group"
                        title={item.name}
                    >
                        <item.icon className="h-4 w-4 text-blue-400 shrink-0" />
                        <span className={`whitespace-nowrap overflow-hidden text-xs ${expanded ? 'opacity-100' : 'opacity-0 group-hover/sidebar:opacity-100'} transition-opacity duration-200`}>
                            {item.name}
                        </span>
                    </a>
                ))}
            </nav>
        </div>
    );
};
