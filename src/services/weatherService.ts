import { fetchWeatherApi } from 'openmeteo';

export interface WeatherData {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    weather_code: number;
    pressure_msl: number;
    surface_pressure: number;
    cloud_cover: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: Float32Array;
    weather_code: Float32Array;
    wind_speed_10m: Float32Array;
    precipitation_probability: Float32Array;
    precipitation: Float32Array;
    rain: Float32Array;
    snowfall: Float32Array;
    wind_gusts_10m: Float32Array;
  };
  location: {
    latitude: number;
    longitude: number;
    elevation: number;
    timezone: string;
  };
}

export interface WeatherAlert {
  type: 'warning' | 'watch' | 'advisory';
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  event: string;
  description: string;
  areas: string[];
  effective: Date;
  expires: Date;
}

export const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return weatherCodes[code] || 'Unknown';
};

export const getDisasterRisk = (weather: WeatherData): WeatherAlert[] => {
  const alerts: WeatherAlert[] = [];
  const current = weather.current;
  
  // High wind warning
  if (current.wind_speed_10m > 20 || current.wind_gusts_10m > 30) {
    alerts.push({
      type: 'warning',
      severity: current.wind_gusts_10m > 50 ? 'severe' : 'moderate',
      event: 'High Wind Warning',
      description: `Strong winds with gusts up to ${Math.round(current.wind_gusts_10m)} km/h. Secure outdoor objects and avoid travel if possible.`,
      areas: ['Current Location'],
      effective: new Date(),
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours
    });
  }

  // Heavy precipitation warning
  if (current.precipitation > 10 || current.rain > 10) {
    alerts.push({
      type: 'warning',
      severity: current.precipitation > 25 ? 'severe' : 'moderate', 
      event: 'Heavy Rain Warning',
      description: `Heavy rainfall detected. Risk of flooding in low-lying areas. Avoid unnecessary travel.`,
      areas: ['Current Location'],
      effective: new Date(),
      expires: new Date(Date.now() + 4 * 60 * 60 * 1000)
    });
  }

  // Thunderstorm warning
  if (current.weather_code >= 95) {
    alerts.push({
      type: 'warning',
      severity: current.weather_code > 95 ? 'severe' : 'moderate',
      event: 'Thunderstorm Warning',
      description: `Thunderstorm activity detected. Seek shelter indoors and avoid open areas.`,
      areas: ['Current Location'],
      effective: new Date(),
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
    });
  }

  // Snow/Winter weather
  if (current.weather_code >= 71 && current.weather_code <= 77) {
    alerts.push({
      type: 'advisory',
      severity: 'moderate',
      event: 'Winter Weather Advisory',
      description: `Snow conditions detected. Use caution when traveling and dress warmly.`,
      areas: ['Current Location'],
      effective: new Date(),
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
    });
  }

  return alerts;
};

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const params = {
    latitude,
    longitude,
    hourly: [
      "temperature_2m", 
      "weather_code", 
      "wind_speed_10m", 
      "precipitation_probability", 
      "precipitation", 
      "rain", 
      "snowfall", 
      "wind_gusts_10m"
    ],
    current: [
      "temperature_2m", 
      "relative_humidity_2m", 
      "apparent_temperature", 
      "is_day", 
      "precipitation", 
      "rain", 
      "showers", 
      "weather_code", 
      "pressure_msl", 
      "surface_pressure", 
      "cloud_cover", 
      "wind_speed_10m", 
      "wind_direction_10m", 
      "wind_gusts_10m"
    ],
    forecast_hours: 24,
    past_hours: 1,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;

  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      is_day: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      rain: current.variables(5)!.value(),
      showers: current.variables(6)!.value(),
      weather_code: current.variables(7)!.value(),
      pressure_msl: current.variables(8)!.value(),
      surface_pressure: current.variables(9)!.value(),
      cloud_cover: current.variables(10)!.value(),
      wind_speed_10m: current.variables(11)!.value(),
      wind_direction_10m: current.variables(12)!.value(),
      wind_gusts_10m: current.variables(13)!.value(),
    },
    hourly: {
      time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
      wind_speed_10m: hourly.variables(2)!.valuesArray(),
      precipitation_probability: hourly.variables(3)!.valuesArray(),
      precipitation: hourly.variables(4)!.valuesArray(),
      rain: hourly.variables(5)!.valuesArray(),
      snowfall: hourly.variables(6)!.valuesArray(),
      wind_gusts_10m: hourly.variables(7)!.valuesArray(),
    },
    location: {
      latitude: response.latitude(),
      longitude: response.longitude(),
      elevation: response.elevation(),
      timezone: `UTC${utcOffsetSeconds >= 0 ? '+' : ''}${utcOffsetSeconds / 3600}`
    }
  };
};