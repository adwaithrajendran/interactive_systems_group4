// Top navigation bar with a working search input and a notification bell

interface TopNavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function TopNavbar({ searchQuery, onSearchChange }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-950/80 backdrop-blur-md border-b border-surface-700 flex items-center justify-between px-6">
      {/* Search input on the left */}
      <div className="flex items-center flex-1 max-w-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 mr-3 shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search by name, species, or room..."
          className="w-full bg-transparent border-none outline-none text-base text-white placeholder-gray-400"
        />
        {/* Clear button appears when there is text in the input */}
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="ml-2 text-gray-400 hover:text-white transition-colors shrink-0"
            title="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Notification bell on the right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-gray-200 hover:text-white hover:bg-surface-800 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}