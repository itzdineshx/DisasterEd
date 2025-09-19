import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StudentProgress } from "@/data/trainingData";

interface PerformanceAnalyticsProps {
  studentProgress: StudentProgress;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  studentProgress
}) => {
  const calculateOverallProgress = () => {
    const completed = studentProgress.moduleProgress.filter(m => m.completed).length;
    return (completed / studentProgress.moduleProgress.length) * 100;
  };

  const calculateAverageScore = () => {
    const scores = studentProgress.moduleProgress.map(m => m.score);
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { label: "Excellent", variant: "default" as const };
    if (score >= 80) return { label: "Good", variant: "secondary" as const };
    if (score >= 70) return { label: "Fair", variant: "outline" as const };
    return { label: "Needs Improvement", variant: "destructive" as const };
  };

  const getRecommendations = () => {
    const averageScore = calculateAverageScore();
    const recommendations = [];

    if (averageScore < 70) {
      recommendations.push("Review basic concepts and retake assessments");
    }
    if (averageScore >= 70 && averageScore < 80) {
      recommendations.push("Focus on practical exercises to improve understanding");
    }
    if (averageScore >= 80 && averageScore < 90) {
      recommendations.push("Consider attempting advanced modules");
    }
    if (averageScore >= 90) {
      recommendations.push("Ready for certification exams");
    }

    return recommendations;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateOverallProgress())}%
                </span>
              </div>
              <Progress value={calculateOverallProgress()} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Average Score</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {calculateAverageScore().toFixed(1)}%
                  </span>
                  <Badge variant={getPerformanceLevel(calculateAverageScore()).variant}>
                    {getPerformanceLevel(calculateAverageScore()).label}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Completed Modules</p>
                <span className="text-2xl font-bold">
                  {studentProgress.moduleProgress.filter(m => m.completed).length}/
                  {studentProgress.moduleProgress.length}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Certifications</p>
                <span className="text-2xl font-bold">
                  {studentProgress.moduleProgress.filter(m => m.certificateId).length}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentProgress.moduleProgress.map((module) => (
              <div key={module.moduleId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{module.moduleId}</p>
                  <Badge variant={getPerformanceLevel(module.score).variant}>
                    {module.score}%
                  </Badge>
                </div>
                <Progress value={module.score} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {getRecommendations().map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};