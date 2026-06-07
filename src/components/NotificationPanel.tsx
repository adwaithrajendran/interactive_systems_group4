// Notification panel that opens when the bell in the top navbar is clicked
// Lists plants needing attention and offers a Water button per row

import type { Reminder } from '../types';

interface NotificationPanelProps {
  reminders: Reminder[];
  onWater: (plantId: string) => void;
  onViewPlant?: (plantId: string) => void;
  onClose: () => void;
}

export default function NotificationPanel({
  reminders,
  onWater,
  onViewPlant,
  onClose,
}: NotificationPanelProps) {
  // Sort so overdue plants come first, then plants due today
  // The user's most urgent items should always be at the top
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.status === 'overdue' && b.status !== 'overdue') return -1;
    if (b.status === 'overdue' && a.status !== 'overdue') return 1;
    return 0;
  });

  return (
    <>
      {/* Invisible backdrop that closes the panel when clicked outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* The panel itself, positioned below the bell */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-surface-800 border border-surface-700 rounded-xl shadow-2xl z-50 overflow-hidden">
        {/* Panel header with title and close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
          <div>
            <h3 className="text-base font-semibold text-white">Notifications</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {reminders.length === 0
                ? 'You are all caught up'
                : `${reminders.length} plant${reminders.length === 1 ? '' : 's'} need${reminders.length === 1 ? 's' : ''} attention`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-surface-700 transition-colors"
            title="Close"
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
        </div>

        {/* Empty state, nothing needs water */}
        {reminders.length === 0 && (
          <div className="px-4 py-8 text-center">
            <div className="text-4xl mb-2">✓</div>
            <p className="text-sm text-gray-200">All your plants are happy</p>
            <p className="text-xs text-gray-400 mt-1">
              Nothing needs watering right now
            </p>
          </div>
        )}

        {/* List of notification rows */}
        {reminders.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {sortedReminders.map(reminder => {
              const isOverdue = reminder.status === 'overdue';
              const iconColor = isOverdue ? 'bg-rose-500' : 'bg-amber-400';
              const dueText = isOverdue ? 'Overdue' : 'Due today';
              const dueColor = isOverdue ? 'text-rose-300' : 'text-amber-300';

              return (
                <div
                  key={reminder.id}
                  onClick={() => onViewPlant?.(reminder.plantId)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-surface-700/50 transition-colors border-b border-surface-700/50 last:border-b-0 ${onViewPlant ? 'cursor-pointer' : ''}`}
                >
                  {/* Coloured dot showing severity */}
                  <div className={`w-2 h-2 rounded-full ${iconColor} shrink-0`} />

                  {/* Plant name, owner, and due label */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white truncate">
                        {reminder.plantName}
                      </p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-600 text-gray-200 font-medium shrink-0">
                        {reminder.owner}
                      </span>
                    </div>
                    <p className={`text-xs ${dueColor} mt-0.5`}>{dueText}</p>
                  </div>

                  {/* Quick water button, stopPropagation so the row click does not also open Plant Details */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onWater(reminder.plantId); }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shrink-0"
                  >
                    Water
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer hint, only shown when the list has items */}
        {reminders.length > 0 && (
          <div className="px-4 py-2 border-t border-surface-700 bg-surface-900/50">
            <p className="text-xs text-gray-400 text-center">
              Tap Water to mark a plant as watered
            </p>
          </div>
        )}
      </div>
    </>
  );
}