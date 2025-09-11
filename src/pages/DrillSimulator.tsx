import { useState } from "react";
import { Play, CheckCircle, AlertTriangle, RotateCcw, ArrowRight, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Link } from "react-router-dom";

const DrillSimulator = () => {
  const [currentDrill, setCurrentDrill] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, string>>({});
  const [drillCompleted, setDrillCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const drills = [
    {
      id: "earthquake-drill",
      title: "Earthquake Response Drill",
      description: "Practice the Drop, Cover, and Hold On procedure",
      icon: "🌍",
      difficulty: "Essential",
      duration: "5-10 minutes",
      scenario: "You're in a classroom when sudden shaking begins",
      color: "primary"
    },
    {
      id: "fire-evacuation",
      title: "Fire Evacuation Drill", 
      description: "Learn proper evacuation routes and procedures",
      icon: "🔥",
      difficulty: "Essential",
      duration: "8-12 minutes",
      scenario: "Fire alarm sounds in your building",
      color: "emergency"
    },
    {
      id: "tornado-shelter",
      title: "Tornado Shelter Drill",
      description: "Practice taking shelter during severe weather",
      icon: "🌪️",
      difficulty: "Regional",
      duration: "6-8 minutes",
      scenario: "Tornado warning issued for your area",
      color: "warning"
    },
    {
      id: "lockdown-procedure",
      title: "Lockdown Procedure Drill",
      description: "Security threat response and safe room procedures",
      icon: "🔒",
      difficulty: "Critical",
      duration: "10-15 minutes", 
      scenario: "Security threat reported on campus",
      color: "emergency"
    }
  ];

  const earthquakeDrillSteps = [
    {
      id: 1,
      title: "Initial Response", 
      description: "You feel the ground shaking. What's your immediate response?",
      visual: "Classroom with desks and students",
      choices: [
        { id: "a", text: "Run outside immediately", correct: false, feedback: "Running during shaking increases injury risk from falling objects." },
        { id: "b", text: "Drop, Cover, and Hold On", correct: true, feedback: "Correct! This is the proper earthquake response." },
        { id: "c", text: "Stand in the doorway", correct: false, feedback: "Doorways aren't safer than other locations in modern buildings." },
        { id: "d", text: "Call for help first", correct: false, feedback: "Your safety comes first - take protective action immediately." }
      ],
      timeLimit: 10,
      points: 25
    },
    {
      id: 2,
      title: "Taking Cover",
      description: "You've dropped down. Where do you take cover?",
      visual: "Under desk with proper positioning",  
      choices: [
        { id: "a", text: "Under the nearest sturdy desk", correct: true, feedback: "Perfect! Sturdy furniture provides protection from falling objects." },
        { id: "b", text: "Against the wall", correct: false, feedback: "Walls may have heavy objects that could fall." },
        { id: "c", text: "In the center of the room", correct: false, feedback: "You're exposed to falling objects from all directions." },
        { id: "d", text: "Near the windows", correct: false, feedback: "Glass can shatter and cause serious injury." }
      ],
      timeLimit: 8,
      points: 25
    },
    {
      id: 3,
      title: "Hold On Position",
      description: "How do you maintain your protective position?",
      visual: "Proper hold-on technique demonstration",
      choices: [
        { id: "a", text: "Curl up in a ball", correct: false, feedback: "This doesn't provide protection if your cover moves." },
        { id: "b", text: "Hold onto the desk leg and cover your head", correct: true, feedback: "Excellent! This keeps your protection in place and shields vital areas." },
        { id: "c", text: "Lie flat on your stomach", correct: false, feedback: "This position doesn't allow you to maintain cover." },
        { id: "d", text: "Sit up and look around", correct: false, feedback: "Stay low and covered to protect from falling debris." }
      ],
      timeLimit: 8,
      points: 25  
    },
    {
      id: 4,
      title: "After Shaking Stops",
      description: "The shaking has stopped. What's your next action?",
      visual: "Post-earthquake assessment and evacuation",
      choices: [
        { id: "a", text: "Immediately run outside", correct: false, feedback: "Check for hazards first - aftershocks may occur." },
        { id: "b", text: "Take photos for social media", correct: false, feedback: "Focus on safety, not documentation." },
        { id: "c", text: "Check for injuries and hazards, then evacuate if necessary", correct: true, feedback: "Perfect! Safety assessment before movement is crucial." },
        { id: "d", text: "Go back to normal activities", correct: false, feedback: "Always evacuate to check for building damage and aftershocks." }
      ],
      timeLimit: 12,
      points: 25
    }
  ];

  const getCurrentDrillData = () => {
    if (currentDrill === "earthquake-drill") {
      return {
        steps: earthquakeDrillSteps,
        totalSteps: earthquakeDrillSteps.length
      };
    }
    return { steps: [], totalSteps: 0 };
  };

  const startDrill = (drillId: string) => {
    setCurrentDrill(drillId);
    setCurrentStep(0);
    setSelectedChoices({});
    setDrillCompleted(false);
    setScore(0);
  };

  const selectChoice = (stepIndex: number, choiceId: string) => {
    setSelectedChoices(prev => ({
      ...prev,
      [stepIndex]: choiceId
    }));
  };

  const nextStep = () => {
    const drillData = getCurrentDrillData();
    const currentStepData = drillData.steps[currentStep];
    const selectedChoice = selectedChoices[currentStep];
    const choice = currentStepData.choices.find(c => c.id === selectedChoice);
    
    if (choice?.correct) {
      setScore(prev => prev + currentStepData.points);
    }

    if (currentStep < drillData.totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setDrillCompleted(true);
    }
  };

  const resetDrill = () => {
    setCurrentStep(0);
    setSelectedChoices({});
    setDrillCompleted(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Essential": return "safe";
      case "Regional": return "warning";
      case "Critical": return "emergency";
      default: return "primary";
    }
  };

  // Drill Selection View
  if (!currentDrill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <DashboardHeader 
          title="Virtual Drill Simulator"
          subtitle="Practice emergency procedures through interactive scenarios"
          userRole="student"
        />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/student-dashboard" className="hover:text-primary">Dashboard</Link>
            <span>/</span>
            <span>Drill Simulator</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {drills.map((drill) => (
              <Card 
                key={drill.id}
                className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer group"
                onClick={() => startDrill(drill.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{drill.icon}</div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {drill.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className={`text-${getDifficultyColor(drill.difficulty)} border-${getDifficultyColor(drill.difficulty)}/30`}
                          >
                            {drill.difficulty}
                          </Badge>
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {drill.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{drill.description}</p>
                  
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Scenario:</p>
                        <p className="text-sm text-muted-foreground">{drill.scenario}</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full group-hover:shadow-md transition-all">
                    <Play className="h-4 w-4 mr-2" />
                    Start Drill
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="mt-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                How Virtual Drills Work
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-primary/10 rounded-full">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Interactive Scenarios</h3>
                <p className="text-sm text-muted-foreground">
                  Step through realistic emergency situations with visual guidance
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-warning/10 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <h3 className="font-semibold">Decision Points</h3>
                <p className="text-sm text-muted-foreground">
                  Make critical choices and learn from immediate feedback
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-safe/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-safe" />
                </div>
                <h3 className="font-semibold">Performance Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Get scored on your responses and earn safety certifications
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const drillData = getCurrentDrillData();
  const currentStepData = drillData.steps[currentStep];
  const progress = ((currentStep + 1) / drillData.totalSteps) * 100;
  const selectedChoice = selectedChoices[currentStep];
  const choice = currentStepData?.choices.find(c => c.id === selectedChoice);

  // Drill Completion View
  if (drillCompleted) {
    const maxScore = drillData.steps.reduce((sum, step) => sum + step.points, 0);
    const percentage = Math.round((score / maxScore) * 100);
    const passed = percentage >= 80;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-card animate-scale-in">
            <CardHeader className="text-center pb-6">
              <div className={`inline-flex p-4 rounded-full mx-auto mb-4 ${
                passed ? "bg-safe/10" : "bg-warning/10"
              }`}>
                {passed ? (
                  <CheckCircle className="h-12 w-12 text-safe" />
                ) : (
                  <AlertTriangle className="h-12 w-12 text-warning" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">Drill Complete!</CardTitle>
              <p className="text-muted-foreground">
                {passed 
                  ? "Excellent work! You're well-prepared for this emergency." 
                  : "Good effort! Review the feedback to improve your response."
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <div className="text-4xl font-bold text-primary">{percentage}%</div>
                  <div className="text-muted-foreground">Overall Score</div>
                </div>
                <div className="text-center p-6 bg-safe/5 rounded-lg">
                  <div className="text-4xl font-bold text-safe">{score}/{maxScore}</div>
                  <div className="text-muted-foreground">Points Earned</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetDrill}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={() => setCurrentDrill(null)}>
                  Choose Another Drill
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/student-dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Active Drill View
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                {drills.find(d => d.id === currentDrill)?.title}
              </h1>
              <Badge variant="outline" className="text-primary">
                Step {currentStep + 1} of {drillData.totalSteps}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Visual Representation */}
            <div className="bg-accent/30 p-6 rounded-lg text-center">
              <div className="text-6xl mb-4">
                {drills.find(d => d.id === currentDrill)?.icon}
              </div>
              <p className="text-sm text-muted-foreground">{currentStepData.visual}</p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {currentStepData.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => selectChoice(currentStep, choice.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedChoice === choice.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-muted-foreground/50 hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedChoice === choice.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`} />
                    <span>{choice.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {selectedChoice && choice && (
              <Alert className={`animate-fade-in ${choice.correct ? "border-safe" : "border-warning"}`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {choice.feedback}
                </AlertDescription>
              </Alert>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentDrill(null)}
              >
                Exit Drill
              </Button>

              <Button
                onClick={nextStep}
                disabled={!selectedChoice}
                className={choice?.correct ? "bg-safe hover:bg-safe/90" : ""}
              >
                {currentStep === drillData.totalSteps - 1 ? "Complete Drill" : "Next Step"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrillSimulator;