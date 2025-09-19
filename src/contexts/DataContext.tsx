import { createContext, useContext, ReactNode } from 'react';
import usePersistentStore from '@/hooks/usePersistentStore';
import { 
  initialIncidents, 
  initialPersonnel, 
  initialResources, 
  initialActivities, 
  initialModules 
} from '@/data/mockData';
import type { 
  Incident, 
  Personnel, 
  Resource, 
  Activity, 
  Module 
} from '@/hooks/usePersistentStore';

interface DataContextType {
  incidents: {
    data: Incident[];
    create: (item: Omit<Incident, 'id'>) => Incident;
    read: (id: string) => Incident | undefined;
    update: (id: string, updates: Partial<Incident>) => void;
    remove: (id: string) => void;
    clear: () => void;
  };
  personnel: {
    data: Personnel[];
    create: (item: Omit<Personnel, 'id'>) => Personnel;
    read: (id: string) => Personnel | undefined;
    update: (id: string, updates: Partial<Personnel>) => void;
    remove: (id: string) => void;
    clear: () => void;
  };
  resources: {
    data: Resource[];
    create: (item: Omit<Resource, 'id'>) => Resource;
    read: (id: string) => Resource | undefined;
    update: (id: string, updates: Partial<Resource>) => void;
    remove: (id: string) => void;
    clear: () => void;
  };
  activities: {
    data: Activity[];
    create: (item: Omit<Activity, 'id'>) => Activity;
    read: (id: string) => Activity | undefined;
    update: (id: string, updates: Partial<Activity>) => void;
    remove: (id: string) => void;
    clear: () => void;
  };
  modules: {
    data: Module[];
    create: (item: Omit<Module, 'id'>) => Module;
    read: (id: string) => Module | undefined;
    update: (id: string, updates: Partial<Module>) => void;
    remove: (id: string) => void;
    clear: () => void;
  };
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const incidents = usePersistentStore<Incident>('incidents', initialIncidents);
  const personnel = usePersistentStore<Personnel>('personnel', initialPersonnel);
  const resources = usePersistentStore<Resource>('resources', initialResources);
  const activities = usePersistentStore<Activity>('activities', initialActivities);
  const modules = usePersistentStore<Module>('modules', initialModules);

  return (
    <DataContext.Provider value={{
      incidents,
      personnel,
      resources,
      activities,
      modules
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};