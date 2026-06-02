// Helper functions for plant status and timing

import type { Plant, ReminderStatus } from '../types';

// How many days until this plant needs water next
// Negative numbers mean the plant is overdue
export function daysUntilNextWatering(plant: Plant): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next = new Date(plant.nextWatering);
  next.setHours(0, 0, 0, 0);
  return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Friendly label for how long ago this plant was watered
export function lastWateredLabel(plant: Plant): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(plant.lastWatered);
  last.setHours(0, 0, 0, 0);
  const days = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'watered today';
  if (days === 1) return 'watered yesterday';
  return `watered ${days} days ago`;
}

// Friendly label for the next watering due date, used on cards
export function dueLabel(plant: Plant): string {
  const daysUntil = daysUntilNextWatering(plant);
  if (daysUntil < 0) return `${Math.abs(daysUntil)} day${Math.abs(daysUntil) === 1 ? '' : 's'} overdue`;
  if (daysUntil === 0) return 'due today';
  if (daysUntil === 1) return 'due tomorrow';
  return `due in ${daysUntil} days`;
}

// Translate a plant's health into a reminder bucket for the Water Today list
export function reminderBucket(plant: Plant): ReminderStatus {
  if (plant.health === 'critical') return 'overdue';
  if (plant.health === 'warning') return 'today';
  return 'upcoming';
}

// Was this plant watered today
export function isWateredToday(plant: Plant): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(plant.lastWatered);
  last.setHours(0, 0, 0, 0);
  return today.getTime() === last.getTime();
}