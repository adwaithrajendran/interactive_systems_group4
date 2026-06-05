// Plants grouped by their owner

import PlantCard from './PlantCard';
import type { Plant } from '../types';

interface Props {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onClick?: (plantId: string) => void;
}

export default function PlantsByOwner({ plants, onWater, onClick }: Props) {
  const grouped = plants.reduce<Record<string, Plant[]>>((acc, plant) => {
    if (!acc[plant.owner]) acc[plant.owner] = [];
    acc[plant.owner].push(plant);
    return acc;
  }, {});

  const sortedOwners = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([owner, ownerPlants]) => [
      owner,
      [...ownerPlants].sort((a, b) => a.name.localeCompare(b.name)),
    ] as [string, Plant[]]);

  return (
    <div>
      {sortedOwners.map(([owner, ownerPlants]) => (
        <div key={owner} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
              {owner}'s plants
            </h3>
            <span className="text-sm text-gray-400">({ownerPlants.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ownerPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} onWater={onWater} onClick={onClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}