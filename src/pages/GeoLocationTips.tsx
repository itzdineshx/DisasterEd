import { useState, useEffect } from "react";
import { MapPin, Navigation, AlertTriangle, Shield, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}

interface WeatherCondition {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface DisasterRisk {
  type: string;
  probability: number;
  season: string;
  preparedness: string[];
  emergencyContacts: string[];
}

interface PreparednessTip {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionItems: string[];
  resources: string[];
}

const GeoLocationTips = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [disasters, setDisasters] = useState<DisasterRisk[]>([]);
  const [tips, setTips] = useState<PreparednessTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  // Mock data based on location
  const getMockDataForLocation = (lat: number, lng: number) => {
    // Simulate different regions in India
    const isNorthIndia = lat > 28;
    const isCoastal = Math.abs(lng - 72.8) < 2 || Math.abs(lng - 88.3) < 2; // Mumbai or Kolkata area
    const isHillStation = lat > 30 && lat < 35;

    const mockWeather: WeatherCondition = {
      temperature: isHillStation ? 15 : isNorthIndia ? 25 : 30,
      humidity: isCoastal ? 85 : isNorthIndia ? 60 : 70,
      windSpeed: isCoastal ? 25 : 10,
      visibility: 8,
      condition: isCoastal ? 'Humid' : isHillStation ? 'Cool' : 'Clear',
      riskLevel: isCoastal ? 'high' : 'medium'
    };

    const mockDisasters: DisasterRisk[] = [
      ...(isCoastal ? [{
        type: 'Cyclone',
        probability: 75,
        season: 'May-November',
        preparedness: ['Emergency kit', 'Evacuation plan', 'Waterproof storage'],
        emergencyContacts: ['Coast Guard: 1554', 'NDRF: 108']
      }] : []),
      ...(isNorthIndia ? [{
        type: 'Earthquake',
        probability: 65,
        season: 'Year-round',
        preparedness: ['Structural assessment', 'Drop-Cover-Hold drills', 'Emergency supplies'],
        emergencyContacts: ['NDMA: 1070', 'Local Emergency: 108']
      }] : []),
      ...(isHillStation ? [{
        type: 'Landslide',
        probability: 80,
        season: 'Monsoon (Jun-Sep)',
        preparedness: ['Slope monitoring', 'Alternate routes', 'Rain gear'],
        emergencyContacts: ['Forest Dept: 1926', 'ITBP: 14411']
      }] : []),
      {
        type: 'Flood',
        probability: isCoastal ? 85 : isNorthIndia ? 45 : 60,
        season: 'Monsoon',
        preparedness: ['Waterproof documents', 'Higher ground evacuation', 'Water purification'],
        emergencyContacts: ['Flood Control: 1077', 'Rescue: 108']
      },
      {
        type: 'Heat Wave',
        probability: isHillStation ? 20 : 70,
        season: 'April-June',
        preparedness: ['Cooling centers', 'Hydration plan', 'Heat-resistant clothing'],
        emergencyContacts: ['Health Helpline: 104', 'Ambulance: 108']
      }
    ];

    const mockTips: PreparednessTip[] = [
      {
        id: '1',
        category: 'Emergency Kit',
        title: 'Location-Specific Emergency Kit',
        description: `Based on your location's climate and disaster risks, customize your emergency kit.`,
        priority: 'high',
        actionItems: [
          isCoastal ? 'Waterproof containers for documents' : 'Dust masks for air quality',
          isHillStation ? 'Thermal blankets and heating pads' : 'Cooling towels and electrolytes',
          'First aid kit with location-specific medications',
          'Battery-powered radio for local emergency broadcasts',
          'Local emergency contact cards'
        ],
        resources: ['Local Red Cross chapter', 'Community emergency supply store']
      },
      {
        id: '2',
        category: 'Evacuation',
        title: 'Local Evacuation Routes',
        description: 'Know your area-specific evacuation routes and assembly points.',
        priority: 'high',
        actionItems: [
          'Identify 3 different evacuation routes from your location',
          'Locate nearest community shelter or safe building',
          'Practice evacuation with family members',
          'Keep vehicle fuel tank at least half full',
          'Know alternate transportation options'
        ],
        resources: ['Local disaster management office', 'Community evacuation map']
      },
      {
        id: '3',
        category: 'Communication',
        title: 'Regional Communication Plan',
        description: 'Establish communication methods that work in your geographic area.',
        priority: 'medium',
        actionItems: [
          'Program local emergency numbers in phone',
          'Identify amateur radio operators in area',
          'Join local community WhatsApp/SMS groups',
          'Set up out-of-region contact person',
          'Know locations of nearest cell towers'
        ],
        resources: ['Local amateur radio club', 'Community emergency network']
      },
      {
        id: '4',
        category: 'Shelter',
        title: 'Climate-Appropriate Shelter',
        description: 'Prepare shelter solutions based on your local climate conditions.',
        priority: 'medium',
        actionItems: [
          isCoastal ? 'Moisture-resistant materials' : isHillStation ? 'Insulation materials' : 'Ventilation supplies',
          'Backup heating/cooling options',
          'Weather-sealed windows and doors',
          'Emergency lighting systems',
          'Water collection and storage'
        ],
        resources: ['Local hardware stores', 'Community shelter programs']
      }
    ];

    return { mockWeather, mockDisasters, mockTips };
  };

