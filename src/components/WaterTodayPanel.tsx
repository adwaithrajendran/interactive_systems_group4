// Water Today panel
// Shows plants that need water today, capped at three visible items
// A View All button opens a modal with the full list when there are more

import { useState } from 'react';
import WaterAllModal from './WaterAllModal';
import type { Reminder } from '../types';

// Cap on how many plants are shown directly in the panel
// Anything beyond this is reachable through the View All button
const VISIBLE_LIMIT = 3;

interface WaterTodayPanelProps {
  reminders: Reminder[];
  onWater: (plantId: string) => void;
  onViewPlant?: (plantId: string) => void;
}

export default function WaterTodayPanel({ reminders, onWater, onViewPlant }: WaterTodayPanelProps) {
  // Whether the View All modal is open
  const [modalOpen, setModalOpen] = useState(false);

  // Slice the panel into a visible chunk and a count of what is hidden
  const visibleReminders = reminders.slice(0, VISIBLE_LIMIT);
  const hiddenCount = Math.max(0, reminders.length - VISIBLE_LIMIT);

  return (
    <>
      <div className="bg-surface-800 border border-surface-700 rounded-xl p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Water Today</h2>
          <span className="text-sm text-gray-300">{reminders.length} pending</span>
        </div>

        {/* Empty state when nothing needs water */}
        {reminders.length === 0 && (
          <div className="flex-1 py-12 text-center">
            <p className="text-base text-gray-200">All caught up</p>
            <p className="text-sm text-gray-400 mt-1">No plants need water right now</p>
          </div>
        )}

        {/* Visible list of plants needing water */}
        <div className="space-y-2 flex-1">
          {visibleReminders.map(reminder => {
            const dueText = reminder.status === 'overdue' ? 'overdue' : 'due today';
            const dueColor =
              reminder.status === 'overdue' ? 'text-rose-300' : 'text-amber-300';

            return (
              <div
                key={reminder.id}
                onClick={() => onViewPlant?.(reminder.plantId)}
                className={`flex items-center justify-between bg-surface-700/50 hover:bg-surface-700/80 rounded-lg p-3 transition-colors ${onViewPlant ? 'cursor-pointer' : ''}`}
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

                {/* stopPropagation so the Water click does not also open Plant Details */}
                <button
                  onClick={(e) => { e.stopPropagation(); onWater(reminder.plantId); }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shrink-0"
                >
                  Water
                </button>
              </div>
            );
          })}
        </div>

        {/* View All button, shown only when there are hidden plants */}
        {hiddenCount > 0 && (
          <button
            onClick={() => setModalOpen(true)}
            className="mt-3 w-full py-2.5 rounded-lg bg-surface-700/40 hover:bg-surface-700/80 text-emerald-400 hover:text-emerald-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            View all {reminders.length} plants
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Modal showing every plant that needs water, not just the first three */}
      {modalOpen && (
        <WaterAllModal
          reminders={reminders}
          onWater={onWater}
          onViewPlant={onViewPlant}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}