// src/data/gymsAndClubs.ts
export interface GymClub {
  id: number;
  name: string;
  type: 'gym' | 'wellness-club';
  address: string;
  latitude: string;
  longitude: string;
  description: string;
  rating?: number;
  verified: boolean;
  amenities: string[];
  opening_time?: string;
  closing_time?: string;
}

const GYMS_AND_CLUBS: GymClub[] = [
  {
    id: 1,
    name: 'FitFlix Premium Gym - Electronic City',
    type: 'gym',
    address: 'Electronic City, Bangalore, India',
    latitude: '12.9352',
    longitude: '77.6245',
    description: 'State-of-the-art gym with modern equipment, personal training, and group classes.',
    rating: 4.8,
    verified: true,
    amenities: ['Cardio', 'Strength Training', 'Personal Training', 'Group Classes', 'Locker Rooms'],
    opening_time: '2025-01-01T06:00:00',
    closing_time: '2025-01-01T22:00:00',
  },
  {
    id: 2,
    name: 'FitFlix Wellness Club - Marathahalli',
    type: 'wellness-club',
    address: 'Marathahalli, Bangalore, India',
    latitude: '12.9698',
    longitude: '77.7499',
    description: 'Premium wellness center with therapy, recovery, and holistic fitness programs.',
    rating: 4.7,
    verified: true,
    amenities: ['Cryotherapy', 'Massage Therapy', 'Yoga', 'Meditation', 'Nutrition Counseling'],
    opening_time: '2025-01-01T07:00:00',
    closing_time: '2025-01-01T21:00:00',
  },
  {
    id: 3,
    name: 'FitFlix Fitness - Brookefield',
    type: 'gym',
    address: 'Brookefield, Bangalore, India',
    latitude: '13.0012',
    longitude: '77.7399',
    description: 'Complete fitness solution with boxing, strength training, and wellness therapies.',
    rating: 4.6,
    verified: true,
    amenities: ['Boxing Ring', 'Strength Training', 'Cardio', 'Personal Trainers', 'Stretching Area'],
    opening_time: '2025-01-01T06:30:00',
    closing_time: '2025-01-01T22:30:00',
  },
];

export function getActiveGymsAndClubs(): GymClub[] {
  return GYMS_AND_CLUBS;
}

export function getGymById(id: number): GymClub | undefined {
  return GYMS_AND_CLUBS.find(gym => gym.id === id);
}
