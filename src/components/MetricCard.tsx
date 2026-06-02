// A summary tile showing one number with an accent colour

interface MetricCardProps {
  label: string;
  value: number;
  accent: 'critical' | 'neutral' | 'healthy';
}

const accentStyles = {
  critical: { dot: 'bg-rose-500', text: 'text-rose-300' },
  neutral: { dot: 'bg-gray-400', text: 'text-white' },
  healthy: { dot: 'bg-emerald-500', text: 'text-emerald-300' },
};

export default function MetricCard({ label, value, accent }: MetricCardProps) {
  const style = accentStyles[accent];

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl px-6 py-5 flex items-center justify-between hover:border-surface-600 transition-colors">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${style.dot}`} />
        <h3 className="text-lg font-semibold text-gray-100">{label}</h3>
      </div>
      <span className={`text-5xl font-bold ${style.text}`}>{value}</span>
    </div>
  );
}