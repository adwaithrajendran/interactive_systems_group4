import Sidebar from './Sidebar';
import { navItems } from '../data/mockData';
import { dueLabel, lastWateredLabel } from '../utils/plantStatus';
import type { Plant, HealthStatus } from '../types';

const statusStyles: Record<HealthStatus, { bg: string; text: string; label: string }> = {
  healthy: { bg: 'bg-emerald-600', text: 'text-white', label: 'Healthy' },
  warning: { bg: 'bg-amber-400', text: 'text-white', label: 'Due Soon' },
  critical: { bg: 'bg-rose-500', text: 'text-white', label: 'Overdue' },
};

interface PlantDetailsProps {
  plant: Plant;
  onWater: (plantId: string) => void;
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export default function PlantDetails({ plant, onWater, onBack, onNavigate }: PlantDetailsProps) {
  const status = statusStyles[plant.health];

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar items={navItems} currentPage="allPlants" onNavigate={onNavigate} />

      <div className="pl-52">
        <main className="p-5 bg-surface-950/60 min-h-screen space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to All Plants
          </button>

          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-emerald-700 shrink-0">
                {plant.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold text-white">{plant.name}</h1>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-lg text-gray-300 mt-1">{plant.species}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <DetailField label="Location" value={plant.room} />
              <DetailField label="Assigned Owner" value={plant.owner} />
              <DetailField label="Watering Frequency" value={`Every ${plant.waterIntervalDays} day${plant.waterIntervalDays === 1 ? '' : 's'}`} />
              <DetailField label="Last Watered" value={lastWateredLabel(plant)} />
              <DetailField label="Next Watering" value={dueLabel(plant)} />
            </div>

            <button
              onClick={() => onWater(plant.id)}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              Water Now
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-base text-white font-medium">{value}</p>
    </div>
  );
}
