// Top level app component
// Owns the plant data, the toast notification state, and the confirmation flow

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';
import ConfirmDialog from './components/ConfirmDialog';
import { plants as initialPlants } from './data/mockData';
import type { Plant } from './types';

// Shape of a snapshot used to undo a watering
interface WateringSnapshot {
  plantId: string;
  previousState: Pick<Plant, 'lastWatered' | 'nextWatering' | 'health'>;
}

function App() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

  // Toast notification state, null means no toast is showing
  const [toast, setToast] = useState<{
    message: string;
    onUndo: () => void;
  } | null>(null);

  // Confirmation dialog state, null means no dialog is showing
  const [confirm, setConfirm] = useState<{
    plantName: string;
    onConfirm: () => void;
  } | null>(null);

  // Check whether a plant was watered very recently
  // This is the trigger for the re-water confirmation
  const wateredRecently = (plant: Plant): boolean => {
    const now = new Date();
    const last = new Date(plant.lastWatered);
    const hoursSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    return plant.health === 'healthy' && hoursSince < 24;
  };

  // Actually log the watering, no checks
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

  // Restore a plant to its previous state, used for undo
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

  // Show a toast notification for a watering action
  const showWateringToast = (plantName: string, snapshot: WateringSnapshot) => {
    setToast({
      message: `Watered ${plantName}`,
      onUndo: () => {
        undoWatering(snapshot);
        setToast(null);
      },
    });
  };

  // Main entry point called by any Water button in the UI
  // Decides whether to ask for confirmation or just go ahead
  const logWatering = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    // Healthy plant watered recently, ask for confirmation
    if (wateredRecently(plant)) {
      setConfirm({
        plantName: plant.name,
        onConfirm: () => {
          const snapshot = performWatering(plantId);
          setConfirm(null);
          if (snapshot) showWateringToast(plant.name, snapshot);
        },
      });
      return;
    }

    // Otherwise water immediately
    const snapshot = performWatering(plantId);
    if (snapshot) showWateringToast(plant.name, snapshot);
  };

  return (
    <>
      <Dashboard plants={plants} onWater={logWatering} />

      {/* Toast appears bottom right when present */}
      {toast && (
        <Toast
          message={toast.message}
          onUndo={toast.onUndo}
          onDismiss={() => setToast(null)}
        />
      )}

      {/* Confirmation dialog appears centered when present */}
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