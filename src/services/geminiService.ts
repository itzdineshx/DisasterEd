// Note: In production, this API key should be stored securely in environment variables
const GEMINI_API_KEY = 'AIzaSyDo2N-1K5Yf4RldYNBIFGQS2H7VnxKqkYA';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Age-appropriate question generation interfaces
export interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
  ageAppropriate: boolean;
  type?: 'single' | 'multiple' | 'scenario' | 'ranking' | 'case-study';
  scenario?: string;
  followUp?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced' | 'expert';
  tags?: string[];
}

export interface GeneratedDrillStep {
  id: number;
  title: string;
  description: string;
  visual: string;
  choices: {
    id: string;
    text: string;
    correct: boolean;
    feedback: string;
    consequences?: string;
  }[];
  timeLimit: number;
  points: number;
  phase?: string;
  prerequisites?: string[];
  followUpActions?: string[];
}

export interface GeneratedModule {
  id: string;
  title: string;
  description: string;
  content: {
    sections: {
      title: string;
      content: string;
      resources: string[];
      exercises?: string[];
      keyPoints?: string[];
      realWorldExamples?: string[];
    }[];
  };
  assessments: GeneratedQuestion[];
}

export type AgeGroup = 'children' | 'teens' | 'young-adults' | 'adults';

export const getAgeGroup = (age: number): AgeGroup => {
  if (age <= 12) return 'children';
  if (age <= 17) return 'teens';
  if (age <= 25) return 'young-adults';
  return 'adults';
};

export const getAgeGroupPrompt = (ageGroup: AgeGroup): string => {
  const prompts = {
    children: 'Use simple language, short sentences, and relatable examples like home, school, and family. Focus on basic safety concepts with visual descriptions.',
    teens: 'Use engaging, challenging language with complex scenarios involving school emergencies, group dynamics, peer leadership, and critical thinking. Include multi-step problems, cause-and-effect analysis, and real-world case studies. Focus on decision-making skills, risk assessment, and emergency leadership among peers.',
    'young-adults': 'Use sophisticated college-level language with advanced problem-solving scenarios. Include complex case studies involving campus emergencies, community resilience, resource management, and leadership responsibilities. Focus on strategic thinking, risk analysis, emergency planning, and professional emergency response protocols.',
    adults: 'Use professional language with workplace scenarios, family responsibility contexts, and community leadership examples.'
  };
  return prompts[ageGroup];
};

