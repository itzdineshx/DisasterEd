export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'basic' | 'advanced' | 'expert';
  duration: number; // in minutes
  prerequisites: string[];
  objectives: string[];
  content: {
    sections: {
      title: string;
      content: string;
      resources: string[];
    }[];
  };
  assessments: Assessment[];
  certification: string;
}

export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  type: 'quiz' | 'scenario' | 'drill';
  timeLimit: number; // in minutes
  passingScore: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'scenario' | 'practical';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  timeLimit?: number; // for timed questions
  scenario?: {
    description: string;
    context: string;
    resources: string[];
  };
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  validityPeriod: number; // in months
  requirements: {
    moduleIds: string[];
    minimumScore: number;
    practicalAssessments: boolean;
  };
  issuer: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
}

export interface StudentProgress {
  studentId: string;
  moduleProgress: {
    moduleId: string;
    completed: boolean;
    score: number;
    assessmentResults: {
      assessmentId: string;
      score: number;
      timeSpent: number;
      attempts: number;
      lastAttempt: string;
    }[];
    certificateId?: string;
    certificateExpiry?: string;
  }[];
}

// Mock Modules Data
export const mockModules: Module[] = [
  {
    id: "fire-safety-101",
    title: "Fire Safety Fundamentals",
    description: "Learn basic fire safety protocols and emergency response procedures",
    type: "basic",
    duration: 60,
    prerequisites: [],
    objectives: [
      "Understand fire triangle concepts",
      "Learn fire extinguisher types",
      "Master evacuation procedures"
    ],
    content: {
      sections: [
        {
          title: "Understanding Fire",
          content: "Basic principles of fire behavior and prevention",
          resources: ["video-fire-triangle", "infographic-fire-types"]
        },
        {
          title: "Emergency Response",
          content: "Step-by-step guide to fire emergency response",
          resources: ["simulation-evacuation", "checklist-fire-emergency"]
        }
      ]
    },
    assessments: [
      {
        id: "fire-safety-quiz-1",
        moduleId: "fire-safety-101",
        title: "Fire Safety Basic Assessment",
        type: "quiz",
        timeLimit: 15,
        passingScore: 80,
        questions: [
          {
            id: "fs-q1",
            type: "mcq",
            question: "What are the three elements of the fire triangle?",
            options: [
              "Heat, Fuel, Oxygen",
              "Water, Air, Wood",
              "Smoke, Flame, Heat",
              "Carbon, Hydrogen, Oxygen"
            ],
            correctAnswer: "Heat, Fuel, Oxygen",
            points: 10
          },
          {
            id: "fs-q2",
            type: "scenario",
            question: "You discover a small fire in a waste basket. What's your first action?",
            scenario: {
              description: "Small fire scenario",
              context: "Office environment, waste basket fire",
              resources: ["office-layout-map"]
            },
            correctAnswer: ["Raise alarm", "Alert others", "Use appropriate extinguisher"],
            points: 15
          }
        ]
      }
    ],
    certification: "basic-fire-safety"
  },
  {
    id: "earthquake-prep-101",
    title: "Earthquake Preparedness",
    description: "Essential knowledge for earthquake safety and response",
    type: "basic",
    duration: 90,
    prerequisites: [],
    objectives: [
      "Understand earthquake mechanics",
      "Learn safety positions",
      "Develop emergency plans"
    ],
    content: {
      sections: [
        {
          title: "Earthquake Science",
          content: "Understanding earthquakes and their impacts",
          resources: ["video-tectonic-plates", "simulation-earthquake"]
        },
        {
          title: "Safety Procedures",
          content: "Drop, Cover, and Hold On procedure",
          resources: ["interactive-safety-positions", "checklist-preparation"]
        }
      ]
    },
    assessments: [
      {
        id: "earthquake-quiz-1",
        moduleId: "earthquake-prep-101",
        title: "Earthquake Response Assessment",
        type: "scenario",
        timeLimit: 20,
        passingScore: 75,
        questions: [
          {
            id: "eq-q1",
            type: "practical",
            question: "Demonstrate the correct 'Drop, Cover, and Hold On' position",
            timeLimit: 30,
            correctAnswer: "Proper position demonstration",
            points: 20
          }
        ]
      }
    ],
    certification: "basic-earthquake-prep"
  }
];

// Mock Certifications Data
export const mockCertifications: Certification[] = [
  {
    id: "basic-fire-safety",
    title: "Basic Fire Safety Certification",
    description: "Foundation level certification in fire safety and emergency response",
    validityPeriod: 12,
    requirements: {
      moduleIds: ["fire-safety-101"],
      minimumScore: 80,
      practicalAssessments: true
    },
    issuer: "DisasterEd Safety Institute",
    level: "basic"
  },
  {
    id: "basic-earthquake-prep",
    title: "Earthquake Preparedness Certification",
    description: "Essential certification for earthquake safety and response",
    validityPeriod: 24,
    requirements: {
      moduleIds: ["earthquake-prep-101"],
      minimumScore: 75,
      practicalAssessments: true
    },
    issuer: "DisasterEd Safety Institute",
    level: "basic"
  }
];

// Mock Student Progress Data
export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: "student-001",
    moduleProgress: [
      {
        moduleId: "fire-safety-101",
        completed: true,
        score: 85,
        assessmentResults: [
          {
            assessmentId: "fire-safety-quiz-1",
            score: 85,
            timeSpent: 12,
            attempts: 1,
            lastAttempt: "2025-09-15T14:30:00Z"
          }
        ],
        certificateId: "basic-fire-safety",
        certificateExpiry: "2026-09-15T14:30:00Z"
      }
    ]
  }
];