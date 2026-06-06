// Plants sorted alphabetically by name

import PlantCard from './PlantCard';
import type { Plant } from '../types';

interface Props {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onClick?: (plantId: string) => void;
}

export default function PlantsByName({ plants, onWater, onClick }: Props) {
  const sorted = [...plants].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {sorted.map(plant => (
        <PlantCard key={plant.id} plant={plant} onWater={onWater} onClick={onClick} />
      ))}
    </div>
  );
}