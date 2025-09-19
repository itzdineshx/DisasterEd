import { Module } from "@/hooks/usePersistentStore";

export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  modulesCompleted: number;
  totalModules: number;
  averageScore: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface Class {
  id: string;
  name: string;
  semester: string;
  students: number;
  averageProgress: number;
  modules: string[]; // Module IDs
  startDate: string;
  endDate: string;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  moduleId: string;
  completed: boolean;
  score: number;
  lastAttempt: string;
}

// Initial mock data for students
export const initialStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    class: "Safety 101",
    modulesCompleted: 8,
    totalModules: 10,
    averageScore: 92,
    lastActive: "2025-09-19T08:00:00",
    status: "active"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    class: "Emergency Response",
    modulesCompleted: 6,
    totalModules: 10,
    averageScore: 88,
    lastActive: "2025-09-19T09:00:00",
    status: "active"
  }
];

// Initial mock data for classes
export const initialClasses: Class[] = [
  {
    id: "safety-101",
    name: "Safety 101",
    semester: "Fall 2025",
    students: 30,
    averageProgress: 76,
    modules: ["1", "2", "3"],
    startDate: "2025-09-01",
    endDate: "2025-12-31"
  },
  {
    id: "emergency-response",
    name: "Emergency Response",
    semester: "Fall 2025",
    students: 25,
    averageProgress: 82,
    modules: ["4", "5", "6"],
    startDate: "2025-09-01",
    endDate: "2025-12-31"
  }
];

// Initial mock data for student progress
export const initialStudentProgress: StudentProgress[] = [
  {
    id: "1",
    studentId: "1",
    moduleId: "1",
    completed: true,
    score: 92,
    lastAttempt: "2025-09-19T08:00:00"
  },
  {
    id: "2",
    studentId: "1",
    moduleId: "2",
    completed: false,
    score: 0,
    lastAttempt: "2025-09-19T09:00:00"
  }
];