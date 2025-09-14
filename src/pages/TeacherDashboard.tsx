import { useState } from "react";
import { Users, BookOpen, Clock, MessageSquare, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { mockModules, mockUsers } from "@/utils/mockData";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState("all");

  // Mock data for teacher's classes
  const teacherClasses = [
    { id: 'safety-101', name: 'Safety 101', students: 45, semester: 'Fall 2024' },
    { id: 'emergency-response', name: 'Emergency Response', students: 32, semester: 'Fall 2024' },
    { id: 'advanced-safety', name: 'Advanced Safety', students: 28, semester: 'Fall 2024' }
  ];

  const classStats = [
    { title: "Total Students", value: "105", change: "+8%", icon: Users, color: "primary" },
    { title: "Active Classes", value: "3", change: "0%", icon: BookOpen, color: "safe" },
    { title: "Avg. Completion", value: "78%", change: "+12%", icon: Clock, color: "warning" },
    { title: "Student Messages", value: "12", change: "+3", icon: MessageSquare, color: "accent" }
  ];

  // Filter students by selected class
  const filteredStudents = selectedClass === "all" 
    ? mockUsers.filter(user => user.role === 'student')
    : mockUsers.filter(user => user.role === 'student').filter(student =>
        selectedClass === "safety-101" && student.class === "Safety 101" ||
        selectedClass === "emergency-response" && student.class === "Emergency Response" ||
        selectedClass === "advanced-safety" && student.class === "Advanced Safety"
      );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-safe";
    if (score >= 80) return "text-warning";
    return "text-emergency";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title={`Welcome back, ${user?.firstName || 'Teacher'}`}
        subtitle="Manage your classes and monitor student progress"
        userRole="teacher"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {classStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-safe font-medium">{stat.change}</p>
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

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            {/* Class Filter */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Student Progress</h2>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {teacherClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Student Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Student Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.class}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{student.modulesCompleted}/{student.totalModules}</span>
                              <span>{Math.round((student.modulesCompleted / student.totalModules) * 100)}%</span>
                            </div>
                            <Progress value={(student.modulesCompleted / student.totalModules) * 100} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getScoreColor(student.averageScore)}`}>
                            {student.averageScore}%
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(student.lastActive).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Classes</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Class
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherClasses.map((cls) => (
                <Card key={cls.id} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{cls.name}</span>
                      <Badge variant="secondary">{cls.semester}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Students Enrolled</span>
                        <span className="font-medium">{cls.students}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Average Progress</span>
                          <span>76%</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Content Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Module
              </Button>
            </div>

            <div className="grid gap-4">
              {modules.slice(0, 5).map((module) => (
                <Card key={module.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{module.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{module.title}</h3>
                          <p className="text-muted-foreground">{module.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <span>{module.lessons} lessons</span>
                            <span>{module.duration}</span>
                            <Badge variant="outline">{module.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Class Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Module Completion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.slice(0, 4).map((module, index) => (
                      <div key={module.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{module.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 40 + 60)}%
                          </span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 40 + 60)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">87%</div>
                      <p className="text-sm text-muted-foreground">Average engagement rate</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-safe">92</div>
                        <p className="text-xs text-muted-foreground">High Engagement</p>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-warning">11</div>
                        <p className="text-xs text-muted-foreground">Medium</p>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-emergency">2</div>
                        <p className="text-xs text-muted-foreground">Low</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;