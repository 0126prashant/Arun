import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Photo } from '@/types';
import theme from '@/constants/theme';
import { Image } from 'expo-image';
import { usePhotoStore } from '@/store/photoStore';

interface PhotoCardProps {
  photo: Photo;
  size?: 'small' | 'medium' | 'large';
  showInfo?: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ 
  photo, 
  size = 'medium',
  showInfo = true
}) => {
  const router = useRouter();
  const toggleFavorite = usePhotoStore(state => state.toggleFavorite);

  const handlePress = () => {
    router.push(`/photo/${photo.id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(photo.id);
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: '32%', height: 120 };
      case 'large':
        return { width: '100%', height: 250 };
      case 'medium':
      default:
        return { width: '48%', height: 180 };
    }
  };

  const sizeStyle = getSize();

  return (
    <TouchableOpacity 
      style={[styles.container, { width: sizeStyle.width }]} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={[styles.imageContainer, { height: sizeStyle.height }]}>
        <Image
          source={{ uri: photo.uri }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={handleFavoritePress}
          activeOpacity={0.8}
        >
          <Heart
            size={18}
            color={photo.isFavorite ? theme.colors.primary : theme.colors.white}
            fill={photo.isFavorite ? theme.colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      {showInfo && (
        <View style={styles.infoContainer}>
          {photo.title && (
            <Text style={styles.title} numberOfLines={1}>
              {photo.title}
            </Text>
          )}
          <Text style={styles.date}>
            {new Date(photo.date).toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: theme.spacing.s,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
});

export default PhotoCard;