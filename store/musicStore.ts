import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song, Playlist } from '@/types';

interface MusicState {
  songs: Song[];
  playlists: Playlist[];
  currentSongId: string | null;
  isPlaying: boolean;
  currentPlaylistId: string | null;
  
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  toggleFavoriteSong: (id: string) => void;
  
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  
  setCurrentSong: (id: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentPlaylist: (id: string | null) => void;
  
  // These methods should be used carefully to avoid infinite loops
  getCurrentSong: () => Song | null;
  getPlaylistSongs: (playlistId: string) => Song[];
  getFavoriteSongs: () => Song[];
  getNextSong: () => string | null;
  getPreviousSong: () => string | null;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      songs: [],
      playlists: [],
      currentSongId: null,
      isPlaying: false,
      currentPlaylistId: null,
      
      addSong: (song) => set((state) => ({ 
        songs: [...state.songs, song] 
      })),
      
      removeSong: (id) => set((state) => ({ 
        songs: state.songs.filter((song) => song.id !== id),
        playlists: state.playlists.map(playlist => ({
          ...playlist,
          songIds: playlist.songIds.filter(songId => songId !== id)
        }))
      })),
      
      toggleFavoriteSong: (id) => set((state) => ({
        songs: state.songs.map((song) => 
          song.id === id 
            ? { ...song, isFavorite: !song.isFavorite } 
            : song
        )
      })),
      
      addPlaylist: (playlist) => set((state) => ({ 
        playlists: [...state.playlists, playlist] 
      })),
      
      removePlaylist: (id) => set((state) => ({ 
        playlists: state.playlists.filter((playlist) => playlist.id !== id),
        currentPlaylistId: state.currentPlaylistId === id ? null : state.currentPlaylistId
      })),
      
      addSongToPlaylist: (playlistId, songId) => set((state) => ({
        playlists: state.playlists.map((playlist) => 
          playlist.id === playlistId && !playlist.songIds.includes(songId)
            ? { ...playlist, songIds: [...playlist.songIds, songId] } 
            : playlist
        )
      })),
      
      removeSongFromPlaylist: (playlistId, songId) => set((state) => ({
        playlists: state.playlists.map((playlist) => 
          playlist.id === playlistId
            ? { ...playlist, songIds: playlist.songIds.filter(id => id !== songId) } 
            : playlist
        )
      })),
      
      setCurrentSong: (id) => set({ currentSongId: id }),
      
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      
      setCurrentPlaylist: (id) => set({ currentPlaylistId: id }),
      
      // IMPORTANT: Don't use these methods directly in component renders
      // Use selectors with useMemo instead to avoid infinite loops
      getCurrentSong: () => {
        const { songs, currentSongId } = get();
        return songs.find(song => song.id === currentSongId) || null;
      },
      
      getPlaylistSongs: (playlistId) => {
        const { songs, playlists } = get();
        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist) return [];
        return songs.filter(song => playlist.songIds.includes(song.id));
      },
      
      getFavoriteSongs: () => {
        return get().songs.filter(song => song.isFavorite);
      },
      
      getNextSong: () => {
        const { currentSongId, currentPlaylistId, songs, playlists } = get();
        
        if (!currentSongId) return null;
        
        // If in a playlist, get next song in playlist
        if (currentPlaylistId) {
          const playlist = playlists.find(p => p.id === currentPlaylistId);
          if (!playlist) return null;
          
          const currentIndex = playlist.songIds.indexOf(currentSongId);
          if (currentIndex === -1 || currentIndex === playlist.songIds.length - 1) {
            return playlist.songIds[0]; // Loop back to first song
          }
          return playlist.songIds[currentIndex + 1];
        }
        
        // If not in a playlist, get next song in all songs
        const currentIndex = songs.findIndex(s => s.id === currentSongId);
        if (currentIndex === -1 || currentIndex === songs.length - 1) {
          return songs[0]?.id || null; // Loop back to first song
        }
        return songs[currentIndex + 1].id;
      },
      
      getPreviousSong: () => {
        const { currentSongId, currentPlaylistId, songs, playlists } = get();
        
        if (!currentSongId) return null;
        
        // If in a playlist, get previous song in playlist
        if (currentPlaylistId) {
          const playlist = playlists.find(p => p.id === currentPlaylistId);
          if (!playlist) return null;
          
          const currentIndex = playlist.songIds.indexOf(currentSongId);
          if (currentIndex === -1 || currentIndex === 0) {
            return playlist.songIds[playlist.songIds.length - 1]; // Loop to last song
          }
          return playlist.songIds[currentIndex - 1];
        }
        
        // If not in a playlist, get previous song in all songs
        const currentIndex = songs.findIndex(s => s.id === currentSongId);
        if (currentIndex === -1 || currentIndex === 0) {
          return songs[songs.length - 1]?.id || null; // Loop to last song
        }
        return songs[currentIndex - 1].id;
      },
    }),
    {
      name: 'music-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);