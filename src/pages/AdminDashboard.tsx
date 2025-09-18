import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Users, BookOpen, Award, AlertTriangle, TrendingUp, Download, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAdminData } from "@/hooks/useLocalStorage";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const { institutionStats, departmentData, recentActivity, alerts, updateStats, addActivity } = useAdminData();

  // Dynamic stats from localStorage
  const overviewStats = [
    { title: "Total Students", value: institutionStats.totalStudents.toLocaleString(), change: "+12%", icon: Users, color: "primary" },
    { title: "Active Teachers", value: institutionStats.activeTeachers.toString(), change: "+5%", icon: Users, color: "safe" },
    { title: "Modules Completed", value: institutionStats.modulesCompleted.toLocaleString(), change: "+24%", icon: BookOpen, color: "warning" },
    { title: "Avg. Preparedness", value: `${institutionStats.avgPreparedness}%`, change: "+8%", icon: Award, color: "primary" }
  ];

  const moduleEngagement = [
    { name: "Earthquake Safety", completed: 89, inProgress: 156, notStarted: 45 },
    { name: "Fire Response", completed: 234, inProgress: 87, notStarted: 23 },
    { name: "Flood Preparedness", completed: 167, inProgress: 123, notStarted: 67 },
    { name: "Medical Emergency", completed: 98, inProgress: 178, notStarted: 134 },
    { name: "Tornado Safety", completed: 56, inProgress: 89, notStarted: 198 }
  ];

  const departmentProgress = [
    { name: "Engineering", value: 92, students: 487 },
    { name: "Medicine", value: 94, students: 623 },
    { name: "Arts & Sciences", value: 85, students: 892 },
    { name: "Business", value: 78, students: 345 },
    { name: "Education", value: 88, students: 267 },
    { name: "Administration", value: 96, students: 78 }
  ];

  const drillParticipation = [
    { name: "Jan", earthquakeDrills: 45, fireDrills: 32, totalStudents: 2650 },
    { name: "Feb", earthquakeDrills: 52, fireDrills: 38, totalStudents: 2698 },
    { name: "Mar", earthquakeDrills: 48, fireDrills: 41, totalStudents: 2734 },
    { name: "Apr", earthquakeDrills: 56, fireDrills: 35, totalStudents: 2781 },
    { name: "May", earthquakeDrills: 61, fireDrills: 44, totalStudents: 2847 }
  ];

  const recentActivity = [
    { type: "drill", title: "Fire Drill - Engineering Building", time: "2 hours ago", status: "completed", participants: 487 },
    { type: "quiz", title: "Earthquake Safety Quiz", time: "4 hours ago", status: "active", participants: 234 },
    { type: "alert", title: "Weather Alert Issued", time: "1 day ago", status: "resolved", participants: 2847 },
    { type: "module", title: "New Tornado Safety Module", time: "2 days ago", status: "published", participants: 0 },
    { type: "certification", title: "Medical Emergency Certifications", time: "3 days ago", status: "awarded", participants: 98 }
  ];

  const topPerformers = [
    { name: "Sarah Johnson", department: "Medicine", score: 98, modules: 8, badges: 12 },
    { name: "Michael Chen", department: "Engineering", score: 96, modules: 7, badges: 11 },
    { name: "Emily Davis", department: "Education", score: 95, modules: 8, badges: 10 },
    { name: "James Wilson", department: "Business", score: 94, modules: 6, badges: 9 },
    { name: "Lisa Brown", department: "Arts & Sciences", score: 93, modules: 7, badges: 8 }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--safe))', 'hsl(var(--warning))', 'hsl(var(--emergency))'];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "drill": return "🚨";
      case "quiz": return "📝";
      case "alert": return "⚠️";
      case "module": return "📚";
      case "certification": return "🏆";
      default: return "📋";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "safe";
      case "active": return "primary";
      case "resolved": return "safe";
      case "published": return "warning";
      case "awarded": return "warning";
      default: return "muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Admin Dashboard"
        subtitle="Monitor institution-wide preparedness and track progress"
        userRole="admin"
      />

      <main className="max-w-7xl mx-auto mobile-container py-4 sm:py-8">
        {/* Filters */}
        <div className="mobile-flex gap-4 mb-6 sm:mb-8">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="arts">Arts & Sciences</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>

          <div className="mobile-flex mobile-space w-full sm:w-auto sm:ml-auto">
            <Button variant="outline" className="mobile-button w-full sm:w-auto">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span className="mobile-hide">More Filters</span>
              <span className="mobile-show">Filters</span>
            </Button>
            <Button className="mobile-button w-full sm:w-auto">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span className="mobile-hide">Export Report</span>
              <span className="mobile-show">Export</span>
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mobile-stats-grid mb-6 sm:mb-8">
          {overviewStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-card animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-safe mr-1" />
                        <span className="text-sm text-safe font-medium">{stat.change}</span>
                      </div>
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

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="dashboard-main space-y-6 lg:space-y-8">
            {/* Module Engagement */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="mobile-header">Module Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent className="mobile-card">
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moduleEngagement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={10}
                        interval={0}
                      />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Bar dataKey="completed" stackId="a" fill="hsl(var(--safe))" name="Completed" />
                      <Bar dataKey="inProgress" stackId="a" fill="hsl(var(--warning))" name="In Progress" />
                      <Bar dataKey="notStarted" stackId="a" fill="hsl(var(--muted))" name="Not Started" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Drill Participation Trends */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="mobile-header">Drill Participation Trends</CardTitle>
              </CardHeader>
              <CardContent className="mobile-card">
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={drillParticipation}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Line type="monotone" dataKey="earthquakeDrills" stroke="hsl(var(--primary))" name="Earthquake Drills" strokeWidth={2} />
                      <Line type="monotone" dataKey="fireDrills" stroke="hsl(var(--emergency))" name="Fire Drills" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Department Progress */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="mobile-header">Department Progress</CardTitle>
              </CardHeader>
              <CardContent className="mobile-card">
                <div className="space-y-3 sm:space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm sm:text-base">{dept.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm text-muted-foreground mobile-hide">{dept.students} students</span>
                          <span className="text-xs sm:text-sm text-muted-foreground mobile-show">{dept.students}</span>
                          <span className="font-bold text-primary text-sm sm:text-base">{dept.value}%</span>
                        </div>
                      </div>
                      <Progress value={dept.value} className="h-1.5 sm:h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar space-y-4 sm:space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="text-lg">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-${getStatusColor(activity.status)} border-${getStatusColor(activity.status)}/30 text-xs`}
                        >
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      {activity.participants > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.participants} participants
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? "bg-warning" : index === 1 ? "bg-muted" : "bg-primary/70"
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">{performer.department}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs">
                        <span className="text-primary font-medium">{performer.score}% avg</span>
                        <span>{performer.modules} modules</span>
                        <span>{performer.badges} badges</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Alerts */}
            <Card className="shadow-card bg-emergency/5 border-emergency/20">
              <CardHeader>
                <CardTitle className="flex items-center text-emergency">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Emergency Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="font-medium text-sm">Weather Alert Active</p>
                  <p className="text-xs text-muted-foreground">Severe thunderstorm warning until 8 PM</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    Manage Alert
                  </Button>
                </div>
                <div className="p-3 bg-safe/10 rounded-lg border border-safe/20">
                  <p className="font-medium text-sm">All Systems Normal</p>
                  <p className="text-xs text-muted-foreground">No active emergency alerts</p>
                </div>
                <Button className="w-full bg-emergency/90 hover:bg-emergency text-white">
                  Create Emergency Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;