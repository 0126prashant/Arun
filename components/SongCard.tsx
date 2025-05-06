import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Pause, Heart } from 'lucide-react-native';
import { Song } from '@/types';
import theme from '@/constants/theme';
import { Image } from 'expo-image';
import { useMusicStore } from '@/store/musicStore';

interface SongCardProps {
  song: Song;
  isCompact?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, isCompact = false }) => {
  // Use individual selectors instead of destructuring the whole state
  const currentSongId = useMusicStore(state => state.currentSongId);
  const isPlaying = useMusicStore(state => state.isPlaying);
  const setCurrentSong = useMusicStore(state => state.setCurrentSong);
  const setIsPlaying = useMusicStore(state => state.setIsPlaying);
  const toggleFavoriteSong = useMusicStore(state => state.toggleFavoriteSong);
  
  // Memoize derived state
  const isCurrentSong = useMemo(() => currentSongId === song.id, [currentSongId, song.id]);

  const handlePlayPause = () => {
    if (isCurrentSong) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song.id);
      setIsPlaying(true);
    }
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavoriteSong(song.id);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (isCompact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer} 
        onPress={handlePlayPause}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: song.coverArt }}
          style={styles.compactImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle} numberOfLines={1}>{song.title}</Text>
          <Text style={styles.compactArtist} numberOfLines={1}>{song.artist}</Text>
        </View>
        <View style={styles.compactControls}>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={handleFavoritePress}
          >
            <Heart
              size={18}
              color={song.isFavorite ? theme.colors.primary : theme.colors.textLight}
              fill={song.isFavorite ? theme.colors.primary : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            {isCurrentSong && isPlaying ? (
              <Pause size={18} color={theme.colors.white} />
            ) : (
              <Play size={18} color={theme.colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePlayPause}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: song.coverArt }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={[
          styles.playButtonOverlay,
          isCurrentSong && isPlaying ? styles.playingOverlay : {}
        ]}>
          {isCurrentSong && isPlaying ? (
            <Pause size={32} color={theme.colors.white} />
          ) : (
            <Play size={32} color={theme.colors.white} />
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={handleFavoritePress}
          >
            <Heart
              size={20}
              color={song.isFavorite ? theme.colors.primary : theme.colors.textLight}
              fill={song.isFavorite ? theme.colors.primary : 'none'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
          <Text style={styles.duration}>{formatDuration(song.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoContainer: {
    padding: theme.spacing.m,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  favoriteButton: {
    padding: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artist: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textLight,
  },
  duration: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.s,
    marginBottom: theme.spacing.s,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.card,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  compactImage: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.s,
  },
  compactInfo: {
    flex: 1,
    marginLeft: theme.spacing.s,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  compactArtist: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  compactControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.s,
  },
});

export default SongCard;