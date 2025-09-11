export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  icon: string;
  rating: number;
  enrolled: number;
  regionSpecific: string[];
  content: ModuleLesson[];
}

export interface ModuleLesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  duration: number; // in minutes
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

export const modules: Module[] = [
  {
    id: "earthquake-basics",
    title: "Earthquake Safety Fundamentals",
    description: "Learn the science behind earthquakes and essential safety measures",
    category: "earthquake",
    difficulty: "Beginner",
    duration: "45 min",
    lessons: 8,
    icon: "🌍",
    rating: 4.8,
    enrolled: 1249,
    regionSpecific: ["Seismic Zones", "Building Codes"],
    content: [
      {
        id: "lesson-1",
        title: "Understanding Earthquakes",
        content: "Earthquakes are sudden movements of the Earth's crust caused by the release of energy that has been stored in rocks. When tectonic plates move past each other, they can get stuck due to friction. When the stress overcomes the friction, energy is released in the form of seismic waves, causing the ground to shake.",
        duration: 8,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-2", 
        title: "Earthquake Hazards",
        content: "The primary hazards from earthquakes include ground shaking, surface rupture, landslides, liquefaction, and tsunamis. Ground shaking is the most widespread hazard and can cause buildings to collapse, bridges to fail, and infrastructure to be damaged.",
        duration: 6,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-3",
        title: "Drop, Cover, and Hold On",
        content: "The internationally recognized response to earthquake shaking is 'Drop, Cover, and Hold On.' When you feel shaking, immediately drop to your hands and knees, take cover under a sturdy desk or table, and hold on to your shelter while protecting your head and neck.",
        duration: 5,
        videoUrl: "/api/placeholder/video"
      },
      {
        id: "lesson-4",
        title: "Safe Locations During Earthquakes",
        content: "The safest places during an earthquake are under sturdy furniture, against interior walls away from heavy objects, or in interior doorways of well-constructed buildings. Avoid windows, mirrors, heavy furniture, and exterior walls.",
        duration: 4,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-5",
        title: "Emergency Preparedness Kit",
        content: "Every household should have an earthquake emergency kit containing: water (1 gallon per person per day for 3 days), non-perishable food for 3 days, battery-powered radio, flashlight, first aid kit, extra batteries, whistle, dust mask, plastic sheeting, moist towelettes, wrench to turn off utilities, and copies of important documents.",
        duration: 7,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-6",
        title: "After the Earthquake",
        content: "After shaking stops, check for injuries and hazards. Be prepared for aftershocks. If you're trapped, stay calm and make noise to attract rescuers. If you can evacuate safely, do so carefully. Check gas, water, and electrical lines for damage.",
        duration: 6,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-7",
        title: "Building Safety and Codes",
        content: "Modern building codes require structures to be designed to withstand earthquakes. Retrofitting older buildings can significantly improve their earthquake resistance. Learn about your building's construction and whether it meets current seismic standards.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-8",
        title: "Community Preparedness",
        content: "Community-wide preparedness includes early warning systems, evacuation routes, emergency shelters, and communication plans. Get involved in your community's earthquake preparedness efforts and know your local emergency procedures.",
        duration: 4,
        imageUrl: "/api/placeholder/600/300"
      }
    ]
  },
  {
    id: "fire-response",
    title: "Fire Emergency Response",
    description: "Comprehensive fire safety, prevention, and evacuation procedures",
    category: "fire",
    difficulty: "Beginner", 
    duration: "35 min",
    lessons: 6,
    icon: "🔥",
    rating: 4.9,
    enrolled: 2156,
    regionSpecific: ["Building Types", "Climate Factors"],
    content: [
      {
        id: "lesson-1",
        title: "Fire Safety Basics",
        content: "Fire requires three elements: heat, fuel, and oxygen (the fire triangle). Remove any one of these elements and the fire will extinguish. Understanding this principle is key to both preventing and fighting fires.",
        duration: 6,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-2",
        title: "Types of Fires and Extinguishers",
        content: "There are five classes of fires: Class A (ordinary combustibles), Class B (flammable liquids), Class C (electrical), Class D (metals), and Class K (cooking oils). Each requires different suppression methods and extinguisher types.",
        duration: 7,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-3",
        title: "Fire Detection Systems",
        content: "Smoke detectors, heat detectors, and fire alarm systems are your first line of defense. Test smoke detectors monthly and replace batteries annually. Know the sound of your building's fire alarm.",
        duration: 5,
        videoUrl: "/api/placeholder/video"
      },
      {
        id: "lesson-4",
        title: "Evacuation Procedures",
        content: "Know all exits from your building. Stay low to avoid smoke. Feel doors before opening - hot doors may have fire behind them. Never use elevators during a fire. Meet at designated assembly points.",
        duration: 6,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-5",
        title: "Using Fire Extinguishers",
        content: "Remember PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep from side to side. Only fight small fires - if the fire is larger than you, evacuate immediately.",
        duration: 6,
        videoUrl: "/api/placeholder/video"  
      },
      {
        id: "lesson-6",
        title: "Fire Prevention",
        content: "Keep flammable materials away from heat sources. Maintain electrical systems and appliances. Have escape plans and practice them. Install and maintain smoke detectors and fire extinguishers.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      }
    ]
  },
  {
    id: "flood-preparedness",
    title: "Flood Preparedness & Response", 
    description: "Understanding flood risks and implementing safety measures",
    category: "flood",
    difficulty: "Intermediate",
    duration: "50 min",
    lessons: 9,
    icon: "🌊",
    rating: 4.7,
    enrolled: 987,
    regionSpecific: ["Coastal Areas", "River Basins"],
    content: [
      {
        id: "lesson-1",
        title: "Understanding Flood Risks",
        content: "Floods can occur anywhere, but some areas are at higher risk. Learn about flash floods, river floods, coastal floods, and urban flooding. Understand your area's flood history and risk level.",
        duration: 6,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-2",
        title: "Flood Warning Systems",
        content: "Learn about flood watches vs. flood warnings, weather alert systems, and emergency broadcast systems. Sign up for local emergency alerts and weather apps.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-3",
        title: "Before the Flood",
        content: "Create a family emergency plan, assemble an emergency kit, know evacuation routes, secure your property, and purchase flood insurance well in advance.",
        duration: 7,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-4",
        title: "During a Flood",
        content: "Never drive through flooded roads - 'Turn Around, Don't Drown.' Move to higher ground immediately. Avoid walking in moving water. Listen to emergency broadcasts for updates.",
        duration: 6,
        videoUrl: "/api/placeholder/video"
      },
      {
        id: "lesson-5",
        title: "Water Safety",
        content: "Just 6 inches of moving water can knock you down. 12 inches can carry away a vehicle. Floodwater may contain dangerous debris, chemicals, or sewage. Avoid contact when possible.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-6",
        title: "Evacuation Procedures",
        content: "Know your evacuation zone and routes. Leave early - don't wait for mandatory evacuation orders. Take your emergency kit and important documents. Secure your home before leaving.",
        duration: 6,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-7",
        title: "Sheltering in Place",
        content: "If evacuation isn't possible, move to the highest floor. Stay away from electrical outlets and appliances. Have emergency supplies including water, food, and communication devices.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-8",
        title: "After the Flood",
        content: "Wait for authorities to declare the area safe. Be aware of ongoing dangers like contaminated water, damaged buildings, and gas leaks. Document damage for insurance claims.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      },
      {
        id: "lesson-9",
        title: "Recovery and Cleanup",
        content: "Clean and disinfect everything that was touched by floodwater. Remove water and dry the building quickly to prevent mold. Take photos before cleaning for insurance purposes.",
        duration: 5,
        imageUrl: "/api/placeholder/600/300"
      }
    ]
  }
];

export const quizQuestions: Record<string, QuizQuestion[]> = {
  "earthquake-basics": [
    {
      id: 1,
      question: "What is the recommended action during earthquake shaking?",
      options: [
        "Run outside immediately",
        "Stand in a doorway", 
        "Drop, Cover, and Hold On",
        "Call for help first"
      ],
      correct: 2,
      explanation: "Drop, Cover, and Hold On is the internationally recognized response to earthquake shaking.",
      points: 10
    },
    {
      id: 2,
      question: "Which location is safest during an earthquake if you're indoors?",
      options: [
        "Under a sturdy desk or table",
        "Near a window",
        "In an elevator", 
        "Against an interior wall without heavy objects"
      ],
      correct: 0,
      explanation: "A sturdy desk or table provides protection from falling objects and debris.",
      points: 10
    },
    {
      id: 3,
      question: "How long should you hold your earthquake position?",
      options: [
        "Until the shaking stops",
        "For exactly 30 seconds",
        "Until help arrives",
        "Until the shaking stops and a few seconds after"
      ],
      correct: 3,
      explanation: "Hold your position until shaking stops completely and a few seconds after to ensure it's over.",
      points: 10
    },
    {
      id: 4,
      question: "What should be in your earthquake emergency kit?",
      options: [
        "Only water and food",
        "Water, food, first aid, flashlight, radio, and batteries",
        "Just a flashlight",
        "Only important documents"
      ],
      correct: 1,
      explanation: "A comprehensive kit includes water, non-perishable food, first aid supplies, flashlight, battery-powered radio, extra batteries, and other essentials.",
      points: 10
    },
    {
      id: 5,
      question: "If you're driving during an earthquake, you should:",
      options: [
        "Speed up to get home quickly",
        "Stop under a bridge or overpass",
        "Pull over safely away from bridges and power lines",
        "Keep driving normally"
      ],
      correct: 2,
      explanation: "Pull over safely away from bridges, overpasses, and power lines, then stay in your vehicle.",
      points: 10
    }
  ],
  "fire-response": [
    {
      id: 1,
      question: "What three elements make up the fire triangle?",
      options: [
        "Heat, fuel, and oxygen",
        "Heat, water, and air",
        "Fuel, smoke, and flame",
        "Oxygen, carbon dioxide, and heat"
      ],
      correct: 0,
      explanation: "Fire requires heat, fuel, and oxygen. Remove any one element and the fire will extinguish.",
      points: 10
    },
    {
      id: 2,
      question: "What does PASS stand for when using a fire extinguisher?",
      options: [
        "Point, Aim, Squeeze, Spray",
        "Pull, Aim, Squeeze, Sweep",
        "Push, Activate, Start, Stop", 
        "Prepare, Assess, Squeeze, Spray"
      ],
      correct: 1,
      explanation: "PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep from side to side.",
      points: 10
    },
    {
      id: 3,
      question: "During a fire evacuation, you should:",
      options: [
        "Use elevators for faster escape",
        "Stand upright and walk normally",
        "Stay low and use stairs",
        "Stop to gather belongings"
      ],
      correct: 2,
      explanation: "Stay low to avoid smoke inhalation and always use stairs, never elevators during a fire.",
      points: 10
    },
    {
      id: 4,
      question: "How often should you test smoke detectors?",
      options: [
        "Once a year",
        "Once a month",
        "Once a week",
        "Only when batteries are low"
      ],
      correct: 1,
      explanation: "Test smoke detectors monthly to ensure they're working properly.",
      points: 10
    },
    {
      id: 5,
      question: "What type of fire extinguisher is used for electrical fires?",
      options: [
        "Class A",
        "Class B", 
        "Class C",
        "Class D"
      ],
      correct: 2,
      explanation: "Class C extinguishers are designed for electrical fires and won't conduct electricity.",
      points: 10
    }
  ]
};

// Student mock data for admin dashboard
export const mockStudentData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    class: 'Safety 101',
    modulesCompleted: 3,
    totalModules: 6,
    averageScore: 92,
    lastActive: '2024-01-15',
    preparednessScore: 88,
    badges: 5
  },
  {
    id: '2', 
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    class: 'Emergency Response',
    modulesCompleted: 5,
    totalModules: 6,
    averageScore: 85,
    lastActive: '2024-01-14',
    preparednessScore: 92,
    badges: 7
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@university.edu', 
    class: 'Safety 101',
    modulesCompleted: 2,
    totalModules: 6,
    averageScore: 78,
    lastActive: '2024-01-13',
    preparednessScore: 75,
    badges: 3
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    class: 'Advanced Safety',
    modulesCompleted: 6,
    totalModules: 6,
    averageScore: 96,
    lastActive: '2024-01-15',
    preparednessScore: 98,
    badges: 12
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom.brown@university.edu',
    class: 'Emergency Response', 
    modulesCompleted: 4,
    totalModules: 6,
    averageScore: 82,
    lastActive: '2024-01-12',
    preparednessScore: 80,
    badges: 6
  }
];