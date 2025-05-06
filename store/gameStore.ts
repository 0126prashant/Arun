import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoveNote, MemoryQuizQuestion, QuizResult } from '@/types';

interface GameState {
  loveNotes: LoveNote[];
  quizQuestions: MemoryQuizQuestion[];
  quizResults: QuizResult[];
  
  addLoveNote: (note: LoveNote) => void;
  removeLoveNote: (id: string) => void;
  markLoveNoteAsRead: (id: string) => void;
  
  addQuizQuestion: (question: MemoryQuizQuestion) => void;
  removeQuizQuestion: (id: string) => void;
  
  addQuizResult: (result: QuizResult) => void;
  getLatestQuizResult: () => QuizResult | null;
  
  getUnreadLoveNotesCount: () => number;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      loveNotes: [],
      quizQuestions: [],
      quizResults: [],
      
      addLoveNote: (note) => set((state) => ({ 
        loveNotes: [...state.loveNotes, note] 
      })),
      
      removeLoveNote: (id) => set((state) => ({ 
        loveNotes: state.loveNotes.filter((note) => note.id !== id) 
      })),
      
      markLoveNoteAsRead: (id) => set((state) => ({
        loveNotes: state.loveNotes.map((note) => 
          note.id === id 
            ? { ...note, isRead: true } 
            : note
        )
      })),
      
      addQuizQuestion: (question) => set((state) => ({ 
        quizQuestions: [...state.quizQuestions, question] 
      })),
      
      removeQuizQuestion: (id) => set((state) => ({ 
        quizQuestions: state.quizQuestions.filter((question) => question.id !== id) 
      })),
      
      addQuizResult: (result) => set((state) => ({ 
        quizResults: [...state.quizResults, result] 
      })),
      
      getLatestQuizResult: () => {
        const { quizResults } = get();
        if (quizResults.length === 0) return null;
        
        return quizResults.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];
      },
      
      getUnreadLoveNotesCount: () => {
        return get().loveNotes.filter(note => !note.isRead).length;
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);