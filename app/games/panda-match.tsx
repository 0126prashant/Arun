import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Clock, RefreshCw } from 'lucide-react-native';
import PandaHeader from '@/components/PandaHeader';
import PandaButton from '@/components/PandaButton';
import theme from '@/constants/theme';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const GRID_SIZE = 4; // 4x4 grid
const NUM_CARDS = GRID_SIZE * GRID_SIZE;
const CARD_WIDTH = (width - (CARD_MARGIN * 2 * GRID_SIZE) - (theme.spacing.m * 2)) / GRID_SIZE;

// Card symbols (pairs of emojis)
const SYMBOLS = ['🐼', '❤️', '🎵', '🎁', '🌸', '🍦', '🌈', '🎂'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function PandaMatchScreen() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const scaleAnims = useRef(Array(NUM_CARDS).fill(0).map(() => new Animated.Value(1))).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const processingFlip = useRef(false);
  
  // Initialize game
  useEffect(() => {
    initializeGame();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Timer
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (gameStarted && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStarted, isGameOver]);
  
  // Check for matches
  useEffect(() => {
    if (flippedIndices.length === 2 && !processingFlip.current) {
      processingFlip.current = true;
      const [firstIndex, secondIndex] = flippedIndices;
      
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Match found
        setCards(prevCards => 
          prevCards.map((card, index) => 
            index === firstIndex || index === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        
        // Animate matched cards
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnims[firstIndex], {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnims[secondIndex], {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnims[firstIndex], {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnims[secondIndex], {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          setFlippedIndices([]);
          processingFlip.current = false;
        });
        
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map((card, index) => 
              index === firstIndex || index === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
          processingFlip.current = false;
        }, 1000);
      }
      
      setMoves(prev => prev + 1);
    }
  }, [flippedIndices, cards]);
  
  // Check for game over
  useEffect(() => {
    if (matchedPairs === SYMBOLS.length && gameStarted) {
      setIsGameOver(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [matchedPairs, gameStarted]);
  
  const initializeGame = () => {
    // Create pairs of cards with symbols
    const cardPairs = SYMBOLS.flatMap(symbol => [
      { id: Math.random(), symbol, isFlipped: false, isMatched: false },
      { id: Math.random(), symbol, isFlipped: false, isMatched: false },
    ]);
    
    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsGameOver(false);
    setGameStarted(false);
    setTimer(0);
    processingFlip.current = false;
    
    // Reset animations
    scaleAnims.forEach(anim => anim.setValue(1));
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const handleCardPress = (index: number) => {
    // Ignore if already processing a flip
    if (processingFlip.current) return;
    
    // Start game on first card flip
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Ignore if already flipped or matched or if two cards are already flipped
    if (
      cards[index].isFlipped || 
      cards[index].isMatched || 
      flippedIndices.length >= 2
    ) {
      return;
    }
    
    // Flip the card
    setCards(prevCards => 
      prevCards.map((card, i) => 
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    
    // Add to flipped indices
    setFlippedIndices(prev => [...prev, index]);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const renderCard = (card: Card, index: number) => {
    return (
      <Animated.View 
        key={card.id} 
        style={[
          styles.cardContainer,
          { transform: [{ scale: scaleAnims[index] }] }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.card,
            card.isFlipped || card.isMatched ? styles.cardFlipped : {},
            card.isMatched ? styles.cardMatched : {},
          ]}
          onPress={() => handleCardPress(index)}
          activeOpacity={0.8}
          disabled={card.isMatched || isGameOver}
        >
          {(card.isFlipped || card.isMatched) ? (
            <Text style={styles.cardSymbol}>{card.symbol}</Text>
          ) : (
            <View style={styles.cardBack}>
              <View style={styles.pandaFace}>
                <View style={styles.pandaEar} />
                <View style={[styles.pandaEar, styles.pandaEarRight]} />
                <View style={styles.pandaEye} />
                <View style={[styles.pandaEye, styles.pandaEyeRight]} />
                <View style={styles.pandaNose} />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader title="Panda Match" />
      
      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Clock size={18} color={theme.colors.textLight} />
            <Text style={styles.statText}>{formatTime(timer)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Heart size={18} color={theme.colors.primary} />
            <Text style={styles.statText}>{matchedPairs}/{SYMBOLS.length}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={initializeGame}
          >
            <RefreshCw size={18} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.gameBoard}>
          {cards.map((card, index) => renderCard(card, index))}
        </View>
        
        {isGameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverTitle}>Game Complete!</Text>
            <Text style={styles.gameOverStat}>Time: {formatTime(timer)}</Text>
            <Text style={styles.gameOverStat}>Moves: {moves}</Text>
            <PandaButton
              title="Play Again"
              onPress={initializeGame}
              style={styles.playAgainButton}
            />
          </View>
        )}
      </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 4,
    fontWeight: '600',
  },
  resetButton: {
    padding: 8,
    borderRadius: theme.radius.s,
    backgroundColor: theme.colors.gray,
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    margin: CARD_MARGIN,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: theme.colors.gray,
  },
  cardFlipped: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
  },
  cardMatched: {
    backgroundColor: 'rgba(255, 151, 183, 0.2)',
    borderColor: theme.colors.primary,
  },
  cardSymbol: {
    fontSize: 32,
  },
  cardBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaFace: {
    width: CARD_WIDTH * 0.6,
    height: CARD_WIDTH * 0.6,
    backgroundColor: 'white',
    borderRadius: CARD_WIDTH * 0.3,
    position: 'relative',
  },
  pandaEar: {
    position: 'absolute',
    width: CARD_WIDTH * 0.2,
    height: CARD_WIDTH * 0.2,
    backgroundColor: 'black',
    borderRadius: CARD_WIDTH * 0.1,
    top: -CARD_WIDTH * 0.05,
    left: -CARD_WIDTH * 0.02,
  },
  pandaEarRight: {
    left: 'auto',
    right: -CARD_WIDTH * 0.02,
  },
  pandaEye: {
    position: 'absolute',
    width: CARD_WIDTH * 0.12,
    height: CARD_WIDTH * 0.12,
    backgroundColor: 'black',
    borderRadius: CARD_WIDTH * 0.06,
    top: CARD_WIDTH * 0.15,
    left: CARD_WIDTH * 0.1,
  },
  pandaEyeRight: {
    left: 'auto',
    right: CARD_WIDTH * 0.1,
  },
  pandaNose: {
    position: 'absolute',
    width: CARD_WIDTH * 0.1,
    height: CARD_WIDTH * 0.06,
    backgroundColor: 'black',
    borderRadius: CARD_WIDTH * 0.03,
    top: CARD_WIDTH * 0.32,
    left: CARD_WIDTH * 0.25,
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  gameOverStat: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  playAgainButton: {
    marginTop: theme.spacing.l,
    width: '100%',
  },
});