// Top level app component
// Owns plant data, the toast stack, and the confirmation flow

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ToastStack from './components/ToastStack';
import ConfirmDialog from './components/ConfirmDialog';
import { plants as initialPlants } from './data/mockData';
import type {Plant, PlantFormData} from './types';
import AddPlant from './components/AddPlant';

// Shape of a single toast in the stack
interface ToastItem {
  id: string;
  message: string;
  onUndo: () => void;
}

// Snapshot used to undo a watering
interface WateringSnapshot {
  plantId: string;
  previousState: Pick<Plant, 'lastWatered' | 'nextWatering' | 'health'>;
}

// Maximum number of toasts shown at once
const MAX_TOASTS = 4;

function App() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'addPlant'>('dashboard');

  // Stack of toasts, newest at the end
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Confirmation dialog state
  const [confirm, setConfirm] = useState<{
    plantName: string;
    onConfirm: () => void;
  } | null>(null);

  // Check whether a plant was watered very recently
  const wateredRecently = (plant: Plant): boolean => {
    const now = new Date();
    const last = new Date(plant.lastWatered);
    const hoursSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    return plant.health === 'healthy' && hoursSince < 24;
  };

  // Perform the actual state update for a watering
  // Returns a snapshot so the action can be undone
  const performWatering = (plantId: string): WateringSnapshot | null => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return null;

    const snapshot: WateringSnapshot = {
      plantId,
      previousState: {
        lastWatered: plant.lastWatered,
        nextWatering: plant.nextWatering,
        health: plant.health,
      },
    };

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const next = new Date(today);
    next.setDate(next.getDate() + plant.waterIntervalDays);

    setPlants(currentPlants =>
      currentPlants.map(p =>
        p.id === plantId
          ? {
              ...p,
              lastWatered: todayStr,
              nextWatering: next.toISOString().split('T')[0],
              health: 'healthy',
            }
          : p
      )
    );

    return snapshot;
  };

  // Restore a plant to a previous state, used for undo
  const undoWatering = (snapshot: WateringSnapshot) => {
    setPlants(currentPlants =>
      currentPlants.map(p =>
        p.id === snapshot.plantId
          ? {
              ...p,
              ...snapshot.previousState,
            }
          : p
      )
    );
  };

  // Add a toast to the stack, removing the oldest if we hit the cap
  const pushToast = (plantName: string, snapshot: WateringSnapshot) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = {
      id,
      message: `Watered ${plantName}`,
      onUndo: () => {
        undoWatering(snapshot);
        removeToast(id);
      },
    };

    setToasts(current => {
      const next = [...current, newToast];
      // Drop oldest if we exceed the cap
      if (next.length > MAX_TOASTS) {
        return next.slice(next.length - MAX_TOASTS);
      }
      return next;
    });
  };

  // Remove a specific toast from the stack
  const removeToast = (id: string) => {
    setToasts(current => current.filter(t => t.id !== id));
  };

  // Main entry point called by any Water button in the UI
  const logWatering = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    // If the plant is healthy and was just watered, ask first
    if (wateredRecently(plant)) {
      setConfirm({
        plantName: plant.name,
        onConfirm: () => {
          const snapshot = performWatering(plantId);
          setConfirm(null);
          if (snapshot) pushToast(plant.name, snapshot);
        },
      });
      return;
    }

    // Otherwise water immediately
    const snapshot = performWatering(plantId);
    if (snapshot) pushToast(plant.name, snapshot);
  };

  const addPlant = (formData: PlantFormData) => {
  const today = new Date();
  const next = new Date(today);
  next.setDate(next.getDate() + formData.waterFrequency);

  const newPlant: Plant = {
    ...formData,
    id: crypto.randomUUID(),
    health: 'healthy',
    lastWatered: today.toISOString().split('T')[0],
    nextWatering: next.toISOString().split('T')[0],
    waterIntervalDays: formData.waterFrequency,
  };

  setPlants(prev => [...prev, newPlant]);
  setCurrentPage('dashboard');
};

if (currentPage === 'addPlant') {
  return (
    <AddPlant
      owners={Array.from(new Set(plants.map(p => p.owner))).sort()}
      onAdd={addPlant}
      onCancel={() => setCurrentPage('dashboard')}
    />
  );
}

  return (
    <>
      <Dashboard plants={plants} onWater={logWatering} onAddPlant={() => setCurrentPage('addPlant')} />

      {/* Toast stack in the bottom right */}
      <ToastStack toasts={toasts} onDismiss={removeToast} />

      {/* Confirmation dialog */}
      {confirm && (
        <ConfirmDialog
          plantName={confirm.plantName}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}

export default App;