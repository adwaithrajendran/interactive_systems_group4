export type HealthStatus = 'healthy' | 'warning' | 'critical';

export interface Plant {
  id: string;
  name: string;
  species: string;
  waterIntervalDays: number;
  lastWatered: string;
  nextWatering: string;
  health: HealthStatus;
  room: string;
  imageUrl?: string;
}

export type ReminderStatus = 'overdue' | 'today' | 'upcoming';

export interface Reminder {
  id: string;
  plantId: string;
  plantName: string;
  dueDate: string;
  status: ReminderStatus;
  species: string;
}

export interface Stat {
  label: string;
  value: number;
  icon: string;
  change: number;
  suffix?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}
