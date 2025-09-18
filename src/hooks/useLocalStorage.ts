import { useState, useEffect } from 'react';

// Generic local storage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// Teacher-specific data management
export function useTeacherData() {
  const [classes, setClasses] = useLocalStorage('teacher_classes', [
    { id: 'safety-101', name: 'Safety 101', students: 45, semester: 'Fall 2024', progress: 78 },
    { id: 'emergency-response', name: 'Emergency Response', students: 32, semester: 'Fall 2024', progress: 82 },
    { id: 'advanced-safety', name: 'Advanced Safety', students: 28, semester: 'Fall 2024', progress: 71 }
  ]);

  const [studentData, setStudentData] = useLocalStorage('teacher_student_data', []);
  const [courseContent, setCourseContent] = useLocalStorage('teacher_course_content', []);

  const updateClass = (classId: string, updates: any) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId ? { ...cls, ...updates } : cls
    ));
  };

  const addClass = (newClass: any) => {
    setClasses(prev => [...prev, { ...newClass, id: Date.now().toString() }]);
  };

  const removeClass = (classId: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== classId));
  };

  return {
    classes,
    studentData,
    courseContent,
    updateClass,
    addClass,
    removeClass,
    setStudentData,
    setCourseContent
  };
}

// Admin-specific data management
export function useAdminData() {
  const [institutionStats, setInstitutionStats] = useLocalStorage('admin_institution_stats', {
    totalStudents: 2847,
    activeTeachers: 156,
    modulesCompleted: 8432,
    avgPreparedness: 87
  });

  const [departmentData, setDepartmentData] = useLocalStorage('admin_department_data', [
    { name: "Engineering", value: 92, students: 487 },
    { name: "Medicine", value: 94, students: 623 },
    { name: "Arts & Sciences", value: 85, students: 892 },
    { name: "Business", value: 78, students: 345 },
    { name: "Education", value: 88, students: 267 },
    { name: "Administration", value: 96, students: 78 }
  ]);

  const [recentActivity, setRecentActivity] = useLocalStorage('admin_recent_activity', []);
  const [alerts, setAlerts] = useLocalStorage('admin_alerts', []);

  const updateStats = (newStats: any) => {
    setInstitutionStats(prev => ({ ...prev, ...newStats }));
  };

  const addActivity = (activity: any) => {
    setRecentActivity(prev => [{ ...activity, timestamp: Date.now() }, ...prev.slice(0, 19)]);
  };

  const addAlert = (alert: any) => {
    setAlerts(prev => [{ ...alert, id: Date.now(), timestamp: Date.now() }, ...prev]);
  };

  const removeAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return {
    institutionStats,
    departmentData,
    recentActivity,
    alerts,
    updateStats,
    addActivity,
    addAlert,
    removeAlert,
    setDepartmentData
  };
}

// Officer-specific data management
export function useOfficerData() {
  const [incidents, setIncidents] = useLocalStorage('officer_incidents', [
    {
      id: "INC-001",
      type: "Fire Emergency",
      location: "Building A - 3rd Floor",
      severity: "high",
      status: "In Progress",
      responders: 6,
      startTime: "14:23",
      estimatedResolution: "15:45",
      timestamp: Date.now()
    },
    {
      id: "INC-002", 
      type: "Medical Emergency",
      location: "Campus Quad",
      severity: "medium",
      status: "Responding",
      responders: 3,
      startTime: "14:45",
      estimatedResolution: "15:15",
      timestamp: Date.now()
    }
  ]);

  const [personnel, setPersonnel] = useLocalStorage('officer_personnel', [
    { id: 1, name: "Sarah Mitchell", role: "Fire Chief", status: "On Duty", location: "Station 1", contact: "555-0101" },
    { id: 2, name: "Mike Rodriguez", role: "EMT Lead", status: "Responding", location: "Building A", contact: "555-0102" },
    { id: 3, name: "Jennifer Lee", role: "Security Captain", status: "On Duty", location: "Command Center", contact: "555-0103" },
    { id: 4, name: "David Thompson", role: "Facilities Manager", status: "On Call", location: "Campus Wide", contact: "555-0104" }
  ]);

  const [alertLevel, setAlertLevel] = useLocalStorage('officer_alert_level', 'normal');
  const [resources, setResources] = useLocalStorage('officer_resources', {
    equipment: [
      { name: "Fire Suppression Systems", status: 95, available: 12, total: 12 },
      { name: "Emergency Vehicles", status: 88, available: 7, total: 8 },
      { name: "Medical Equipment", status: 92, available: 45, total: 48 },
      { name: "Communication Radios", status: 78, available: 23, total: 30 }
    ],
    supplies: [
      { name: "Medical Supplies", level: 85, status: "adequate" },
      { name: "Emergency Food", level: 67, status: "low" },
      { name: "Water Reserves", level: 92, status: "good" },
      { name: "Backup Generators", level: 100, status: "excellent" }
    ]
  });

  const addIncident = (incident: any) => {
    const newIncident = {
      ...incident,
      id: `INC-${String(incidents.length + 1).padStart(3, '0')}`,
      timestamp: Date.now()
    };
    setIncidents(prev => [newIncident, ...prev]);
    return newIncident;
  };

  const updateIncident = (incidentId: string, updates: any) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId ? { ...incident, ...updates } : incident
    ));
  };

  const resolveIncident = (incidentId: string) => {
    updateIncident(incidentId, { status: 'Resolved', resolvedAt: Date.now() });
  };

  const updatePersonnelStatus = (personnelId: number, status: string, location?: string) => {
    setPersonnel(prev => prev.map(person => 
      person.id === personnelId ? { ...person, status, ...(location && { location }) } : person
    ));
  };

  return {
    incidents,
    personnel,
    alertLevel,
    resources,
    addIncident,
    updateIncident,
    resolveIncident,
    updatePersonnelStatus,
    setAlertLevel,
    setResources
  };
}