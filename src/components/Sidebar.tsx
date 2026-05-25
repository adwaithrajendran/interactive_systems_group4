import { useState } from 'react';
import type { NavItem } from '../types';

const iconPaths: Record<string, JSX.Element> = {
  grid: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  leaf: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  'bar-chart': (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col bg-surface-900 border-r border-surface-700 transition-all duration-200 ${hovered ? 'w-56' : 'w-16'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-center h-16 border-b border-surface-700 shrink-0">
        <span className="text-emerald-400 font-bold text-xl leading-none">S</span>
        <span className={`ml-2 text-emerald-400 font-bold text-lg transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
          prout
        </span>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center h-11 mx-2 px-3 rounded-lg transition-colors duration-150
              ${item.active
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-700'
              }`}
          >
            <span className="shrink-0">{iconPaths[item.icon]}</span>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            JD
          </div>
          <div className={`ml-3 transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
            <p className="text-sm font-medium text-gray-200 whitespace-nowrap">Jamie Doe</p>
            <p className="text-xs text-gray-500 whitespace-nowrap">Plant Parent</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
