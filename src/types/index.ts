// Type definitions used across the Sprout app
// Keeping these in one file makes it easy to see how data flows between components

// Health states a plant can be in
// Drives the colour pill on cards and in summary tiles
export type HealthStatus = 'healthy' | 'warning' | 'critical';

// Core plant record stored in app state
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

// Reminder bucket used by the Water Today panel and notification bell
export type ReminderStatus = 'overdue' | 'today' | 'upcoming';

// One row in the Water Today panel
// Derived from a Plant, not stored separately
export interface Reminder {
  id: string;
  plantId: string;
  plantName: string;
  dueDate: string;
  status: ReminderStatus;
  species: string;
  owner: string;
}

// Sidebar nav item
export interface NavItem {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

// Data the Add Plant form sends back when the user submits
// App.tsx fills in the id, dates, and starting health when saving
export interface PlantFormData {
  name: string;
  species: string;
  room: string;
  owner: string;
  waterFrequency: number;
}

// Sort options on the dashboard
export type SortMode = 'location' | 'name' | 'owner';

// Sort options on the All Plants screen
export type AllPlantsSortMode = 'name' | 'name-desc' | 'nextWatering' | 'lastWatered';