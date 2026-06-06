// Main dashboard screen
// Default view shows greeting, summary and plants. Search mode hides everything
// except the search banner and results so the user can focus on finding plants.

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import MetricCard from './MetricCard';
import WaterTodayPanel from './WaterTodayPanel';
import PlantsByLocation from './PlantsByLocation';
import PlantsByName from './PlantsByName';
import PlantsByOwner from './PlantsByOwner';
import { navItems } from '../data/mockData';
import { reminderBucket } from '../utils/plantStatus';
import type { Plant, Reminder, SortMode } from '../types';

interface DashboardProps {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onAddPlant: () => void;
  onViewPlant: (plantId: string) => void;
  onNavigate?: (page: string) => void;
}

export default function Dashboard({ plants, onWater, onAddPlant, onViewPlant, onNavigate }: DashboardProps) {
  // Sort mode for the plants section
  const [sortMode, setSortMode] = useState<SortMode>('location');

  // Optional owner filter, null means show everyone
  const [ownerFilter, setOwnerFilter] = useState<string | null>(null);

  // Search query, narrows the visible plants when active
  const [searchQuery, setSearchQuery] = useState('');

  // True when the user is actively searching
  const isSearching = searchQuery.trim().length > 0;

  // Apply owner filter then search filter on top
  const visiblePlants = plants
    .filter(p => (ownerFilter ? p.owner === ownerFilter : true))
    .filter(p => {
      if (!isSearching) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q)
      );
    });

  // Summary numbers based on what is currently visible
  const totalPlants = visiblePlants.length;
  const healthyCount = visiblePlants.filter(p => p.health === 'healthy').length;
  const needsWaterCount = visiblePlants.filter(p => p.health !== 'healthy').length;

  // Water Today list for the main panel
  const waterTodayList: Reminder[] = visiblePlants
    .filter(p => p.health !== 'healthy')
    .map(p => ({
      id: `r-${p.id}`,
      plantId: p.id,
      plantName: p.name,
      species: p.species,
      dueDate: p.nextWatering,
      status: reminderBucket(p),
      owner: p.owner,
    }));

  // Notification bell uses the unfiltered list so it stays accurate
  // regardless of what the user has filtered down to
  const allReminders: Reminder[] = plants
    .filter(p => p.health !== 'healthy')
    .map(p => ({
      id: `r-${p.id}`,
      plantId: p.id,
      plantName: p.name,
      species: p.species,
      dueDate: p.nextWatering,
      status: reminderBucket(p),
      owner: p.owner,
    }));

  // Unique owners for the filter chips
  const owners = Array.from(new Set(plants.map(p => p.owner))).sort();

  // Greeting target follows the owner filter
  const greetingTarget = ownerFilter || 'Household';

  // Reset the dashboard to a clean state, called when the logo is clicked
  const resetDashboard = () => {
    setSearchQuery('');
    setOwnerFilter(null);
    setSortMode('location');
  };

  return (
    <div className="min-h-screen bg-transparent">
        <Sidebar items={navItems} currentPage="dashboard" onNavigate={onNavigate} onHomeClick={resetDashboard} />

      <div className="pl-52">
        <TopNavbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          reminders={allReminders}
          onWater={onWater}
        />

        <main className="p-5 bg-surface-950/60 min-h-screen space-y-4">
          {/* HEADER CARD: hidden entirely during search */}
          {!isSearching && (
            <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    Good Morning, {greetingTarget}
                  </h1>
                  <p className="text-base text-gray-300 mt-2">
                    {needsWaterCount > 0
                      ? `${needsWaterCount} plant${needsWaterCount === 1 ? '' : 's'} need${needsWaterCount === 1 ? 's' : ''} water today`
                      : 'All plants are looking good today.'}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={onAddPlant}
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Plant
                  </button>
              </div>
            </div>

              {/* Enhanced owner filter with avatars and counts */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-300 font-medium">Whose plants:</span>

                {/* Everyone chip */}
                <button
                  onClick={() => setOwnerFilter(null)}
                  className={`flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-sm font-medium transition-colors ${ownerFilter === null
                      ? 'bg-emerald-600 text-white'
                      : 'bg-surface-800 text-gray-200 hover:text-white hover:bg-surface-700 border border-surface-700'
                    }`}
                >
                  {/* Group icon for Everyone */}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${ownerFilter === null ? 'bg-white/20' : 'bg-surface-600'
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span>Everyone</span>
                  <span
                    className={`text-xs font-semibold ${ownerFilter === null ? 'text-white/80' : 'text-gray-400'
                      }`}
                  >
                    {plants.length}
                  </span>
                </button>

                {/* One chip per owner */}
                {owners.map(owner => {
                  const ownerCount = plants.filter(p => p.owner === owner).length;
                  const isActive = ownerFilter === owner;

                  return (
                    <button
                      key={owner}
                      onClick={() => setOwnerFilter(owner)}
                      className={`flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-surface-800 text-gray-200 hover:text-white hover:bg-surface-700 border border-surface-700'
                        }`}
                    >
                      {/* Initial avatar matches the badge style used on plant cards */}
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isActive ? 'bg-white text-emerald-700' : 'bg-surface-600 text-gray-100'
                          }`}
                      >
                        {owner.charAt(0)}
                      </span>
                      <span>{owner}</span>
                      <span
                        className={`text-xs font-semibold ${isActive ? 'text-white/80' : 'text-gray-400'
                          }`}
                      >
                        {ownerCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* SEARCH BANNER: shown only during search, replaces the header card */}
          {isSearching && (
            <div className="flex items-center justify-between flex-wrap gap-3 px-2">
              <div className="text-base text-emerald-200 inline-flex items-center gap-2">
                <span>
                  Showing results for{' '}
                  <span className="font-semibold text-white">"{searchQuery}"</span>
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-200 hover:text-white transition-colors underline"
                >
                  Clear
                </button>
              </div>
              <span className="text-sm text-gray-400">
                {visiblePlants.length} match{visiblePlants.length === 1 ? '' : 'es'}
              </span>
            </div>
          )}

          {/* SUMMARY CARD: hidden during search */}
          {!isSearching && (
            <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <MetricCard label="Needs Water" value={needsWaterCount} accent="critical" />
                  <MetricCard label="Total Plants" value={totalPlants} accent="neutral" />
                  <MetricCard label="Healthy" value={healthyCount} accent="healthy" />
                </div>

                <WaterTodayPanel reminders={waterTodayList} onWater={onWater} onViewPlant={onViewPlant} />
              </div>
            </section>
          )}

          {/* PLANTS CARD: always visible, this is the focus during search */}
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-white">
                {isSearching ? 'Search Results' : 'Your Plants'}
              </h2>
              {!isSearching && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300 mr-1 font-medium">Sort by:</span>
                  <SortButton
                    label="Location"
                    active={sortMode === 'location'}
                    onClick={() => setSortMode('location')}
                  />
                  <SortButton
                    label="Name"
                    active={sortMode === 'name'}
                    onClick={() => setSortMode('name')}
                  />
                  <SortButton
                    label="Owner"
                    active={sortMode === 'owner'}
                    onClick={() => setSortMode('owner')}
                  />
                </div>
              )}
            </div>

            {/* Empty state when search finds nothing */}
            {visiblePlants.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-base text-gray-200">No plants match your search</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try a different name, species, or room
                </p>
              </div>
            )}

            {/* During search, show a flat list sorted by name */}
            {visiblePlants.length > 0 && isSearching && (
              <PlantsByName plants={visiblePlants} onWater={onWater} onClick={onViewPlant} />
            )}

            {/* Otherwise show the user selected view */}
            {visiblePlants.length > 0 && !isSearching && sortMode === 'location' && (
              <PlantsByLocation plants={visiblePlants} onWater={onWater} onClick={onViewPlant} />
            )}
            {visiblePlants.length > 0 && !isSearching && sortMode === 'name' && (
              <PlantsByName plants={visiblePlants} onWater={onWater} onClick={onViewPlant} />
            )}
            {visiblePlants.length > 0 && !isSearching && sortMode === 'owner' && (
              <PlantsByOwner plants={visiblePlants} onWater={onWater} onClick={onViewPlant} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

// Sort toggle button
function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
          ? 'bg-emerald-600 text-white'
          : 'bg-surface-800 text-gray-200 hover:text-white border border-surface-700'
        }`}
    >
      {label}
    </button>
  );
}