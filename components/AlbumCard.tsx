import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Album } from '@/types';
import theme from '@/constants/theme';
import { Image as ExpoImage } from 'expo-image';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/album/${album.id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <ExpoImage
          source={{ uri: album.coverUri }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{album.photoCount}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{album.title}</Text>
        <Text style={styles.date}>{new Date(album.date).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  countBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.s,
  },
  countText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  infoContainer: {
    padding: theme.spacing.s,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
});

export default AlbumCard;