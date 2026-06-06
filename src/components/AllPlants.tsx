import { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { navItems } from '../data/mockData';
import { lastWateredLabel } from '../utils/plantStatus';
import type { Plant, AllPlantsSortMode, HealthStatus } from '../types';

const statusBadge: Record<HealthStatus, { bg: string; text: string; label: string }> = {
  healthy: { bg: 'bg-emerald-600', text: 'text-white', label: 'OK' },
  warning: { bg: 'bg-amber-400', text: 'text-white', label: 'Due Soon' },
  critical: { bg: 'bg-rose-500', text: 'text-white', label: 'Overdue' },
};

interface AllPlantsProps {
  plants: Plant[];
  onWater: (plantId: string) => void;
  onAddPlant: () => void;
  onViewPlant: (plantId: string) => void;
  onNavigate?: (page: string) => void;
}

const sortOptions: { label: string; value: AllPlantsSortMode }[] = [
  { label: 'Plant Name (A–Z)', value: 'name' },
  { label: 'Plant Name (Z–A)', value: 'name-desc' },
  { label: 'Location', value: 'location' },
  { label: 'Status', value: 'status' },
  { label: 'Last Watered', value: 'lastWatered' },
  { label: 'Next Watering', value: 'nextWatering' },
];

const statusFilters: { label: string; value: 'all' | HealthStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Overdue', value: 'critical' },
  { label: 'Due Soon', value: 'warning' },
  { label: 'OK', value: 'healthy' },
];

type SortDropdownProps = {
  value: AllPlantsSortMode;
  onChange: (v: AllPlantsSortMode) => void;
  options: { label: string; value: AllPlantsSortMode }[];
};

function SortDropdown({ value, onChange, options }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const currentLabel = options.find(o => o.value === value)?.label || options[0].label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-800 border border-surface-700 text-sm text-gray-200 hover:text-white transition-colors min-w-[180px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-gray-400 shrink-0">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        <span className="flex-1 text-left">{currentLabel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-gray-400 shrink-0">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-full bg-surface-800 border border-surface-700 rounded-lg shadow-xl z-20 py-1">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${value === opt.value ? 'text-emerald-400 bg-emerald-600/10' : 'text-gray-200 hover:bg-surface-700'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AllPlants({ plants, onWater, onAddPlant, onViewPlant, onNavigate }: AllPlantsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<AllPlantsSortMode>('name');
  const [statusFilter, setStatusFilter] = useState<'all' | HealthStatus>('all');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenuId) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openMenuId]);

  const searchFiltered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return plants;
    return plants.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q)
    );
  }, [plants, searchQuery]);

  const statusFiltered = useMemo(() => {
    if (statusFilter === 'all') return searchFiltered;
    return searchFiltered.filter(p => p.health === statusFilter);
  }, [searchFiltered, statusFilter]);

  const displayed = useMemo(() => {
    let list = locationFilter
      ? statusFiltered.filter(p => p.room === locationFilter)
      : [...statusFiltered];

    switch (sortMode) {
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'location':
        list.sort((a, b) => a.room.localeCompare(b.room) || a.name.localeCompare(b.name));
        break;
      case 'status': {
        const order: Record<HealthStatus, number> = { critical: 0, warning: 1, healthy: 2 };
        list.sort((a, b) => order[a.health] - order[b.health] || a.name.localeCompare(b.name));
        break;
      }
      case 'lastWatered':
        list.sort((a, b) => b.lastWatered.localeCompare(a.lastWatered) || a.name.localeCompare(b.name));
        break;
      case 'nextWatering':
        list.sort((a, b) => a.nextWatering.localeCompare(b.nextWatering) || a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [statusFiltered, locationFilter, sortMode]);

  const statusCounts = useMemo(() => {
    const all = searchFiltered.length;
    const critical = searchFiltered.filter(p => p.health === 'critical').length;
    const warning = searchFiltered.filter(p => p.health === 'warning').length;
    const healthy = searchFiltered.filter(p => p.health === 'healthy').length;
    return { all, critical, warning, healthy };
  }, [searchFiltered]);

  const locations = useMemo(() => {
    return Array.from(new Set(plants.map(p => p.room))).sort();
  }, [plants]);

  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    searchFiltered.forEach(p => { counts[p.room] = (counts[p.room] || 0) + 1; });
    return counts;
  }, [searchFiltered]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setLocationFilter(null);
  };

  const hasActiveFilters = searchQuery.trim() || statusFilter !== 'all' || locationFilter !== null;

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar items={navItems} currentPage="allPlants" onNavigate={onNavigate} />

      <div className="pl-52">
        <main className="p-5 bg-surface-950/60 min-h-screen space-y-4">
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-5">
            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
              <div>
                <h1 className="text-3xl font-bold text-white">All Plants</h1>
                <p className="text-sm text-gray-400 mt-0.5">{plants.length} Plants across your Home</p>
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

            {/* ── Search + Sort row ── */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="flex items-center flex-1 min-w-[200px] max-w-sm bg-surface-800 border border-surface-700 rounded-lg px-3 py-2">
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
                  placeholder="Search by plant name..."
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
              <SortDropdown value={sortMode} onChange={setSortMode} options={sortOptions} />
            </div>

            {/* ── Status filter chips ── */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {statusFilters.map(f => {
                const count = statusCounts[f.value];
                const isActive = statusFilter === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setStatusFilter(f.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-surface-800 text-gray-300 hover:text-white border border-surface-700'
                    }`}
                  >
                    {f.label}
                    <span className={`ml-1.5 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* ── Location filter chips ── */}
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <button
                onClick={() => setLocationFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  locationFilter === null
                    ? 'bg-emerald-600 text-white'
                    : 'bg-surface-800 text-gray-300 hover:text-white border border-surface-700'
                }`}
              >
                All Locations
              </button>
              {locations.map(loc => {
                const count = locationCounts[loc] || 0;
                const isActive = locationFilter === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => setLocationFilter(loc)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-surface-800 text-gray-300 hover:text-white border border-surface-700'
                    }`}
                  >
                    {loc}
                    <span className={`ml-1.5 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* ── Active search banner ── */}
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
                <span className="text-sm text-gray-400">{displayed.length} match{displayed.length === 1 ? '' : 'es'}</span>
              </div>
            )}

            {/* ── Active filter clear-all ── */}
            {hasActiveFilters && displayed.length > 0 && (
              <div className="mb-3">
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-white transition-colors underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* ── Empty state ── */}
            {displayed.length === 0 && plants.length > 0 && (
              <div className="py-12 text-center">
                <p className="text-base text-gray-200">No plants match your filters</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search or filters
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {plants.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-gray-200">No plants found. Add your first plant to get started.</p>
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
              </div>
            )}

            {/* ── Table (desktop) ── */}
            {displayed.length > 0 && (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-700 text-left">
                        <th className="pb-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plant</th>
                        <th className="pb-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="pb-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                        <th className="pb-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Watered</th>
                        <th className="pb-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayed.map(plant => {
                        const badge = statusBadge[plant.health];
                        return (
                          <tr
                            key={plant.id}
                            onClick={() => onViewPlant(plant.id)}
                            className="border-b border-surface-700/60 hover:bg-surface-800/40 transition-colors cursor-pointer"
                          >
                            {/* Plant */}
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">
                                  {plant.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">{plant.name}</p>
                                  <p className="text-xs text-gray-500">{plant.species}</p>
                                </div>
                              </div>
                            </td>
                            {/* Location */}
                            <td className="py-3 pr-4 text-sm text-gray-300">{plant.room}</td>
                            {/* Schedule */}
                            <td className="py-3 pr-4 text-sm text-gray-300">
                              Every {plant.waterIntervalDays} day{plant.waterIntervalDays === 1 ? '' : 's'}
                            </td>
                            {/* Last Watered */}
                            <td className="py-3 pr-4 text-sm text-gray-300">{lastWateredLabel(plant)}</td>
                            {/* Status */}
                            <td className="py-3 pr-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                {badge.label}
                              </span>
                            </td>
                            {/* Actions */}
                            <td className="py-3 relative">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => { e.stopPropagation(); onWater(plant.id); }}
                                  className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-200 transition-colors"
                                  title="Water now"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                  </svg>
                                </button>
                                <div className="relative">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === plant.id ? null : plant.id); }}
                                    className="p-2 rounded-lg hover:bg-surface-700 text-gray-400 hover:text-white transition-colors"
                                    title="More actions"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="5" r="1" />
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="12" cy="19" r="1" />
                                    </svg>
                                  </button>
                                  {openMenuId === plant.id && (
                                    <div
                                      ref={menuRef}
                                      className="absolute right-0 top-full mt-1 w-44 bg-surface-800 border border-surface-700 rounded-lg shadow-xl z-20 py-1"
                                    >
                                      <button
                                        onClick={(e) => { e.stopPropagation(); onWater(plant.id); setOpenMenuId(null); }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                        </svg>
                                        Water Now
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M12 2C8 6 4 10 4 14a8 8 0 0 0 16 0c0-4-4-8-8-12z" />
                                        </svg>
                                        Log Fertilising
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        </svg>
                                        Log Repotting
                                      </button>
                                      <div className="border-t border-surface-700 my-1" />
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M11 4H4v7" />
                                          <path d="M4 4l7 7" />
                                          <path d="M13 20h7v-7" />
                                          <path d="M20 20l-7-7" />
                                        </svg>
                                        Edit Plant
                                      </button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-surface-700 transition-colors flex items-center gap-2"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="3 6 5 6 21 6" />
                                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                        Delete Plant
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-2">
                  {displayed.map(plant => {
                    const badge = statusBadge[plant.health];
                    return (
                      <div
                        key={plant.id}
                        onClick={() => onViewPlant(plant.id)}
                        className="bg-surface-800 border border-surface-700 rounded-lg p-3 hover:border-emerald-600/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">
                            {plant.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-white truncate">{plant.name}</p>
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 truncate">{plant.room} · Every {plant.waterIntervalDays} day{plant.waterIntervalDays === 1 ? '' : 's'}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{lastWateredLabel(plant)}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); onWater(plant.id); }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-xs font-semibold transition-colors"
                            >
                              Water
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === plant.id ? null : plant.id); }}
                              className="p-1.5 rounded-lg hover:bg-surface-700 text-gray-400 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
