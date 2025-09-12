import { useState, useEffect, useRef } from "react";
import { Bot, Send, User, X, MessageCircle, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { generateGeminiResponse } from "@/services/geminiService";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
}

const FloatingAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base for responses
  const knowledgeBase = {
    "fire": "🔥 Fire Emergency: Call 911 immediately. Evacuate using nearest exit. Do not use elevators. Proceed to assembly point.",
    "earthquake": "🌍 Earthquake: Drop, Cover, Hold On. Get under sturdy furniture. Stay there until shaking stops.",
    "medical": "🚑 Medical Emergency: Call 911. If trained, provide first aid. Don't move seriously injured persons.",
    "flood": "🌊 Flood Safety: Move to higher ground. Avoid flood waters. Turn around, don't drown!",
    "evacuation": "🚪 Evacuation: Follow posted routes. Go to assembly points. Don't use elevators during emergencies.",
    "first aid": "🏥 Basic First Aid: Check responsiveness, call help, control bleeding with pressure, treat for shock.",
    "emergency kit": "🎒 Emergency Kit: 72-hour supplies - water (1 gal/person/day), food, flashlight, radio, first aid.",
    "help": "I can help with:\n• Emergency procedures (fire, earthquake, medical)\n• First aid techniques\n• Emergency preparedness\n• Evacuation procedures\n• Emergency contacts"
  };

  const quickActions: QuickAction[] = [
    { id: '1', title: 'Fire Emergency', icon: '🔥' },
    { id: '2', title: 'Earthquake', icon: '🌍' },
    { id: '3', title: 'Medical Emergency', icon: '🚑' },
    { id: '4', title: 'Emergency Kit', icon: '🎒' }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: "👋 Hi! I'm your AI Safety Assistant. I can help with emergency procedures, first aid, and disaster preparedness. What do you need help with?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Check for quick emergency keywords first for immediate response
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (message.includes(keyword)) {
        return response;
      }
    }
    
    // Check for emergency numbers
    if (message.includes('emergency number') || message.includes('call') || message.includes('phone')) {
      return "📞 Emergency Numbers:\n• Life-threatening: 911\n• Campus Security: (555) 123-4567\n• Crisis Hotline: 988";
    }
    
    // Use Gemini AI for more complex questions
    try {
      const context = "You are helping with disaster management and emergency preparedness education. Focus on practical, actionable advice for safety and emergency response.";
      return await generateGeminiResponse(userMessage, context);
    } catch (error) {
      console.error('Gemini API error:', error);
      return "I can help with emergency procedures, first aid, and safety planning. Try asking about 'fire emergency', 'earthquake', 'first aid', or 'emergency kit'. You can also use the quick action buttons!";
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = newMessage;
    setNewMessage("");
    setIsTyping(true);

    try {
      const responseContent = await generateBotResponse(messageToProcess);
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to get response. Please try again.');
      
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment, or use the quick action buttons for immediate help.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = async (action: QuickAction) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: action.title,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const responseContent = await generateBotResponse(action.title);
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating quick action response:', error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: knowledgeBase[action.title.toLowerCase() as keyof typeof knowledgeBase] || "I can help with emergency procedures. Please try again.",
        sender: 'bot', 
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all animate-pulse bg-primary hover:bg-primary/90"
        >
          <Bot className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-2">
          <div className="w-4 h-4 bg-safe rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
        <CardHeader className="p-4 border-b bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm">AI Safety Assistant</CardTitle>
              <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                Online
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex flex-col h-[420px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {message.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`p-2 rounded-lg text-sm ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="h-auto p-2 text-xs"
                      >
                        <span className="mr-1">{action.icon}</span>
                        {action.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask about emergency procedures..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-sm"
                  />
                  <Button
                    onClick={sendMessage}
                    size="sm"
                    disabled={!newMessage.trim() || isTyping}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default FloatingAIChatbot;