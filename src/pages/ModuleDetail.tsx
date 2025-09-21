import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { BookOpen, Clock, Star, Users, Award, Play, CheckCircle, ArrowLeft, Loader2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { generateAgeAppropriateQuiz, generateAgeAppropriateModule, GeneratedQuestion } from "@/services/geminiService";
import { getModuleById, ModuleData } from "@/data/modulesData";

const ModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [module, setModule] = useState<ModuleData | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [enhancedContent, setEnhancedContent] = useState<any>(null);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Quiz state variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Handle URL tab parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'content', 'quiz', 'progress'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Find the module by ID using the shared data
    if (id) {
      const foundModule = getModuleById(id);
      if (foundModule) {
        setModule(foundModule);
        generateAgeAppropriateContent(foundModule);
      } else {
        setError("Module not found");
      }
    }
  }, [id, user?.age]);

  // Quiz timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizSubmit(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  // Quiz helper functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < generatedQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    generatedQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct.toString()) {
        correct++;
      }
    });
    return Math.round((correct / generatedQuestions.length) * 100);
  };

  const handleQuizStart = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeRemaining(1800);
    setQuizCompleted(false);
    setShowResults(false);
  };

  const handleQuizSubmit = () => {
    setQuizCompleted(true);
    setShowResults(true);
  };

  const handleQuizRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeRemaining(1800);
    setQuizCompleted(false);
    setShowResults(false);
  };

  // Quiz timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizSubmit(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  const generateAgeAppropriateContent = async (moduleData: ModuleData) => {
    if (!user?.age) {
      setError("User age information is required for age-appropriate content.");
      return;
    }

    // Generate questions
    setIsLoadingQuestions(true);
    try {
      const questions = await generateAgeAppropriateQuiz(moduleData.title, user.age);
      setGeneratedQuestions(questions);
    } catch (err) {
      console.error("Error generating questions:", err);
      setError("Failed to generate age-appropriate questions.");
    } finally {
      setIsLoadingQuestions(false);
    }

    // Generate enhanced content
    setIsLoadingContent(true);
    try {
      const enhanced = await generateAgeAppropriateModule(moduleData.title, user.age);
      setEnhancedContent(enhanced);
    } catch (err) {
      console.error("Error generating content:", err);
    } finally {
      setIsLoadingContent(false);
    }
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <DashboardHeader 
          title="Module Not Found"
          subtitle="The requested module could not be found"
          userRole="student"
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground mb-4">The requested module does not exist.</p>
              <Button asChild>
                <Link to="/modules">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Modules
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title={module.title}
        subtitle={`${module.difficulty} • ${module.duration} • ${module.lessons} lessons`}
        userRole="student"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/student-dashboard" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <Link to="/modules" className="hover:text-primary">Modules</Link>
          <span>/</span>
          <span>{module.title}</span>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Age-appropriate content notification */}
        {user?.age && (isLoadingQuestions || isLoadingContent) && (
          <Alert className="mb-6">
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Generating age-appropriate content for age {user.age}...
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Module Header */}
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{module.icon}</div>
                        <div>
                          <CardTitle className="text-2xl">{module.title}</CardTitle>
                          <p className="text-muted-foreground mt-2">{module.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span className="font-medium">{module.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{module.enrolled} enrolled</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{module.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{module.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{module.enrolled} students</span>
                      </div>
                      <Badge variant="secondary">{module.difficulty}</Badge>
                    </div>

                    {module.progress > 0 && (
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {module.completedLessons} of {module.lessons} lessons completed
                        </p>
                      </div>
                    )}

                    <p className="text-muted-foreground mb-6">{module.content.overview}</p>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Learning Objectives</h3>
                      <ul className="space-y-2">
                        {module.content.objectives.map((objective: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-safe mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {/* Enhanced Content */}
                {enhancedContent && !isLoadingContent && (
                  <Alert className="mb-6">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Content has been optimized for age {user?.age}! The sections below use age-appropriate language and examples.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Content Sections */}
                {(enhancedContent?.content?.sections || module.content.sections).map((section: any, index: number) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                          {index + 1}
                        </span>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{section.content}</p>
                      {section.keyPoints && (
                        <div>
                          <h4 className="font-medium mb-2">Key Points:</h4>
                          <ul className="space-y-1">
                            {section.keyPoints.map((point: string, pointIndex: number) => (
                              <li key={pointIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="quiz" className="space-y-6">
                {/* Age-appropriate Interactive Quiz */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {module.title} Quiz
                      {user?.age && (
                        <Badge variant="outline" className="text-primary border-primary/30">
                          Age {user.age} - {generatedQuestions.length} Questions
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingQuestions ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                          <p>Generating age-appropriate questions...</p>
                        </div>
                      </div>
                    ) : generatedQuestions.length > 0 ? (
                      <>
                        {!quizStarted ? (
                          <div className="text-center space-y-6">
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold">Ready to Test Your Knowledge?</h3>
                              <p className="text-muted-foreground">
                                This quiz contains {generatedQuestions.length} age-appropriate questions about {module.title.toLowerCase()}.
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Time limit: 30 minutes
                              </p>
                            </div>
                            <Button onClick={handleQuizStart} size="lg" className="min-w-[200px]">
                              <Play className="h-4 w-4 mr-2" />
                              Start Quiz
                            </Button>
                          </div>
                        ) : !showResults ? (
                          <div className="space-y-6">
                            {/* Quiz Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Question {currentQuestion + 1} of {generatedQuestions.length}</span>
                                <span className="text-danger font-mono">
                                  ⏰ {formatTime(timeRemaining)}
                                </span>
                              </div>
                              <Progress 
                                value={((currentQuestion + 1) / generatedQuestions.length) * 100} 
                                className="h-2"
                              />
                            </div>

                            {/* Current Question */}
                            {generatedQuestions[currentQuestion] && (
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                  {generatedQuestions[currentQuestion].question}
                                </h3>
                                
                                <div className="space-y-3">
                                  {generatedQuestions[currentQuestion].options.map((option, optIndex) => (
                                    <button
                                      key={optIndex}
                                      onClick={() => handleAnswerSelect(currentQuestion, optIndex.toString())}
                                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                                        selectedAnswers[currentQuestion] === optIndex.toString()
                                          ? "bg-primary/20 border-primary"
                                          : "bg-muted hover:bg-muted/80 border-border"
                                      }`}
                                    >
                                      <span className="font-medium mr-2">
                                        {String.fromCharCode(65 + optIndex)}.
                                      </span>
                                      {option}
                                    </button>
                                  ))}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-4">
                                  <Button
                                    variant="outline"
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestion === 0}
                                  >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Previous
                                  </Button>
                                  
                                  {currentQuestion === generatedQuestions.length - 1 ? (
                                    <Button 
                                      onClick={handleQuizSubmit}
                                      disabled={Object.keys(selectedAnswers).length !== generatedQuestions.length}
                                    >
                                      Submit Quiz
                                      <CheckCircle className="h-4 w-4 ml-2" />
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={handleNextQuestion}
                                      disabled={!selectedAnswers[currentQuestion]}
                                    >
                                      Next
                                      <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Quiz Results */
                          <div className="space-y-6">
                            <div className="text-center space-y-4">
                              <div className="text-6xl">
                                {calculateScore() >= 80 ? "🎉" : calculateScore() >= 60 ? "👏" : "💪"}
                              </div>
                              <h3 className="text-2xl font-bold">
                                Quiz Complete!
                              </h3>
                              <div className="text-4xl font-bold text-primary">
                                {calculateScore()}%
                              </div>
                              <p className="text-muted-foreground">
                                You got {Object.entries(selectedAnswers).filter(([index, answer]) => 
                                  answer === generatedQuestions[parseInt(index)]?.correct.toString()
                                ).length} out of {generatedQuestions.length} questions correct
                              </p>
                            </div>

                            {/* Detailed Results */}
                            <div className="space-y-4">
                              <h4 className="font-semibold">Review Your Answers:</h4>
                              {generatedQuestions.map((question, index) => {
                                const userAnswer = selectedAnswers[index];
                                const isCorrect = userAnswer === question.correct.toString();
                                
                                return (
                                  <div key={index} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-start justify-between">
                                      <h5 className="font-medium text-sm">
                                        Question {index + 1}: {question.question}
                                      </h5>
                                      <Badge variant={isCorrect ? "secondary" : "destructive"}>
                                        {isCorrect ? "Correct" : "Incorrect"}
                                      </Badge>
                                    </div>
                                    
                                    <div className="space-y-1 text-sm">
                                      <div className="text-safe">
                                        <strong>Correct Answer:</strong> {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
                                      </div>
                                      {!isCorrect && userAnswer && (
                                        <div className="text-danger">
                                          <strong>Your Answer:</strong> {String.fromCharCode(65 + parseInt(userAnswer))}. {question.options[parseInt(userAnswer)]}
                                        </div>
                                      )}
                                      <div className="text-muted-foreground mt-2">
                                        <strong>Explanation:</strong> {question.explanation}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="text-center space-x-4">
                              <Button onClick={handleQuizRestart} variant="outline">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Retake Quiz
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          No age-appropriate questions generated yet.
                        </p>
                        <Button onClick={() => generateAgeAppropriateContent(module)}>
                          Generate Questions
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                {/* Progress Overview */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{module.progress}%</div>
                        <p className="text-muted-foreground">Overall Progress</p>
                        <Progress value={module.progress} className="h-3 mt-4" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-safe/10 rounded-lg">
                          <div className="text-2xl font-bold text-safe">{module.completedLessons}</div>
                          <p className="text-sm text-muted-foreground">Lessons Completed</p>
                        </div>
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{module.quizScore || 0}%</div>
                          <p className="text-sm text-muted-foreground">Quiz Score</p>
                        </div>
                      </div>

                      {module.badges && module.badges.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Badges Earned</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.badges.map((badge: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-warning/10 text-warning border-warning/30">
                                <Award className="h-3 w-3 mr-1" />
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {module.status === "completed" ? (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const tabTrigger = document.querySelector('[data-value="quiz"]') as HTMLElement;
                        tabTrigger?.click();
                        handleQuizRestart();
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Retake Quiz
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/modules">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Browse More Modules
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const tabTrigger = document.querySelector('[data-value="quiz"]') as HTMLElement;
                        tabTrigger?.click();
                        if (generatedQuestions.length > 0 && !quizStarted) {
                          handleQuizStart();
                        }
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {generatedQuestions.length > 0 ? 'Take Age-Appropriate Quiz' : 'Go to Quiz'}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/drill-simulator/${module.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Practice Drills
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Module Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Module Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-medium">{module.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Enrolled</span>
                  <span className="text-sm font-medium">{module.enrolled}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <Badge variant="secondary">{module.difficulty}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-sm font-medium">{module.duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleDetail;