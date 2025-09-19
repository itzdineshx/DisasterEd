import { useState, useEffect } from 'react';

// Type definitions for different data types
export interface Incident {
  id: string;
  type: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'Active' | 'Resolved' | 'Pending';
  responders: number;
  startTime: string;
  estimatedResolution: string;
  description?: string;
}

export interface Personnel {
  id: string;
  name: string;
  role: string;
  status: 'On Duty' | 'Off Duty' | 'Responding';
  location: string;
  contact: string;
  lastUpdated: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  status: string;
  quantity: number;
  location: string;
  lastChecked: string;
}

export interface Activity {
  id: string;
  type: 'drill' | 'quiz' | 'alert' | 'module' | 'certification';
  title: string;
  time: string;
  status: 'completed' | 'active' | 'published' | 'resolved' | 'awarded';
  participants: number;
}

export interface Module {
  id: string;
  name: string;
  type: string;
  completion: number;
  students: number;
  lastUpdated: string;
}

// Generic type for all possible data types
type DataType = Incident | Personnel | Resource | Activity | Module;

// Function to get expiry time (3 hours from now)
const getExpiryTime = () => new Date().getTime() + (3 * 60 * 60 * 1000);

interface StoredData<T> {
  data: T[];
  expiryTime: number;
}

const usePersistentStore = <T extends DataType>(key: string, initialData: T[]) => {
  const [data, setData] = useState<T[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const { data, expiryTime }: StoredData<T> = JSON.parse(stored);
        if (expiryTime > new Date().getTime()) {
          return data;
        }
      }
      return initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({
      data,
      expiryTime: getExpiryTime()
    }));
  }, [data, key]);

  // CRUD operations
  const create = (item: Omit<T, 'id'>) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9)
    } as T;
    setData(prev => [...prev, newItem]);
    return newItem;
  };

  const read = (id: string) => {
    return data.find(item => item.id === id);
  };

  const update = (id: string, updates: Partial<T>) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const remove = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const clear = () => {
    setData([]);
  };

  return {
    data,
    create,
    read,
    update,
    remove,
    clear
  };
};

export default usePersistentStore;