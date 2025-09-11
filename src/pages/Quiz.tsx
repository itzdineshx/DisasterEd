import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Award, ArrowRight, ArrowLeft, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useParams, Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";

const Quiz = () => {
  const { moduleId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    title: "Earthquake Safety Fundamentals Quiz",
    description: "Test your knowledge of earthquake preparedness and response procedures",
    timeLimit: 1800,
    passingScore: 70,
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        question: "What is the recommended action during earthquake shaking?",
        options: [
          "Run outside immediately",
          "Stand in a doorway",
          "Drop, Cover, and Hold On",
          "Call for help first"
        ],
        correct: 2,
        explanation: "Drop, Cover, and Hold On is the internationally recognized response to earthquake shaking.",
        points: 10
      },
      {
        id: 2,
        question: "Which location is safest during an earthquake if you're indoors?",
        options: [
          "Under a sturdy desk or table",
          "Near a window",
          "In an elevator",
          "Against an interior wall without heavy objects"
        ],
        correct: 0,
        explanation: "A sturdy desk or table provides protection from falling objects and debris.",
        points: 10
      },
      {
        id: 3,
        question: "How long should you hold your earthquake position?",
        options: [
          "Until the shaking stops",
          "For exactly 30 seconds",
          "Until help arrives",
          "Until the shaking stops and a few seconds after"
        ],
        correct: 3,
        explanation: "Hold your position until shaking stops completely and a few seconds after to ensure it's over.",
        points: 10
      },
      {
        id: 4,
        question: "What should be in your earthquake emergency kit?",
        options: [
          "Only water and food",
          "Water, food, first aid, flashlight, radio, and batteries",
          "Just a flashlight",
          "Only important documents"
        ],
        correct: 1,
        explanation: "A comprehensive kit includes water, non-perishable food, first aid supplies, flashlight, battery-powered radio, extra batteries, and other essentials.",
        points: 10
      },
      {
        id: 5,
        question: "If you're driving during an earthquake, you should:",
        options: [
          "Speed up to get home quickly",
          "Stop under a bridge or overpass",
          "Pull over safely away from bridges and power lines",
          "Keep driving normally"
        ],
        correct: 2,
        explanation: "Pull over safely away from bridges, overpasses, and power lines, then stay in your vehicle.",
        points: 10
      },
      {
        id: 6,
        question: "Which of these is a common earthquake myth?",
        options: [
          "Earthquakes can happen anywhere",
          "Standing in doorways is the safest action",
          "You should have an emergency kit",
          "Drop, Cover, and Hold On saves lives"
        ],
        correct: 1,
        explanation: "Standing in doorways is outdated advice. Modern doorways aren't stronger than other parts of the house.",
        points: 10
      },
      {
        id: 7,
        question: "What should you do immediately after earthquake shaking stops?",
        options: [
          "Run outside as fast as possible",
          "Check for injuries and hazards, then carefully evacuate if necessary",
          "Take photos for insurance",
          "Turn on all electronics to check for damage"
        ],
        correct: 1,
        explanation: "First check for injuries and hazards, then evacuate carefully if the building is damaged.",
        points: 10
      },
      {
        id: 8,
        question: "How much water should you store per person for emergencies?",
        options: [
          "1 gallon per day for 3 days",
          "1 gallon per day for 7 days",
          "2 gallons per day for 3 days",
          "Half a gallon per day for 3 days"
        ],
        correct: 0,
        explanation: "Store at least 1 gallon of water per person per day for a minimum of 3 days.",
        points: 10
      },
      {
        id: 9,
        question: "Which building type is generally safest during earthquakes?",
        options: [
          "Unreinforced masonry buildings",
          "Modern buildings built to seismic codes",
          "Very tall buildings",
          "Buildings with large windows"
        ],
        correct: 1,
        explanation: "Modern buildings constructed according to current seismic building codes are designed to withstand earthquakes.",
        points: 10
      },
      {
        id: 10,
        question: "What is the 'Triangle of Life' theory?",
        options: [
          "A proven earthquake safety method",
          "A debunked theory not recommended by experts",
          "The official earthquake response protocol",
          "A type of emergency shelter"
        ],
        correct: 1,
        explanation: "The 'Triangle of Life' theory has been debunked by earthquake safety experts and is not recommended.",
        points: 10
      }
    ]
  };

  useEffect(() => {
    if (!quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeRemaining === 0 && !quizCompleted) {
      handleQuizSubmit();
    }
  }, [timeRemaining, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct.toString()) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const handleQuizSubmit = () => {
    setQuizCompleted(true);
    setShowResults(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= quizData.passingScore;
    const correctAnswers = quizData.questions.filter((question, index) => 
      selectedAnswers[index] === question.correct.toString()
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-card animate-scale-in">
            <CardHeader className="text-center pb-6">
              <div className={`inline-flex p-4 rounded-full mx-auto mb-4 ${
                passed ? "bg-safe/10" : "bg-emergency/10"
              }`}>
                {passed ? (
                  <CheckCircle className="h-12 w-12 text-safe" />
                ) : (
                  <XCircle className="h-12 w-12 text-emergency" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                {passed ? "Congratulations!" : "Keep Learning!"}
              </CardTitle>
              <p className="text-muted-foreground">
                {passed 
                  ? "You've successfully completed the quiz" 
                  : "You can retake the quiz to improve your score"
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Score Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{score}%</div>
                  <div className="text-sm text-muted-foreground">Final Score</div>
                </div>
                <div className="text-center p-4 bg-safe/5 rounded-lg">
                  <div className="text-3xl font-bold text-safe">{correctAnswers}/{quizData.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <div className="text-3xl font-bold text-warning">{formatTime(quizData.timeLimit - timeRemaining)}</div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>

              {/* Badges Earned */}
              {passed && (
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">Badges Earned</h3>
                  <div className="flex justify-center space-x-4">
                    <Badge className="bg-warning/10 text-warning border-warning/30 px-4 py-2">
                      <Award className="h-4 w-4 mr-2" />
                      Quiz Master
                    </Badge>
                    {score >= 90 && (
                      <Badge className="bg-safe/10 text-safe border-safe/30 px-4 py-2">
                        <Award className="h-4 w-4 mr-2" />
                        Earthquake Expert
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Question Review */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Question Review</h3>
                <div className="grid gap-4">
                  {quizData.questions.map((question, index) => {
                    const userAnswer = parseInt(selectedAnswers[index]);
                    const isCorrect = userAnswer === question.correct;
                    
                    return (
                      <Card key={question.id} className={`border-l-4 ${
                        isCorrect ? "border-l-safe" : "border-l-emergency"
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-safe mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 text-emergency mt-0.5" />
                            )}
                            <div className="flex-1 space-y-2">
                              <p className="font-medium">{question.question}</p>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Your answer:</span>{" "}
                                  <span className={isCorrect ? "text-safe" : "text-emergency"}>
                                    {question.options[userAnswer] || "Not answered"}
                                  </span>
                                </p>
                                {!isCorrect && (
                                  <p>
                                    <span className="font-medium">Correct answer:</span>{" "}
                                    <span className="text-safe">{question.options[question.correct]}</span>
                                  </p>
                                )}
                                <p className="text-muted-foreground">{question.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button variant="outline" asChild>
                  <Link to="/modules">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Modules
                  </Link>
                </Button>
                {!passed && (
                  <Button onClick={() => window.location.reload()}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
                  </Button>
                )}
                <Button asChild>
                  <Link to="/student-dashboard">View Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Quiz in Progress"
        subtitle="Answer all questions to complete the module"
        userRole="student"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/student-dashboard" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <Link to="/modules" className="hover:text-primary">Modules</Link>
          <span>/</span>
          <span>Quiz</span>
        </div>
        {/* Quiz Header */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{quizData.title}</CardTitle>
                <p className="text-muted-foreground mt-1">{quizData.description}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${timeRemaining < 300 ? "text-emergency" : "text-primary"}`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-muted-foreground">Time Remaining</div>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>Progress: {currentQuestion + 1} of {quizData.questions.length}</span>
                <span>{getAnsweredCount()} answered</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-primary">
                Question {currentQuestion + 1}
              </Badge>
              <Badge variant="secondary">
                {currentQ.points} points
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Answer Options */}
            <RadioGroup
              value={selectedAnswers[currentQuestion] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion, value)}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleAnswerSelect(currentQuestion, index.toString())}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                {getAnsweredCount()} of {quizData.questions.length} questions answered
              </div>

              {currentQuestion === quizData.questions.length - 1 ? (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={getAnsweredCount() < quizData.questions.length}
                  className="bg-safe hover:bg-safe/90"
                >
                  Submit Quiz
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  disabled={!selectedAnswers[currentQuestion]}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="mt-6 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quick Navigation:</span>
              <div className="flex space-x-2">
                {quizData.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                      index === currentQuestion
                        ? "bg-primary text-primary-foreground"
                        : selectedAnswers[index]
                        ? "bg-safe/20 text-safe border border-safe/30"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;