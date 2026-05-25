import type { Stat } from '../types';

const iconSvgs: Record<string, JSX.Element> = {
  leaf: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  droplet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  alert: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

const colorMap: Record<string, string> = {
  leaf: 'text-emerald-400 bg-emerald-500/10',
  droplet: 'text-sky-400 bg-sky-500/10',
  check: 'text-emerald-400 bg-emerald-500/10',
  alert: 'text-rose-400 bg-rose-500/10',
};

interface StatisticsCardsProps {
  stats: Stat[];
}

export default function StatisticsCards({ stats }: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface-800 border border-surface-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${colorMap[stat.icon]}`}>
              {iconSvgs[stat.icon]}
            </div>
            <span className={`text-xs font-medium ${stat.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stat.change >= 0 ? '+' : ''}{stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
