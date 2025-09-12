import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Navigation, Zap } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Location {
  lat: number;
  lng: number;
  name: string;
  type: 'shelter' | 'hospital' | 'evacuation' | 'hazard' | 'current';
  description?: string;
}

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  locations?: Location[];
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  center = { lat: 39.8283, lng: -98.5795 }, // Center of US
  zoom = 4,
  locations = [],
  onLocationUpdate 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample emergency locations for demonstration
  const emergencyLocations: Location[] = [
    {
      lat: 40.7128,
      lng: -74.0060,
      name: "NYC Emergency Shelter",
      type: 'shelter',
      description: "Emergency shelter with 500 capacity"
    },
    {
      lat: 34.0522,
      lng: -118.2437,
      name: "LA General Hospital",
      type: 'hospital',
      description: "Major trauma center"
    },
    {
      lat: 41.8781,
      lng: -87.6298,
      name: "Chicago Evacuation Route",
      type: 'evacuation',
      description: "Primary evacuation route to safety"
    },
    ...locations
  ];

  const getMarkerIcon = (type: string) => {
    const icons = {
      shelter: '🏠',
      hospital: '🏥',
      evacuation: '🚨',
      hazard: '⚠️',
      current: '📍'
    };
    return icons[type as keyof typeof icons] || '📍';
  };

  const getMarkerColor = (type: string) => {
    const colors = {
      shelter: '#10B981', // Green
      hospital: '#EF4444', // Red
      evacuation: '#F59E0B', // Yellow
      hazard: '#DC2626', // Dark red
      current: '#3B82F6' // Blue
    };
    return colors[type as keyof typeof colors] || '#6B7280';
  };

  const loadGoogleMaps = () => {
    return new Promise<void>((resolve) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        resolve();
      };
      
      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve();
        }
      };

      document.head.appendChild(script);
    });
  };

  const initializeMap = async () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: userLocation || center,
      zoom: userLocation ? 12 : zoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add markers for emergency locations
    emergencyLocations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: location.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" fill="${getMarkerColor(location.type)}" stroke="white" stroke-width="2"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                ${getMarkerIcon(location.type)}
              </text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${location.name}</h3>
            <p class="text-xs text-gray-600 mt-1">${location.description || ''}</p>
            <span class="inline-block px-2 py-1 text-xs rounded mt-2 bg-gray-100">${location.type}</span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });
    });

    // Add user location marker if available
    if (userLocation) {
      new window.google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        title: 'Your Location',
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" fill="#3B82F6" stroke="white" stroke-width="2"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });
    }

    setMap(mapInstance);
    setIsLoading(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        onLocationUpdate?.(location);
        
        if (map) {
          map.setCenter(location);
          map.setZoom(12);
        }
        
        toast.success('Location updated successfully!');
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get your location. Please enable location services.');
      }
    );
  };

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMaps();
        await initializeMap();
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setIsLoading(false);
        toast.error('Failed to load Google Maps. Please check your internet connection.');
      }
    };

    initMap();
  }, [userLocation]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Emergency Response Map
          </CardTitle>
          <Button onClick={getCurrentLocation} size="sm" variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Find My Location
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            🏠 Shelters
          </Badge>
          <Badge variant="secondary" className="text-xs">
            🏥 Hospitals
          </Badge>
          <Badge variant="secondary" className="text-xs">
            🚨 Evacuation Routes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            ⚠️ Hazards
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-96 rounded-b-lg"
            style={{ minHeight: '400px' }}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-b-lg">
              <div className="text-center">
                <Zap className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-gray-600">Loading emergency map...</p>
              </div>
            </div>
          )}
          {!window.google && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-b-lg">
              <div className="text-center p-8">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="font-semibold mb-2">Google Maps Unavailable</h3>
                <p className="text-sm text-gray-600 mb-4">
                  To enable the emergency map feature, please add your Google Maps API key.
                </p>
                <Badge variant="outline" className="text-xs">
                  Contact administrator to configure Google Maps
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMap;