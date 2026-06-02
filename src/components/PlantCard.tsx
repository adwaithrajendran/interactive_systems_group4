// A single plant card used in all sort views

import type { Plant, HealthStatus } from '../types';
import { dueLabel } from '../utils/plantStatus';

const statusPill: Record<HealthStatus, { bg: string; text: string; label: string }> = {
  healthy: { bg: 'bg-emerald-500', text: 'text-white', label: 'Ok' },
  warning: { bg: 'bg-amber-400', text: 'text-white', label: 'Due Soon' },
  critical: { bg: 'bg-rose-500', text: 'text-white', label: 'Overdue' },
};

interface PlantCardProps {
  plant: Plant;
  onWater: (plantId: string) => void;
}

export default function PlantCard({ plant, onWater }: PlantCardProps) {
  const pill = statusPill[plant.health];

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-lg p-4 hover:border-emerald-500/40 transition-colors">
      {/* Top row: avatar, plant info, status pill */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-base font-bold text-emerald-700 shrink-0">
          {plant.name.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-bold text-white truncate">{plant.name}</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-600 text-gray-200 font-medium shrink-0">
              {plant.owner}
            </span>
          </div>
          <p className="text-sm text-gray-300 truncate">{plant.species}</p>
          <p className="text-xs text-gray-400 mt-0.5">{dueLabel(plant)}</p>
        </div>

        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${pill.bg} ${pill.text} shrink-0`}
        >
          {pill.label}
        </span>
      </div>

      {/* Full width Water button */}
      <button
        onClick={() => onWater(plant.id)}
        className="w-full py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
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
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        Water now
      </button>
    </div>
  );
}