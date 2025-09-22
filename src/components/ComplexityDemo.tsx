import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateAgeAppropriateQuiz, GeneratedQuestion, getAgeGroup } from '@/services/geminiService';
import { modulesData } from '@/data/modulesData';
import { Loader2, Brain, Users, GraduationCap, Briefcase } from 'lucide-react';

export const ComplexityDemo: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questionsData, setQuestionsData] = useState<{
    [key: string]: GeneratedQuestion[];
  }>({});

  const ageGroups = [
    { age: 10, label: 'Children (10)', icon: Users, color: 'bg-blue-100 text-blue-800' },
    { age: 16, label: 'Teens (16)', icon: GraduationCap, color: 'bg-green-100 text-green-800' },
    { age: 22, label: 'Young Adults (22)', icon: Brain, color: 'bg-purple-100 text-purple-800' },
    { age: 35, label: 'Adults (35)', icon: Briefcase, color: 'bg-orange-100 text-orange-800' }
  ];

  const generateSampleQuestions = async () => {
    setIsGenerating(true);
    setQuestionsData({});

    try {
      // Use different module topics to demonstrate specificity
      const topics = [
        "Earthquake Safety Fundamentals",
        "Fire Emergency Response", 
        "Flood Preparedness & Response",
        "Medical Emergency Response"
      ];
      
      const results: { [key: string]: GeneratedQuestion[] } = {};

      for (let i = 0; i < ageGroups.length; i++) {
        const group = ageGroups[i];
        const topic = topics[i] || "Emergency Safety";
        const questions = await generateAgeAppropriateQuiz(topic, group.age);
        results[`${group.label} - ${topic}`] = questions.slice(0, 3); // Show first 3 questions for demo
      }

      setQuestionsData(results);
    } catch (error) {
      console.error('Error generating demo questions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Enhanced Complexity Demo</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how our AI generates module-specific questions with varying complexity levels 
          for different age groups and disaster types. Each age group gets questions about different topics.
        </p>
        <Button 
          onClick={generateSampleQuestions} 
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Questions...
            </>
          ) : (
            'Generate Sample Questions'
          )}
        </Button>
      </div>

      {Object.keys(questionsData).length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(questionsData).map(([key, questions]) => {
            const [ageLabel, topic] = key.split(' - ');
            const ageGroup = ageGroups.find(g => g.label === ageLabel);
            const Icon = ageGroup?.icon || Brain;
            
            return (
              <Card key={key} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Icon className="h-5 w-5" />
                      {ageLabel}
                    </CardTitle>
                    <Badge className={ageGroup?.color || 'bg-gray-100 text-gray-800'}>
                      {ageGroup ? getAgeGroup(ageGroup.age) : 'N/A'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-blue-600">{topic}</p>
                    <p className="text-sm text-gray-600">
                      Sample of {questions.length} questions (Total: {ageGroup ? (ageGroup.age <= 12 ? '6' : ageGroup.age <= 17 ? '12' : ageGroup.age <= 25 ? '16' : '8') : '8'} questions)
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {questions.map((question, idx) => (
                    <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          Question {idx + 1}
                        </h4>
                        <div className="flex gap-1">
                          {question.difficulty && (
                            <Badge variant="outline" className="text-xs">
                              {question.difficulty}
                            </Badge>
                          )}
                          {question.type && (
                            <Badge variant="outline" className="text-xs">
                              {question.type}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm mb-3 font-medium">{question.question}</p>
                      
                      {question.scenario && (
                        <div className="bg-blue-50 p-2 rounded text-xs mb-3">
                          <strong>Scenario:</strong> {question.scenario}
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        {question.options.map((option, optIdx) => (
                          <div 
                            key={optIdx} 
                            className={`text-xs p-2 rounded ${
                              optIdx === question.correct ? 
                              'bg-green-100 text-green-800 font-medium' : 
                              'bg-white'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}. {option}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-600">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                      
                      {question.tags && question.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {question.tags.map((tag, tagIdx) => (
                            <Badge key={tagIdx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComplexityDemo;