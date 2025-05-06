import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Image as ImageIcon, Music, Gamepad } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import theme from '@/constants/theme';
import { usePhotoStore } from '@/store/photoStore';
import { useMusicStore } from '@/store/musicStore';
import { mockPhotos } from '@/mocks/photos';
import { mockSongs } from '@/mocks/music';
import { mockGames } from '@/mocks/games';
import PhotoCard from '@/components/PhotoCard';
import SongCard from '@/components/SongCard';
import GameCard from '@/components/GameCard';
import MiniPlayer from '@/components/MiniPlayer';

export default function HomeScreen() {
  const router = useRouter();
  
  // Use individual selectors for primitive values
  const photos = usePhotoStore(state => state.photos);
  const albums = usePhotoStore(state => state.albums);
  const addPhoto = usePhotoStore(state => state.addPhoto);
  const addAlbum = usePhotoStore(state => state.addAlbum);
  
  const songs = useMusicStore(state => state.songs);
  const playlists = useMusicStore(state => state.playlists);
  const addSong = useMusicStore(state => state.addSong);
  const addPlaylist = useMusicStore(state => state.addPlaylist);
  const currentSongId = useMusicStore(state => state.currentSongId);
  
  // Use proper memoization for derived state
  const currentSong = useMusicStore(state => 
    state.currentSongId ? state.songs.find(song => song.id === state.currentSongId) : null
  );
  
  // Initialize with mock data if empty
  useEffect(() => {
    if (photos.length === 0) {
      mockPhotos.forEach(photo => addPhoto(photo));
    }
    
    if (songs.length === 0) {
      mockSongs.forEach(song => addSong(song));
    }
  }, []);

  // Memoize derived data to prevent unnecessary recalculations
  const favoritePhotos = useMemo(() => {
    return photos.filter(photo => photo.isFavorite).slice(0, 4);
  }, [photos]);
  
  const favoriteSongs = useMemo(() => {
    return songs.filter(song => song.isFavorite).slice(0, 3);
  }, [songs]);
  
  const navigateToSection = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['rgba(255, 151, 183, 0.3)', 'rgba(255, 255, 255, 0)']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.pandaIconContainer}>
                <View style={styles.pandaFace}>
                  <View style={styles.pandaEar} />
                  <View style={[styles.pandaEar, styles.pandaEarRight]} />
                  <View style={styles.pandaEye} />
                  <View style={[styles.pandaEye, styles.pandaEyeRight]} />
                  <View style={styles.pandaNose} />
                </View>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.headerTitle}>My Panda</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessButtons}>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigateToSection('/album')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(255, 151, 183, 0.2)' }]}>
                <ImageIcon size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.quickAccessText}>Albums</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigateToSection('/music')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(230, 230, 250, 0.5)' }]}>
                <Music size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.quickAccessText}>Music</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigateToSection('/games')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(95, 158, 160, 0.2)' }]}>
                <Gamepad size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.quickAccessText}>Games</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigateToSection('/favorites')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: 'rgba(255, 151, 183, 0.2)' }]}>
                <Heart size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.quickAccessText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {favoritePhotos.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Favorite Photos</Text>
              <TouchableOpacity onPress={() => navigateToSection('/favorites')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {favoritePhotos.map(photo => (
                <View key={photo.id} style={styles.favoritePhotoContainer}>
                  <PhotoCard photo={photo} size="medium" showInfo={false} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {favoriteSongs.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Favorite Songs</Text>
              <TouchableOpacity onPress={() => navigateToSection('/music')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.favoriteSongsContainer}>
              {favoriteSongs.map(song => (
                <SongCard key={song.id} song={song} isCompact={true} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Games & Activities</Text>
            <TouchableOpacity onPress={() => navigateToSection('/games')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gamesContainer}>
            {mockGames.slice(0, 2).map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
      
      {currentSong && <MiniPlayer />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerGradient: {
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    paddingHorizontal: theme.spacing.m,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pandaIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaFace: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'relative',
  },
  pandaEar: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: 'black',
    borderRadius: 9,
    top: -5,
    left: -2,
  },
  pandaEarRight: {
    left: 'auto',
    right: -2,
  },
  pandaEye: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'black',
    borderRadius: 6,
    top: 15,
    left: 10,
  },
  pandaEyeRight: {
    left: 'auto',
    right: 10,
  },
  pandaNose: {
    position: 'absolute',
    width: 14,
    height: 8,
    backgroundColor: 'black',
    borderRadius: 4,
    top: 30,
    left: 18,
  },
  headerTextContainer: {
    marginLeft: theme.spacing.m,
  },
  welcomeText: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
  },
  quickAccessContainer: {
    marginTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  quickAccessButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.s,
  },
  quickAccessButton: {
    alignItems: 'center',
    width: '23%',
  },
  quickAccessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  section: {
    marginTop: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  horizontalScrollContent: {
    paddingRight: theme.spacing.m,
  },
  favoritePhotoContainer: {
    width: 160,
    marginRight: theme.spacing.m,
  },
  favoriteSongsContainer: {
    marginTop: theme.spacing.s,
  },
  gamesContainer: {
    marginTop: theme.spacing.s,
  },
  spacer: {
    height: 100,
  },
});