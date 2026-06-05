// Plants grouped by their room

import PlantCard from './PlantCard';
import type { Plant } from '../types';

interface Props {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onClick?: (plantId: string) => void;
}

export default function PlantsByLocation({ plants, onWater, onClick }: Props) {
  const grouped = plants.reduce<Record<string, Plant[]>>((acc, plant) => {
    if (!acc[plant.room]) acc[plant.room] = [];
    acc[plant.room].push(plant);
    return acc;
  }, {});

  const sortedRooms = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([room, roomPlants]) => [
      room,
      [...roomPlants].sort((a, b) => a.name.localeCompare(b.name)),
    ] as [string, Plant[]]);

  return (
    <div>
      {sortedRooms.map(([room, roomPlants]) => (
        <div key={room} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
              {room}
            </h3>
            <span className="text-sm text-gray-400">({roomPlants.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roomPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} onWater={onWater} onClick={onClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}