import PlantCard from './PlantCard';
import { daysUntilNextWatering } from '../utils/plantStatus';
import type { Plant } from '../types';

interface Props {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onClick?: (plantId: string) => void;
}

const buckets: { label: string; key: string; test: (days: number) => boolean }[] = [
  { label: 'OVERDUE', key: 'overdue', test: (d) => d < 0 },
  { label: 'DUE TODAY', key: 'dueToday', test: (d) => d === 0 },
  { label: 'DUE THIS WEEK', key: 'dueThisWeek', test: (d) => d >= 1 && d <= 7 },
  { label: 'DUE LATER', key: 'dueLater', test: (d) => d > 7 },
];

export default function PlantsByWateringDate({ plants, onWater, onClick }: Props) {
  const grouped = buckets.map(bucket => {
    const items = plants
      .filter(p => bucket.test(daysUntilNextWatering(p)))
      .sort((a, b) => a.nextWatering.localeCompare(b.nextWatering));
    return { label: bucket.label, key: bucket.key, items };
  }).filter(g => g.items.length > 0);

  return (
    <div>
      {grouped.map(group => (
        <div key={group.key} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
              {group.label}
            </h3>
            <span className="text-sm text-gray-400">({group.items.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.items.map(plant => (
              <PlantCard key={plant.id} plant={plant} onWater={onWater} onClick={onClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
