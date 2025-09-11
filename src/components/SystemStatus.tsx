import { useState, useEffect } from "react";
import { Shield, Wifi, Database, Server, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SystemService {
  name: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  uptime: number;
  responseTime: number;
  lastChecked: string;
  icon: any;
}

export const SystemStatus = () => {
  const [services, setServices] = useState<SystemService[]>([
    {
      name: "Emergency Alert System",
      status: 'online',
      uptime: 99.9,
      responseTime: 145,
      lastChecked: new Date().toISOString(),
      icon: Shield
    },
    {
      name: "Communication Network",
      status: 'online',
      uptime: 98.7,
      responseTime: 89,
      lastChecked: new Date().toISOString(),
      icon: Wifi
    },
    {
      name: "Learning Database",
      status: 'online',
      uptime: 100,
      responseTime: 234,
      lastChecked: new Date().toISOString(),
      icon: Database
    },
    {
      name: "Drill Simulator",
      status: 'degraded',
      uptime: 95.2,
      responseTime: 567,
      lastChecked: new Date().toISOString(),
      icon: Server
    }
  ]);

  const [overallHealth, setOverallHealth] = useState(0);

  useEffect(() => {
    // Calculate overall system health
    const onlineServices = services.filter(s => s.status === 'online').length;
    const degradedServices = services.filter(s => s.status === 'degraded').length;
    const offlineServices = services.filter(s => s.status === 'offline').length;
    
    let health = (onlineServices * 100 + degradedServices * 50 + offlineServices * 0) / services.length;
    setOverallHealth(Math.round(health));

    // Simulate real-time updates
    const interval = setInterval(() => {
      setServices(prev => prev.map(service => ({
        ...service,
        responseTime: service.responseTime + Math.floor(Math.random() * 10 - 5),
        lastChecked: new Date().toISOString()
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, [services]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-safe bg-safe/10 border-safe/20';
      case 'degraded': return 'text-warning bg-warning/10 border-warning/20';
      case 'offline': return 'text-emergency bg-emergency/10 border-emergency/20';
      case 'maintenance': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-safe';
    if (health >= 80) return 'text-warning';
    return 'text-emergency';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            System Status
          </CardTitle>
          <Badge variant="outline" className={getHealthColor(overallHealth)}>
            {overallHealth}% Healthy
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Health */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall System Health</span>
            <span className={`font-medium ${getHealthColor(overallHealth)}`}>
              {overallHealth}%
            </span>
          </div>
          <Progress 
            value={overallHealth} 
            className={`h-2 ${overallHealth >= 95 ? '' : overallHealth >= 80 ? 'opacity-80' : 'opacity-60'}`}
          />
        </div>

        {/* Service Status */}
        <div className="space-y-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>Uptime: {service.uptime}%</span>
                      <span>•</span>
                      <span>Response: {service.responseTime}ms</span>
                    </div>
                  </div>
                </div>
                
                <Badge variant="outline" className={`text-xs ${getStatusColor(service.status)}`}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(service.status)}
                    <span className="capitalize">{service.status}</span>
                  </span>
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Last Update */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};