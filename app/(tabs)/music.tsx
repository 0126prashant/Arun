import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, SkipBack, SkipForward, Volume2, List, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useMusicStore } from '@/store/musicStore';
import SongCard from '@/components/SongCard';
import PlaylistCard from '@/components/PlaylistCard';
import theme from '@/constants/theme';
import PandaHeader from '@/components/PandaHeader';

export default function MusicScreen() {
  // Use individual selectors for primitive values
  const songs = useMusicStore(state => state.songs);
  const playlists = useMusicStore(state => state.playlists);
  const currentSongId = useMusicStore(state => state.currentSongId);
  const isPlaying = useMusicStore(state => state.isPlaying);
  const setCurrentSong = useMusicStore(state => state.setCurrentSong);
  const setIsPlaying = useMusicStore(state => state.setIsPlaying);
  const getNextSong = useMusicStore(state => state.getNextSong);
  const getPreviousSong = useMusicStore(state => state.getPreviousSong);
  
  // Use direct selector with memoization instead of getCurrentSong()
  const currentSong = useMusicStore(state => 
    state.currentSongId ? state.songs.find(song => song.id === state.currentSongId) : null
  );
  
  // Memoize derived data to prevent unnecessary recalculations
  const favoriteSongs = useMemo(() => {
    return songs.filter(song => song.isFavorite);
  }, [songs]);
  
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Clean up previous animation if it exists
    if (progressAnimation.current) {
      progressAnimation.current.stop();
    }

    if (currentSong && isPlaying) {
      progressAnim.setValue(progress);
      progressAnimation.current = Animated.timing(progressAnim, {
        toValue: 1,
        duration: currentSong.duration * 1000 * (1 - progress),
        useNativeDriver: false,
      });
      
      progressAnimation.current.start(({ finished }) => {
        if (finished) {
          const nextSongId = getNextSong();
          if (nextSongId) {
            setCurrentSong(nextSongId);
            setProgress(0);
          }
        }
      });
    }

    return () => {
      if (progressAnimation.current) {
        progressAnimation.current.stop();
      }
    };
  }, [currentSongId, isPlaying, progress, currentSong]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextSongId = getNextSong();
    if (nextSongId) {
      setCurrentSong(nextSongId);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    const prevSongId = getPreviousSong();
    if (prevSongId) {
      setCurrentSong(prevSongId);
      setProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader 
        title="Our Music" 
        showBackButton={false}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentSong && (
          <View style={styles.playerContainer}>
            <LinearGradient
              colors={['rgba(255, 151, 183, 0.2)', 'rgba(230, 230, 250, 0.2)']}
              style={styles.playerGradient}
            >
              <View style={styles.albumArtContainer}>
                <Image
                  source={{ uri: currentSong.coverArt }}
                  style={styles.albumArt}
                  contentFit="cover"
                />
              </View>
              
              <View style={styles.songInfoContainer}>
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                <Text style={styles.artistName}>{currentSong.artist}</Text>
              </View>
              
              <View style={styles.progressContainer}>
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
                <View style={styles.progressTimeContainer}>
                  <Text style={styles.timeText}>
                    {formatTime(currentSong.duration * progress)}
                  </Text>
                  <Text style={styles.timeText}>
                    {formatTime(currentSong.duration)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={handlePrevious}>
                  <SkipBack size={24} color={theme.colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
                  {isPlaying ? (
                    <Pause size={32} color={theme.colors.white} />
                  ) : (
                    <Play size={32} color={theme.colors.white} />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
                  <SkipForward size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
        
        {playlists.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Playlists</Text>
            <View style={styles.playlistsContainer}>
              {playlists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </View>
          </View>
        )}
        
        {favoriteSongs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Favorite Songs</Text>
            <View style={styles.songsContainer}>
              {favoriteSongs.map(song => (
                <SongCard key={song.id} song={song} isCompact={true} />
              ))}
            </View>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Songs</Text>
          <View style={styles.songsContainer}>
            {songs.map(song => (
              <SongCard key={song.id} song={song} isCompact={true} />
            ))}
          </View>
        </View>
        
        <View style={styles.spacer} />
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
    paddingBottom: theme.spacing.xxl,
  },
  playerContainer: {
    marginHorizontal: theme.spacing.m,
    marginTop: theme.spacing.m,
    borderRadius: theme.radius.l,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  playerGradient: {
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  albumArtContainer: {
    width: 200,
    height: 200,
    borderRadius: theme.radius.m,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  songInfoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  artistName: {
    fontSize: 16,
    color: theme.colors.textLight,
  },
  progressContainer: {
    width: '100%',
    marginTop: theme.spacing.m,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  progressTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.m,
    width: '100%',
  },
  controlButton: {
    padding: theme.spacing.s,
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing.m,
  },
  section: {
    marginTop: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  playlistsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  songsContainer: {
    marginTop: theme.spacing.xs,
  },
  spacer: {
    height: 100,
  },
});