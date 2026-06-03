import { useState } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import { navItems } from '../data/mockData';
import type { PlantFormData } from '../types';
 
const SPECIES_OPTIONS = [
  'Monstera Deliciosa',
  'Pothos',
  'Fiddle Leaf Fig',
  'Snake Plant',
  'Peace Lily',
  'ZZ Plant',
  'Aloe Vera',
  'Spider Plant',
  'Custom',
];
 
interface AddPlantProps {
  owners: string[];
  onAdd: (plant: PlantFormData) => void;
  onCancel: () => void;
}
 
export default function AddPlant({ owners, onAdd, onCancel }: AddPlantProps) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [room, setRoom] = useState('');
  const [owner, setOwner] = useState('');
  const [waterFrequency, setWaterFrequency] = useState(3);
  const [error, setError] = useState('');
 
  const handleAdd = () => {
    if (!name.trim() || !species || !room.trim() || !owner) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onAdd({ name, species, room, owner, waterFrequency });
  };
 
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar items={navItems} />
 
      <div className="pl-56">
        <TopNavbar searchQuery="" onSearchChange={() => {}} />
 
        <main className="p-6 bg-surface-950/60 min-h-screen">
 
          {/* Title */}
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-5 mb-6 text-center">
            <h1 className="text-3xl font-bold text-white">Add New Plant</h1>
          </section>
 
          {/* Form */}
          <section className="bg-surface-900/70 border border-surface-700 rounded-2xl p-8 max-auto">
 
            {/* Plant Name */}
            <div className="mb-5">
              <label className="block text-white font-semibold mb-2">Plant Name</label>
              <input
                type="text"
                placeholder="Enter Plant Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
 
            {/* Species */}
            <div className="mb-1">
              <label className="block text-white font-semibold mb-2">Species</label>
              <select
                value={species}
                onChange={e => setSpecies(e.target.value)}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" disabled>Enter Plant Species</option>
                {SPECIES_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-emerald-400 font-semibold mb-5">
              choose from the list, or select "Custom" for an unlisted species
            </p>
 
            {/* room */}
            <div className="mb-5">
              <label className="block text-white font-semibold mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter Location for the Plant"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
 
            {/* Owner */}
            <div className="mb-5">
              <label className="block text-white font-semibold mb-2">Owner</label>
              <select
                value={owner}
                onChange={e => setOwner(e.target.value)}
                className="w-full bg-surface-800 border border-surface-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" disabled>Assign to household member</option>
                {owners.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
 
            {/* Water Frequency */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">Water Frequency</label>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-surface-800 border border-surface-700 rounded-lg w-12 h-9 flex items-center justify-center text-white font-semibold text-sm">
                  {waterFrequency}
                </div>
                <span className="text-white font-semibold text-sm">days between waterings</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={waterFrequency}
                onChange={e => setWaterFrequency(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-white text-xs font-semibold mt-1">
                <span>1 Day</span>
                <span>30 Days</span>
              </div>
            </div>
 
            {error && (
              <p className="text-red-400 text-sm font-semibold mb-4">{error}</p>
            )}
 
            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleAdd}
                className="px-8 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
              >
                Add Plant
              </button>
              <button
                onClick={onCancel}
                className="px-7 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
 
          </section>
        </main>
      </div>
    </div>
  );
}