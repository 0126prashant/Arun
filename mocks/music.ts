import { Song, Playlist } from '@/types';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: 263,
    uri: "https://example.com/perfect.mp3",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    isFavorite: true
  },
  {
    id: '2',
    title: "All of Me",
    artist: "John Legend",
    duration: 270,
    uri: "https://example.com/allofme.mp3",
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000",
    isFavorite: true
  },
  {
    id: '3',
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    duration: 281,
    uri: "https://example.com/thinkingoutloud.mp3",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    isFavorite: false
  },
  {
    id: '4',
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    duration: 221,
    uri: "https://example.com/justthewayyouare.mp3",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    isFavorite: true
  },
  {
    id: '5',
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    duration: 182,
    uri: "https://example.com/canthelpfallinginlove.mp3",
    coverArt: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    isFavorite: false
  },
  {
    id: '6',
    title: "Love Me Like You Do",
    artist: "Ellie Goulding",
    duration: 252,
    uri: "https://example.com/lovemelikeyoudo.mp3",
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000",
    isFavorite: false
  },
  {
    id: '7',
    title: "A Thousand Years",
    artist: "Christina Perri",
    duration: 285,
    uri: "https://example.com/athousandyears.mp3",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    isFavorite: true
  },
  {
    id: '8',
    title: "Marry You",
    artist: "Bruno Mars",
    duration: 230,
    uri: "https://example.com/marryyou.mp3",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    isFavorite: false
  },
  {
    id: '9',
    title: "My Heart Will Go On",
    artist: "Celine Dion",
    duration: 280,
    uri: "https://example.com/myheartwillgoon.mp3",
    coverArt: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    isFavorite: false
  },
  {
    id: '10',
    title: "I Will Always Love You",
    artist: "Whitney Houston",
    duration: 273,
    uri: "https://example.com/iwillalwaysloveyou.mp3",
    coverArt: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    isFavorite: true
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: "Our Favorites",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    songIds: ['1', '2', '4', '7', '10']
  },
  {
    id: '2',
    title: "Date Night",
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000",
    songIds: ['1', '3', '5', '6']
  },
  {
    id: '3',
    title: "Road Trip",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    songIds: ['4', '6', '8', '9']
  }
];