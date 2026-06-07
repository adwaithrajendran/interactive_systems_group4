// Mock data for the Sprout app
// Provides the initial plant collection and the sidebar nav items
// In a real app these would come from a backend, but the assignment is frontend only

import type { Plant, NavItem } from '../types';

// Sidebar navigation items
// Only Dashboard and All Plants are wired up, the rest are placeholders for the demo
export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'grid', href: '#' },
  { label: 'All Plants', icon: 'leaf', href: '#' },
  { label: 'Schedule', icon: 'calendar', href: '#' },
  { label: 'Statistics', icon: 'bar-chart', href: '#' },
  { label: 'Settings', icon: 'settings', href: '#' },
];

// Helper to build dates relative to today
// Using relative dates means the demo always looks fresh when run, regardless of the calendar date
function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// Initial plant data
// The collection is chosen to cover the full watering frequency range from the scenario:
// short (basil, every 2 to 3 days) through to long (cactus, every 21 days)
// Health states are pre-set so the dashboard shows a mix of Overdue, Due Soon, and Ok on first load
export const plants: Plant[] = [
  {
    id: '1',
    name: 'Basil',
    species: 'Ocimum basilicum',
    waterIntervalDays: 3,
    lastWatered: daysFromNow(-5),
    nextWatering: daysFromNow(-2),
    room: 'Kitchen',
    owner: 'Sam',
    health: 'critical',
  },
  {
    id: '2',
    name: 'Pothos',
    species: 'Epipremnum aureum',
    waterIntervalDays: 7,
    lastWatered: daysFromNow(-3),
    nextWatering: daysFromNow(4),
    room: 'Kitchen',
    owner: 'Sam',
    health: 'healthy',
  },
  {
    id: '3',
    name: 'Snake Plant',
    species: 'Sansevieria trifasciata',
    waterIntervalDays: 14,
    lastWatered: daysFromNow(-14),
    nextWatering: daysFromNow(0),
    room: 'Hallway',
    owner: 'Priya',
    health: 'warning',
  },
  {
    id: '4',
    name: 'Peace Lily',
    species: 'Spathiphyllum',
    waterIntervalDays: 6,
    lastWatered: daysFromNow(-2),
    nextWatering: daysFromNow(4),
    room: 'Hallway',
    owner: 'Priya',
    health: 'healthy',
  },
  {
    id: '5',
    name: 'Fiddle Leaf Fig',
    species: 'Ficus lyrata',
    waterIntervalDays: 8,
    lastWatered: daysFromNow(-8),
    nextWatering: daysFromNow(0),
    room: 'Living Room',
    owner: 'Sam',
    health: 'warning',
  },
  {
    id: '6',
    name: 'Monstera',
    species: 'Monstera deliciosa',
    waterIntervalDays: 8,
    lastWatered: daysFromNow(-4),
    nextWatering: daysFromNow(4),
    room: 'Living Room',
    owner: 'Sam',
    health: 'healthy',
  },
  {
    id: '7',
    name: 'Aloe',
    species: 'Aloe vera',
    waterIntervalDays: 14,
    lastWatered: daysFromNow(-7),
    nextWatering: daysFromNow(7),
    room: 'Bedroom',
    owner: 'Sam',
    health: 'healthy',
  },
  {
    id: '8',
    name: 'ZZ Plant',
    species: 'Zamioculcas zamiifolia',
    waterIntervalDays: 21,
    lastWatered: daysFromNow(-10),
    nextWatering: daysFromNow(11),
    room: 'Bedroom',
    owner: 'Alex',
    health: 'healthy',
  },
  {
    id: '9',
    name: 'Cactus',
    species: 'Echinopsis pachanoi',
    waterIntervalDays: 21,
    lastWatered: daysFromNow(-22),
    nextWatering: daysFromNow(-1),
    room: 'Living Room',
    owner: 'Alex',
    health: 'critical',
  },
];