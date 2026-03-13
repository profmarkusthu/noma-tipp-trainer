import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LessonProgress } from '../types/lesson.types';

interface ProgressStore {
  completedLessons: Record<string, LessonProgress>;
  activeThemeId: string;
  recordLessonResult: (result: LessonProgress) => void;
  setTheme: (themeId: string) => void;
  getProgress: (lessonId: string) => LessonProgress | undefined;
  getLessonStats: (lessonId: string) => { attempts: number; bestScore: number; stars: number };
  exportToFile: () => void;
  importFromFile: (file: File) => Promise<void>;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      activeThemeId: 'default',

      recordLessonResult: (result) =>
        set((state) => {
          const existing = state.completedLessons[result.lessonId];
          // Only keep best result
          if (existing && existing.bestScore >= result.bestScore && existing.stars >= result.stars) {
            return state;
          }
          return {
            completedLessons: {
              ...state.completedLessons,
              [result.lessonId]: result,
            },
          };
        }),

      setTheme: (themeId) => set({ activeThemeId: themeId }),

      getProgress: (lessonId) => get().completedLessons[lessonId],

      exportToFile: () => {
        const data = {
          exportedAt: new Date().toISOString(),
          completedLessons: get().completedLessons,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'noma-fortschritt.json';
        a.click();
        URL.revokeObjectURL(url);
      },

      importFromFile: async (file: File) => {
        const text = await file.text();
        const data = JSON.parse(text);
        if (data.completedLessons) {
          set({ completedLessons: data.completedLessons });
        }
      },

      getLessonStats: (lessonId) => {
        const progress = get().completedLessons[lessonId];
        if (!progress) {
          return { attempts: 0, bestScore: 0, stars: 0 };
        }
        return {
          attempts: progress.attempts,
          bestScore: progress.bestScore,
          stars: progress.stars,
        };
      },
    }),
    {
      name: 'schreibtrainer-progress',
    }
  )
);
