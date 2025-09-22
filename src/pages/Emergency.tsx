import { Phone, MapPin, AlertTriangle, Shield, Users, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import EssentialTips from '@/components/EssentialTips';

const Emergency = () => {
  const { user } = useAuth();
  
  const emergencyContacts = [
    {
      name: "Fire Department",
      number: "911",
      description: "Fire emergencies, gas leaks, rescue operations",
      color: "emergency",
      available: "24/7"
    },
    {
      name: "Police",
      number: "911", 
      description: "Security threats, criminal activities, traffic accidents",
      color: "primary",
      available: "24/7"
    },
    {
      name: "Medical Emergency",
      number: "911",
      description: "Medical emergencies, ambulance services",
      color: "safe",
      available: "24/7"
    },
    {
      name: "Campus Security",
      number: "(555) 123-4567",
      description: "Campus-specific emergencies and security",
      color: "warning",
      available: "24/7"
    },
    {
      name: "Disaster Management Office",
      number: "(555) 987-6543",
      description: "Natural disasters, evacuation coordination",
      color: "primary",
      available: "Business Hours"
    },
    {
      name: "Mental Health Crisis",
      number: "988",
      description: "Mental health emergencies and crisis support",
      color: "safe",
      available: "24/7"
    }
  ];

  const quickActions = [
    {
      title: "Real-Time Alerts",
      description: "Live emergency alerts from authorities",
      icon: MapPin,
      link: "/real-time-alerts",
      color: "primary"
    },
    {
      title: "Location-Based Tips",
      description: "Personalized preparedness based on your location",
      icon: Shield,
      link: "/geo-location-tips",
      color: "safe"
    },
    {
      title: "Live Communication",
      description: "Emergency messaging system for staff & students",
      icon: Users,
      link: "/live-communication",
      color: "warning"
    }
  ];

  const currentAlerts = [
    {
      type: "Weather Alert",
      message: "Heavy rain expected. Flood watch in effect until 6 PM.",
      level: "warning",
      time: "2 hours ago"
    },
    {
      type: "Maintenance Notice",
      message: "Fire alarm testing in Building C from 2-4 PM today.",
      level: "info",
      time: "4 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Emergency Hub"
        subtitle="Immediate access to emergency services and crisis response tools"
        userRole={user?.role as "student" | "teacher" | "admin" | "officer" || 'student'}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Banner (themed) */}
        <div className="theme-gradient-emergency text-emergency-foreground p-8 rounded-2xl mb-8 text-center text-white">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-emergency-foreground" />
          <h1 className="text-4xl font-bold mb-4">Emergency Resources</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Quick access to emergency contacts, safety procedures, and real-time alerts. 
            In case of immediate danger, call 911.
          </p>
        </div>

        {/* Current Alerts */}
        {currentAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-warning" />
              Current Alerts
            </h2>
            <div className="space-y-4">
              {currentAlerts.map((alert, index) => (
                <Alert key={index} className={alert.level === 'warning' ? 'status-warning' : 'status-info'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <strong>{alert.type}:</strong> {alert.message}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {alert.time}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Emergency Contacts</h2>
            
            <div className="grid gap-4">
              {emergencyContacts.map((contact, index) => {
                const colorMap: Record<string, { iconBg: string; iconText: string; btnClass: string; numText?: string }> = {
                  emergency: { iconBg: 'bg-emergency/10', iconText: 'text-emergency', btnClass: 'btn-emergency-enhanced', numText: 'text-emergency' },
                  primary: { iconBg: 'bg-primary/10', iconText: 'text-primary', btnClass: 'btn-primary-enhanced', numText: 'text-primary' },
                  safe: { iconBg: 'bg-safe/10', iconText: 'text-safe', btnClass: 'btn-safe-enhanced', numText: 'text-safe' },
                  warning: { iconBg: 'bg-warning/10', iconText: 'text-warning', btnClass: 'btn-primary-enhanced', numText: 'text-warning' },
                };
                const classes = colorMap[contact.color] || colorMap.primary;

                return (
                  <Card key={index} className="card-enhanced">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 ${classes.iconBg} rounded-lg`}>
                              <Phone className={`h-5 w-5 ${classes.iconText}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{contact.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {contact.available}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {contact.description}
                          </p>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className={`text-2xl font-bold ${classes.numText ?? 'text-primary'} mb-2`}>
                            {contact.number}
                          </div>
                          <Button 
                            size="sm" 
                            className={classes.btnClass}
                            asChild
                          >
                            <a href={`tel:${contact.number}`}>
                              <Phone className="h-4 w-4 mr-1" />
                              Call Now
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card key={index} className="hover:shadow-card transition-all hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6">
                      <Link to={action.link} className="flex items-center space-x-3">
                        <div className={`p-3 bg-${action.color}/10 rounded-lg`}>
                          <IconComponent className={`h-6 w-6 text-${action.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Emergency Procedures */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Shield className="h-5 w-5 mr-2" />
                  Emergency Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p><strong>1. Stay Calm:</strong> Assess the situation quickly</p>
                  <p><strong>2. Call for Help:</strong> Dial appropriate emergency number</p>
                  <p><strong>3. Follow Protocol:</strong> Use trained procedures</p>
                  <p><strong>4. Evacuate if Needed:</strong> Use nearest safe exit</p>
                  <p><strong>5. Report to Assembly:</strong> Go to designated meeting point</p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/emergency-procedures">
                    View Detailed Procedures
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Campus Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Campus Emergency Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-32 flex items-center justify-center mb-4">
                  <p className="text-muted-foreground text-sm">Interactive Campus Map</p>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/campus-map">
                    View Full Map
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Essential Preparedness Tips */}
        <div className="mt-8">
          <EssentialTips />
        </div>

      </main>
    </div>
  );
};

export default Emergency;