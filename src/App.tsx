// Top level app component
// Plant data lives here and is passed down through props

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import AddPlant from './components/AddPlant';
import { plants as initialPlants } from './data/mockData';
import type {Plant, PlantFormData} from './types';

function App() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'addPlant'>('dashboard');

  // Log a watering for one plant
  // Updates the last watered date, the next due date and resets health to healthy
  const logWatering = (plantId: string) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    setPlants(currentPlants =>
      currentPlants.map(plant => {
        if (plant.id !== plantId) return plant;

        const next = new Date(today);
        next.setDate(next.getDate() + plant.waterIntervalDays);

        return {
          ...plant,
          lastWatered: todayStr,
          nextWatering: next.toISOString().split('T')[0],
          health: 'healthy',
        };
      })
    );
  };

  // Add a new plant from the AddPlant form
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
 

  return <Dashboard plants={plants} onWater={logWatering} onAddPlant={() => setCurrentPage('addPlant')} />;
}

export default App;