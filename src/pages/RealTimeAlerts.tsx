import { useState, useEffect } from "react";
import { AlertTriangle, MapPin, Clock, Bell, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";

interface AlertData {
  id: string;
  source: string;
  type: 'weather' | 'seismic' | 'flood' | 'fire' | 'security' | 'health';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  actionRequired: boolean;
  expiresAt?: Date;
}

const RealTimeAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState<string[]>(['high', 'critical']);
  const [isConnected, setIsConnected] = useState(true);

  // Mock alert data
  const mockAlerts: AlertData[] = [
    {
      id: '1',
      source: 'IMD (Indian Meteorological Department)',
      type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Warning',
      message: 'Heavy to very heavy rainfall expected in next 6 hours. Flash flood warning issued for low-lying areas.',
      location: 'Delhi NCR',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actionRequired: true,
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
    },
    {
      id: '2',
      source: 'NDMA (National Disaster Management Authority)',
      type: 'seismic',
      severity: 'medium',
      title: 'Earthquake Monitoring',
      message: 'Minor tremors detected in the region. No immediate threat. Continue normal activities.',
      location: 'Northern India',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: false
    },
    {
      id: '3',
      source: 'Local Emergency Services',
      type: 'fire',
      severity: 'critical',
      title: 'Fire Breakout Alert',
      message: 'Fire reported in nearby industrial area. Evacuation advisory for surrounding areas.',
      location: 'Sector 15, Noida',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      actionRequired: true,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
    },
    {
      id: '4',
      source: 'Health Department',
      type: 'health',
      severity: 'low',
      title: 'Air Quality Advisory',
      message: 'Air quality index showing moderate levels. Sensitive individuals should limit outdoor activities.',
      location: 'Delhi',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      actionRequired: false
    }
  ];

  // Simulate real-time alerts
  useEffect(() => {
    setAlerts(mockAlerts);
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to add new alert
        const newAlert: AlertData = {
          id: Date.now().toString(),
          source: ['IMD', 'NDMA', 'Local Emergency', 'Health Dept'][Math.floor(Math.random() * 4)],
          type: ['weather', 'seismic', 'flood', 'security'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          title: 'New Alert Detected',
          message: 'This is a simulated real-time alert for demonstration purposes.',
          location: 'Current Area',
          timestamp: new Date(),
          actionRequired: Math.random() > 0.5
        };
        
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 15000); // New alert every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-emergency bg-emergency/10 border-emergency/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      case 'low': return 'text-safe bg-safe/10 border-safe/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return '🌧️';
      case 'seismic': return '🌍';
      case 'flood': return '🌊';
      case 'fire': return '🔥';
      case 'security': return '🚨';
      case 'health': return '🏥';
      default: return '⚠️';
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filterSeverity.length === 0 || filterSeverity.includes(alert.severity)
  );

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Real-Time Alerts"
        subtitle="Live emergency notifications and crisis updates"
        userRole={user?.role as "student" | "teacher" | "admin" | "officer" || 'student'}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Status */}
        <div className="flex justify-between items-center mb-6">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${isConnected ? 'bg-safe/20' : 'bg-emergency/20'}`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-safe animate-pulse' : 'bg-emergency'}`}></div>
            <span className="text-sm">{isConnected ? 'Connected' : 'Offline'}</span>
          </div>
        </div>
        {/* Settings Panel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Push Notifications</span>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Severity:</label>
              <div className="flex space-x-2">
                {['low', 'medium', 'high', 'critical'].map(severity => (
                  <Badge
                    key={severity}
                    variant={filterSeverity.includes(severity) ? 'default' : 'outline'}
                    className={`cursor-pointer capitalize ${getSeverityColor(severity)}`}
                    onClick={() => {
                      setFilterSeverity(prev => 
                        prev.includes(severity) 
                          ? prev.filter(s => s !== severity)
                          : [...prev, severity]
                      );
                    }}
                  >
                    {severity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Alerts ({filteredAlerts.length})</h2>
            <Button onClick={() => setAlerts(mockAlerts)} variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Refresh Alerts
            </Button>
          </div>

          {filteredAlerts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Shield className="h-16 w-16 mx-auto mb-4 text-safe" />
                <h3 className="text-xl font-semibold mb-2">All Clear</h3>
                <p className="text-muted-foreground">No active alerts matching your filters.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{alert.title}</h3>
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              {alert.actionRequired && (
                                <Badge variant="destructive" className="animate-pulse">
                                  ACTION REQUIRED
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.source}</p>
                          </div>
                        </div>
                        
                        <p className="text-foreground mb-4">{alert.message}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {alert.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {alert.timestamp.toLocaleTimeString()}
                          </div>
                          {alert.expiresAt && (
                            <div className="flex items-center text-warning">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Expires: {alert.expiresAt.toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                        className="ml-4"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Data Sources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Connected Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'IMD', status: 'active', description: 'Weather & Climate Data' },
                { name: 'NDMA', status: 'active', description: 'Disaster Management Authority' },
                { name: 'Local Emergency', status: 'active', description: 'Campus Security & Fire Dept' },
                { name: 'Health Dept', status: 'active', description: 'Public Health Alerts' }
              ].map((source) => (
                <div key={source.name} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-3 h-3 bg-safe rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">{source.name}</p>
                    <p className="text-xs text-muted-foreground">{source.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RealTimeAlerts;