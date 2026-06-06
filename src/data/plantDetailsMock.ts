import type { Plant } from '../types';

export interface CareEvent {
  id: string;
  type: 'watered' | 'fertilized' | 'repotted' | 'pruned';
  user: string;
  exactDate: string;
}

export interface PlantExtra {
  origin: string;
  soil: string;
  light: string;
  temperature: string;
  streak: number;
  tips: string[];
  careEvents: CareEvent[];
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export const plantExtraData: Record<string, PlantExtra> = {
  '1': {
    origin: 'Native to tropical Asia',
    soil: 'Moist, well-draining soil',
    light: 'Needs 6–8 hours of direct sunlight',
    temperature: '18–30°C',
    streak: 15,
    tips: [
      'Pinch off flower buds to encourage leaf growth',
      'Water every 1–2 days in hot weather',
      'Harvest from the top to promote bushy growth',
      'Does well on kitchen windowsills',
    ],
    careEvents: [
      { id: 'c1', type: 'watered', user: 'Sam', exactDate: daysAgo(3) },
      { id: 'c2', type: 'watered', user: 'Sam', exactDate: daysAgo(6) },
      { id: 'c3', type: 'fertilized', user: 'Sam', exactDate: daysAgo(22) },
      { id: 'c4', type: 'repotted', user: 'Sam', exactDate: daysAgo(88) },
    ],
  },
  '2': {
    origin: 'Native to the Solomon Islands',
    soil: 'Well-draining potting mix',
    light: 'Tolerates low to bright indirect light',
    temperature: '18–30°C',
    streak: 42,
    tips: [
      'Allow soil to dry between waterings',
      'Wipe leaves monthly to remove dust',
      'Easy to propagate from cuttings in water',
      'Tolerates occasional neglect',
    ],
    careEvents: [
      { id: 'c5', type: 'watered', user: 'Sam', exactDate: daysAgo(3) },
      { id: 'c6', type: 'watered', user: 'Sam', exactDate: daysAgo(10) },
      { id: 'c7', type: 'fertilized', user: 'Sam', exactDate: daysAgo(30) },
      { id: 'c8', type: 'pruned', user: 'Sam', exactDate: daysAgo(60) },
    ],
  },
  '3': {
    origin: 'Native to West Africa',
    soil: 'Well-draining sandy soil',
    light: 'Tolerates low to bright light',
    temperature: '15–27°C',
    streak: 28,
    tips: [
      'Allow soil to dry completely between waterings',
      'Wipe leaves monthly to remove dust',
      'Sensitive to cold temperatures',
      'Thrives in indirect sunlight',
    ],
    careEvents: [
      { id: 'c9', type: 'watered', user: 'Priya', exactDate: daysAgo(14) },
      { id: 'c10', type: 'watered', user: 'Priya', exactDate: daysAgo(28) },
      { id: 'c11', type: 'fertilized', user: 'Priya', exactDate: daysAgo(45) },
      { id: 'c12', type: 'repotted', user: 'Priya', exactDate: daysAgo(120) },
    ],
  },
  '4': {
    origin: 'Native to tropical Americas',
    soil: 'Rich, well-draining potting mix',
    light: 'Prefers bright, indirect light',
    temperature: '18–28°C',
    streak: 20,
    tips: [
      'Keep soil consistently moist, not soggy',
      'Drooping leaves signal it needs water',
      'Produces white flowers in bright light',
      'Sensitive to chlorine in tap water',
    ],
    careEvents: [
      { id: 'c13', type: 'watered', user: 'Priya', exactDate: daysAgo(2) },
      { id: 'c14', type: 'watered', user: 'Priya', exactDate: daysAgo(8) },
      { id: 'c15', type: 'fertilized', user: 'Priya', exactDate: daysAgo(35) },
      { id: 'c16', type: 'repotted', user: 'Priya', exactDate: daysAgo(180) },
    ],
  },
  '5': {
    origin: 'Native to West Africa',
    soil: 'Well-draining, nutrient-rich soil',
    light: 'Needs bright, indirect light',
    temperature: '18–27°C',
    streak: 10,
    tips: [
      'Water when top 2–3 cm of soil feels dry',
      'Dust leaves regularly to maximise light absorption',
      'Rotate the pot weekly for even growth',
      'Avoid sudden temperature changes',
    ],
    careEvents: [
      { id: 'c17', type: 'watered', user: 'Sam', exactDate: daysAgo(8) },
      { id: 'c18', type: 'watered', user: 'Sam', exactDate: daysAgo(16) },
      { id: 'c19', type: 'fertilized', user: 'Sam', exactDate: daysAgo(40) },
      { id: 'c20', type: 'pruned', user: 'Sam', exactDate: daysAgo(90) },
    ],
  },
  '6': {
    origin: 'Native to tropical rainforests of Central America',
    soil: 'Well-draining peat-based mix',
    light: 'Prefers bright, indirect light',
    temperature: '18–29°C',
    streak: 35,
    tips: [
      'Water when top inch of soil feels dry',
      'Wipe large leaves to keep them dust-free',
      'Provide a moss pole for climbing support',
      'Likes humidity — mist occasionally',
    ],
    careEvents: [
      { id: 'c21', type: 'watered', user: 'Sam', exactDate: daysAgo(4) },
      { id: 'c22', type: 'watered', user: 'Sam', exactDate: daysAgo(12) },
      { id: 'c23', type: 'fertilized', user: 'Sam', exactDate: daysAgo(25) },
      { id: 'c24', type: 'repotted', user: 'Sam', exactDate: daysAgo(150) },
    ],
  },
  '7': {
    origin: 'Native to the Arabian Peninsula',
    soil: 'Well-draining cactus or succulent mix',
    light: 'Bright, indirect to direct light',
    temperature: '15–27°C',
    streak: 50,
    tips: [
      'Allow soil to dry completely between waterings',
      'Water sparingly in winter',
      'Gel from leaves soothes minor burns',
      'Use a pot with drainage holes',
    ],
    careEvents: [
      { id: 'c25', type: 'watered', user: 'Sam', exactDate: daysAgo(7) },
      { id: 'c26', type: 'watered', user: 'Sam', exactDate: daysAgo(21) },
      { id: 'c27', type: 'fertilized', user: 'Sam', exactDate: daysAgo(50) },
      { id: 'c28', type: 'repotted', user: 'Sam', exactDate: daysAgo(200) },
    ],
  },
  '8': {
    origin: 'Native to Eastern Africa',
    soil: 'Well-draining potting mix',
    light: 'Tolerates low to bright indirect light',
    temperature: '15–26°C',
    streak: 60,
    tips: [
      'Water only when soil is completely dry',
      'Very drought-tolerant — can go weeks without water',
      'Thrives on neglect, perfect for beginners',
      'Yellow leaves usually mean overwatering',
    ],
    careEvents: [
      { id: 'c29', type: 'watered', user: 'Alex', exactDate: daysAgo(10) },
      { id: 'c30', type: 'watered', user: 'Alex', exactDate: daysAgo(31) },
      { id: 'c31', type: 'fertilized', user: 'Alex', exactDate: daysAgo(60) },
      { id: 'c32', type: 'repotted', user: 'Alex', exactDate: daysAgo(250) },
    ],
  },
  '9': {
    origin: 'Native to South America',
    soil: 'Very well-draining sandy or gritty mix',
    light: 'Full direct sunlight',
    temperature: '15–35°C',
    streak: 8,
    tips: [
      'Water sparingly — every 2–3 weeks in summer',
      'Reduce watering to once a month in winter',
      'Needs at least 6 hours of direct sun daily',
      'Use a terracotta pot to prevent root rot',
    ],
    careEvents: [
      { id: 'c33', type: 'watered', user: 'Alex', exactDate: daysAgo(22) },
      { id: 'c34', type: 'watered', user: 'Alex', exactDate: daysAgo(43) },
      { id: 'c35', type: 'fertilized', user: 'Alex', exactDate: daysAgo(70) },
      { id: 'c36', type: 'repotted', user: 'Alex', exactDate: daysAgo(300) },
    ],
  },
};

export function getPlantExtra(plant: Plant): PlantExtra {
  return plantExtraData[plant.id] || plantExtraData['1'];
}
