import { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import PlantCard from './PlantCard';
import PlantsByLocation from './PlantsByLocation';
import PlantsByOwner from './PlantsByOwner';
import PlantsByWateringDate from './PlantsByWateringDate';
import { navItems } from '../data/mockData';
import type { Plant, AllPlantsSortMode } from '../types';

interface AllPlantsProps {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onAddPlant: () => void;
  onViewPlant: (plantId: string) => void;
  onNavigate?: (page: string) => void;
}

const sortOptions: { label: string; value: AllPlantsSortMode }[] = [
  { label: 'Name (A–Z)', value: 'name' },
  { label: 'Name (Z–A)', value: 'name-desc' },
  { label: 'Location', value: 'location' },
  { label: 'Owner', value: 'owner' },
  { label: 'Next Watering', value: 'nextWatering' },
];

export default function AllPlants({ plants, onWater, onAddPlant, onViewPlant, onNavigate }: AllPlantsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<AllPlantsSortMode>('name');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return plants;
    return plants.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q)
    );
  }, [plants, searchQuery]);

  const sorted = useMemo(() => {
    if (sortMode !== 'name' && sortMode !== 'name-desc') return [];
    const list = [...filtered];
    if (sortMode === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [filtered, sortMode]);

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar items={navItems} currentPage="allPlants" onNavigate={onNavigate} />

      <div className="pl-52">
        <main className="p-5 bg-surface-950/60 min-h-screen space-y-4">
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-5">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">All Plants</h1>
                <span className="px-3 py-1 rounded-full bg-surface-700 text-sm text-gray-300 font-medium">
                  {plants.length} total
                </span>
              </div>
              <button
                onClick={onAddPlant}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Plant
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center flex-1 max-w-md bg-surface-800 border border-surface-700 rounded-lg px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 mr-2 shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, species, or location..."
                  className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-gray-400 hover:text-white transition-colors shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className="text-sm text-gray-300 mr-1 font-medium">Sort by:</span>
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortMode(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortMode === opt.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-surface-800 text-gray-200 hover:text-white border border-surface-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {searchQuery.trim() && (
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4 px-1">
                <div className="text-sm text-emerald-200">
                  Showing results for{' '}
                  <span className="font-semibold text-white">"{searchQuery}"</span>
                  {' '}—{' '}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-200 hover:text-white transition-colors underline"
                  >
                    Clear
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                  {filtered.length} match{filtered.length === 1 ? '' : 'es'}
                </span>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-gray-200">
                  {plants.length === 0
                    ? 'No plants found. Add your first plant to get started.'
                    : 'No plants match your search'}
                </p>
                {plants.length === 0 && (
                  <button
                    onClick={onAddPlant}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Your First Plant
                  </button>
                )}
              </div>
            )}

            {filtered.length > 0 && (sortMode === 'name' || sortMode === 'name-desc') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sorted.map(plant => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    onWater={onWater}
                    onClick={onViewPlant}
                  />
                ))}
              </div>
            )}

            {filtered.length > 0 && sortMode === 'location' && (
              <PlantsByLocation plants={filtered} onWater={onWater} onClick={onViewPlant} />
            )}

            {filtered.length > 0 && sortMode === 'owner' && (
              <PlantsByOwner plants={filtered} onWater={onWater} onClick={onViewPlant} />
            )}

            {filtered.length > 0 && sortMode === 'nextWatering' && (
              <PlantsByWateringDate plants={filtered} onWater={onWater} onClick={onViewPlant} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