  useEffect(() => {
    const requestLocation = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          });
        });

        const { latitude, longitude } = position.coords;
        
        // Mock reverse geocoding
        const mockLocation: LocationData = {
          latitude,
          longitude,
          city: latitude > 28 ? "Delhi" : latitude > 20 ? "Mumbai" : "Bangalore",
          state: latitude > 28 ? "Delhi" : latitude > 20 ? "Maharashtra" : "Karnataka",
          country: "India"
        };

        setLocation(mockLocation);
        setLocationPermission('granted');
        
        const { mockWeather, mockDisasters, mockTips } = getMockDataForLocation(latitude, longitude);
        setWeather(mockWeather);
        setDisasters(mockDisasters);
        setTips(mockTips);
        
      } catch (error) {
        setError("Unable to retrieve location. Using default recommendations.");
        setLocationPermission('denied');
        
        // Use default data for Delhi
        const { mockWeather, mockDisasters, mockTips } = getMockDataForLocation(28.6139, 77.2090);
        setLocation({
          latitude: 28.6139,
          longitude: 77.2090,
          city: "Delhi",
          state: "Delhi",
          country: "India"
        });
        setWeather(mockWeather);
        setDisasters(mockDisasters);
        setTips(mockTips);
      } finally {
        setLoading(false);
      }
    };

    requestLocation();
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-emergency bg-emergency/10 border-emergency/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      case 'low': return 'text-safe bg-safe/10 border-safe/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-warning';
      case 'medium': return 'border-l-primary';
      case 'low': return 'border-l-safe';
      default: return 'border-l-muted';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center space-y-4 py-8">
            <Navigation className="h-12 w-12 animate-spin text-primary" />
            <h3 className="text-lg font-semibold">Getting Your Location</h3>
            <p className="text-sm text-muted-foreground text-center">
              We're analyzing your location to provide personalized disaster preparedness tips.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <header className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8" />
              <span className="font-bold text-xl">Location-Based Tips</span>
            </Link>
            <div className="flex items-center space-x-4">
              {location && (
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{location.city}, {location.state}</span>
                </div>
              )}
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
          <span>Location Tips</span>
        </div>
        {error && (
          <Alert className="mb-8 border-warning/20 bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location & Weather Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Your Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {location && (
                  <div>
                    <h3 className="font-semibold text-lg">{location.city}</h3>
                    <p className="text-sm text-muted-foreground">{location.state}, {location.country}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </div>
                )}
                
                <Badge variant={locationPermission === 'granted' ? 'default' : 'destructive'}>
                  {locationPermission === 'granted' ? 'Location Access Granted' : 'Using Default Location'}
                </Badge>
              </CardContent>
            </Card>

            {/* Current Weather */}
            {weather && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="h-5 w-5 mr-2" />
                    Weather Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-warning" />
                      <span className="text-sm">{weather.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span className="text-sm">{weather.humidity}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-safe" />
                      <span className="text-sm">{weather.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{weather.visibility} km</span>
                    </div>
                  </div>
                  
                  <Badge className={getRiskColor(weather.riskLevel)}>
                    Risk Level: {weather.riskLevel.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Disaster Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Local Disaster Risks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {disasters.map((disaster, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{disaster.type}</span>
                      <Badge variant="outline">{disaster.season}</Badge>
                    </div>
                    <Progress value={disaster.probability} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {disaster.probability}% probability during {disaster.season}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preparedness Tips */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Personalized Preparedness Tips</h2>
              <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Refresh Location
              </Button>
            </div>

            <div className="space-y-4">
              {tips.map((tip) => (
                <Card key={tip.id} className={`border-l-4 ${getPriorityColor(tip.priority)}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        {tip.title}
                      </CardTitle>
                      <Badge variant="outline">{tip.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{tip.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Action Items:</h4>
                      <ul className="space-y-1">
                        {tip.actionItems.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tip.resources.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Local Resources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tip.resources.map((resource, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contacts for Location */}
            <Card className="bg-emergency/5 border-emergency/20">
              <CardHeader>
                <CardTitle className="flex items-center text-emergency">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Local Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {disasters.flatMap(d => d.emergencyContacts).map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="text-sm font-medium">{contact.split(':')[0]}</span>
                      <a 
                        href={`tel:${contact.split(':')[1]}`}
                        className="text-primary font-bold"
                      >
                        {contact.split(':')[1]}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeoLocationTips;