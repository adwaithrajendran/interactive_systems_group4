// Left side navigation bar
// Always expanded so labels are visible alongside icons

import type { NavItem } from '../types';

const iconPaths: Record<string, JSX.Element> = {
  grid: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  leaf: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  'bar-chart': (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

interface SidebarProps {
  items: NavItem[];
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onHomeClick?: () => void;
}

const pageMap: Record<string, string> = {
  Dashboard: 'dashboard',
  'All Plants': 'allPlants',
};

export default function Sidebar({ items, currentPage, onNavigate, onHomeClick }: SidebarProps) {
  const handleHome = () => {
    if (onHomeClick) {
      onHomeClick();
    } else if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 z-40 flex flex-col bg-surface-900 border-r border-surface-700">
      {/* Logo, clicking returns to a clean dashboard state */}
      <button
        onClick={handleHome}
        className="flex items-center justify-center h-16 border-b border-surface-700 shrink-0 hover:bg-surface-800/50 transition-colors"
        title="Back to dashboard"
      >
        <span className="text-emerald-500 font-bold text-2xl leading-none">S</span>
        <span className="ml-1 text-emerald-500 font-bold text-xl">prout</span>
      </button>

      {/* Navigation items with icon and label */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {items.map(item => {
          const targetPage = pageMap[item.label] || '';
          const isActive = currentPage === targetPage;

          return (
            <button
              key={item.label}
              onClick={() => onNavigate?.(targetPage)}
              className={`w-full flex items-center h-11 px-3 rounded-lg transition-colors duration-150
                ${isActive
                  ? 'bg-emerald-600/10 text-emerald-500'
                  : 'text-gray-300 hover:text-white hover:bg-surface-700'
                }`}
            >
              <span className="shrink-0">{iconPaths[item.icon]}</span>
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}