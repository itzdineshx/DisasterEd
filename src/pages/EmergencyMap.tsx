import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Phone, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OpenStreetMap from '@/components/OpenStreetMap';
import WeatherWidget from '@/components/WeatherWidget';

const EmergencyMap = () => {
  const navigate = useNavigate();

  const emergencyContacts = [
    { name: 'Police Emergency', number: '100', type: 'emergency' },
    { name: 'Fire Emergency', number: '101', type: 'fire' },
    { name: 'Ambulance Emergency', number: '102', type: 'medical' },
    { name: 'Disaster Management', number: '108', type: 'disaster' },
    { name: 'Women Helpline', number: '1091', type: 'women' },
    { name: 'Child Helpline', number: '1098', type: 'child' },
  ];

  const getContactColor = (type: string) => {
    const colors = {
      emergency: 'bg-red-100 text-red-800',
      fire: 'bg-orange-100 text-orange-800',
      medical: 'bg-green-100 text-green-800',
      disaster: 'bg-blue-100 text-blue-800',
      women: 'bg-pink-100 text-pink-800',
      child: 'bg-purple-100 text-purple-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Emergency Response Map</h1>
            <p className="text-muted-foreground">
              Locate emergency services, evacuation routes, and safety information
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map and Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <OpenStreetMap 
              center={{ lat: 28.6139, lng: 77.2090 }}
              zoom={10}
              onLocationUpdate={(location) => {
                console.log('User location updated:', location);
              }}
            />

            {/* Emergency Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Emergency Response Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-red-800">During an Emergency</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                        Stay calm and assess the situation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                        Call 100 (Police), 101 (Fire), or 102 (Ambulance) for emergencies
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                        Follow evacuation routes marked on the map
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                        Proceed to designated assembly points
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-blue-800">Using This Map</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                        🏠 Green markers show emergency shelters
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                        🏥 Red markers indicate hospitals
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                        🚨 Yellow markers are evacuation routes
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                        ⚠️ Red markers warn of hazardous areas
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget showAlerts={true} />

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{contact.name}</h4>
                      <p className="text-lg font-bold text-primary">{contact.number}</p>
                    </div>
                    <Badge className={`text-xs ${getContactColor(contact.type)}`}>
                      {contact.type.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => window.open('tel:100')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call 100 (Police)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate('/emergency')}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Procedures
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate('/modules')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Practice Evacuation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyMap;