export interface ModuleData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  lessons: number;
  progress: number;
  status: string;
  icon: string;
  rating: number;
  enrolled: number;
  regionSpecific: string[];
  completedLessons: number;
  quizScore: number | null;
  badges: string[];
  content?: {
    overview: string;
    objectives: string[];
    sections: {
      title: string;
      content: string;
      keyPoints?: string[];
      resources?: string[];
    }[];
  };
}

export const modulesData: ModuleData[] = [
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
    badges: ["Quick Learner", "Safety First"],
    content: {
      overview: "Earthquakes are natural phenomena caused by the sudden release of energy in Earth's crust. Understanding earthquake science and safety measures is crucial for everyone living in seismic zones. This module covers the fundamentals of earthquake preparedness, response, and recovery.",
      objectives: [
        "Understand the causes and types of earthquakes",
        "Learn the Drop, Cover, and Hold On technique",
        "Identify safe spots in different environments",
        "Prepare emergency kits and family emergency plans",
        "Understand building safety and seismic codes",
        "Practice post-earthquake safety procedures"
      ],
      sections: [
        {
          title: "Understanding Earthquakes",
          content: "Earthquakes occur when tectonic plates shift and release energy along fault lines. The strength of an earthquake is measured using the Richter scale, and the effects are assessed using the Modified Mercalli Intensity scale.",
          keyPoints: [
            "Tectonic plate movement causes earthquakes",
            "Fault lines are areas of weakness in Earth's crust",
            "Magnitude scales measure earthquake strength",
            "Seismic waves travel through the ground",
            "Aftershocks can occur after the main quake"
          ]
        },
        {
          title: "Drop, Cover, and Hold On",
          content: "The internationally recognized response technique for earthquake shaking is Drop, Cover, and Hold On. This method protects you from falling objects and flying debris during shaking.",
          keyPoints: [
            "Drop immediately to hands and knees",
            "Take cover under a sturdy desk or table",
            "Hold on to your shelter and protect your head",
            "Stay covered until shaking stops completely",
            "If no table available, cover head with arms"
          ]
        },
        {
          title: "Emergency Preparedness",
          content: "Being prepared before an earthquake strikes can save lives and reduce injuries. This includes having emergency supplies, creating family plans, and securing your home.",
          keyPoints: [
            "Create a family emergency plan",
            "Assemble emergency supply kits",
            "Secure heavy furniture and appliances",
            "Know how to shut off utilities",
            "Practice evacuation routes"
          ]
        }
      ]
    }
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
    badges: ["Fire Safety Expert", "Perfect Score"],
    content: {
      overview: "Fire emergencies require quick thinking and proper response techniques. This module covers fire prevention, detection, evacuation procedures, and the proper use of fire safety equipment. Understanding fire behavior and safety protocols can save lives and property.",
      objectives: [
        "Identify fire hazards and prevention methods",
        "Understand different types of fires and extinguishers",
        "Learn evacuation routes and procedures",
        "Practice emergency communication protocols",
        "Understand smoke inhalation risks and prevention",
        "Master the use of fire safety equipment"
      ],
      sections: [
        {
          title: "Fire Prevention",
          content: "Prevention is the most effective protection against fires. Understanding common fire hazards and implementing safety measures can prevent most fire emergencies.",
          keyPoints: [
            "Common fire hazards in home and workplace",
            "Proper storage of flammable materials",
            "Electrical safety and maintenance",
            "Kitchen fire prevention techniques",
            "Smoke detector installation and maintenance"
          ]
        },
        {
          title: "Fire Response: RACE Protocol",
          content: "When fire occurs, every second counts. The RACE protocol (Rescue, Alert, Confine, Extinguish) provides a systematic approach to fire emergency response.",
          keyPoints: [
            "Rescue: Remove people from immediate danger",
            "Alert: Activate fire alarm and call emergency services",
            "Confine: Close doors to contain the fire",
            "Extinguish: Use appropriate fire extinguisher if safe",
            "Evacuate if fire cannot be controlled"
          ]
        }
      ]
    }
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
    badges: ["Water Safety"],
    content: {
      overview: "Floods are among the most common and destructive natural disasters worldwide. This comprehensive module teaches flood risk assessment, preparedness strategies, and response procedures for various flood scenarios.",
      objectives: [
        "Understand different types of floods and their causes",
        "Learn flood warning systems and monitoring",
        "Prepare comprehensive flood emergency kits",
        "Practice safe evacuation procedures",
        "Understand post-flood recovery and safety",
        "Develop flood insurance and documentation strategies"
      ],
      sections: [
        {
          title: "Types of Floods",
          content: "Understanding different flood types helps in preparation and response. Flash floods, river floods, coastal floods, and urban flooding each require specific safety approaches.",
          keyPoints: [
            "Flash floods: Sudden, fast-moving water",
            "River floods: Gradual rise of river water",
            "Coastal floods: Storm surge and high tides",
            "Urban flooding: Overwhelmed drainage systems",
            "Dam failure: Catastrophic water release"
          ]
        },
        {
          title: "Flood Safety and Evacuation",
          content: "Knowing when and how to evacuate during flood conditions can be life-saving. Water safety principles and evacuation planning are essential skills.",
          keyPoints: [
            "Never drive through flooded roads",
            "Six inches of water can knock you down",
            "Turn Around, Don't Drown motto",
            "Have multiple evacuation routes planned",
            "Keep emergency supplies ready to go"
          ]
        }
      ]
    }
  },
  {
    id: "tornado-safety",
    title: "Severe Weather & Tornado Safety",
    description: "Weather monitoring, warning systems, and shelter protocols",
    category: "weather",
    difficulty: "Intermediate",
    duration: "40 min",
    lessons: 7,
    progress: 0,
    status: "not-started",
    icon: "🌪️",
    rating: 4.6,
    enrolled: 543,
    regionSpecific: ["Tornado Alley", "Rural Areas"],
    completedLessons: 0,
    quizScore: null,
    badges: [],
    content: {
      overview: "Tornadoes are among nature's most violent storms. This module covers tornado formation, warning signs, safety procedures, and shelter strategies for various locations and situations.",
      objectives: [
        "Understand tornado formation and classification",
        "Recognize weather patterns and warning signs",
        "Learn proper shelter locations and techniques",
        "Practice tornado drill procedures",
        "Understand post-tornado safety and recovery",
        "Develop weather monitoring and alert systems"
      ],
      sections: [
        {
          title: "Tornado Formation and Signs",
          content: "Tornadoes form when warm, moist air meets cool, dry air under specific atmospheric conditions. Recognizing the signs can provide crucial warning time.",
          keyPoints: [
            "Supercell thunderstorms create tornadoes",
            "Look for rotating wall clouds",
            "Listen for freight train sound",
            "Watch for debris in the air",
            "Green sky color can indicate severe weather"
          ]
        },
        {
          title: "Shelter and Safety Procedures",
          content: "The best protection from tornadoes is a well-built shelter. Knowing where to go and what to do can mean the difference between life and death.",
          keyPoints: [
            "Go to lowest floor of sturdy building",
            "Stay away from windows and doors",
            "Get under heavy furniture if possible",
            "Cover head with hands or blanket",
            "Stay in shelter until all clear is given"
          ]
        }
      ]
    }
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
    badges: ["First Aid Certified"],
    content: {
      overview: "Medical emergencies can occur anywhere, anytime. This advanced module covers essential first aid skills, CPR techniques, and emergency medical response protocols for various scenarios.",
      objectives: [
        "Master basic first aid techniques",
        "Learn CPR and AED procedures",
        "Understand medical emergency assessment",
        "Practice wound care and bleeding control",
        "Learn to recognize medical emergencies",
        "Understand when and how to call for help"
      ],
      sections: [
        {
          title: "Primary Assessment",
          content: "The primary assessment follows the ABCDE approach: Airway, Breathing, Circulation, Disability, and Exposure. This systematic method ensures critical issues are addressed first.",
          keyPoints: [
            "Check for responsiveness",
            "Ensure airway is clear",
            "Look, listen, feel for breathing",
            "Check for pulse and bleeding",
            "Assess for spinal injuries"
          ]
        },
        {
          title: "CPR and AED Use",
          content: "Cardiopulmonary resuscitation (CPR) and automated external defibrillators (AED) can restart the heart and save lives during cardiac emergencies.",
          keyPoints: [
            "30 chest compressions to 2 rescue breaths",
            "Push hard and fast, 100-120 per minute",
            "Allow complete chest recoil",
            "Use AED as soon as available",
            "Continue until emergency services arrive"
          ]
        }
      ]
    }
  },
  {
    id: "cybersecurity-threats",
    title: "Cybersecurity in Crisis Management",
    description: "Digital security during emergencies and crisis communication",
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
    quizScore: null,
    badges: [],
    content: {
      overview: "In today's digital world, cybersecurity threats can compound emergency situations. This module covers digital safety, secure communications, and protecting sensitive information during crisis situations.",
      objectives: [
        "Understand cyber threats during emergencies",
        "Learn secure communication methods",
        "Practice data backup and protection",
        "Understand social engineering in crisis",
        "Learn to identify misinformation",
        "Develop digital emergency response plans"
      ],
      sections: [
        {
          title: "Cyber Threats in Emergencies",
          content: "Cybercriminals often exploit emergency situations to launch attacks. Understanding these threats is the first step in protection.",
          keyPoints: [
            "Phishing emails during crisis events",
            "Fake emergency websites and apps",
            "Social engineering through fear",
            "Ransomware targeting disrupted systems",
            "Misinformation spread through social media"
          ]
        }
      ]
    }
  }
];

export const getModuleById = (id: string): ModuleData | undefined => {
  return modulesData.find(module => module.id === id);
};

export const getModulesByCategory = (category: string): ModuleData[] => {
  if (category === "all") return modulesData;
  return modulesData.filter(module => module.category === category);
};