export const generateGeminiResponse = async (message: string, context?: string): Promise<string> => {
  try {
    const messages: GeminiMessage[] = [
      {
        role: 'user',
        parts: [{ 
          text: `You are an AI assistant specialized in disaster management and emergency preparedness education. 
          
Your expertise includes:
- Emergency response procedures
- Disaster preparedness planning  
- Safety protocols and best practices
- Risk assessment and mitigation
- Recovery and evacuation procedures
- Natural disaster types and responses
- Emergency supply management
- Communication during emergencies
- First aid and medical emergency basics
- Community disaster resilience

Context: ${context || 'General disaster management consultation'}

User message: ${message}

Please provide helpful, accurate, and actionable advice focused on disaster management and safety. Keep responses concise but comprehensive.` 
        }]
      }
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "I'm sorry, I couldn't generate a response at this time. Please try again.";
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm experiencing technical difficulties. Please try again in a moment.";
  }
};

// Helper function to extract JSON from markdown code blocks
const extractJSONFromMarkdown = (text: string): string => {
  // Remove markdown code block markers
  let cleanedText = text.trim();
  
  // Remove ```json at the beginning
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\s*/, '');
  }
  
  // Remove ``` at the end
  if (cleanedText.endsWith('```')) {
    cleanedText = cleanedText.replace(/\s*```$/, '');
  }
  
  return cleanedText.trim();
};

// Generate age-appropriate quiz questions
export const generateAgeAppropriateQuiz = async (
  topic: string, 
  userAge: number, 
  questionCount?: number
): Promise<GeneratedQuestion[]> => {
  const ageGroup = getAgeGroup(userAge);
  const agePrompt = getAgeGroupPrompt(ageGroup);
  
  // Dynamic question count based on age group
  const defaultQuestionCount = ageGroup === 'teens' ? 12 : 
                              ageGroup === 'young-adults' ? 16 : 
                              ageGroup === 'children' ? 6 : 8;
  const finalQuestionCount = questionCount || defaultQuestionCount;
  
  const complexityPrompt = ageGroup === 'teens' || ageGroup === 'young-adults' ? `

For ${ageGroup}, include these advanced question types:
- Scenario-based questions with multi-step decision making
- Case study analysis requiring critical thinking
- Questions with multiple correct answers requiring ranking
- Complex cause-and-effect relationships
- Real-world application and problem-solving scenarios
- Questions requiring analysis of emergency protocols and procedures

Make questions challenging and thought-provoking while maintaining educational value.` : '';
  
    const prompt = `Generate ${finalQuestionCount} multiple choice questions SPECIFICALLY about "${topic}" for disaster preparedness education.

IMPORTANT: Focus ONLY on "${topic}" - do not include questions about other disaster types.

Target audience: ${ageGroup} (age ${userAge})
Language style: ${agePrompt}${complexityPrompt}

Topic Focus: Ensure all questions are directly related to "${topic}" and its specific procedures and safety measures.

Format each question as a JSON object with this structure:
{
  "id": "unique_id",
  "question": "Question text about ${topic}",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "explanation": "Brief explanation why this answer is correct",
  "points": 10,
  "ageAppropriate": true,
  "type": "single",
  "difficulty": "intermediate",
  "tags": ["${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}", "disaster-preparedness"]
}

Return ONLY a JSON array of ${finalQuestionCount} questions, no additional text or markdown.`;

  try {
    console.log('Generating questions for topic:', topic, 'Age group:', ageGroup);
    const response = await callGeminiAPI(prompt);
    console.log('Raw AI response:', response);
    
    // Extract JSON from markdown code blocks
    const cleanedResponse = extractJSONFromMarkdown(response);
    console.log('Cleaned response:', cleanedResponse);
    
    // Validate that we have a complete JSON response
    if (!cleanedResponse || cleanedResponse.trim().length === 0) {
      console.error('Empty response from AI for topic:', topic);
      return [];
    }
    
    // Check if the response appears to be truncated
    if (!cleanedResponse.trim().endsWith(']') && !cleanedResponse.trim().endsWith('}')) {
      console.error('Response appears truncated for topic:', topic, 'Last 100 chars:', cleanedResponse.slice(-100));
      return [];
    }
    
    const questions = JSON.parse(cleanedResponse);
    console.log('Parsed questions:', questions);
    
    if (Array.isArray(questions) && questions.length > 0) {
      console.log('Successfully generated', questions.length, 'questions for', topic);
      return questions;
    } else {
      console.warn('AI returned empty or invalid questions array for topic:', topic);
      return getBasicFallbackQuestions(topic, finalQuestionCount);
    }
  } catch (error) {
    console.error('Error generating quiz questions for topic:', topic, 'Error:', error);
    console.log('Falling back to basic questions for topic:', topic);
    return getBasicFallbackQuestions(topic, finalQuestionCount);
  }
};

// Basic fallback questions generator
const getBasicFallbackQuestions = (topic: string, count: number): GeneratedQuestion[] => {
  const fallbackQuestions: GeneratedQuestion[] = [
    {
      id: "fallback_1",
      question: `What is the most important first step when preparing for ${topic.toLowerCase()}?`,
      options: [
        "Create an emergency plan",
        "Buy emergency supplies", 
        "Wait for official instructions",
        "Do nothing until it happens"
      ],
      correct: 0,
      explanation: "Creating an emergency plan is the foundation of disaster preparedness.",
      points: 10,
      ageAppropriate: true,
      type: "single",
      difficulty: "basic",
      tags: [topic.toLowerCase().replace(/[^a-z0-9]/g, '-'), "disaster-preparedness"]
    },
    {
      id: "fallback_2", 
      question: `During ${topic.toLowerCase()}, what should you do first to stay safe?`,
      options: [
        "Run outside immediately",
        "Call 911",
        "Follow Drop, Cover, and Hold On protocol",
        "Take photos for social media"
      ],
      correct: 2,
      explanation: "Following proper safety protocols helps protect you from injury.",
      points: 10,
      ageAppropriate: true,
      type: "single", 
      difficulty: "basic",
      tags: [topic.toLowerCase().replace(/[^a-z0-9]/g, '-'), "disaster-preparedness"]
    },
    {
      id: "fallback_3",
      question: `What should be included in an emergency kit for ${topic.toLowerCase()}?`,
      options: [
        "Only food and water",
        "Water, food, first aid, flashlight, and radio",
        "Just a phone charger",
        "Entertainment items only"
      ],
      correct: 1,
      explanation: "A complete emergency kit includes water, food, first aid supplies, flashlight, and communication devices.",
      points: 10,
      ageAppropriate: true,
      type: "single",
      difficulty: "basic", 
      tags: [topic.toLowerCase().replace(/[^a-z0-9]/g, '-'), "disaster-preparedness"]
    }
  ];
  
  return fallbackQuestions.slice(0, Math.min(count, fallbackQuestions.length));
};

// Generate age-appropriate drill scenarios
export const generateAgeAppropriateDrill = async (
  disasterType: string,
  userAge: number,
  stepCount?: number
): Promise<GeneratedDrillStep[]> => {
  const ageGroup = getAgeGroup(userAge);
  const agePrompt = getAgeGroupPrompt(ageGroup);
  
  // Dynamic step count based on age group for more complex scenarios
  const defaultStepCount = ageGroup === 'teens' ? 6 : 
                          ageGroup === 'young-adults' ? 8 : 
                          ageGroup === 'children' ? 3 : 5;
  const finalStepCount = stepCount || defaultStepCount;
  
  const complexityPrompt = ageGroup === 'teens' || ageGroup === 'young-adults' ? `

For ${ageGroup}, create multi-phase scenarios with:
- Complex decision trees with multiple consequences
- Leadership and coordination challenges
- Resource management and prioritization
- Communication and teamwork scenarios
- Risk assessment and mitigation strategies
- Real-world complications and obstacles
- Follow-up actions and recovery planning

Make scenarios realistic, challenging, and require critical thinking and problem-solving skills.` : '';
  
  const prompt = `Generate ${finalStepCount} progressive drill steps for a "${disasterType}" emergency simulation.

IMPORTANT: Focus EXCLUSIVELY on "${disasterType}" emergency scenarios. Do not include steps or procedures for other disaster types.

Target audience: ${ageGroup} (age ${userAge})
Language style: ${agePrompt}${complexityPrompt}

Disaster Type Focus: All drill steps must be specifically designed for "${disasterType}" emergencies and their unique characteristics, procedures, and safety protocols.

Format each step as a JSON object with this exact structure:
{
  "id": 1,
  "title": "Step title specific to ${disasterType}",
  "description": "Detailed scenario description with context and challenges specific to ${disasterType}",
  "visual": "Visual description for the ${disasterType} scenario",
  "choices": [
    {
      "id": "a",
      "text": "Choice text with detailed action for ${disasterType}",
      "correct": true,
      "feedback": "Comprehensive feedback explanation for ${disasterType} response",
      "consequences": "What happens next based on this choice in ${disasterType} context"
    }
  ],
  "timeLimit": 45,
  "points": 15,
  "phase": "Phase name (e.g., 'Assessment', 'Response', 'Recovery')",
  "prerequisites": ["Previous actions or knowledge required for ${disasterType}"],
  "followUpActions": ["Next steps or ongoing responsibilities for ${disasterType}"]
}

Return only a JSON array of drill steps, no additional text. Create a progressive scenario that builds complexity and tests advanced ${disasterType} emergency response skills specifically.`;

  try {
    const response = await callGeminiAPI(prompt);
    
    // Extract JSON from markdown code blocks
    const cleanedResponse = extractJSONFromMarkdown(response);
    
    const steps = JSON.parse(cleanedResponse);
    return Array.isArray(steps) ? steps : [];
  } catch (error) {
    console.error('Error generating drill steps:', error);
    return [];
  }
};

// Generate age-appropriate module content
export const generateAgeAppropriateModule = async (
  topic: string,
  userAge: number,
  sectionCount?: number
): Promise<GeneratedModule> => {
  const ageGroup = getAgeGroup(userAge);
  const agePrompt = getAgeGroupPrompt(ageGroup);
  
  // Dynamic section count based on age group for more comprehensive content
  const defaultSectionCount = ageGroup === 'teens' ? 5 : 
                             ageGroup === 'young-adults' ? 6 : 
                             ageGroup === 'children' ? 3 : 4;
  const finalSectionCount = sectionCount || defaultSectionCount;
  
  const complexityPrompt = ageGroup === 'teens' || ageGroup === 'young-adults' ? `

For ${ageGroup}, include advanced content features:
- Detailed case studies from real emergency situations
- Interactive exercises and practical applications
- Leadership and coordination challenges
- Advanced risk assessment methodologies
- Community resilience and planning strategies
- Technology integration and modern emergency tools
- Research-based best practices and current protocols
- Hands-on activities and group exercises

Create comprehensive, academically rigorous content that challenges critical thinking and practical application skills.` : '';
  
  const assessmentPrompt = ageGroup === 'teens' ? 8 : ageGroup === 'young-adults' ? 10 : 5;
  
  const prompt = `Generate comprehensive educational module content SPECIFICALLY about "${topic}" for disaster preparedness.

IMPORTANT: Focus EXCLUSIVELY on "${topic}" content. Do not include information about other disaster types or emergency topics.

Target audience: ${ageGroup} (age ${userAge})
Language style: ${agePrompt}${complexityPrompt}

Topic Focus: All content sections and assessments must be directly related to "${topic}" and its specific procedures, prevention methods, response protocols, and safety measures.

Format as a JSON object with this exact structure:
{
  "id": "module_${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}",
  "title": "${topic} - Comprehensive Guide",
  "description": "Comprehensive module focused on ${topic} preparedness and response",
  "content": {
    "sections": [
      {
        "title": "Section title related to ${topic}",
        "content": "In-depth educational content with practical examples and real-world applications specific to ${topic}",
        "resources": ["Interactive resource 1 for ${topic}", "Case study 2 about ${topic}", "Practical exercise 3 for ${topic}"],
        "exercises": ["Hands-on activity for ${topic}", "Group discussion topic about ${topic}"],
        "keyPoints": ["Important takeaway 1 about ${topic}", "Critical concept 2 for ${topic}"],
        "realWorldExamples": ["Actual ${topic} emergency scenario", "Historical ${topic} case study"]
      }
    ]
  },
  "assessments": [
    {
      "id": "q1",
      "question": "Comprehensive assessment question about ${topic}",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Detailed explanation with reasoning specific to ${topic}",
      "points": 15,
      "ageAppropriate": true,
      "type": "scenario",
      "difficulty": "advanced",
      "scenario": "Real-world scenario context for ${topic}",
      "tags": ["${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}", "disaster-preparedness"]
    }
  ]
}

Return ONLY the JSON object, no additional text or markdown. Create ${finalSectionCount} sections with ${assessmentPrompt} assessment questions about ${topic}.`;

  try {
    const response = await callGeminiAPI(prompt);
    
    // Extract JSON from markdown code blocks
    const cleanedResponse = extractJSONFromMarkdown(response);
    console.log('Cleaned module response:', cleanedResponse);
    
    const module = JSON.parse(cleanedResponse);
    return module;
  } catch (error) {
    console.error('Error generating module content:', error);
    return {
      id: `module_${Date.now()}`,
      title: `${topic} Module`,
      description: `Learn about ${topic}`,
      content: { sections: [] },
      assessments: []
    };
  }
};

// Helper function to call Gemini API
const callGeminiAPI = async (prompt: string): Promise<string> => {
  const messages: GeminiMessage[] = [
    {
      role: 'user',
      parts: [{ text: prompt }]
    }
  ];

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }),
  });

  if (!response.ok) {
    console.error('Gemini API HTTP error:', response.status, response.statusText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('Gemini API response data:', data);
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    const responseText = data.candidates[0].content.parts[0].text;
    console.log('Gemini response text:', responseText);
    return responseText;
  }
  
  console.error('Gemini API returned no content:', data);
  throw new Error("No response generated");
};