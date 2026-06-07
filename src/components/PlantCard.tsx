// A single plant card used in all sort views on the dashboard
// Shows the plant's name, owner, species, room, due status, and a Water button

import type { Plant, HealthStatus } from '../types';
import { dueLabel } from '../utils/plantStatus';

// Style and label for the status pill at the top right of the card
const statusPill: Record<HealthStatus, { bg: string; text: string; label: string }> = {
  healthy: { bg: 'bg-emerald-600', text: 'text-white', label: 'Ok' },
  warning: { bg: 'bg-amber-400', text: 'text-white', label: 'Due Soon' },
  critical: { bg: 'bg-rose-500', text: 'text-white', label: 'Overdue' },
};

interface PlantCardProps {
  plant: Plant;
  onWater: (plantId: string) => void;
  onClick?: (plantId: string) => void;
}

export default function PlantCard({ plant, onWater, onClick }: PlantCardProps) {
  const pill = statusPill[plant.health];

  // Clicking anywhere on the card opens Plant Details
  // Only attached when an onClick handler is passed in
  const handleClick = () => {
    if (onClick) onClick(plant.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-surface-800 border border-surface-700 rounded-lg p-4 hover:border-emerald-600/40 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
    >
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
          <p className="text-xs text-gray-400 mt-0.5">{plant.room} · {dueLabel(plant)}</p>
        </div>

        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${pill.bg} ${pill.text} shrink-0`}
        >
          {pill.label}
        </span>
      </div>

      {/* Full width Water button */}
      {/* stopPropagation stops the card click handler from firing as well */}
      <button
        onClick={(e) => { e.stopPropagation(); onWater(plant.id); }}
        className="w-full py-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
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