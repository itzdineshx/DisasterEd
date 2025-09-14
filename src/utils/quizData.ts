export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: "earthquake-basics",
    title: "Earthquake Safety Fundamentals Quiz",
    description: "Test your knowledge of earthquake preparedness and response procedures",
    timeLimit: 1800,
    passingScore: 70,
    totalQuestions: 10,
    questions: [
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
      },
      {
        id: 6,
        question: "Which of these is a common earthquake myth?",
        options: [
          "Earthquakes can happen anywhere",
          "Standing in doorways is the safest action",
          "You should have an emergency kit",
          "Drop, Cover, and Hold On saves lives"
        ],
        correct: 1,
        explanation: "Standing in doorways is outdated advice. Modern doorways aren't stronger than other parts of the house.",
        points: 10
      },
      {
        id: 7,
        question: "What should you do immediately after earthquake shaking stops?",
        options: [
          "Run outside as fast as possible",
          "Check for injuries and hazards, then carefully evacuate if necessary",
          "Take photos for insurance",
          "Turn on all electronics to check for damage"
        ],
        correct: 1,
        explanation: "First check for injuries and hazards, then evacuate carefully if the building is damaged.",
        points: 10
      },
      {
        id: 8,
        question: "How much water should you store per person for emergencies?",
        options: [
          "1 gallon per day for 3 days",
          "1 gallon per day for 7 days",
          "2 gallons per day for 3 days",
          "Half a gallon per day for 3 days"
        ],
        correct: 0,
        explanation: "Store at least 1 gallon of water per person per day for a minimum of 3 days.",
        points: 10
      },
      {
        id: 9,
        question: "Which building type is generally safest during earthquakes?",
        options: [
          "Unreinforced masonry buildings",
          "Modern buildings built to seismic codes",
          "Very tall buildings",
          "Buildings with large windows"
        ],
        correct: 1,
        explanation: "Modern buildings constructed according to current seismic building codes are designed to withstand earthquakes.",
        points: 10
      },
      {
        id: 10,
        question: "What is the 'Triangle of Life' theory?",
        options: [
          "A proven earthquake safety method",
          "A debunked theory not recommended by experts",
          "The official earthquake response protocol",
          "A type of emergency shelter"
        ],
        correct: 1,
        explanation: "The 'Triangle of Life' theory has been debunked by earthquake safety experts and is not recommended.",
        points: 10
      }
    ]
  },
  {
    id: "fire-response",
    title: "Fire Emergency Response Quiz",
    description: "Test your knowledge of fire safety and emergency response procedures",
    timeLimit: 1200,
    passingScore: 75,
    totalQuestions: 8,
    questions: [
      {
        id: 1,
        question: "What does PASS stand for in fire extinguisher operation?",
        options: [
          "Point, Aim, Squeeze, Sweep",
          "Pull, Aim, Squeeze, Sweep",
          "Pull, Activate, Spray, Stop",
          "Position, Aim, Start, Stop"
        ],
        correct: 1,
        explanation: "PASS stands for Pull the pin, Aim at the base, Squeeze the handle, Sweep side to side.",
        points: 12
      },
      {
        id: 2,
        question: "In a building fire, you should:",
        options: [
          "Use the elevator for quick escape",
          "Stay low and use stairs",
          "Wait for help in your room",
          "Break windows for air"
        ],
        correct: 1,
        explanation: "Stay low where air is cleaner, and always use stairs, never elevators during a fire.",
        points: 12
      },
      {
        id: 3,
        question: "If your clothes catch fire, you should:",
        options: [
          "Run to find water",
          "Stop, Drop, and Roll",
          "Remove clothes immediately",
          "Call for help first"
        ],
        correct: 1,
        explanation: "Stop, Drop, and Roll smothers the flames by cutting off oxygen supply.",
        points: 12
      },
      {
        id: 4,
        question: "How often should smoke detector batteries be changed?",
        options: [
          "Every 6 months",
          "Once a year",
          "Every 2 years",
          "When they beep"
        ],
        correct: 1,
        explanation: "Smoke detector batteries should be changed annually, typically when daylight saving time changes.",
        points: 12
      },
      {
        id: 5,
        question: "What is the most common cause of home fires?",
        options: [
          "Electrical issues",
          "Cooking accidents",
          "Heating equipment",
          "Smoking materials"
        ],
        correct: 1,
        explanation: "Cooking is the leading cause of home fires, accounting for almost half of all residential fires.",
        points: 12
      },
      {
        id: 6,
        question: "If you encounter smoke in a hallway, you should:",
        options: [
          "Run through quickly",
          "Find an alternate route",
          "Crawl under the smoke",
          "Wait for it to clear"
        ],
        correct: 1,
        explanation: "Find an alternate escape route. If no other route exists, then crawl low under the smoke.",
        points: 12
      },
      {
        id: 7,
        question: "How long do you typically have to escape a house fire?",
        options: [
          "10-15 minutes",
          "5-7 minutes",
          "2-3 minutes",
          "Less than 2 minutes"
        ],
        correct: 2,
        explanation: "You typically have only 2-3 minutes to escape a house fire once it starts spreading.",
        points: 13
      },
      {
        id: 8,
        question: "Where should you meet after evacuating during a fire?",
        options: [
          "Across the street",
          "At a predetermined meeting point",
          "In the parking lot",
          "Anywhere safe"
        ],
        correct: 1,
        explanation: "Always have a predetermined family meeting point that everyone knows about.",
        points: 13
      }
    ]
  }
];

export const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
};