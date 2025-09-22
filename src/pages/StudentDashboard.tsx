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
import { mockModules } from "@/utils/mockData";
import WeatherWidget from '@/components/WeatherWidget';
import { useTranslation } from "@/contexts/TranslationContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { moduleProgress, badges, getOverallProgress, getCompletedModules } = useProgress();
  const { t } = useTranslation();

  // Get real module data with progress
  const moduleData = mockModules.slice(0, 4).map(module => {
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
        title={t('dashboard.welcome', { name: user?.firstName || 'Student' })}
        subtitle={t('dashboard.subtitle')}
        userRole="student"
      />

      <main className="max-w-7xl mx-auto mobile-container py-4 sm:py-8">
        {/* Stats Overview */}
        <div className="mobile-stats-grid mb-6 sm:mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="p-2 bg-primary/10 rounded-lg mr-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{moduleData.length}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.stats.modulesEnrolled')}</p>
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
                <p className="text-sm text-muted-foreground">{t('dashboard.stats.completed')}</p>
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
                <p className="text-sm text-muted-foreground">{t('dashboard.stats.badgesEarned')}</p>
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
                <p className="text-sm text-muted-foreground">{t('dashboard.stats.preparednessScore')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Learning Modules */}
          <div className="dashboard-main space-y-4 sm:space-y-6 lg:col-span-2 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="mobile-header font-bold">{t('dashboard.learningModules')}</h2>
              <div className="mobile-flex mobile-space w-full sm:w-auto">
                <Button variant="outline" size="sm" className="mobile-button" asChild>
                  <Link to="/progress-analytics">
                    <span className="mobile-hide">{t('dashboard.viewAnalytics')}</span>
                    <span className="mobile-show">Analytics</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="mobile-button" asChild>
                  <Link to="/modules">
                    <span className="mobile-hide">{t('dashboard.viewAll')}</span>
                    <span className="mobile-show">All</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {moduleData.map((module) => (
                <Card key={module.id} className="hover:shadow-card transition-shadow">
                  <CardContent className="mobile-card">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                        <div className="text-2xl sm:text-3xl flex-shrink-0">{module.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="font-semibold text-base sm:text-lg">{module.title}</h3>
                            <Badge variant="secondary" className={`text-${getStatusColor(module.status)} w-fit`}>
                              {getStatusText(module.status)}
                            </Badge>
                          </div>
                          <p className="mobile-text text-muted-foreground mb-3 line-clamp-2 sm:line-clamp-none">{module.description}</p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              {module.duration}
                            </span>
                            <span className="mobile-hide">{module.lessons} lessons</span>
                            <span className="mobile-show">{module.lessons}L</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-1.5 sm:h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 w-full sm:w-auto mobile-button" asChild>
                          <Link to="/modules">
                            <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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
          <div className="dashboard-sidebar space-y-4 sm:space-y-6 lg:col-span-1 order-1 lg:order-2">
            {/* Weather Widget */}
            <div className="mobile-card">
              <WeatherWidget showAlerts={true} />
            </div>
            
            {/* Emergency Button */}
            <Card className="bg-gradient-emergency text-white">
              <CardContent className="mobile-card text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 mobile-header">Emergency</h3>
                <p className="text-sm mb-4 text-white/90 mobile-text">
                  Quick access to emergency contacts and procedures
                </p>
                <Button variant="secondary" className="w-full mobile-button" asChild>
                  <Link to="/emergency">Access Emergency</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader className="mobile-card">
                <CardTitle className="flex items-center mobile-header">
                  <Award className="h-5 w-5 mr-2" />
                  {t('dashboard.achievements')}
                </CardTitle>
              </CardHeader>
              <CardContent className="mobile-card">
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
                <Button variant="outline" size="sm" className="w-full mt-4 mobile-button">
                  {t('dashboard.viewAllBadges')}
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Drills */}
            <Card>
              <CardHeader className="mobile-card">
                <CardTitle className="flex items-center mobile-header">
                  <Clock className="h-5 w-5 mr-2" />
                  {t('dashboard.upcomingDrills')}
                </CardTitle>
              </CardHeader>
              <CardContent className="mobile-card space-y-4">
                {upcomingDrills.map((drill, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium mobile-text">{drill.type}</h4>
                      {drill.mandatory && (
                        <Badge variant="secondary" className="text-emergency">Mandatory</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mobile-text">{drill.date}</p>
                    <p className="text-sm text-muted-foreground flex items-center mobile-text">
                      <MapPin className="h-3 w-3 mr-1" />
                      {drill.location}
                    </p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mobile-button" asChild>
                  <Link to="/modules">{t('dashboard.practiceDrills')}</Link>
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