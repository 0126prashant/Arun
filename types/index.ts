export interface Photo {
    id: string;
    uri: string;
    date: string;
    title?: string;
    description?: string;
    location?: string;
    isFavorite: boolean;
    albumId: string;
  }
  
  export interface Album {
    id: string;
    title: string;
    coverUri: string;
    description?: string;
    date: string;
    photoCount: number;
  }
  
  export interface Song {
    id: string;
    title: string;
    artist: string;
    duration: number;
    uri: string;
    coverArt: string;
    isFavorite: boolean;
  }
  
  export interface Playlist {
    id: string;
    title: string;
    coverArt: string;
    songIds: string[];
  }
  
  export interface Game {
    id: string;
    title: string;
    description: string;
    icon: string;
    route: string;
  }
  
  export interface LoveNote {
    id: string;
    content: string;
    date: string;
    isRead: boolean;
  }
  
  export interface MemoryQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }
  
  export interface QuizResult {
    date: string;
    score: number;
    totalQuestions: number;
  }