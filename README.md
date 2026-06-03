# Sprout — Plant Care Tracker

A reactive plant care dashboard for the Adelaide University Interactive Systems Design course (Assignment 2, Group 4).

Sprout tracks watering schedules for a shared household. Multiple housemates can manage their plants from a single dashboard without needing accounts.

## Setup

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## What to try

- **Water a plant** from any card or the Water Today panel. Counts update instantly, toast appears with Undo.
- **Search** by name, species, or room in the top bar.
- **Filter by owner** using the chips (Everyone, Sam, Priya, Alex).
- **Sort** the plants section by Location, Name, or Owner.
- **Click the bell** top-right for notifications and quick watering.
- **Re-water a healthy plant** to see the confirmation dialog.

## Tech stack

React 18 + TypeScript + Vite + Tailwind CSS v4.

## Structure

- `src/App.tsx` — top-level state and watering logic
- `src/components/` — UI components
- `src/data/mockData.ts` — initial plant data
- `src/types/` — shared TypeScript types
- `src/utils/plantStatus.ts` — status helper functions

## Scope

Per the assignment brief, this is a single-screen prototype. Other screens shown in the wireframes (Add Plant, Plant Detail) are intentionally not implemented.

## Team
Agrim Sharma (A1913864)
Rajesh
Adwaith