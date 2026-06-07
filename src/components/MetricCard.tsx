// Summary tile shown in the dashboard, eg Needs Water 3
// The accent prop colours the number based on what it represents

interface MetricCardProps {
  label: string;
  value: number;
  accent: 'critical' | 'neutral' | 'healthy';
}

// Colour theme per accent type
const accentStyles = {
  critical: 'text-rose-300',
  neutral: 'text-white',
  healthy: 'text-emerald-300',
};

export default function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl px-7 py-6 flex items-center justify-between hover:border-surface-600 transition-colors">
      <h3 className="text-2xl font-bold text-white">{label}</h3>
      <span className={`text-6xl font-bold ${accentStyles[accent]}`}>{value}</span>
    </div>
  );
}