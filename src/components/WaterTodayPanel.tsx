// Panel showing plants that need water today

import type { Reminder } from '../types';

interface WaterTodayPanelProps {
  reminders: Reminder[];
  onWater: (plantId: string) => void;
}

export default function WaterTodayPanel({ reminders, onWater }: WaterTodayPanelProps) {
  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Water Today</h2>
        <span className="text-sm text-gray-300">{reminders.length} pending</span>
      </div>

      {/* Empty state */}
      {reminders.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-base text-gray-200">All caught up</p>
          <p className="text-sm text-gray-400 mt-1">No plants need water right now</p>
        </div>
      )}

      {/* List of plants needing water */}
      <div className="space-y-2">
        {reminders.map(reminder => {
          const dueText = reminder.status === 'overdue' ? 'overdue' : 'due today';
          const dueColor = reminder.status === 'overdue' ? 'text-rose-300' : 'text-amber-300';

          return (
            <div
              key={reminder.id}
              className="flex items-center justify-between bg-surface-700/50 hover:bg-surface-700/80 rounded-lg p-3 transition-colors"
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
                  <p className={`text-sm ${dueColor} mt-0.5`}>{dueText}</p>
                </div>
              </div>

              <button
                onClick={() => onWater(reminder.plantId)}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors shrink-0"
              >
                Water
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}