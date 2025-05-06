import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brain, Check, X } from 'lucide-react-native';
import { useGameStore } from '@/store/gameStore';
import { mockQuizQuestions } from '@/mocks/games';
import PandaHeader from '@/components/PandaHeader';
import PandaButton from '@/components/PandaButton';
import theme from '@/constants/theme';

export default function MemoryQuizScreen() {
  const { quizQuestions, addQuizResult } = useGameStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Use mock questions if none are available
  const questions = quizQuestions.length > 0 ? quizQuestions : mockQuizQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      addQuizResult({
        date: new Date().toISOString(),
        score,
        totalQuestions: questions.length,
      });
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const renderQuizContent = () => {
    if (quizCompleted) {
      return (
        <View style={styles.completedContainer}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Your Score</Text>
            <Text style={styles.scoreValue}>{score}/{questions.length}</Text>
            <Text style={styles.scorePercentage}>
              {Math.round((score / questions.length) * 100)}%
            </Text>
          </View>
          
          <View style={styles.pandaContainer}>
            <View style={styles.pandaFace}>
              <View style={styles.pandaEar} />
              <View style={[styles.pandaEar, styles.pandaEarRight]} />
              <View style={styles.pandaEye} />
              <View style={[styles.pandaEye, styles.pandaEyeRight]} />
              <View style={styles.pandaNose} />
              <View style={styles.pandaMouth} />
            </View>
          </View>
          
          <Text style={styles.completedMessage}>
            {score === questions.length 
              ? "Perfect score! You know each other so well!" 
              : score >= questions.length / 2 
                ? "Great job! You know quite a bit about each other." 
                : "Keep learning about each other!"}
          </Text>
          
          <PandaButton
            title="Play Again"
            onPress={handleRestart}
            style={styles.restartButton}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.quizContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>
        
        <Text style={styles.question}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index && styles.selectedOption,
                isAnswered && index === currentQuestion.correctAnswer && styles.correctOption,
                isAnswered && selectedOption === index && 
                  index !== currentQuestion.correctAnswer && styles.incorrectOption,
              ]}
              onPress={() => handleOptionSelect(index)}
              disabled={isAnswered}
            >
              <Text 
                style={[
                  styles.optionText,
                  selectedOption === index && styles.selectedOptionText,
                  isAnswered && index === currentQuestion.correctAnswer && styles.correctOptionText,
                  isAnswered && selectedOption === index && 
                    index !== currentQuestion.correctAnswer && styles.incorrectOptionText,
                ]}
              >
                {option}
              </Text>
              
              {isAnswered && index === currentQuestion.correctAnswer && (
                <Check size={20} color={theme.colors.white} />
              )}
              
              {isAnswered && selectedOption === index && 
                index !== currentQuestion.correctAnswer && (
                <X size={20} color={theme.colors.white} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {isAnswered && currentQuestion.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
        
        {isAnswered && (
          <PandaButton
            title={currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
            onPress={handleNext}
            style={styles.nextButton}
          />
        )}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader title="Memory Quiz" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderQuizContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.m,
    flexGrow: 1,
  },
  quizContainer: {
    flex: 1,
  },
  progressContainer: {
    marginBottom: theme.spacing.m,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'right',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: theme.spacing.l,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.s,
    backgroundColor: theme.colors.card,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(255, 151, 183, 0.1)',
  },
  correctOption: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success,
  },
  incorrectOption: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.error,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  correctOptionText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  explanationContainer: {
    padding: theme.spacing.m,
    backgroundColor: 'rgba(230, 230, 250, 0.3)',
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.l,
  },
  explanationText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 'auto',
  },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  scoreText: {
    fontSize: 18,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.colors.text,
  },
  scorePercentage: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  completedMessage: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
    lineHeight: 24,
  },
  restartButton: {
    width: '100%',
  },
  pandaContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  pandaFace: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  pandaEar: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 17.5,
    top: -10,
    left: -5,
  },
  pandaEarRight: {
    left: 'auto',
    right: -5,
  },
  pandaEye: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    top: 30,
    left: 20,
  },
  pandaEyeRight: {
    left: 'auto',
    right: 20,
  },
  pandaNose: {
    position: 'absolute',
    width: 16,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    top: 55,
    left: 42,
  },
  pandaMouth: {
    position: 'absolute',
    width: 30,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    top: 70,
    left: 35,
  },
});