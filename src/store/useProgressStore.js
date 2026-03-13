import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useProgressStore = create()(persist((set, get) => ({
    completedLessons: {},
    activeThemeId: 'default',
    recordLessonResult: (result) => set((state) => {
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
}), {
    name: 'schreibtrainer-progress',
}));
