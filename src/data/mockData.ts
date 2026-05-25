import type { Plant, Reminder, Stat, NavItem } from '../types';

export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'grid', href: '#', active: true },
  { label: 'My Plants', icon: 'leaf', href: '#' },
  { label: 'Schedule', icon: 'calendar', href: '#' },
  { label: 'Statistics', icon: 'bar-chart', href: '#' },
  { label: 'Settings', icon: 'settings', href: '#' },
];

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Oliver',
    species: 'Monstera Deliciosa',
    waterIntervalDays: 7,
    lastWatered: '2026-05-19',
    nextWatering: '2026-05-26',
    health: 'healthy',
    room: 'Living Room',
  },
  {
    id: '2',
    name: 'Sylvester',
    species: 'Snake Plant',
    waterIntervalDays: 14,
    lastWatered: '2026-05-12',
    nextWatering: '2026-05-26',
    health: 'healthy',
    room: 'Bedroom',
  },
  {
    id: '3',
    name: 'Poppy',
    species: 'Golden Pothos',
    waterIntervalDays: 5,
    lastWatered: '2026-05-22',
    nextWatering: '2026-05-27',
    health: 'warning',
    room: 'Bathroom',
  },
  {
    id: '4',
    name: 'Figgy',
    species: 'Fiddle Leaf Fig',
    waterIntervalDays: 7,
    lastWatered: '2026-05-18',
    nextWatering: '2026-05-25',
    health: 'critical',
    room: 'Office',
  },
  {
    id: '5',
    name: 'Ziggy',
    species: 'ZZ Plant',
    waterIntervalDays: 21,
    lastWatered: '2026-05-05',
    nextWatering: '2026-05-26',
    health: 'healthy',
    room: 'Hallway',
  },
  {
    id: '6',
    name: 'Vera',
    species: 'Aloe Vera',
    waterIntervalDays: 14,
    lastWatered: '2026-05-23',
    nextWatering: '2026-06-06',
    health: 'healthy',
    room: 'Kitchen',
  },
];

export const reminders: Reminder[] = [
  {
    id: 'r1',
    plantId: '4',
    plantName: 'Figgy',
    species: 'Fiddle Leaf Fig',
    dueDate: '2026-05-25',
    status: 'overdue',
  },
  {
    id: 'r2',
    plantId: '1',
    plantName: 'Oliver',
    species: 'Monstera Deliciosa',
    dueDate: '2026-05-26',
    status: 'today',
  },
  {
    id: 'r3',
    plantId: '2',
    plantName: 'Sylvester',
    species: 'Snake Plant',
    dueDate: '2026-05-26',
    status: 'today',
  },
  {
    id: 'r4',
    plantId: '5',
    plantName: 'Ziggy',
    species: 'ZZ Plant',
    dueDate: '2026-05-26',
    status: 'today',
  },
  {
    id: 'r5',
    plantId: '3',
    plantName: 'Poppy',
    species: 'Golden Pothos',
    dueDate: '2026-05-27',
    status: 'upcoming',
  },
];

export const statistics: Stat[] = [
  { label: 'Total Plants', value: 6, icon: 'leaf', change: 2, suffix: 'new this month' },
  { label: 'Watered Today', value: 0, icon: 'droplet', change: -1, suffix: 'vs yesterday' },
  { label: 'Healthy', value: 4, icon: 'check', change: 1, suffix: 'from last week' },
  { label: 'Needs Attention', value: 2, icon: 'alert', change: 1, suffix: 'overdue plants' },
];
