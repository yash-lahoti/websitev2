import React, { createContext, useContext, useState, useEffect } from 'react';

type ViewMode = 'developer' | 'physician';

interface ThemeContextType {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('developer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on Desktop

  // Load preference from local storage
  useEffect(() => {
    const savedMode = localStorage.getItem('viewMode') as ViewMode;
    if (savedMode) setViewMode(savedMode);
    
    // Mobile Check: Auto-close sidebar on small screens
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleViewMode = () => {
    const newMode = viewMode === 'developer' ? 'physician' : 'developer';
    setViewMode(newMode);
    localStorage.setItem('viewMode', newMode);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ThemeContext.Provider value={{ viewMode, toggleViewMode, isSidebarOpen, toggleSidebar, closeSidebar }}>
      {/* We apply the data-mode attribute here for Tailwind targeting */}
      <div data-mode={viewMode} className={viewMode === 'developer' ? 'font-mono' : 'font-sans'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
