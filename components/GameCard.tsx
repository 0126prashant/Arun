import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Brain, Heart, Split, LayoutGrid } from 'lucide-react-native';
import { Game } from '@/types';
import theme from '@/constants/theme';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(game.route);
  };

  const renderIcon = () => {
    switch (game.icon) {
      case 'brain':
        return <Brain size={32} color={theme.colors.primary} />;
      case 'heart':
        return <Heart size={32} color={theme.colors.primary} />;
      case 'split':
        return <Split size={32} color={theme.colors.primary} />;
      case 'layout-grid':
        return <LayoutGrid size={32} color={theme.colors.primary} />;
      default:
        return <Brain size={32} color={theme.colors.primary} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{game.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.card,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
});

export default GameCard;