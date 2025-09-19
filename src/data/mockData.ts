import { Incident, Personnel, Resource, Activity, Module } from '@/hooks/usePersistentStore';

export const initialIncidents: Incident[] = [
  {
    id: '1',
    type: 'Fire',
    location: 'Block A, Floor 2',
    severity: 'high',
    status: 'Active',
    responders: 4,
    startTime: '2025-09-19T10:00:00',
    estimatedResolution: '2025-09-19T11:00:00',
    description: 'Small fire in chemistry lab'
  },
  {
    id: '2',
    type: 'Medical',
    location: 'Sports Ground',
    severity: 'medium',
    status: 'Active',
    responders: 2,
    startTime: '2025-09-19T09:30:00',
    estimatedResolution: '2025-09-19T10:30:00',
    description: 'Student injury during sports'
  }
];

export const initialPersonnel: Personnel[] = [
  {
    id: '1',
    name: 'Dr. Sharma',
    role: 'Emergency Medical Officer',
    status: 'On Duty',
    location: 'Medical Center',
    contact: '+91-9876543210',
    lastUpdated: '2025-09-19T10:00:00'
  },
  {
    id: '2',
    name: 'Mr. Kumar',
    role: 'Fire Safety Officer',
    status: 'Responding',
    location: 'Block A',
    contact: '+91-9876543211',
    lastUpdated: '2025-09-19T10:00:00'
  }
];

export const initialResources: Resource[] = [
  {
    id: '1',
    name: 'Fire Extinguishers',
    type: 'Safety Equipment',
    status: 'Available',
    quantity: 50,
    location: 'Central Storage',
    lastChecked: '2025-09-19T08:00:00'
  },
  {
    id: '2',
    name: 'First Aid Kits',
    type: 'Medical Equipment',
    status: 'Available',
    quantity: 30,
    location: 'Medical Center',
    lastChecked: '2025-09-19T08:00:00'
  }
];

export const initialActivities: Activity[] = [
  {
    id: '1',
    type: 'drill',
    title: 'Fire Evacuation Drill',
    time: '2025-09-19T14:00:00',
    status: 'active',
    participants: 150
  },
  {
    id: '2',
    type: 'quiz',
    title: 'Emergency Response Quiz',
    time: '2025-09-19T15:00:00',
    status: 'published',
    participants: 200
  }
];

export const initialModules: Module[] = [
  {
    id: '1',
    name: 'Fire Safety Basics',
    type: 'Training',
    completion: 85,
    students: 120,
    lastUpdated: '2025-09-19T08:00:00'
  },
  {
    id: '2',
    name: 'First Aid Fundamentals',
    type: 'Training',
    completion: 92,
    students: 150,
    lastUpdated: '2025-09-19T08:00:00'
  }
];