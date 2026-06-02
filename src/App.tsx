// Top level app component
// Plant data lives here and is passed down through props

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import { plants as initialPlants } from './data/mockData';
import type { Plant } from './types';

function App() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

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

  return <Dashboard plants={plants} onWater={logWatering} />;
}

export default App;