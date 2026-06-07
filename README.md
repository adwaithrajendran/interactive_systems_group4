# Sprout: Plant Care Tracker

A reactive plant care dashboard built for the Adelaide University Interactive Systems Design course (Assignment 2, Group 4).

Sprout tracks watering schedules for a shared household. Multiple housemates can manage their plants from a single dashboard without needing accounts.

## Setup

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## What to try

- **Water a plant** from any card or the Water Today panel. Counts update instantly and a toast appears with an Undo option.
- **Search** by name, species, or room using the top bar.
- **Filter by owner** using the chips at the top of the dashboard (Everyone, Sam, Priya, Alex).
- **Sort** the plants section by Location, Name, or Owner.
- **Click the bell** in the top right for notifications and quick watering.
- **Re-water a healthy plant** to see the overwatering confirmation dialog.
- **Open All Plants** from the sidebar to browse the full collection with status and location filters.
- **Click any plant** to open its details page with care history, species info, and tips.

## Tech stack

React 18, TypeScript, Vite, and Tailwind CSS v4. No backend or database, all data lives in React state.

## Structure

- `src/App.tsx`: top-level state, watering logic, and routing between screens
- `src/components/`: UI components for each screen and shared widgets
- `src/data/mockData.ts`: initial plant data
- `src/data/plantDetailsMock.ts`: species-specific info shown on the Plant Details screen
- `src/types/`: shared TypeScript types
- `src/utils/plantStatus.ts`: status and date helper functions

## Scope

The assignment brief asks for one main screen built out to demonstrate reactive interaction. The Dashboard is that main screen, and it is where the reactive watering flow, status updates, summary counts, and overwatering confirmation all live.

The three supporting screens (All Plants, Add Plant, Plant Details) are also fully implemented so the user flow from the wireframes can be demonstrated end to end. Watering or adding a plant on any screen propagates to the others through shared React state in `App.tsx`.

## Team

- Agrim Sharma (A1913864)
- Rajesh
- Adwaith