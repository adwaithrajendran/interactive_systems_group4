import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { navItems } from '../data/mockData';
import { getPlantExtra } from '../data/plantDetailsMock';
import type { CareEvent } from '../data/plantDetailsMock';
import { dueLabel, lastWateredLabel } from '../utils/plantStatus';
import type { Plant, HealthStatus } from '../types';

const statusStyles: Record<HealthStatus, { bg: string; text: string; label: string }> = {
  healthy: { bg: 'bg-emerald-600', text: 'text-white', label: 'Healthy' },
  warning: { bg: 'bg-amber-400', text: 'text-white', label: 'Due Soon' },
  critical: { bg: 'bg-rose-500', text: 'text-white', label: 'Overdue' },
};

const eventIcons: Record<CareEvent['type'], JSX.Element> = {
  watered: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  fertilized: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 6 4 10 4 14a8 8 0 0 0 16 0c0-4-4-8-8-12z" />
    </svg>
  ),
  repotted: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  pruned: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4v7" />
      <path d="M4 4l7 7" />
      <path d="M13 20h7v-7" />
      <path d="M20 20l-7-7" />
    </svg>
  ),
};

const eventColors: Record<CareEvent['type'], string> = {
  watered: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
  fertilized: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
  repotted: 'bg-amber-400/20 border-amber-400 text-amber-400',
  pruned: 'bg-rose-500/20 border-rose-500 text-rose-400',
};

interface PlantDetailsProps {
  plant: Plant;
  onWater: (plantId: string) => void;
  sourcePage: 'dashboard' | 'allPlants';
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function relativeDate(dateStr: string): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

export default function PlantDetails({ plant, onWater, sourcePage, onBack, onNavigate }: PlantDetailsProps) {
  const status = statusStyles[plant.health];
  const info = getPlantExtra(plant);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const backLabel = sourcePage === 'dashboard' ? 'Back to Dashboard' : 'Back to All Plants';

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar items={navItems} currentPage="" onNavigate={onNavigate} />

      <div className="pl-52">
        <main className="p-6 bg-surface-950/60 min-h-screen space-y-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {backLabel}
          </button>

          {/* Section 1 – Plant Summary Card */}
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-emerald-700 shrink-0">
                {plant.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-white">{plant.name}</h1>
                <p className="text-base text-gray-300 mt-0.5">{plant.species}</p>

                <div className="flex items-center gap-5 mt-2 text-sm text-gray-400">
                  <span>Last {lastWateredLabel(plant)}</span>
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Streak: {info.streak} successful waterings
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-700 text-gray-200">
                    {plant.room}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-700 text-gray-200">
                    Every {plant.waterIntervalDays} day{plant.waterIntervalDays === 1 ? '' : 's'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
              </div>

              {/* Three-dot actions menu */}
              <div ref={menuRef} className="relative shrink-0 self-start">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-lg hover:bg-surface-700 text-gray-400 hover:text-white transition-colors"
                  title="More actions"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-surface-800 border border-surface-700 rounded-lg shadow-xl z-20 py-1">
                    <button
                      onClick={() => { onWater(plant.id); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                      Water Now
                    </button>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8 6 4 10 4 14a8 8 0 0 0 16 0c0-4-4-8-8-12z" />
                      </svg>
                      Log Fertilising
                    </button>
                    <button
                      onClick={() => setMenuOpen(false)}
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
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-surface-700 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                      </svg>
                      Edit Plant
                    </button>
                    <button
                      onClick={() => setMenuOpen(false)}
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

            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-surface-700">
              <button
                onClick={() => onWater(plant.id)}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                Water Now
              </button>
              <button className="px-5 py-2.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-gray-200 text-sm font-semibold transition-colors border border-surface-700">
                View All History
              </button>
            </div>
          </section>

          {/* Section 2 – Plant Information */}
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold text-white mb-4">About the Plant</h2>
                <div className="space-y-3">
                  <InfoRow label="Origin" value={info.origin} />
                  <InfoRow label="Soil" value={info.soil} />
                  <InfoRow label="Light" value={info.light} />
                  <InfoRow label="Temperature" value={info.temperature} />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Tips</h2>
                <ul className="space-y-2.5">
                  {info.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-emerald-400 mt-0.5 shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 – Care History Timeline */}
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-5">Care History</h2>
            <div className="space-y-0">
              {info.careEvents.map((event, i) => {
                const isLast = i === info.careEvents.length - 1;
                return (
                  <div key={event.id} className="relative flex gap-4 pb-5 last:pb-0">
                    {!isLast && (
                      <div className="absolute left-[15px] top-5 bottom-0 w-0.5 bg-surface-600" />
                    )}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${eventColors[event.type]}`}>
                      {eventIcons[event.type]}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-white capitalize">{event.type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">By {event.user}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{relativeDate(event.exactDate)} · {formatDate(event.exactDate)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
      <p className="text-sm text-gray-200">{value}</p>
    </div>
  );
}
