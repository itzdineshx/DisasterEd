// Note: In production, this API key should be stored securely in environment variables
const GEMINI_API_KEY = 'AIzaSyDo2N-1K5Yf4RldYNBIFGQS2H7VnxKqkYA';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

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