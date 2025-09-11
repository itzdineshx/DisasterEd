import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface ModuleProgress {
  moduleId: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  lastAccessed: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface QuizResult {
  moduleId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: Record<number, string>;
  completedAt: string;
  timeSpent: number;
  passed: boolean;
}

export interface DrillResult {
  drillId: string;
  score: number;
  maxScore: number;
  completedAt: string;
  choices: Record<number, string>;
  passed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: string;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleProgress>>({});
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [drillResults, setDrillResults] = useState<DrillResult[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = () => {
    if (!user) return;

    const savedProgress = localStorage.getItem(`disaster_ed_progress_${user.id}`);
    if (savedProgress) {
      setModuleProgress(JSON.parse(savedProgress));
    }

    const savedQuizResults = localStorage.getItem(`disaster_ed_quiz_results_${user.id}`);
    if (savedQuizResults) {
      setQuizResults(JSON.parse(savedQuizResults));
    }

    const savedDrillResults = localStorage.getItem(`disaster_ed_drill_results_${user.id}`);
    if (savedDrillResults) {
      setDrillResults(JSON.parse(savedDrillResults));
    }

    const savedBadges = localStorage.getItem(`disaster_ed_badges_${user.id}`);
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  };

  const saveProgress = (progress: Record<string, ModuleProgress>) => {
    if (!user) return;
    localStorage.setItem(`disaster_ed_progress_${user.id}`, JSON.stringify(progress));
    setModuleProgress(progress);
  };

  const saveQuizResults = (results: QuizResult[]) => {
    if (!user) return;
    localStorage.setItem(`disaster_ed_quiz_results_${user.id}`, JSON.stringify(results));
    setQuizResults(results);
  };

  const saveDrillResults = (results: DrillResult[]) => {
    if (!user) return;
    localStorage.setItem(`disaster_ed_drill_results_${user.id}`, JSON.stringify(results));
    setDrillResults(results);
  };

  const saveBadges = (newBadges: Badge[]) => {
    if (!user) return;
    localStorage.setItem(`disaster_ed_badges_${user.id}`, JSON.stringify(newBadges));
    setBadges(newBadges);
  };

  const updateModuleProgress = (moduleId: string, lessonCompleted: number, totalLessons: number) => {
    const progress = Math.round((lessonCompleted / totalLessons) * 100);
    const status: 'not-started' | 'in-progress' | 'completed' = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
    
    const updatedProgress = {
      ...moduleProgress,
      [moduleId]: {
        moduleId,
        completedLessons: lessonCompleted,
        totalLessons,
        progress,
        lastAccessed: new Date().toISOString(),
        status
      }
    };
    
    saveProgress(updatedProgress);
    
    // Check for milestone badges
    checkMilestoneBadges(updatedProgress);
  };

  const addQuizResult = (result: QuizResult) => {
    const updatedResults = [...quizResults, result];
    saveQuizResults(updatedResults);
    
    // Check for badges
    checkQuizBadges(result);
  };

  const addDrillResult = (result: DrillResult) => {
    const updatedResults = [...drillResults, result];
    saveDrillResults(updatedResults);
    
    // Check for badges  
    checkDrillBadges(result);
  };

  const awardBadge = (badge: Badge) => {
    const existingBadge = badges.find(b => b.id === badge.id);
    if (!existingBadge) {
      const updatedBadges = [...badges, { ...badge, earnedAt: new Date().toISOString() }];
      saveBadges(updatedBadges);
    }
  };

  const checkQuizBadges = (result: QuizResult) => {
    // Quiz Master badge - score 90% or higher
    if (result.score >= 90) {
      awardBadge({
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Scored 90% or higher on a quiz',
        icon: '🎯',
        earnedAt: '',
        category: 'academic'
      });
    }

    // Perfect Score badge
    if (result.score === 100) {
      awardBadge({
        id: 'perfect-score',
        name: 'Perfect Score',
        description: 'Achieved 100% on a quiz',
        icon: '⭐',
        earnedAt: '',
        category: 'academic'
      });
    }

    // Quick Learner badge - completed within time limit
    if (result.timeSpent < 900) { // 15 minutes
      awardBadge({
        id: 'quick-learner',
        name: 'Quick Learner',
        description: 'Completed quiz quickly and accurately',
        icon: '⚡',
        earnedAt: '',
        category: 'academic'
      });
    }
  };

  const checkDrillBadges = (result: DrillResult) => {
    // Drill Champion badge
    if (result.passed && result.score === result.maxScore) {
      awardBadge({
        id: 'drill-champion',
        name: 'Drill Champion',
        description: 'Perfect score on emergency drill',
        icon: '🏆',
        earnedAt: '',
        category: 'safety'
      });
    }

    // Safety Expert badge
    if (result.passed) {
      awardBadge({
        id: 'safety-expert',
        name: 'Safety Expert',
        description: 'Successfully completed emergency drill',
        icon: '🛡️',
        earnedAt: '',
        category: 'safety'
      });
    }
  };

  const checkMilestoneBadges = (progress: Record<string, ModuleProgress>) => {
    const completedModules = Object.values(progress).filter(mp => mp.status === 'completed').length;
    const overallProgress = getOverallProgress();
    
    // First Module badge
    if (completedModules >= 1) {
      awardBadge({
        id: 'first-module',
        name: 'Getting Started',
        description: 'Completed your first learning module',
        icon: '🎓',
        earnedAt: '',
        category: 'milestone'
      });
    }
    
    // Dedicated Learner badge - 3 modules
    if (completedModules >= 3) {
      awardBadge({
        id: 'dedicated-learner',
        name: 'Dedicated Learner',
        description: 'Completed 3 learning modules',
        icon: '📚',
        earnedAt: '',
        category: 'milestone'
      });
    }
    
    // Preparedness Expert badge - 5 modules
    if (completedModules >= 5) {
      awardBadge({
        id: 'preparedness-expert',
        name: 'Preparedness Expert',
        description: 'Completed 5 learning modules',
        icon: '⭐',
        earnedAt: '',
        category: 'milestone'
      });
    }
    
    // Master Preparedness badge - 80% overall progress
    if (overallProgress >= 80) {
      awardBadge({
        id: 'master-preparedness',
        name: 'Master of Preparedness',
        description: 'Achieved 80% overall preparedness score',
        icon: '🌟',
        earnedAt: '',
        category: 'mastery'
      });
    }
    
    // Perfect Preparedness badge - 100% overall progress
    if (overallProgress >= 100) {
      awardBadge({
        id: 'perfect-preparedness',
        name: 'Perfect Preparedness',
        description: 'Achieved perfect preparedness score',
        icon: '💎',
        earnedAt: '',
        category: 'mastery'
      });
    }
  };

  const getOverallProgress = () => {
    const moduleProgresses = Object.values(moduleProgress);
    if (moduleProgresses.length === 0) return 0;
    
    const totalProgress = moduleProgresses.reduce((sum, mp) => sum + mp.progress, 0);
    return Math.round(totalProgress / moduleProgresses.length);
  };

  const getCompletedModules = () => {
    return Object.values(moduleProgress).filter(mp => mp.status === 'completed').length;
  };

  const getAverageQuizScore = () => {
    if (quizResults.length === 0) return 0;
    const totalScore = quizResults.reduce((sum, qr) => sum + qr.score, 0);
    return Math.round(totalScore / quizResults.length);
  };

  return {
    moduleProgress,
    quizResults,
    drillResults,
    badges,
    updateModuleProgress,
    addQuizResult,
    addDrillResult,
    awardBadge,
    getOverallProgress,
    getCompletedModules,
    getAverageQuizScore
  };
};