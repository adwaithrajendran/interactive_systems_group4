import type { Plant, HealthStatus } from '../types';

const healthColors: Record<HealthStatus, { dot: string; bg: string; label: string }> = {
  healthy: { dot: 'bg-emerald-400', bg: 'bg-emerald-500/10', label: 'Healthy' },
  warning: { dot: 'bg-amber-400', bg: 'bg-amber-500/10', label: 'Needs Care' },
  critical: { dot: 'bg-rose-400', bg: 'bg-rose-500/10', label: 'Critical' },
};

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function getDaysUntil(dateStr: string): string {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff < 0) return `${Math.abs(diff)} day(s) ago`;
  return `In ${diff} days`;
}

function getWaterStatusColor(dateStr: string): string {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'text-rose-400';
  if (diff <= 1) return 'text-amber-400';
  return 'text-emerald-400';
}

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const hc = healthColors[plant.health];

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl p-4 hover:border-surface-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${hc.bg} flex items-center justify-center text-sm font-bold ${hc.dot.replace('bg-', 'text-')}`}>
            {getInitials(plant.species)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-100">{plant.name}</h3>
            <p className="text-xs text-gray-500">{plant.species}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${hc.dot}`} />
          <span className="text-[11px] text-gray-500">{hc.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>{plant.room}</span>
        </div>
        <div className={`flex items-center gap-1.5 ${getWaterStatusColor(plant.nextWatering)}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span>{getDaysUntil(plant.nextWatering)}</span>
        </div>
      </div>
    </div>
  );
}
