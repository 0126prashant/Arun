import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import theme from '@/constants/theme';

interface PandaHeaderProps {
  title: string;
  showBackButton?: boolean;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  rightComponent?: React.ReactNode;
}

const PandaHeader: React.FC<PandaHeaderProps> = ({
  title,
  showBackButton = true,
  showFavoriteButton = false,
  isFavorite = false,
  onFavoritePress,
  rightComponent,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {showFavoriteButton && (
          <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
            <Heart
              size={24}
              color={isFavorite ? theme.colors.primary : theme.colors.textLight}
              fill={isFavorite ? theme.colors.primary : 'none'}
            />
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
    backgroundColor: theme.colors.background,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.colors.text,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  favoriteButton: {
    padding: 4,
  },
});

export default PandaHeader;