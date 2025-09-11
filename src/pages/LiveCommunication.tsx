import { useState, useEffect, useRef } from "react";
import { Send, Phone, Users, AlertTriangle, Shield, Clock, MessageSquare, UserCheck, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'teacher' | 'admin' | 'officer' | 'parent';
  content: string;
  timestamp: Date;
  channel: string;
  priority: 'normal' | 'urgent' | 'emergency';
  readBy: string[];
}

interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin' | 'officer' | 'parent';
  status: 'online' | 'offline' | 'busy';
  lastSeen?: Date;
}

interface EmergencyBroadcast {
  id: string;
  title: string;
  message: string;
  sender: string;
  timestamp: Date;
  channels: string[];
  acknowledged: string[];
}

const LiveCommunication = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [broadcasts, setBroadcasts] = useState<EmergencyBroadcast[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock users
  const mockUsers: User[] = [
    { id: '1', name: 'John Doe', role: 'student', status: 'online' },
    { id: '2', name: 'Jane Smith', role: 'teacher', status: 'online' },
    { id: '3', name: 'Admin User', role: 'admin', status: 'online' },
    { id: '4', name: 'Emergency Officer', role: 'officer', status: 'online' },
    { id: '5', name: 'Parent User', role: 'parent', status: 'offline', lastSeen: new Date(Date.now() - 30 * 60 * 1000) },
    { id: '6', name: 'Dr. Wilson', role: 'teacher', status: 'busy' },
  ];

  // Mock initial messages
  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: '3',
      senderName: 'Admin User',
      senderRole: 'admin',
      content: 'Emergency drill scheduled for 2 PM today. All students and staff report to designated assembly areas.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      channel: 'announcements',
      priority: 'urgent',
      readBy: ['1', '2']
    },
    {
      id: '2',
      senderId: '4',
      senderName: 'Emergency Officer',
      senderRole: 'officer',
      content: 'Weather alert: Heavy rain expected. Please avoid outdoor activities.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      channel: 'general',
      priority: 'normal',
      readBy: ['1']
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Jane Smith',
      senderRole: 'teacher',
      content: 'Class 10A students, please carry your emergency contact cards tomorrow.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      channel: 'class-10a',
      priority: 'normal',
      readBy: []
    }
  ];

  // Mock emergency broadcasts
  const mockBroadcasts: EmergencyBroadcast[] = [
    {
      id: '1',
      title: 'Fire Drill Announcement',
      message: 'Mandatory fire drill at 2 PM. Please evacuate via nearest exit when alarm sounds.',
      sender: 'Emergency Team',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      channels: ['all'],
      acknowledged: ['1', '2', '3']
    },
    {
      id: '2',
      title: 'Weather Advisory',
      message: 'Severe weather warning in effect. All outdoor activities suspended until further notice.',
      sender: 'Admin Office',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      channels: ['general', 'staff'],
      acknowledged: ['2', '3', '4']
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
    setOnlineUsers(mockUsers);
    setBroadcasts(mockBroadcasts);

    // Simulate real-time messages
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance
        const newMsg: Message = {
          id: Date.now().toString(),
          senderId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
          senderName: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
          senderRole: mockUsers[Math.floor(Math.random() * mockUsers.length)].role,
          content: [
            'Is everyone safe in Building A?',
            'Emergency supplies are ready in the main office.',
            'Assembly point head count completed.',
            'All clear signal received from security.',
            'Medical team is on standby.'
          ][Math.floor(Math.random() * 5)],
          timestamp: new Date(),
          channel: activeChannel,
          priority: Math.random() > 0.8 ? 'urgent' : 'normal',
          readBy: []
        };
        setMessages(prev => [...prev, newMsg]);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [activeChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      senderRole: user.role,
      content: newMessage,
      timestamp: new Date(),
      channel: activeChannel,
      priority: 'normal',
      readBy: []
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const acknowledgeBroadcast = (broadcastId: string) => {
    if (!user) return;
    
    setBroadcasts(prev => 
      prev.map(broadcast => 
        broadcast.id === broadcastId 
          ? { ...broadcast, acknowledged: [...broadcast.acknowledged, user.id] }
          : broadcast
      )
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-emergency';
      case 'officer': return 'text-warning';
      case 'teacher': return 'text-primary';
      case 'parent': return 'text-safe';
      case 'student': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'officer': return 'Officer';
      case 'teacher': return 'Teacher';
      case 'parent': return 'Parent';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'border-l-emergency bg-emergency/5';
      case 'urgent': return 'border-l-warning bg-warning/5';
      case 'normal': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const filteredMessages = messages.filter(msg => msg.channel === activeChannel);

  const channels = [
    { id: 'general', name: 'General', count: messages.filter(m => m.channel === 'general').length },
    { id: 'announcements', name: 'Announcements', count: messages.filter(m => m.channel === 'announcements').length },
    { id: 'emergency', name: 'Emergency', count: messages.filter(m => m.channel === 'emergency').length },
    { id: 'staff', name: 'Staff Only', count: messages.filter(m => m.channel === 'staff').length },
    { id: 'class-10a', name: 'Class 10A', count: messages.filter(m => m.channel === 'class-10a').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <header className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8" />
              <span className="font-bold text-xl">Live Communication</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${isConnected ? 'bg-safe/20' : 'bg-emergency/20'}`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-safe animate-pulse' : 'bg-emergency'}`}></div>
                <span className="text-sm">{isConnected ? 'Connected' : 'Offline'}</span>
              </div>
              <Button variant="secondary" asChild>
                <Link to="/emergency">Back to Emergency</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/emergency" className="hover:text-primary">Emergency</Link>
          <span>/</span>
          <span>Live Communication</span>
        </div>
        {/* Emergency Broadcasts */}
        {broadcasts.some(b => !b.acknowledged.includes(user?.id || '')) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-emergency" />
              Emergency Broadcasts
            </h2>
            <div className="space-y-4">
              {broadcasts.filter(b => !b.acknowledged.includes(user?.id || '')).map((broadcast) => (
                <Alert key={broadcast.id} className="border-emergency/20 bg-emergency/5">
                  <AlertTriangle className="h-4 w-4 text-emergency" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-emergency mb-1">{broadcast.title}</h3>
                        <p className="text-foreground mb-2">{broadcast.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{broadcast.sender}</span>
                          <span>{broadcast.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => acknowledgeBroadcast(broadcast.id)}
                        className="ml-4"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Acknowledge
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Online Users */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Online Users ({onlineUsers.filter(u => u.status === 'online').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        user.status === 'online' ? 'bg-safe' :
                        user.status === 'busy' ? 'bg-warning' : 'bg-muted'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className={`text-xs ${getRoleColor(user.role)}`}>
                        {getRoleBadge(user.role)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <Tabs value={activeChannel} onValueChange={setActiveChannel}>
                  <TabsList className="grid w-full grid-cols-5">
                    {channels.map((channel) => (
                      <TabsTrigger key={channel.id} value={channel.id} className="flex items-center space-x-1">
                        <span>{channel.name}</span>
                        {channel.count > 0 && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            {channel.count}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col space-y-4">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-4">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className={`border-l-4 p-3 rounded-r-lg ${getPriorityColor(message.priority)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {message.senderName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{message.senderName}</span>
                          <Badge variant="outline" className="text-xs">
                            {getRoleBadge(message.senderRole)}
                          </Badge>
                          {message.priority !== 'normal' && (
                            <Badge 
                              variant={message.priority === 'emergency' ? 'destructive' : 'default'}
                              className="text-xs"
                            >
                              {message.priority.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className={isRecording ? 'bg-emergency text-white' : ''}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-emergency">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Emergency Alert
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-1" />
                      Safety Check
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {filteredMessages.length} messages • {onlineUsers.filter(u => u.status === 'online').length} online
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveCommunication;