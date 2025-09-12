import { useState } from "react";
import { BookOpen, Award, Target, Clock, AlertTriangle, MapPin, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { modules } from "@/utils/mockData";
import WeatherWidget from '@/components/WeatherWidget';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { moduleProgress, badges, getOverallProgress, getCompletedModules } = useProgress();

  // Get real module data with progress
  const moduleData = modules.slice(0, 4).map(module => {
    const progress = moduleProgress[module.id];
    return {
      id: module.id,
      title: module.title,
      description: module.description,
      progress: progress?.progress || 0,
      status: progress?.status || 'not-started',
      icon: module.icon,
      duration: module.duration,
      lessons: module.lessons,
      quizScore: null
    };
  });

  const upcomingDrills = [
    {
      type: "Fire Evacuation",
      date: "Tomorrow, 10:00 AM",
      location: "Building A",
      mandatory: true
    },
    {
      type: "Earthquake Response", 
      date: "Dec 15, 2:00 PM",
      location: "All Buildings",
      mandatory: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "safe";
      case "in-progress": return "warning";
      default: return "muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      default: return "Not Started";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title={`Welcome back, ${user?.firstName || 'Student'}`}
        subtitle="Track your learning progress and stay prepared"
        userRole="student"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="p-2 bg-primary/10 rounded-lg mr-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{moduleData.length}</p>
                <p className="text-sm text-muted-foreground">Modules Enrolled</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="p-2 bg-safe/10 rounded-lg mr-4">
                <CheckCircle className="h-6 w-6 text-safe" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getCompletedModules()}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="p-2 bg-warning/10 rounded-lg mr-4">
                <Award className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{badges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="p-2 bg-primary/10 rounded-lg mr-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getOverallProgress()}%</p>
                <p className="text-sm text-muted-foreground">Preparedness Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Learning Modules</h2>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/progress-analytics">View Analytics</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/modules">View All</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {moduleData.map((module) => (
                <Card key={module.id} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-3xl">{module.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{module.title}</h3>
                            <Badge variant="secondary" className={`text-${getStatusColor(module.status)}`}>
                              {getStatusText(module.status)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{module.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {module.duration}
                            </span>
                            <span>{module.lessons} lessons</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                          <Link to="/modules">
                            <Play className="h-4 w-4 mr-1" />
                            {module.status === "not-started" ? "Start" : "Continue"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget showAlerts={true} />
            
            {/* Emergency Button */}
            <Card className="bg-gradient-emergency text-white">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Emergency</h3>
                <p className="text-sm mb-4 text-white/90">
                  Quick access to emergency contacts and procedures
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/emergency">Access Emergency</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {badges.slice(0, 5).map((badge, index) => (
                    <div
                      key={index}
                      className="text-center p-2 rounded-lg border bg-primary/10 border-primary/20"
                      title={badge.name}
                    >
                      <div className="text-2xl">{badge.icon}</div>
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 5 - badges.length) }, (_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="text-center p-2 rounded-lg border bg-muted/50 border-muted grayscale"
                      title="Badge not earned"
                    >
                      <div className="text-2xl">🏅</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Drills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Upcoming Drills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDrills.map((drill, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{drill.type}</h4>
                      {drill.mandatory && (
                        <Badge variant="secondary" className="text-emergency">Mandatory</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{drill.date}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {drill.location}
                    </p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/drill-simulator">Start Virtual Drill</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;