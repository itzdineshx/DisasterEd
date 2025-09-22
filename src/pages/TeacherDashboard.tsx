import { useState } from "react";
import { Users, BookOpen, Clock, MessageSquare, Plus, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Class, Student } from "@/data/teacherData";
import { mockModules } from "@/utils/mockData";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("all");
  const { modules } = useData();
  
  // Mock data for students and classes
  const students = {
    getAll: () => [
      { 
        id: '1', 
        name: 'John Doe', 
        email: 'john.doe@school.edu',
        class: '10A', 
        overallScore: 85, 
        averageScore: 85,
        lastActivity: '2 hours ago', 
        lastActive: '2025-09-21',
        status: 'active',
        modulesCompleted: 8,
        totalModules: 10
      },
      { 
        id: '2', 
        name: 'Jane Smith', 
        email: 'jane.smith@school.edu',
        class: '10A', 
        overallScore: 92, 
        averageScore: 92,
        lastActivity: '1 hour ago', 
        lastActive: '2025-09-21',
        status: 'active',
        modulesCompleted: 9,
        totalModules: 10
      },
      { 
        id: '3', 
        name: 'Mike Johnson', 
        email: 'mike.johnson@school.edu',
        class: '10B', 
        overallScore: 78, 
        averageScore: 78,
        lastActivity: '3 hours ago', 
        lastActive: '2025-09-20',
        status: 'active',
        modulesCompleted: 6,
        totalModules: 10
      },
      { 
        id: '4', 
        name: 'Sarah Wilson', 
        email: 'sarah.wilson@school.edu',
        class: '10B', 
        overallScore: 88, 
        averageScore: 88,
        lastActivity: '30 minutes ago', 
        lastActive: '2025-09-21',
        status: 'active',
        modulesCompleted: 7,
        totalModules: 10
      }
    ],
    create: (student: any) => ({ ...student, id: Date.now().toString() }),
    update: (id: string, updates: any) => {},
    remove: (id: string) => {}
  };
  
  const classes = {
    getAll: () => [
      { 
        id: '1', 
        name: '10A', 
        semester: 'Fall 2025', 
        students: 25, 
        avgScore: 85,
        averageProgress: 85 
      },
      { 
        id: '2', 
        name: '10B', 
        semester: 'Fall 2025', 
        students: 23, 
        avgScore: 82,
        averageProgress: 78 
      }
    ],
    create: (cls: any) => ({ ...cls, id: Date.now().toString() }),
    update: (id: string, updates: any) => {},
    remove: (id: string) => {}
  };
  
  // Form states for new class/student
  const [newClass, setNewClass] = useState<Partial<Class>>({
    name: "",
    semester: "Fall 2025",
    students: 0,
    averageProgress: 0,
    modules: []
  });

  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: "",
    email: "",
    class: "",
    modulesCompleted: 0,
    totalModules: 10,
    averageScore: 0,
    status: "active"
  });

  // CRUD handlers for classes
  const handleCreateClass = () => {
    if (!newClass.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const createdClass = classes.create({
      ...newClass as Omit<Class, "id">,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7776000000).toISOString(), // 90 days from now
    });

    toast({
      title: "Class Created",
      description: `New class "${createdClass.name}" has been created.`
    });
  };

  const handleUpdateClass = (id: string, updates: Partial<Class>) => {
    classes.update(id, updates);
    toast({
      title: "Class Updated",
      description: `Class has been updated successfully.`
    });
  };

  const handleDeleteClass = (id: string) => {
    classes.remove(id);
    toast({
      title: "Class Deleted",
      description: `Class has been removed.`
    });
  };

  // CRUD handlers for students
  const handleCreateStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.class) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const createdStudent = students.create({
      ...newStudent as Omit<Student, "id">,
      lastActive: new Date().toISOString(),
    });

    toast({
      title: "Student Added",
      description: `${createdStudent.name} has been added to the class.`
    });
  };

  const handleUpdateStudent = (id: string, updates: Partial<Student>) => {
    students.update(id, updates);
    toast({
      title: "Student Updated",
      description: "Student information has been updated."
    });
  };

  const handleDeleteStudent = (id: string) => {
    students.remove(id);
    toast({
      title: "Student Removed",
      description: "Student has been removed from the class."
    });
  };

  const allStudents = students.getAll();
  const allClasses = classes.getAll();
  
  const classStats = [
    { 
      title: "Total Students", 
      value: allStudents.length.toString(), 
      change: "", 
      icon: Users, 
      color: "primary" 
    },
    { 
      title: "Active Classes", 
      value: allClasses.length.toString(), 
      change: "", 
      icon: BookOpen, 
      color: "safe" 
    },
    { 
      title: "Avg. Completion", 
      value: Math.round(allStudents.reduce((acc, student) => 
        acc + (student.modulesCompleted / student.totalModules) * 100, 0
      ) / allStudents.length || 0) + "%",
      change: "", 
      icon: Clock, 
      color: "warning" 
    },
    { 
      title: "Active Students", 
      value: allStudents.filter(s => s.status === "active").length.toString(), 
      change: "", 
      icon: MessageSquare, 
      color: "accent" 
    }
  ];

  // Filter students by selected class
  const filteredStudents = selectedClass === "all"
    ? students.getAll()
    : students.getAll().filter(student => student.class === selectedClass);

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

      <main className="max-w-7xl mx-auto mobile-container py-4 sm:py-8">
        {/* Stats Overview */}
        <div className="mobile-stats-grid mb-6 sm:mb-8">
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

        <Tabs defaultValue="students" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="students" className="text-xs sm:text-sm">
              <span className="mobile-hide">Student Management</span>
              <span className="mobile-show">Students</span>
            </TabsTrigger>
            <TabsTrigger value="classes" className="text-xs sm:text-sm">
              <span className="mobile-hide">My Classes</span>
              <span className="mobile-show">Classes</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="text-xs sm:text-sm">
              <span className="mobile-hide">Course Content</span>
              <span className="mobile-show">Content</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4 sm:space-y-6">
            {/* Class Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="mobile-header font-bold">Student Progress</h2>
              <div className="flex items-center gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.getAll().map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Student Name</Label>
                        <Input
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                          placeholder="Enter student name"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={newStudent.email}
                          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                          placeholder="student@example.com"
                        />
                      </div>
                      <div>
                        <Label>Class</Label>
                        <Select 
                          value={newStudent.class} 
                          onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.getAll().map(cls => (
                              <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateStudent}>Add Student</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Student Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="mobile-header">Student Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="mobile-card">
                <div className="overflow-x-auto">
                  <Table className="mobile-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="mobile-hide">Class</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="mobile-hide">Avg. Score</TableHead>
                        <TableHead className="mobile-hide">Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const studentClass = classes.getAll().find(c => c.id === student.class);
                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{student.name}</div>
                              <div className="text-xs text-muted-foreground mobile-hide">{student.email}</div>
                              <div className="mobile-show">
                                <Badge variant="outline" className="text-xs mt-1">
                                  {studentClass?.name || 'Unknown Class'}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="mobile-hide">
                            <Badge variant="outline">
                              {studentClass?.name || 'Unknown Class'}
                            </Badge>
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
                          <TableCell className="mobile-hide">
                            <span className={`font-medium ${getScoreColor(student.averageScore)}`}>
                              {student.averageScore}%
                            </span>
                          </TableCell>
                          <TableCell className="mobile-hide text-sm text-muted-foreground">
                            {new Date(student.lastActive).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleUpdateStudent(student.id, { 
                                  status: student.status === 'active' ? 'inactive' : 'active' 
                                })}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="mobile-header font-bold">My Classes</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto mobile-button">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Create New Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Class</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Class Name</Label>
                      <Input
                        value={newClass.name}
                        onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                        placeholder="Enter class name"
                      />
                    </div>
                    <div>
                      <Label>Semester</Label>
                      <Input
                        value={newClass.semester}
                        onChange={(e) => setNewClass({ ...newClass, semester: e.target.value })}
                        placeholder="e.g., Fall 2025"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateClass}>Create Class</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mobile-grid">
              {classes.getAll().map((cls) => (
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
                          <span>{cls.averageProgress}%</span>
                        </div>
                        <Progress value={cls.averageProgress} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedClass(cls.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Students
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1" 
                          onClick={() => handleDeleteClass(cls.id)}
                        >
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

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Content Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Module
              </Button>
            </div>

            <div className="grid gap-4">
              {mockModules.slice(0, 5).map((module) => (
                <Card key={module.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{module.icon}</div>
                        <div>
                          <h3 className="font-semibold text-xl">{module.title}</h3>
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
                    {mockModules.slice(0, 4).map((module, index) => (
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