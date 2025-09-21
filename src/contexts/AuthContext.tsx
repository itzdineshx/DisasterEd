import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin' | 'officer';
  institution: string;
  joinDate: string;
  age: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: Record<string, User & { password: string }> = {
  'john.doe@university.edu': {
    id: '1',
    email: 'john.doe@university.edu',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    institution: 'University of Safety',
    joinDate: '2024-01-15',
    age: 16,
    password: 'password123'
  },
  'jane.smith@university.edu': {
    id: '2',
    email: 'jane.smith@university.edu',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'teacher',
    institution: 'University of Safety',
    joinDate: '2023-08-20',
    age: 32,
    password: 'password123'
  },
  'admin@university.edu': {
    id: '3',
    email: 'admin@university.edu',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    institution: 'University of Safety',
    joinDate: '2022-05-10',
    age: 45,
    password: 'password123'
  },
  'officer@university.edu': {
    id: '4',
    email: 'officer@university.edu',
    firstName: 'Emergency',
    lastName: 'Officer',
    role: 'officer',
    institution: 'University of Safety',
    joinDate: '2023-03-01',
    age: 38,
    password: 'password123'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app start
    const savedUser = localStorage.getItem('disaster_ed_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('disaster_ed_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = mockUsers[email];
    
    if (mockUser && mockUser.password === password && mockUser.role === role) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('disaster_ed_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('disaster_ed_user');
    localStorage.removeItem('disaster_ed_progress');
    localStorage.removeItem('disaster_ed_quiz_results');
    localStorage.removeItem('disaster_ed_drill_results');
    localStorage.removeItem('disaster_ed_badges');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};