import { useState } from "react";
import { AlertTriangle, Users, Radio, MapPin, Clock, Activity, MessageSquare, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/contexts/DataContext";
import type { Incident, Personnel } from "@/hooks/usePersistentStore";

const OfficerDashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { toast } = useToast();
  const { incidents, personnel } = useData();
  const [alertLevel, setAlertLevel] = useState<'normal' | 'elevated' | 'high' | 'critical'>('normal');
  
  // Form states for new incident
  const [newIncident, setNewIncident] = useState<Partial<Incident>>({
    type: '',
    location: '',
    severity: 'medium',
    status: 'Active',
    responders: 1,
  });

  const handleCreateIncident = () => {
    if (!newIncident.type || !newIncident.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const createdIncident = incidents.create({
      ...newIncident as Omit<Incident, 'id'>,
      startTime: new Date().toISOString(),
      estimatedResolution: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    });

    toast({
      title: "Incident Created",
      description: `New incident ${createdIncident.id} has been created.`
    });
  };

  const handleUpdateIncidentStatus = (id: string, status: 'Active' | 'Resolved' | 'Pending') => {
    incidents.update(id, { status });
    toast({
      title: "Incident Updated",
      description: `Incident ${id} status changed to ${status}.`
    });
  };

  const handleDeleteIncident = (id: string) => {
    incidents.remove(id);
    toast({
      title: "Incident Deleted",
      description: `Incident ${id} has been removed.`
    });
  };

  // Similar handlers for personnel management
  const handleUpdatePersonnelStatus = (id: string, status: 'On Duty' | 'Off Duty' | 'Responding') => {
    personnel.update(id, { status });
    toast({
      title: "Personnel Status Updated",
      description: `Personnel status updated to ${status}.`
    });
  };

  // Dynamic stats from localStorage
  const emergencyStats = [
    { title: "Active Incidents", value: incidents.data.filter(i => i.status !== 'Resolved').length.toString(), change: "+1", icon: AlertTriangle, color: "emergency" },
    { title: "Personnel Available", value: personnel.data.filter(p => p.status === 'On Duty').length.toString(), change: "-3", icon: Users, color: "safe" },
    { title: "Communication Channels", value: "8", change: "0", icon: Radio, color: "primary" },
    { title: "Emergency Shelters", value: "12", change: "+2", icon: Shield, color: "warning" }
  ];

  const activeIncidents = incidents.data.filter(incident => incident.status !== 'Resolved');

  const emergencyPersonnel = personnel.data;

  const handleEmergencyBroadcast = () => {
    addNotification({
      type: 'emergency',
      severity: 'critical',
      title: 'Campus-Wide Emergency Alert',
      message: 'Emergency broadcast has been sent to all campus personnel and students.',
      isActive: true
    });
  };

  const handleAlertLevelChange = (level: 'normal' | 'elevated' | 'high' | 'critical') => {
    setAlertLevel(level);
    addNotification({
      type: 'emergency',
      severity: level === 'critical' ? 'critical' : 'high',
      title: `Alert Level Changed to ${level.toUpperCase()}`,
      message: `Campus alert level has been updated. All personnel have been notified.`,
      isActive: true
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'elevated': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title={`Emergency Command Center - ${user?.firstName || 'Officer'}`}
        subtitle="Monitor and coordinate emergency response operations"
        userRole="officer"
      />

      <main className="max-w-7xl mx-auto mobile-container py-4 sm:py-8">
        {/* New Incident Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="mb-4">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Create New Incident
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Incident</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <Input 
                  value={newIncident.type}
                  onChange={(e) => setNewIncident(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Fire, Medical, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input 
                  value={newIncident.location}
                  onChange={(e) => setNewIncident(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Building, Floor, Room"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Severity</label>
                <Select 
                  value={newIncident.severity}
                  onValueChange={(value: any) => setNewIncident(prev => ({ ...prev, severity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Number of Responders</label>
                <Input 
                  type="number"
                  value={newIncident.responders}
                  onChange={(e) => setNewIncident(prev => ({ ...prev, responders: parseInt(e.target.value) }))}
                  min={1}
                />
              </div>
              <Button onClick={handleCreateIncident} className="w-full">
                Create Incident
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Alert Level Indicator */}
        <Alert className={`mb-4 sm:mb-6 ${getAlertLevelColor(alertLevel)}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-medium text-sm sm:text-base">
              Current Alert Level: {alertLevel.toUpperCase()}
            </span>
            <div className="flex flex-wrap gap-2">
              {['normal', 'elevated', 'high', 'critical'].map((level) => (
                <Button
                  key={level}
                  variant={alertLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAlertLevelChange(level as any)}
                  className="text-xs mobile-button"
                >
                  {level}
                </Button>
              ))}
            </div>
          </AlertDescription>
        </Alert>

        {/* Stats Overview */}
        <div className="mobile-stats-grid mb-6 sm:mb-8">
          {emergencyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-card border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-safe' : stat.change.startsWith('-') ? 'text-emergency' : 'text-muted-foreground'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 bg-${stat.color}/10 rounded-full`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Controls */}
        <div className="mobile-grid mb-6 sm:mb-8">
          <Card className="bg-gradient-emergency text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Emergency Broadcast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 mb-4">
                Send immediate alerts to all campus personnel and students
              </p>
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={handleEmergencyBroadcast}
              >
                <Radio className="h-4 w-4 mr-2" />
                Send Campus-Wide Alert
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Communication Systems</span>
                <Badge variant="secondary" className="bg-safe/10 text-safe">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Emergency Alerts</span>
                <Badge variant="secondary" className="bg-safe/10 text-safe">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">GPS Tracking</span>
                <Badge variant="secondary" className="bg-safe/10 text-safe">Operational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Backup Power</span>
                <Badge variant="secondary" className="bg-warning/10 text-warning">Standby</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Quick Communications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Radio className="h-4 w-4 mr-2" />
                Campus Security
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Radio className="h-4 w-4 mr-2" />
                Fire Department
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Radio className="h-4 w-4 mr-2" />
                Medical Services
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Radio className="h-4 w-4 mr-2" />
                All Personnel
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="incidents" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="incidents" className="text-xs sm:text-sm">
              <span className="mobile-hide">Active Incidents</span>
              <span className="mobile-show">Incidents</span>
            </TabsTrigger>
            <TabsTrigger value="personnel" className="text-xs sm:text-sm">
              <span className="mobile-hide">Emergency Personnel</span>
              <span className="mobile-show">Personnel</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs sm:text-sm">
              <span className="mobile-hide">Resources & Equipment</span>
              <span className="mobile-show">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm">
              <span className="mobile-hide">Reports & Analytics</span>
              <span className="mobile-show">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="flex items-center mobile-header">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Active Emergency Incidents
                  </span>
                  <Badge variant="secondary" className="bg-emergency/10 text-emergency w-fit">
                    {activeIncidents.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="mobile-card">
                <div className="overflow-x-auto">
                  <Table className="mobile-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="mobile-hide">Location</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead className="mobile-hide">Status</TableHead>
                        <TableHead className="mobile-hide">Responders</TableHead>
                        <TableHead className="mobile-hide">Duration</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.type}</TableCell>
                          <TableCell className="mobile-hide">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {incident.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getSeverityColor(incident.severity)}
                            >
                              {incident.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="mobile-hide">
                            <Badge variant="secondary">
                              {incident.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="mobile-hide">{incident.responders} personnel</TableCell>
                          <TableCell className="mobile-hide">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {incident.startTime} - {incident.estimatedResolution}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateIncidentStatus(incident.id, 'Resolved')}
                                className="mobile-button"
                              >
                                Resolve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateIncidentStatus(incident.id, incident.status === 'Active' ? 'Pending' : 'Active')}
                                className="mobile-button"
                              >
                                {incident.status === 'Active' ? 'Pause' : 'Resume'}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteIncident(incident.id)}
                                className="mobile-button mobile-hide"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Emergency Response Personnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emergencyPersonnel.map((person) => (
                      <TableRow key={person.name}>
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell>{person.role}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={person.status === 'On Duty' ? 'bg-safe/10 text-safe' : 
                                     person.status === 'Responding' ? 'bg-warning/10 text-warning' : 
                                     'bg-muted/10 text-muted-foreground'}
                          >
                            {person.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{person.location}</TableCell>
                        <TableCell>{person.contact}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Radio className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Fire Suppression Systems", status: 95, available: 12, total: 12 },
                    { name: "Emergency Vehicles", status: 88, available: 7, total: 8 },
                    { name: "Medical Equipment", status: 92, available: 45, total: 48 },
                    { name: "Communication Radios", status: 78, available: 23, total: 30 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.available}/{item.total}
                        </span>
                      </div>
                      <Progress value={item.status} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Supplies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Medical Supplies", level: 85, status: "adequate" },
                    { name: "Emergency Food", level: 67, status: "low" },
                    { name: "Water Reserves", level: 92, status: "good" },
                    { name: "Backup Generators", level: 100, status: "excellent" }
                  ].map((supply, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{supply.name}</span>
                        <Badge 
                          variant="outline"
                          className={
                            supply.status === 'excellent' ? 'text-safe border-safe' :
                            supply.status === 'good' ? 'text-primary border-primary' :
                            supply.status === 'adequate' ? 'text-warning border-warning' :
                            'text-emergency border-emergency'
                          }
                        >
                          {supply.status}
                        </Badge>
                      </div>
                      <Progress value={supply.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Response Time</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.2 min</div>
                  <p className="text-sm text-muted-foreground">Average response time</p>
                  <div className="flex items-center justify-center text-safe mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">-12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Incidents Resolved</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-safe mb-2">98.5%</div>
                  <p className="text-sm text-muted-foreground">Success rate this month</p>
                  <div className="flex items-center justify-center text-safe mt-2">
                    <Activity className="h-4 w-4 mr-1" />
                    <span className="text-sm">+2% improvement</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Personnel Readiness</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">94%</div>
                  <p className="text-sm text-muted-foreground">Staff availability</p>
                  <div className="flex items-center justify-center text-muted-foreground mt-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">47/50 available</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Built with Passion for Safety Team Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Built with Passion for Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((member) => (
                <div key={member} className="flex flex-col items-center p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 ring-2 ring-primary/20">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-center">Member {member}</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">Safety Expert</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8 font-medium">
              Dedicated to making our campus safer, one innovation at a time.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OfficerDashboard;