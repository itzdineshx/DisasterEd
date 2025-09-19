import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Assessment, AssessmentQuestion } from "@/data/trainingData";

interface AssessmentModuleProps {
  assessment: Assessment;
  onComplete: (results: {
    assessmentId: string;
    score: number;
    timeSpent: number;
    passed: boolean;
  }) => void;
}

export const AssessmentModule: React.FC<AssessmentModuleProps> = ({
  assessment,
  onComplete
}) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimit * 60);
  const [isComplete, setIsComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isComplete) {
      handleSubmit();
    }
  }, [timeLeft, isComplete]);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    assessment.questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (Array.isArray(question.correctAnswer)) {
        // For scenario-based questions with multiple correct answers
        const correctAnswers = new Set(question.correctAnswer);
        const userAnswers = new Set(Array.isArray(userAnswer) ? userAnswer : [userAnswer]);
        const intersection = new Set([...correctAnswers].filter(x => userAnswers.has(x)));
        const percentage = intersection.size / correctAnswers.size;
        earnedPoints += question.points * percentage;
      } else {
        // For single-answer questions
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      }
    });

    return (earnedPoints / totalPoints) * 100;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const timeSpent = assessment.timeLimit * 60 - timeLeft;
    const passed = score >= assessment.passingScore;

    setIsComplete(true);
    onComplete({
      assessmentId: assessment.id,
      score,
      timeSpent,
      passed
    });

    toast({
      title: passed ? "Assessment Completed!" : "Assessment Failed",
      description: `You scored ${score.toFixed(1)}%. ${
        passed ? "Congratulations!" : "Please try again."
      }`,
      variant: passed ? "default" : "destructive"
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: AssessmentQuestion) => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.question}</p>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[question.id] === option ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleAnswer(question.id, option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Scenario:</h4>
              <p>{question.scenario?.description}</p>
              <p className="mt-2 text-sm text-muted-foreground">{question.scenario?.context}</p>
            </div>
            <p className="text-lg font-medium">{question.question}</p>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Enter your response..."
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              value={answers[question.id] as string || ''}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{assessment.title}</CardTitle>
          <Badge variant={timeLeft < 60 ? "destructive" : "outline"}>
            Time Left: {formatTime(timeLeft)}
          </Badge>
        </div>
        <Progress 
          value={(currentQuestion / assessment.questions.length) * 100}
          className="mt-2"
        />
      </CardHeader>
      <CardContent>
        {!isComplete ? (
          renderQuestion(assessment.questions[currentQuestion])
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">Assessment Complete!</h3>
            <p>Your score: {calculateScore().toFixed(1)}%</p>
            <p>Time taken: {formatTime(assessment.timeLimit * 60 - timeLeft)}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentQuestion === 0 || isComplete}
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
        >
          Previous
        </Button>
        {!isComplete && currentQuestion === assessment.questions.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button
            disabled={
              currentQuestion === assessment.questions.length - 1 || isComplete
            }
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
          >
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};