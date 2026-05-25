export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-950/80 backdrop-blur-md border-b border-surface-700 flex items-center justify-between px-6">
      <div className="flex items-center flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3 shrink-0">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search plants..."
          className="w-full bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-surface-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-surface-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-200">Jamie Doe</p>
            <p className="text-xs text-gray-500">Plant Parent</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
