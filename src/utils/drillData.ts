export interface DrillChoice {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface DrillStep {
  id: number;
  title: string;
  description: string;
  visual: string;
  choices: DrillChoice[];
  timeLimit: number;
  points: number;
}

export interface Drill {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  duration: string;
  scenario: string;
  color: string;
  steps: DrillStep[];
}

export const drills: Drill[] = [
  {
    id: "earthquake-drill",
    title: "Earthquake Response Drill",
    description: "Practice the Drop, Cover, and Hold On procedure",
    icon: "🌍",
    difficulty: "Essential",
    duration: "5-10 minutes",
    scenario: "You're in a classroom when sudden shaking begins",
    color: "primary",
    steps: [
      {
        id: 1,
        title: "Initial Response",
        description: "You feel the ground shaking. What's your immediate response?",
        visual: "Classroom with desks and students",
        choices: [
          { 
            id: "a", 
            text: "Run outside immediately", 
            correct: false, 
            feedback: "Running during shaking increases injury risk from falling objects." 
          },
          { 
            id: "b", 
            text: "Drop, Cover, and Hold On", 
            correct: true, 
            feedback: "Correct! This is the proper earthquake response." 
          },
          { 
            id: "c", 
            text: "Stand in the doorway", 
            correct: false, 
            feedback: "Doorways aren't safer than other locations in modern buildings." 
          },
          { 
            id: "d", 
            text: "Call for help first", 
            correct: false, 
            feedback: "Your safety comes first - take protective action immediately." 
          }
        ],
        timeLimit: 10,
        points: 25
      },
      {
        id: 2,
        title: "Taking Cover",
        description: "You've dropped down. Where do you take cover?",
        visual: "Under desk with proper positioning",
        choices: [
          { 
            id: "a", 
            text: "Under the nearest sturdy desk", 
            correct: true, 
            feedback: "Perfect! Sturdy furniture provides protection from falling objects." 
          },
          { 
            id: "b", 
            text: "Against the wall", 
            correct: false, 
            feedback: "Walls may have heavy objects that could fall." 
          },
          { 
            id: "c", 
            text: "In the center of the room", 
            correct: false, 
            feedback: "You're exposed to falling objects from all directions." 
          },
          { 
            id: "d", 
            text: "Near the windows", 
            correct: false, 
            feedback: "Glass can shatter and cause serious injury." 
          }
        ],
        timeLimit: 8,
        points: 25
      },
      {
        id: 3,
        title: "Hold On Position",
        description: "How do you maintain your protective position?",
        visual: "Proper hold-on technique demonstration",
        choices: [
          { 
            id: "a", 
            text: "Curl up in a ball", 
            correct: false, 
            feedback: "This doesn't provide protection if your cover moves." 
          },
          { 
            id: "b", 
            text: "Hold onto the desk leg and cover your head", 
            correct: true, 
            feedback: "Excellent! This keeps your protection in place and shields vital areas." 
          },
          { 
            id: "c", 
            text: "Lie flat on your stomach", 
            correct: false, 
            feedback: "This position doesn't allow you to maintain cover." 
          },
          { 
            id: "d", 
            text: "Sit up and look around", 
            correct: false, 
            feedback: "Stay low and covered to protect from falling debris." 
          }
        ],
        timeLimit: 8,
        points: 25
      },
      {
        id: 4,
        title: "After Shaking Stops",
        description: "The shaking has stopped. What's your next action?",
        visual: "Post-earthquake assessment and evacuation",
        choices: [
          { 
            id: "a", 
            text: "Immediately run outside", 
            correct: false, 
            feedback: "Check for hazards first - aftershocks may occur." 
          },
          { 
            id: "b", 
            text: "Take photos for social media", 
            correct: false, 
            feedback: "Focus on safety, not documentation." 
          },
          { 
            id: "c", 
            text: "Check for injuries and hazards, then evacuate if necessary", 
            correct: true, 
            feedback: "Perfect! Safety assessment before movement is crucial." 
          },
          { 
            id: "d", 
            text: "Go back to normal activities", 
            correct: false, 
            feedback: "Always evacuate to check for building damage and aftershocks." 
          }
        ],
        timeLimit: 12,
        points: 25
      }
    ]
  },
  {
    id: "fire-evacuation",
    title: "Fire Evacuation Drill",
    description: "Learn proper evacuation routes and procedures",
    icon: "🔥",
    difficulty: "Essential",
    duration: "8-12 minutes",
    scenario: "Fire alarm sounds in your building",
    color: "emergency",
    steps: [
      {
        id: 1,
        title: "Alarm Response",
        description: "The fire alarm is sounding. What should you do first?",
        visual: "Fire alarm and evacuation route signs",
        choices: [
          { 
            id: "a", 
            text: "Gather all belongings", 
            correct: false, 
            feedback: "Leave belongings behind - time is critical in a fire emergency." 
          },
          { 
            id: "b", 
            text: "Check if it's a real fire", 
            correct: false, 
            feedback: "Always treat fire alarms as real emergencies." 
          },
          { 
            id: "c", 
            text: "Immediately begin evacuation", 
            correct: true, 
            feedback: "Correct! Start evacuation immediately when the alarm sounds." 
          },
          { 
            id: "d", 
            text: "Wait for instructions", 
            correct: false, 
            feedback: "Don't wait - begin evacuation immediately." 
          }
        ],
        timeLimit: 8,
        points: 25
      },
      {
        id: 2,
        title: "Evacuation Route",
        description: "Which route should you take to evacuate?",
        visual: "Building layout with multiple exits",
        choices: [
          { 
            id: "a", 
            text: "The elevator for speed", 
            correct: false, 
            feedback: "Never use elevators during a fire - they may malfunction or trap you." 
          },
          { 
            id: "b", 
            text: "Nearest exit stairs", 
            correct: true, 
            feedback: "Always use the nearest exit stairs, not elevators." 
          },
          { 
            id: "c", 
            text: "Wait for firefighters", 
            correct: false, 
            feedback: "Evacuate immediately using stairs." 
          },
          { 
            id: "d", 
            text: "The main entrance only", 
            correct: false, 
            feedback: "Use the nearest exit, which may not be the main entrance." 
          }
        ],
        timeLimit: 10,
        points: 25
      },
      {
        id: 3,
        title: "Smoke Encounter",
        description: "You encounter smoke in the stairwell. What do you do?",
        visual: "Smoke-filled stairwell",
        choices: [
          { 
            id: "a", 
            text: "Run through quickly", 
            correct: false, 
            feedback: "Running through smoke is dangerous due to toxic gases." 
          },
          { 
            id: "b", 
            text: "Go back and find another exit", 
            correct: true, 
            feedback: "Find an alternate route if possible, or stay low if you must pass through." 
          },
          { 
            id: "c", 
            text: "Cover face and proceed normally", 
            correct: false, 
            feedback: "Find another route first, or stay very low if no other option." 
          },
          { 
            id: "d", 
            text: "Wait for help", 
            correct: false, 
            feedback: "Find an alternate evacuation route if available." 
          }
        ],
        timeLimit: 12,
        points: 25
      },
      {
        id: 4,
        title: "Assembly Point",
        description: "You've evacuated the building. Where should you go?",
        visual: "Designated assembly point outside building",
        choices: [
          { 
            id: "a", 
            text: "Go home immediately", 
            correct: false, 
            feedback: "Report to the designated assembly point first." 
          },
          { 
            id: "b", 
            text: "Stand near the building", 
            correct: false, 
            feedback: "Stay well away from the building at the designated meeting point." 
          },
          { 
            id: "c", 
            text: "Go to the designated assembly point", 
            correct: true, 
            feedback: "Perfect! Report to the designated assembly point for accountability." 
          },
          { 
            id: "d", 
            text: "Help others evacuate", 
            correct: false, 
            feedback: "Let trained personnel handle rescue - ensure your own safety first." 
          }
        ],
        timeLimit: 10,
        points: 25
      }
    ]
  },
  {
    id: "tornado-shelter",
    title: "Tornado Shelter Drill",
    description: "Practice taking shelter during severe weather",
    icon: "🌪️",
    difficulty: "Regional",
    duration: "6-8 minutes",
    scenario: "Tornado warning issued for your area",
    color: "warning",
    steps: [
      {
        id: 1,
        title: "Warning Received",
        description: "A tornado warning has been issued. What's your first action?",
        visual: "Weather alert on phone and sirens",
        choices: [
          { 
            id: "a", 
            text: "Go outside to look for the tornado", 
            correct: false, 
            feedback: "Never go outside during a tornado warning - seek shelter immediately." 
          },
          { 
            id: "b", 
            text: "Seek shelter immediately", 
            correct: true, 
            feedback: "Correct! Seek shelter in the safest available location immediately." 
          },
          { 
            id: "c", 
            text: "Drive away from the area", 
            correct: false, 
            feedback: "Don't try to outrun a tornado in a vehicle - find sturdy shelter." 
          },
          { 
            id: "d", 
            text: "Open windows to equalize pressure", 
            correct: false, 
            feedback: "This is a myth - focus on getting to safe shelter quickly." 
          }
        ],
        timeLimit: 8,
        points: 25
      },
      {
        id: 2,
        title: "Shelter Location",
        description: "Where is the safest place to shelter in a building?",
        visual: "Building cross-section showing safe areas",
        choices: [
          { 
            id: "a", 
            text: "Basement or lowest floor, interior room", 
            correct: true, 
            feedback: "Perfect! Basements or lowest floors in interior rooms are safest." 
          },
          { 
            id: "b", 
            text: "Upper floors away from ground debris", 
            correct: false, 
            feedback: "Upper floors are more dangerous due to wind exposure." 
          },
          { 
            id: "c", 
            text: "Near large windows to see outside", 
            correct: false, 
            feedback: "Stay away from windows - they can shatter from wind pressure." 
          },
          { 
            id: "d", 
            text: "In a vehicle", 
            correct: false, 
            feedback: "Vehicles offer little protection - seek sturdy building shelter." 
          }
        ],
        timeLimit: 10,
        points: 25
      }
    ]
  },
  {
    id: "lockdown-procedure",
    title: "Lockdown Procedure Drill",
    description: "Security threat response and safe room procedures",
    icon: "🔒",
    difficulty: "Critical",
    duration: "10-15 minutes",
    scenario: "Security threat reported on campus",
    color: "emergency",
    steps: [
      {
        id: 1,
        title: "Lockdown Alert",
        description: "A lockdown has been announced. What should you do first?",
        visual: "Lockdown alert notification",
        choices: [
          { 
            id: "a", 
            text: "Investigate what's happening", 
            correct: false, 
            feedback: "Don't investigate - follow lockdown procedures immediately." 
          },
          { 
            id: "b", 
            text: "Lock doors and secure the area", 
            correct: true, 
            feedback: "Correct! Immediately lock doors and secure your location." 
          },
          { 
            id: "c", 
            text: "Try to leave the building", 
            correct: false, 
            feedback: "Only evacuate if you can do so safely without exposure to danger." 
          },
          { 
            id: "d", 
            text: "Call family and friends", 
            correct: false, 
            feedback: "Secure your area first, then follow communication protocols." 
          }
        ],
        timeLimit: 8,
        points: 25
      },
      {
        id: 2,
        title: "Room Security",
        description: "How do you secure your room during lockdown?",
        visual: "Classroom with security measures",
        choices: [
          { 
            id: "a", 
            text: "Turn off lights, lock doors, stay quiet", 
            correct: true, 
            feedback: "Perfect! Make the room appear empty and unoccupied." 
          },
          { 
            id: "b", 
            text: "Keep lights on to see clearly", 
            correct: false, 
            feedback: "Turn off lights to avoid drawing attention to your location." 
          },
          { 
            id: "c", 
            text: "Stand near the door to listen", 
            correct: false, 
            feedback: "Stay away from doors and windows, find the safest spot in the room." 
          },
          { 
            id: "d", 
            text: "Try to communicate with others", 
            correct: false, 
            feedback: "Remain silent to avoid detection." 
          }
        ],
        timeLimit: 10,
        points: 25
      }
    ]
  }
];

export const getDrillById = (id: string): Drill | undefined => {
  return drills.find(drill => drill.id === id);
};