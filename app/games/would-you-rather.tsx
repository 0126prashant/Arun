import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Split } from 'lucide-react-native';
import { wouldYouRatherQuestions } from '@/mocks/games';
import PandaHeader from '@/components/PandaHeader';
import PandaButton from '@/components/PandaButton';
import theme from '@/constants/theme';

export default function WouldYouRatherScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [partnerSelectedOption, setPartnerSelectedOption] = useState<number | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  
  const currentQuestion = wouldYouRatherQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    // Simulate partner's choice after a delay
    setTimeout(() => {
      const randomChoice = Math.floor(Math.random() * 2);
      setPartnerSelectedOption(randomChoice);
    }, 1000);
  };
  
  const handleNext = () => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Reset selections and move to next question
      setSelectedOption(null);
      setPartnerSelectedOption(null);
      
      // Cycle through questions
      setCurrentQuestionIndex(
        (currentQuestionIndex + 1) % wouldYouRatherQuestions.length
      );
      
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader title="Would You Rather" />
      
      <Animated.View 
        style={[styles.content, { opacity: fadeAnim }]}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>Would you rather...</Text>
          
          <TouchableOpacity 
            style={[
              styles.optionButton,
              selectedOption === 0 && styles.selectedOption,
              partnerSelectedOption === 0 && styles.partnerSelectedOption,
              selectedOption === 0 && partnerSelectedOption === 0 && styles.bothSelectedOption,
            ]}
            onPress={() => handleOptionSelect(0)}
            disabled={selectedOption !== null}
          >
            <Text style={[
              styles.optionText,
              (selectedOption === 0 || partnerSelectedOption === 0) && styles.selectedOptionText,
            ]}>
              {currentQuestion.option1}
            </Text>
            
            {selectedOption === 0 && (
              <View style={styles.youBadge}>
                <Text style={styles.badgeText}>You</Text>
              </View>
            )}
            
            {partnerSelectedOption === 0 && (
              <View style={styles.partnerBadge}>
                <Text style={styles.badgeText}>Partner</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <View style={styles.orCircle}>
              <Text style={styles.orText}>OR</Text>
            </View>
            <View style={styles.orLine} />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.optionButton,
              selectedOption === 1 && styles.selectedOption,
              partnerSelectedOption === 1 && styles.partnerSelectedOption,
              selectedOption === 1 && partnerSelectedOption === 1 && styles.bothSelectedOption,
            ]}
            onPress={() => handleOptionSelect(1)}
            disabled={selectedOption !== null}
          >
            <Text style={[
              styles.optionText,
              (selectedOption === 1 || partnerSelectedOption === 1) && styles.selectedOptionText,
            ]}>
              {currentQuestion.option2}
            </Text>
            
            {selectedOption === 1 && (
              <View style={styles.youBadge}>
                <Text style={styles.badgeText}>You</Text>
              </View>
            )}
            
            {partnerSelectedOption === 1 && (
              <View style={styles.partnerBadge}>
                <Text style={styles.badgeText}>Partner</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {selectedOption !== null && partnerSelectedOption !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {selectedOption === partnerSelectedOption 
                ? "You both chose the same option! You're in sync! 💕" 
                : "You chose differently! That's what makes you unique! 💖"}
            </Text>
            
            <PandaButton
              title="Next Question"
              onPress={handleNext}
              style={styles.nextButton}
            />
          </View>
        )}
        
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
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.l,
    padding: theme.spacing.l,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  optionButton: {
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.background,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(255, 151, 183, 0.1)',
  },
  partnerSelectedOption: {
    borderColor: theme.colors.accent,
    backgroundColor: 'rgba(95, 158, 160, 0.1)',
  },
  bothSelectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(255, 151, 183, 0.2)',
  },
  optionText: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 26,
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.m,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray,
  },
  orCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing.s,
  },
  orText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  youBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.s,
  },
  partnerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.s,
  },
  badgeText: {
    fontSize: 12,
    color: theme.colors.white,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: theme.spacing.l,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  nextButton: {
    width: '100%',
  },
  pandaContainer: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  pandaFace: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  pandaEar: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: 'black',
    borderRadius: 12.5,
    top: -8,
    left: -3,
  },
  pandaEarRight: {
    left: 'auto',
    right: -3,
  },
  pandaEye: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 7.5,
    top: 20,
    left: 15,
  },
  pandaEyeRight: {
    left: 'auto',
    right: 15,
  },
  pandaNose: {
    position: 'absolute',
    width: 12,
    height: 8,
    backgroundColor: 'black',
    borderRadius: 4,
    top: 40,
    left: 34,
  },
  pandaMouth: {
    position: 'absolute',
    width: 20,
    height: 8,
    backgroundColor: 'black',
    borderRadius: 4,
    top: 50,
    left: 30,
  },
});