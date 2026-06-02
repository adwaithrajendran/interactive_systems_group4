// src/components/WateringReminders.tsx

import type { Reminder } from '../types';

function getDaysUntil(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff < 0) return `${Math.abs(diff)} day(s) ago`;
  return `In ${diff} days`;
}

const statusConfig = {
  overdue: { label: 'Overdue', dot: 'bg-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-l-rose-500' },
  today: { label: 'Due Today', dot: 'bg-amber-400', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-l-amber-400' },
  upcoming: { label: 'Upcoming', dot: 'bg-emerald-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-l-emerald-400' },
};

interface WateringRemindersProps {
  reminders: Reminder[];
  onWater: (plantId: string) => void;
}

export default function WateringReminders({ reminders, onWater }: WateringRemindersProps) {
  const grouped = ['overdue', 'today', 'upcoming'] as const;

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          Watering Reminders
        </h2>
        <span className="text-xs text-gray-500">{reminders.length} pending</span>
      </div>

      <div className="space-y-1">
        {grouped.map(group => {
          const items = reminders.filter(r => r.status === group);
          if (items.length === 0) return null;
          const cfg = statusConfig[group];

          return (
            <div key={group}>
              <div className="flex items-center gap-2 px-1 py-2">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                <span className={`text-[11px] font-medium ${cfg.text}`}>{cfg.label}</span>
                <span className="text-[11px] text-gray-600">· {items.length}</span>
              </div>
              {items.map(reminder => (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg ${cfg.bg} border-l-2 ${cfg.border} mb-1`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">{reminder.plantName}</p>
                      <p className="text-xs text-gray-500 truncate">{reminder.species}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400">{getDaysUntil(reminder.dueDate)}</span>
                    <button
                      onClick={() => onWater(reminder.plantId)}
                      title="Mark as watered"
                      className="p-1.5 rounded-lg bg-surface-600 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}