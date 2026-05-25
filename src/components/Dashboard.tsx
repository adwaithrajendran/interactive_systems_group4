import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import PlantCard from './PlantCard';
import WateringReminders from './WateringReminders';
import StatisticsCards from './StatisticsCards';
import { plants, reminders, statistics, navItems } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface-950">
      <Sidebar items={navItems} />

      <div className="pl-16">
        <TopNavbar />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-100">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, Jamie! Your plants are looking good today.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-100">Your Plants</h2>
                <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {plants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <WateringReminders reminders={reminders} />
              <StatisticsCards stats={statistics} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
