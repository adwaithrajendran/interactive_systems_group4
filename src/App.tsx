// Top level app component
// Owns plant data and routes between screens
// All watering, undo, and confirmation logic lives here in one place

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import AllPlants from './components/AllPlants';
import PlantDetails from './components/PlantDetails';
import AddPlant from './components/AddPlant';
import ToastStack from './components/ToastStack';
import ConfirmDialog from './components/ConfirmDialog';
import { plants as initialPlants } from './data/mockData';
import type { Plant, PlantFormData } from './types';

// Shape of a single toast in the stack
interface ToastItem {
  id: string;
  message: string;
  onUndo: () => void;
}

// Snapshot of the parts of a plant that change during a watering
// We keep this so the user can undo from the toast
interface WateringSnapshot {
  plantId: string;
  previousState: Pick<Plant, 'lastWatered' | 'nextWatering' | 'health'>;
}

// Cap on how many toasts can be visible at once so they do not stack endlessly
const MAX_TOASTS = 4;

function App() {
  // The plant collection, single source of truth for the whole app
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

  // Which screen is currently being shown
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'addPlant' | 'allPlants' | 'plantDetails'>('dashboard');

  // The plant currently open in Plant Details, if any
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  // Used to send the user back to where they came from after Add Plant
  const [previousPage, setPreviousPage] = useState<string>('dashboard');

  // Used to label the back button on Plant Details
  const [plantDetailsSource, setPlantDetailsSource] = useState<'dashboard' | 'allPlants'>('allPlants');

  // Stack of active toasts, newest at the end
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Confirmation dialog state, null when no dialog is showing
  const [confirm, setConfirm] = useState<{
    plantName: string;
    onConfirm: () => void;
  } | null>(null);

  // Was this plant watered in the last 24 hours
  // Used to decide whether to ask before watering again
  const wateredRecently = (plant: Plant): boolean => {
    const now = new Date();
    const last = new Date(plant.lastWatered);
    const hoursSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    return plant.health === 'healthy' && hoursSince < 24;
  };

  // Update the plant in state and return a snapshot of what changed
  // The snapshot is later used by the Undo button on the toast
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

  // Restore a plant to the state captured in a snapshot
  // Called when the user clicks Undo on the watering toast
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

  // Show a confirmation toast after a watering
  // If we already have MAX_TOASTS, drop the oldest one to make room
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
      if (next.length > MAX_TOASTS) {
        return next.slice(next.length - MAX_TOASTS);
      }
      return next;
    });
  };

  // Remove a specific toast, either on auto-dismiss or after Undo
  const removeToast = (id: string) => {
    setToasts(current => current.filter(t => t.id !== id));
  };

  // Called by every Water button in the app
  // Routes through the re-water confirmation when needed
  const logWatering = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    // If the plant is healthy and was watered recently, ask first
    // This protects against accidental double watering, which the scenario flagged as the biggest cause of plant death
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

    // Otherwise water straight away
    const snapshot = performWatering(plantId);
    if (snapshot) pushToast(plant.name, snapshot);
  };

  // Add a brand new plant to the collection from the Add Plant form
  // Starts healthy and watered today
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

    // Return the user to wherever they came from before opening Add Plant
    setCurrentPage(previousPage as 'dashboard' | 'allPlants');
  };

  // Switch screens from the sidebar
  const navigateTo = (page: string) => {
    if (page === 'dashboard' || page === 'allPlants' || page === 'addPlant') {
      setPreviousPage(page);
      setCurrentPage(page);
      setSelectedPlantId(null);
    }
  };

  // Open the details view for a specific plant
  // Remembers where the user came from so the back button can label itself correctly
  const handleViewPlant = (plantId: string) => {
    setSelectedPlantId(plantId);
    setPlantDetailsSource(currentPage as 'dashboard' | 'allPlants');
    setCurrentPage('plantDetails');
  };

  // Render the correct screen based on currentPage

  if (currentPage === 'addPlant') {
    return (
      <AddPlant
        owners={Array.from(new Set(plants.map(p => p.owner))).sort()}
        onAdd={addPlant}
        onCancel={() => setCurrentPage(previousPage as 'dashboard' | 'allPlants')}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />
    );
  }

  if (currentPage === 'allPlants') {
    return (
      <>
        <AllPlants
          plants={plants}
          onWater={logWatering}
          onAddPlant={() => { setPreviousPage('allPlants'); setCurrentPage('addPlant'); }}
          onViewPlant={handleViewPlant}
          onNavigate={navigateTo}
        />
        <ToastStack toasts={toasts} onDismiss={removeToast} />
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

  if (currentPage === 'plantDetails' && selectedPlantId) {
    const plant = plants.find(p => p.id === selectedPlantId);
    // Selected plant no longer exists, fall back to the list
    if (!plant) {
      setCurrentPage('allPlants');
      return null;
    }

    return (
      <>
        <PlantDetails
          plant={plant}
          onWater={logWatering}
          sourcePage={plantDetailsSource}
          onBack={() => setCurrentPage(plantDetailsSource)}
          onNavigate={navigateTo}
        />
        <ToastStack toasts={toasts} onDismiss={removeToast} />
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

  // Default screen is the Dashboard
  return (
    <>
      <Dashboard
        plants={plants}
        onWater={logWatering}
        onAddPlant={() => setCurrentPage('addPlant')}
        onViewPlant={handleViewPlant}
        onNavigate={navigateTo}
      />

      {/* Toast stack in the bottom right corner */}
      <ToastStack toasts={toasts} onDismiss={removeToast} />

      {/* Re-water confirmation dialog */}
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