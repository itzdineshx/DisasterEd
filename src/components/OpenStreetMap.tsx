import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Zap, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  name: string;
  type: 'shelter' | 'hospital' | 'fire_station' | 'police' | 'school' | 'evacuation' | 'hazard' | 'current';
  description?: string;
  phone?: string;
}

interface OpenStreetMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  locations?: Location[];
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

// Custom icons for different location types
const createCustomIcon = (type: string, emoji: string) => {
  const colors = {
    shelter: '#10B981',
    hospital: '#EF4444', 
    fire_station: '#F59E0B',
    police: '#3B82F6',
    school: '#8B5CF6',
    evacuation: '#F59E0B',
    hazard: '#DC2626',
    current: '#06B6D4'
  };

  const color = colors[type as keyof typeof colors] || '#6B7280';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const LocationUpdater: React.FC<{ center: { lat: number; lng: number } }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom());
  }, [center, map]);

  return null;
};

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ 
  center = { lat: 28.6139, lng: 77.2090 }, // New Delhi, India
  zoom = 10,
  locations = [],
  onLocationUpdate 
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);

  // Sample Indian emergency locations
  const indianEmergencyLocations: Location[] = [
    {
      lat: 28.6139,
      lng: 77.2090,
      name: "AIIMS Hospital Delhi",
      type: 'hospital',
      description: "Premier medical institute with 24/7 emergency services",
      phone: "011-26588500"
    },
    {
      lat: 28.6328,
      lng: 77.2197,
      name: "Red Fort Fire Station",
      type: 'fire_station',
      description: "Central Delhi Fire Station",
      phone: "101"
    },
    {
      lat: 28.6289,
      lng: 77.2065,
      name: "Connaught Place Police Station",
      type: 'police',
      description: "Central District Police Station",
      phone: "100"
    },
    {
      lat: 28.5494,
      lng: 77.2001,
      name: "Safdarjung Hospital",
      type: 'hospital',
      description: "Major government hospital with trauma center",
      phone: "011-26165060"
    },
    {
      lat: 28.6517,
      lng: 77.2219,
      name: "Delhi University Emergency Shelter",
      type: 'shelter',
      description: "University campus designated as emergency shelter",
      phone: "011-27666220"
    },
    {
      lat: 28.7041,
      lng: 77.1025,
      name: "Rohini District Hospital",
      type: 'hospital',
      description: "Multi-specialty hospital with emergency ward",
      phone: "011-27757101"
    },
    ...locations
  ];

  const getMarkerIcon = (type: string) => {
    const icons = {
      shelter: '🏠',
      hospital: '🏥',
      fire_station: '🚒',
      police: '👮',
      school: '🏫',
      evacuation: '🚨',
      hazard: '⚠️',
      current: '📍'
    };
    return icons[type as keyof typeof icons] || '📍';
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setMapCenter(location);
        onLocationUpdate?.(location);
        setIsLoading(false);
        toast.success('Location updated successfully!');
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLoading(false);
        toast.error('Failed to get your location. Please enable location services.');
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Emergency Response Map (India)
          </CardTitle>
          <Button 
            onClick={getCurrentLocation} 
            size="sm" 
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <Zap className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4 mr-2" />
            )}
            Find My Location
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            🏠 Emergency Shelters
          </Badge>
          <Badge variant="secondary" className="text-xs">
            🏥 Hospitals
          </Badge>
          <Badge variant="secondary" className="text-xs">
            🚒 Fire Stations
          </Badge>
          <Badge variant="secondary" className="text-xs">
            👮 Police Stations
          </Badge>
          <Badge variant="destructive" className="text-xs">
            ⚠️ Hazard Areas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div className="w-full h-96 rounded-b-lg overflow-hidden">
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={zoom}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <LocationUpdater center={mapCenter} />
              
              {/* Emergency location markers */}
              {indianEmergencyLocations.map((location, index) => (
                <Marker
                  key={index}
                  position={[location.lat, location.lng]}
                  icon={createCustomIcon(location.type, getMarkerIcon(location.type))}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold text-sm mb-1">{location.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{location.description}</p>
                      {location.phone && (
                        <div className="mb-2">
                          <span className="text-xs font-medium">Phone: </span>
                          <a href={`tel:${location.phone}`} className="text-xs text-blue-600 hover:underline">
                            {location.phone}
                          </a>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {location.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* User location marker */}
              {userLocation && (
                <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={createCustomIcon('current', '📍')}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-sm">Your Location</h3>
                      <p className="text-xs text-gray-600">
                        Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenStreetMap;