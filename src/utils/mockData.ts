// Mock data for demonstrations and testing

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'officer';
  avatar: string;
  institution?: string;
  department?: string;
  class?: string;
  modulesCompleted?: number;
  totalModules?: number;
  averageScore?: number;
  lastActive?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started' | 'locked';
  icon: string;
  rating: number;
  enrolled: number;
  regionSpecific: string[];
  completedLessons: number;
  quizScore?: number;
  badges: string[];
}

export interface EmergencyContact {
  name: string;
  number: string;
  type: 'emergency' | 'fire' | 'medical' | 'disaster' | 'women' | 'child';
  description: string;
  available24x7: boolean;
}

export interface ProgressData {
  overallProgress: number;
  completedModules: number;
  totalModules: number;
  averageQuizScore: number;
  badgesEarned: number;
  drillsCompleted: number;
  currentStreak: number;
}

// Mock users for login
export const mockUsers: User[] = [
  {
    id: 'student1',
    name: 'Arjun Sharma',
    email: 'student@disastered.com',
    role: 'student',
    avatar: '👨‍🎓',
    institution: 'Delhi University',
    department: 'Computer Science',
    class: 'Safety 101',
    modulesCompleted: 4,
    totalModules: 6,
    averageScore: 87,
    lastActive: '2024-01-15'
  },
  {
    id: 'teacher1',
    name: 'Dr. Priya Gupta',
    email: 'teacher@disastered.com',
    role: 'teacher',
    avatar: '👩‍🏫',
    institution: 'Mumbai Institute of Technology',
    department: 'Safety Engineering'
  },
  {
    id: 'student2',
    name: 'Rahul Kumar',
    email: 'rahul@disastered.com',
    role: 'student',
    avatar: '👨‍🎓',
    institution: 'Delhi University',
    department: 'Mechanical Engineering',
    class: 'Emergency Response',
    modulesCompleted: 2,
    totalModules: 6,
    averageScore: 92,
    lastActive: '2024-01-14'
  },
  {
    id: 'student3',
    name: 'Sneha Patel',
    email: 'sneha@disastered.com',
    role: 'student',
    avatar: '👩‍🎓',
    institution: 'Mumbai Institute of Technology',
    department: 'Civil Engineering',
    class: 'Advanced Safety',
    modulesCompleted: 5,
    totalModules: 6,
    averageScore: 78,
    lastActive: '2024-01-13'
  },
  {
    id: 'admin1',
    name: 'Rajesh Kumar',
    email: 'admin@disastered.com',
    role: 'admin',
    avatar: '👨‍💼',
    institution: 'DisasterEd Platform'
  },
  {
    id: 'officer1',
    name: 'Captain Meera Singh',
    email: 'officer@disastered.com',
    role: 'officer',
    avatar: '👮‍♀️',
    institution: 'National Disaster Response Force',
    department: 'Emergency Response'
  }
];

// Mock modules data
export const mockModules: Module[] = [
  {
    id: "earthquake-basics",
    title: "Earthquake Safety Fundamentals",
    description: "Learn the science behind earthquakes and essential safety measures",
    category: "earthquake",
    difficulty: "Beginner",
    duration: "45 min",
    lessons: 8,
    progress: 85,
    status: "in-progress",
    icon: "🌍",
    rating: 4.8,
    enrolled: 1249,
    regionSpecific: ["Seismic Zones", "Building Codes"],
    completedLessons: 7,
    quizScore: 92,
    badges: ["Quick Learner", "Safety First"]
  },
  {
    id: "fire-response",
    title: "Fire Emergency Response",
    description: "Comprehensive fire safety, prevention, and evacuation procedures",
    category: "fire",
    difficulty: "Beginner",
    duration: "35 min",
    lessons: 6,
    progress: 100,
    status: "completed",
    icon: "🔥",
    rating: 4.9,
    enrolled: 2156,
    regionSpecific: ["Building Types", "Climate Factors"],
    completedLessons: 6,
    quizScore: 88,
    badges: ["Fire Safety Expert", "Perfect Score"]
  },
  {
    id: "flood-preparedness",
    title: "Flood Preparedness & Response",
    description: "Understanding flood risks and implementing safety measures",
    category: "flood",
    difficulty: "Intermediate",
    duration: "50 min",
    lessons: 9,
    progress: 60,
    status: "in-progress",
    icon: "🌊",
    rating: 4.7,
    enrolled: 987,
    regionSpecific: ["Coastal Areas", "River Basins"],
    completedLessons: 5,
    quizScore: 85,
    badges: ["Water Safety"]
  },
  {
    id: "tornado-safety",
    title: "Severe Weather & Tornado Safety",
    description: "Weather monitoring, warning systems, and shelter protocols",
    category: "weather",
    difficulty: "Intermediate",
    duration: "40 min",
    lessons: 7,
    progress: 30,
    status: "in-progress",
    icon: "🌪️",
    rating: 4.6,
    enrolled: 543,
    regionSpecific: ["Tornado Alley", "Rural Areas"],
    completedLessons: 2,
    quizScore: 78,
    badges: ["Weather Watcher"]
  },
  {
    id: "medical-emergency",
    title: "Medical Emergency Response",
    description: "First aid, CPR, and medical emergency protocols",
    category: "medical",
    difficulty: "Advanced",
    duration: "60 min",
    lessons: 12,
    progress: 25,
    status: "in-progress",
    icon: "🏥",
    rating: 4.9,
    enrolled: 1678,
    regionSpecific: ["Medical Facilities", "Remote Areas"],
    completedLessons: 3,
    quizScore: 95,
    badges: ["Life Saver"]
  },
  {
    id: "cyber-security",
    title: "Cyber Security in Crisis",
    description: "Digital safety and communication during emergencies",
    category: "technology",
    difficulty: "Advanced",
    duration: "55 min",
    lessons: 10,
    progress: 0,
    status: "locked",
    icon: "🔐",
    rating: 4.5,
    enrolled: 234,
    regionSpecific: ["Digital Infrastructure"],
    completedLessons: 0,
    quizScore: undefined,
    badges: []
  }
];

// Mock emergency contacts (Indian)
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    name: "Police",
    number: "100",
    type: "emergency",
    description: "For all police emergencies and law enforcement",
    available24x7: true
  },
  {
    name: "Fire Brigade",
    number: "101",
    type: "fire",
    description: "Fire emergencies and rescue operations",
    available24x7: true
  },
  {
    name: "Ambulance",
    number: "102",
    type: "medical",
    description: "Medical emergencies and ambulance services",
    available24x7: true
  },
  {
    name: "Disaster Management Helpline",
    number: "108",
    type: "disaster",
    description: "Disaster response and emergency services",
    available24x7: true
  },
  {
    name: "Women Helpline",
    number: "1091",
    type: "women",
    description: "Women in distress helpline",
    available24x7: true
  },
  {
    name: "Child Helpline",
    number: "1098",
    type: "child",
    description: "Child protection and rescue services",
    available24x7: true
  }
];

// Mock progress data
export const mockProgressData: ProgressData = {
  overallProgress: 68,
  completedModules: 2,
  totalModules: 6,
  averageQuizScore: 87,
  badgesEarned: 8,
  drillsCompleted: 15,
  currentStreak: 7
};

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getModuleById = (id: string): Module | undefined => {
  return mockModules.find(module => module.id === id);
};

export const getModulesByCategory = (category: string): Module[] => {
  if (category === 'all') return mockModules;
  return mockModules.filter(module => module.category === category);
};

export const getEmergencyContactsByType = (type?: string): EmergencyContact[] => {
  if (!type) return mockEmergencyContacts;
  return mockEmergencyContacts.filter(contact => contact.type === type);
};