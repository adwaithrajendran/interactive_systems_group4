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

export interface PlantFormData {
  name: string;
  species: string;
  location: string;
  room: string;
  owner: string;
  waterFrequency: number;
}

export type SortMode = 'location' | 'name' | 'owner';

export type AllPlantsSortMode = 'name' | 'name-desc' | 'location' | 'owner' | 'nextWatering' | 'status' | 'lastWatered';