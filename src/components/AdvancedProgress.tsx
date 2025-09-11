import { useState } from "react";
import { TrendingUp, Target, Award, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

interface ProgressMetrics {
  overallScore: number;
  moduleProgress: Array<{
    name: string;
    completed: number;
    total: number;
    category: string;
    lastActive: string;
  }>;
  skillGaps: Array<{
    skill: string;
    currentLevel: number;
    targetLevel: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  learningTrend: Array<{
    date: string;
    score: number;
    modules: number;
  }>;
  achievements: Array<{
    name: string;
    icon: string;
    unlockedDate: string;
    category: string;
  }>;
}

interface AdvancedProgressProps {
  userId: string;
}

export const AdvancedProgress = ({ userId }: AdvancedProgressProps) => {
  // Mock data - in real app, this would come from API
  const [metrics] = useState<ProgressMetrics>({
    overallScore: 87,
    moduleProgress: [
      { name: "Fire Safety", completed: 8, total: 8, category: "emergency", lastActive: "2024-01-15" },
      { name: "Earthquake Prep", completed: 6, total: 8, category: "natural", lastActive: "2024-01-14" },
      { name: "Medical Emergency", completed: 4, total: 10, category: "medical", lastActive: "2024-01-13" },
      { name: "Cyber Security", completed: 2, total: 8, category: "cyber", lastActive: "2024-01-12" },
      { name: "Workplace Safety", completed: 7, total: 8, category: "workplace", lastActive: "2024-01-11" },
    ],
    skillGaps: [
      { skill: "Advanced CPR", currentLevel: 60, targetLevel: 90, priority: 'high' },
      { skill: "Tornado Response", currentLevel: 45, targetLevel: 85, priority: 'high' },
      { skill: "Cyber Incident Response", currentLevel: 30, targetLevel: 80, priority: 'medium' },
      { skill: "Chemical Spill Response", currentLevel: 25, targetLevel: 75, priority: 'medium' },
    ],
    learningTrend: [
      { date: "Week 1", score: 45, modules: 1 },
      { date: "Week 2", score: 62, modules: 2 },
      { date: "Week 3", score: 71, modules: 3 },
      { date: "Week 4", score: 78, modules: 5 },
      { date: "Week 5", score: 84, modules: 6 },
      { date: "Week 6", score: 87, modules: 7 },
    ],
    achievements: [
      { name: "Fire Safety Expert", icon: "🔥", unlockedDate: "2024-01-15", category: "expertise" },
      { name: "First Responder", icon: "⛑️", unlockedDate: "2024-01-14", category: "skill" },
      { name: "Perfect Score", icon: "💯", unlockedDate: "2024-01-13", category: "achievement" },
      { name: "Helping Hand", icon: "🤝", unlockedDate: "2024-01-12", category: "community" },
    ]
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-emergency';
      case 'medium': return 'text-warning';
      default: return 'text-safe';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'hsl(var(--emergency))';
      case 'natural': return 'hsl(var(--primary))';
      case 'medical': return 'hsl(var(--safe))';
      case 'cyber': return 'hsl(var(--warning))';
      case 'workplace': return 'hsl(var(--accent))';
      default: return 'hsl(var(--muted))';
    }
  };

  const radialData = metrics.moduleProgress.map((module, index) => ({
    name: module.name,
    value: (module.completed / module.total) * 100,
    fill: getCategoryColor(module.category),
  }));

  return (
    <div className="space-y-6">
      {/* Overall Progress Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-safe/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Overall Preparedness</h3>
              <p className="text-muted-foreground">Your emergency readiness score</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary mb-2">{metrics.overallScore}%</div>
              <div className="flex items-center text-safe">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% this month</span>
              </div>
            </div>
          </div>
          <Progress value={metrics.overallScore} className="mt-4 h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="modules">Module Progress</TabsTrigger>
          <TabsTrigger value="skills">Skill Gaps</TabsTrigger>
          <TabsTrigger value="trends">Learning Trends</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Module Progress List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Module Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metrics.moduleProgress.map((module, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{module.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {module.completed}/{module.total}
                      </Badge>
                    </div>
                    <Progress 
                      value={(module.completed / module.total) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="capitalize">{module.category}</span>
                      <span>Last active: {new Date(module.lastActive).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Radial Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Category Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart data={radialData} innerRadius="20%" outerRadius="80%">
                    <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'Completion']}
                      labelFormatter={(label) => `Module: ${label}`}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Skill Development Priorities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {metrics.skillGaps.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{skill.skill}</h4>
                    <Badge 
                      variant="outline" 
                      className={`${getPriorityColor(skill.priority)} border-current`}
                    >
                      {skill.priority} priority
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Level</span>
                      <span>{skill.currentLevel}%</span>
                    </div>
                    <Progress value={skill.currentLevel} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Target Level</span>
                      <span className="text-primary font-medium">{skill.targetLevel}%</span>
                    </div>
                    <Progress value={skill.targetLevel} className="h-2 opacity-30" />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Gap to close: {skill.targetLevel - skill.currentLevel} points
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Learning Progress Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.learningTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Preparedness Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="modules" 
                    stroke="hsl(var(--safe))" 
                    strokeWidth={2}
                    name="Modules Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-safe/5"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {achievement.category}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};