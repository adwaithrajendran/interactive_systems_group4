// Modal showing all plants that need water today
// Opens from the View All button in the Water Today panel

import type { Reminder } from '../types';

interface WaterAllModalProps {
  reminders: Reminder[];
  onWater: (plantId: string) => void;
  onClose: () => void;
}

export default function WaterAllModal({ reminders, onWater, onClose }: WaterAllModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-800 border border-surface-700 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700">
          <div>
            <h2 className="text-xl font-bold text-white">All Plants Needing Water</h2>
            <p className="text-sm text-gray-300 mt-0.5">
              {reminders.length} plant{reminders.length === 1 ? '' : 's'} pending
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-700 transition-colors"
            title="Close"
          >
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
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {reminders.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-base text-gray-200">All caught up</p>
              <p className="text-sm text-gray-400 mt-1">
                You watered everything that needed it
              </p>
            </div>
          )}

          {reminders.map(reminder => {
            const dueText = reminder.status === 'overdue' ? 'overdue' : 'due today';
            const dueColor =
              reminder.status === 'overdue' ? 'text-rose-300' : 'text-amber-300';

            return (
              <div
                key={reminder.id}
                className="flex items-center justify-between bg-surface-700/40 hover:bg-surface-700/70 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-base font-bold text-emerald-700 shrink-0">
                    {reminder.plantName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-base font-semibold text-white truncate">
                        {reminder.plantName}
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-surface-600 text-gray-200 font-medium shrink-0">
                        {reminder.owner}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{reminder.species}</p>
                    <p className={`text-sm ${dueColor} mt-0.5`}>{dueText}</p>
                  </div>
                </div>

                <button
                  onClick={() => onWater(reminder.plantId)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shrink-0"
                >
                  Water
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer with close button */}
        <div className="px-6 py-3 border-t border-surface-700 bg-surface-900/50">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-surface-700 hover:bg-surface-600 text-gray-100 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}