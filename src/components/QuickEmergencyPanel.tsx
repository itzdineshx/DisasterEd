import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, AlertTriangle, MapPin, X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyContact {
  name: string;
  number: string;
  type: 'emergency' | 'fire' | 'medical' | 'disaster' | 'women' | 'child';
  color: string;
}

const QuickEmergencyPanel: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const emergencyContacts: EmergencyContact[] = [
    { name: 'Police', number: '100', type: 'emergency', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Fire', number: '101', type: 'fire', color: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'Ambulance', number: '102', type: 'medical', color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Disaster Mgmt', number: '108', type: 'disaster', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Women Helpline', number: '1091', type: 'women', color: 'bg-pink-500 hover:bg-pink-600' },
    { name: 'Child Helpline', number: '1098', type: 'child', color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className={cn(
        "bg-white/95 backdrop-blur-sm border-2 border-red-200 shadow-lg transition-all duration-300",
        isMinimized ? "h-16" : "h-auto"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Quick Emergency Access
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {emergencyContacts.slice(0, 4).map((contact, index) => (
                <Button
                  key={index}
                  size="sm"
                  className={cn("text-white text-xs h-8", contact.color)}
                  onClick={() => window.open(`tel:${contact.number}`)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {contact.name} {contact.number}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {emergencyContacts.slice(4).map((contact, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 border-gray-300"
                  onClick={() => window.open(`tel:${contact.number}`)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {contact.name}: {contact.number}
                </Button>
              ))}
            </div>
            
            <div className="pt-2 border-t">
              <Badge variant="secondary" className="text-xs w-full justify-center">
                🗺️ Emergency Map Available
              </Badge>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default QuickEmergencyPanel;