import { useState } from "react";
import { BookOpen, Play, CheckCircle, Clock, Star, Award, MapPin, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Link } from "react-router-dom";

const Modules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const modules = [
    {
      id: "earthquake-basics",
      title: "Earthquake Safety Fundamentals",
      description: "Learn the science behind earthquakes and essential safety measures",
      category: "earthquake",
      difficulty: "Beginner",
      duration: "45 min",
      lessons: 8,
      progress: 85,
      status: "in-progress",
      icon: "🌍",
      rating: 4.8,
      enrolled: 1249,
      regionSpecific: ["Seismic Zones", "Building Codes"],
      completedLessons: 7,
      quizScore: 92,
      badges: ["Quick Learner", "Safety First"]
    },
    {
      id: "fire-response",
      title: "Fire Emergency Response",
      description: "Comprehensive fire safety, prevention, and evacuation procedures",
      category: "fire",
      difficulty: "Beginner",
      duration: "35 min",
      lessons: 6,
      progress: 100,
      status: "completed",
      icon: "🔥",
      rating: 4.9,
      enrolled: 2156,
      regionSpecific: ["Building Types", "Climate Factors"],
      completedLessons: 6,
      quizScore: 88,
      badges: ["Fire Safety Expert", "Perfect Score"]
    },
    {
      id: "flood-preparedness",
      title: "Flood Preparedness & Response",
      description: "Understanding flood risks and implementing safety measures",
      category: "flood",
      difficulty: "Intermediate",
      duration: "50 min",
      lessons: 9,
      progress: 60,
      status: "in-progress",
      icon: "🌊",
      rating: 4.7,
      enrolled: 987,
      regionSpecific: ["Coastal Areas", "River Basins"],
      completedLessons: 5,
      quizScore: null,
      badges: ["Water Safety"]
    },
    {
      id: "tornado-safety",
      title: "Severe Weather & Tornado Safety",
      description: "Weather monitoring, warning systems, and shelter protocols",
      category: "weather",
      difficulty: "Intermediate",
      duration: "40 min",
      lessons: 7,
      progress: 0,
      status: "not-started",
      icon: "🌪️",
      rating: 4.6,
      enrolled: 543,
      regionSpecific: ["Tornado Alley", "Rural Areas"],
      completedLessons: 0,
      quizScore: null,
      badges: []
    },
    {
      id: "medical-emergency",
      title: "Medical Emergency Response",
      description: "First aid, CPR, and medical emergency protocols",
      category: "medical",
      difficulty: "Advanced",
      duration: "60 min",
      lessons: 12,
      progress: 25,
      status: "in-progress",
      icon: "🏥",
      rating: 4.9,
      enrolled: 1678,
      regionSpecific: ["Medical Facilities", "Remote Areas"],
      completedLessons: 3,
      quizScore: 95,
      badges: ["Life Saver"]
    },
    {
      id: "cyber-security",
      title: "Cyber Security in Crisis",
      description: "Digital safety and communication during emergencies",
      category: "technology",
      difficulty: "Advanced",
      duration: "55 min",
      lessons: 10,
      progress: 0,
      status: "locked",
      icon: "🔐",
      rating: 4.5,
      enrolled: 234,
      regionSpecific: ["Digital Infrastructure"],
      completedLessons: 0,
      quizScore: null,
      badges: []
    }
  ];

  const categories = [
    { id: "all", label: "All Modules", count: modules.length },
    { id: "earthquake", label: "Earthquake", count: 1 },
    { id: "fire", label: "Fire Safety", count: 1 },
    { id: "flood", label: "Flood", count: 1 },
    { id: "weather", label: "Weather", count: 1 },
    { id: "medical", label: "Medical", count: 1 },
    { id: "technology", label: "Technology", count: 1 }
  ];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "safe";
      case "in-progress": return "warning";
      case "locked": return "muted";
      default: return "primary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "locked": return "Locked";
      default: return "Start Learning";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "safe";
      case "Intermediate": return "warning";
      case "Advanced": return "emergency";
      default: return "primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Learning Modules"
        subtitle="Master disaster preparedness through interactive learning"
        userRole="student"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/student-dashboard" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <span>Modules</span>
        </div>
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" asChild>
              <Link to="/certificates">View Certificates</Link>
            </Button>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-7">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Modules Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card 
              key={module.id} 
              className={`hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in ${
                module.status === "locked" ? "opacity-75" : ""
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{module.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-${getStatusColor(module.status)} border-${getStatusColor(module.status)}/30`}
                        >
                          {getStatusText(module.status)}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-${getDifficultyColor(module.difficulty)}`}
                        >
                          {module.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{module.description}</p>

                {/* Module Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{module.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{module.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{module.enrolled}</span>
                  </div>
                </div>

                {/* Progress */}
                {module.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {module.completedLessons} of {module.lessons} lessons completed
                    </div>
                  </div>
                )}

                {/* Quiz Score */}
                {module.quizScore && (
                  <div className="flex items-center justify-between p-3 bg-safe/10 rounded-lg">
                    <span className="text-sm font-medium">Latest Quiz Score</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-safe font-bold">{module.quizScore}%</span>
                      <CheckCircle className="h-4 w-4 text-safe" />
                    </div>
                  </div>
                )}

                {/* Region-Specific Content */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    Region-Specific Content
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {module.regionSpecific.map((region, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Badges Earned */}
                {module.badges.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium">
                      <Award className="h-4 w-4 mr-1 text-warning" />
                      Badges Earned
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {module.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-warning/10 text-warning border-warning/30">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  {module.status === "locked" ? (
                    <Button className="w-full" variant="outline" disabled>
                      <div className="flex items-center space-x-2">
                        <span>Complete Prerequisites</span>
                      </div>
                    </Button>
                  ) : module.status === "completed" ? (
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline" asChild>
                        <Link to={`/quiz/${module.id}`}>
                          <Zap className="h-4 w-4 mr-2" />
                          Retake Quiz
                        </Link>
                      </Button>
                      <Button className="w-full" variant="ghost" size="sm" asChild>
                        <Link to={`/module/${module.id}`}>Review Content</Link>
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link to={`/module/${module.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        {module.status === "not-started" ? "Start Learning" : "Continue"}
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No modules found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Modules;