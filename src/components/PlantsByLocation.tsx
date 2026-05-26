import { useState } from 'react';
import type { Plant, HealthStatus } from '../types';

const healthDot: Record<HealthStatus, string> = {
  healthy: 'bg-emerald-400',
  warning: 'bg-amber-400',
  critical: 'bg-rose-400',
};

const roomIcons: Record<string, JSX.Element> = {
  'Living Room': (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Bedroom: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
    </svg>
  ),
  Bathroom: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" /><path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" />
    </svg>
  ),
  Office: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Hallway: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1-9v-6" /><path d="M21 21l-1-9v-6" /><path d="M7 3h10" /><path d="M3 21h18" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
    </svg>
  ),
  Kitchen: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V2" /><path d="M12 2v20" /><path d="M2 12h20" /><path d="M6 12v8" /><path d="M18 12v8" />
    </svg>
  ),
  Balcony: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" /><path d="M3 10h18" /><path d="M5 6V3" /><path d="M9 6V3" /><path d="M13 6V3" /><path d="M17 6V3" /><path d="M7 10v11" /><path d="M17 10v11" />
    </svg>
  ),
};

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

interface PlantsByLocationProps {
  plants: Plant[];
}

export default function PlantsByLocation({ plants }: PlantsByLocationProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(plants.map(p => p.room)));

  const grouped = plants.reduce<Record<string, Plant[]>>((acc, plant) => {
    if (!acc[plant.room]) acc[plant.room] = [];
    acc[plant.room].push(plant);
    return acc;
  }, {});

  const sortedRooms = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

  const toggle = (room: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(room)) next.delete(room);
      else next.add(room);
      return next;
    });
  };

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-100 mb-4">
        Plants by Location
      </h2>

      <div className="space-y-2">
        {sortedRooms.map(([room, roomPlants]) => {
          const open = expanded.has(room);
          return (
            <div key={room} className="rounded-lg border border-surface-700 overflow-hidden">
              <button
                onClick={() => toggle(room)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-surface-700/50 hover:bg-surface-700 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{roomIcons[room] || roomIcons['Living Room']}</span>
                  <span className="text-sm font-medium text-gray-200">{room}</span>
                  <span className="text-[11px] text-gray-500 bg-surface-600 px-1.5 py-0.5 rounded-full">
                    {roomPlants.length}
                  </span>
                </div>
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
                  className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {open && (
                <div className="px-3 py-2.5 overflow-x-auto">
                  <div className="flex gap-2 min-w-max">
                    {roomPlants.map(plant => (
                      <div
                        key={plant.id}
                        className="flex items-center gap-2 bg-surface-600/50 rounded-full px-3 py-1.5 border border-surface-600 shrink-0"
                      >
                        <div className={`w-5 h-5 rounded-full ${plant.health === 'healthy' ? 'bg-emerald-500/20' : plant.health === 'warning' ? 'bg-amber-500/20' : 'bg-rose-500/20'} flex items-center justify-center text-[10px] font-bold ${healthDot[plant.health].replace('bg-', 'text-')}`}>
                          {getInitials(plant.name)}
                        </div>
                        <span className="text-xs font-medium text-gray-200 whitespace-nowrap">{plant.name}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${healthDot[plant.health]}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
