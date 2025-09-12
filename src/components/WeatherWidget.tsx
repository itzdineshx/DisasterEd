import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Thermometer, 
  Droplets, 
  AlertTriangle,
  RefreshCw,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';
import { fetchWeatherData, getWeatherDescription, getDisasterRisk, WeatherData, WeatherAlert } from '@/services/weatherService';

interface WeatherWidgetProps {
  latitude?: number;
  longitude?: number;
  showAlerts?: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ 
  latitude, 
  longitude, 
  showAlerts = true 
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getWeatherIcon = (code: number, isDay: number) => {
    if (code === 0) return isDay ? <Sun className="h-6 w-6 text-yellow-500" /> : <Sun className="h-6 w-6 text-gray-400" />;
    if (code <= 3) return <Cloud className="h-6 w-6 text-gray-500" />;
    if (code >= 61 && code <= 82) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (code >= 95) return <AlertTriangle className="h-6 w-6 text-red-500" />;
    return <Cloud className="h-6 w-6 text-gray-500" />;
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      minor: 'bg-blue-100 text-blue-800',
      moderate: 'bg-yellow-100 text-yellow-800', 
      severe: 'bg-orange-100 text-orange-800',
      extreme: 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
        loadWeatherData(location.lat, location.lng);
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get your location. Please enable location services.');
        // Fallback to default location (e.g., New York)
        loadWeatherData(40.7128, -74.0060);
      }
    );
  };

  const loadWeatherData = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherData(lat, lng);
      setWeather(weatherData);
      
      if (showAlerts) {
        const weatherAlerts = getDisasterRisk(weatherData);
        setAlerts(weatherAlerts);
        
        // Show severe alerts as toast notifications
        weatherAlerts.forEach(alert => {
          if (alert.severity === 'severe' || alert.severity === 'extreme') {
            toast.error(`${alert.event}: ${alert.description}`, {
              duration: 10000,
            });
          }
        });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error('Failed to load weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      loadWeatherData(latitude, longitude);
    } else {
      getCurrentLocation();
    }
  }, [latitude, longitude]);

  const handleRefresh = () => {
    if (userLocation) {
      loadWeatherData(userLocation.lat, userLocation.lng);
    } else if (latitude && longitude) {
      loadWeatherData(latitude, longitude);
    } else {
      getCurrentLocation();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Weather Conditions
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={getCurrentLocation} size="sm" variant="outline">
                <MapPin className="h-4 w-4" />
              </Button>
              <Button onClick={handleRefresh} size="sm" variant="outline" disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>Loading weather data...</span>
            </div>
          ) : weather ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(weather.current.weather_code, weather.current.is_day)}
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(weather.current.temperature_2m)}°C
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getWeatherDescription(weather.current.weather_code)}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Feels like {Math.round(weather.current.apparent_temperature)}°C</div>
                  <div>Humidity {weather.current.relative_humidity_2m}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">{Math.round(weather.current.wind_speed_10m)} km/h</div>
                    <div className="text-muted-foreground">Wind Speed</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">{Math.round(weather.current.precipitation)} mm</div>
                    <div className="text-muted-foreground">Precipitation</div>
                  </div>
                </div>
              </div>

              {weather.location && (
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Location: {weather.location.latitude.toFixed(2)}°N, {weather.location.longitude.toFixed(2)}°E
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Weather data unavailable</p>
              <Button onClick={getCurrentLocation} size="sm" className="mt-2">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showAlerts && alerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-red-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm text-red-900">{alert.event}</h4>
                  <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-red-700 mb-2">{alert.description}</p>
                <div className="text-xs text-red-600">
                  Valid until: {alert.expires.toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherWidget;