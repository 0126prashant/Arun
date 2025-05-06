import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import theme from '@/constants/theme';
import { useMusicStore } from '@/store/musicStore';

const MiniPlayer: React.FC = () => {
  const router = useRouter();
  
  // Use individual selectors for primitive values
  const currentSongId = useMusicStore(state => state.currentSongId);
  const isPlaying = useMusicStore(state => state.isPlaying);
  const setIsPlaying = useMusicStore(state => state.setIsPlaying);
  const setCurrentSong = useMusicStore(state => state.setCurrentSong);
  const getNextSong = useMusicStore(state => state.getNextSong);
  const getPreviousSong = useMusicStore(state => state.getPreviousSong);

  // Memoize the current song to prevent unnecessary re-renders
  const currentSong = useMusicStore(state => 
    state.currentSongId ? state.songs.find(song => song.id === state.currentSongId) : null
  );
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Clean up previous animation if it exists
    if (animationRef.current) {
      animationRef.current.stop();
    }

    if (currentSong && isPlaying) {
      progressAnim.setValue(0);
      animationRef.current = Animated.timing(progressAnim, {
        toValue: 1,
        duration: currentSong.duration * 1000,
        useNativeDriver: false,
      });
      animationRef.current.start();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [currentSongId, isPlaying, currentSong]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextSongId = getNextSong();
    if (nextSongId) {
      setCurrentSong(nextSongId);
      if (isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const handlePrevious = () => {
    const prevSongId = getPreviousSong();
    if (prevSongId) {
      setCurrentSong(prevSongId);
      if (isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const handlePress = () => {
    router.push('/music');
  };

  if (!currentSong) return null;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Animated.View 
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
      <View style={styles.content}>
        <Image
          source={{ uri: currentSong.coverArt }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handlePrevious}>
            <SkipBack size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            {isPlaying ? (
              <Pause size={20} color={theme.colors.white} />
            ) : (
              <Play size={20} color={theme.colors.white} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
            <SkipForward size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.m,
    marginHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 2,
    backgroundColor: theme.colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.s,
    paddingTop: theme.spacing.s + 2, // Account for progress bar
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.s,
  },
  infoContainer: {
    flex: 1,
    marginLeft: theme.spacing.s,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  artist: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});

export default MiniPlayer;