import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Play } from 'lucide-react-native';
import { Playlist } from '@/types';
import theme from '@/constants/theme';
import { Image } from 'expo-image';
import { useMusicStore } from '@/store/musicStore';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const router = useRouter();
  
  // Use individual selectors
  const setCurrentPlaylist = useMusicStore(state => state.setCurrentPlaylist);
  const setCurrentSong = useMusicStore(state => state.setCurrentSong);
  const setIsPlaying = useMusicStore(state => state.setIsPlaying);

  // Get playlist songs using a memoized selector
  const playlistSongs = useMusicStore(state => {
    const playlistObj = state.playlists.find(p => p.id === playlist.id);
    if (!playlistObj) return [];
    return state.songs.filter(song => playlistObj.songIds.includes(song.id));
  });

  const handlePress = () => {
    router.push(`/playlist/${playlist.id}`);
  };

  const handlePlayPress = (e: any) => {
    e.stopPropagation();
    if (playlistSongs.length > 0) {
      setCurrentPlaylist(playlist.id);
      setCurrentSong(playlistSongs[0].id);
      setIsPlaying(true);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: playlist.coverArt }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={handlePlayPress}
          activeOpacity={0.7}
        >
          <Play size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{playlist.title}</Text>
        <Text style={styles.count}>{playlist.songIds.length} songs</Text>
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
    shadowRadius: 4,
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
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
  count: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
});

export default PlaylistCard;