import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Photo, Album } from '@/types';

interface PhotoState {
  photos: Photo[];
  albums: Album[];
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (id: string) => void;
  updateAlbum: (id: string, data: Partial<Album>) => void;
  getAlbumPhotos: (albumId: string) => Photo[];
  getFavoritePhotos: () => Photo[];
}

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set, get) => ({
      photos: [],
      albums: [],
      
      addPhoto: (photo) => set((state) => ({ 
        photos: [...state.photos, photo] 
      })),
      
      removePhoto: (id) => set((state) => ({ 
        photos: state.photos.filter((photo) => photo.id !== id) 
      })),
      
      toggleFavorite: (id) => set((state) => ({
        photos: state.photos.map((photo) => 
          photo.id === id 
            ? { ...photo, isFavorite: !photo.isFavorite } 
            : photo
        )
      })),
      
      addAlbum: (album) => set((state) => ({ 
        albums: [...state.albums, album] 
      })),
      
      removeAlbum: (id) => set((state) => ({ 
        albums: state.albums.filter((album) => album.id !== id),
        photos: state.photos.filter((photo) => photo.albumId !== id)
      })),
      
      updateAlbum: (id, data) => set((state) => ({
        albums: state.albums.map((album) => 
          album.id === id 
            ? { ...album, ...data } 
            : album
        )
      })),
      
      getAlbumPhotos: (albumId) => {
        return get().photos.filter((photo) => photo.albumId === albumId);
      },
      
      getFavoritePhotos: () => {
        return get().photos.filter((photo) => photo.isFavorite);
      },
    }),
    {
      name: 'photo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);