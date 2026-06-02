// Type definitions for the Sprout app

export type HealthStatus = 'healthy' | 'warning' | 'critical';

export interface Plant {
  id: string;
  name: string;
  species: string;
  waterIntervalDays: number;
  lastWatered: string;
  nextWatering: string;
  room: string;
  owner: string;
  health: HealthStatus;
}

export type ReminderStatus = 'overdue' | 'today' | 'upcoming';

export interface Reminder {
  id: string;
  plantId: string;
  plantName: string;
  dueDate: string;
  status: ReminderStatus;
  species: string;
  owner: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

export type SortMode = 'location' | 'name' | 'owner';