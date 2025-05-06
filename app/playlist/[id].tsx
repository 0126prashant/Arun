import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Play } from 'lucide-react-native';
import { useMusicStore } from '@/store/musicStore';
import SongCard from '@/components/SongCard';
import PandaHeader from '@/components/PandaHeader';
import theme from '@/constants/theme';

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    playlists, 
    setCurrentPlaylist, 
    setCurrentSong, 
    setIsPlaying 
  } = useMusicStore();
  
  const playlist = playlists.find(p => p.id === id);
  
  // Use memoized selector for playlist songs
  const songs = useMusicStore(state => {
    if (!id) return [];
    const playlistObj = state.playlists.find(p => p.id === id);
    if (!playlistObj) return [];
    return state.songs.filter(song => playlistObj.songIds.includes(song.id));
  });
  
  if (!playlist) {
    return (
      <SafeAreaView style={styles.container}>
        <PandaHeader title="Playlist Not Found" />
        <View style={styles.centerContainer}>
          <Text>This playlist doesn't exist or has been deleted.</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const handlePlayAll = () => {
    if (songs.length > 0) {
      setCurrentPlaylist(playlist.id);
      setCurrentSong(songs[0].id);
      setIsPlaying(true);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader title={playlist.title} />
      
      <FlatList
        data={songs}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.coverContainer}>
              <Image
                source={{ uri: playlist.coverArt }}
                style={styles.coverImage}
                contentFit="cover"
              />
              <TouchableOpacity 
                style={styles.playButton}
                onPress={handlePlayAll}
                disabled={songs.length === 0}
              >
                <Play size={32} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.title}>{playlist.title}</Text>
            <Text style={styles.count}>{songs.length} songs</Text>
            
            <TouchableOpacity 
              style={styles.playAllButton}
              onPress={handlePlayAll}
              disabled={songs.length === 0}
            >
              <Text style={styles.playAllText}>Play All</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Songs</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <SongCard key={item.id} song={item} isCompact={true} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No songs in this playlist yet.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  header: {
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  coverContainer: {
    width: 200,
    height: 200,
    borderRadius: theme.radius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  count: {
    fontSize: 16,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.m,
  },
  playAllButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.m,
  },
  playAllText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray,
    marginBottom: theme.spacing.m,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    alignSelf: 'flex-start',
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
  },
  emptyContainer: {
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLight,
  },
});