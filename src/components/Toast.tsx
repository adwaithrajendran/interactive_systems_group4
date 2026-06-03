// A single toast notification
// Lives inside ToastStack which handles positioning

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
}

export default function Toast({ message, onUndo, onDismiss }: ToastProps) {
  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="animate-slide-in flex items-center gap-3 bg-surface-800 border border-emerald-600/30 rounded-xl px-4 py-3 shadow-2xl min-w-[280px]">
      {/* Success icon */}
      <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{message}</p>
        <p className="text-xs text-gray-400 mt-0.5">Tap undo if this was a mistake</p>
      </div>

      {/* Undo button */}
      <button
        onClick={onUndo}
        className="px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-xs font-semibold transition-colors shrink-0"
      >
        Undo
      </button>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="p-1 rounded text-gray-500 hover:text-gray-200 transition-colors shrink-0"
        title="Dismiss"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
    </div>
  );
}