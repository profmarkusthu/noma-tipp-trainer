import { create } from 'zustand';
import { LESSONS } from '../config/lessons';
export const useLessonStore = create((set, get) => ({
    activeLesson: null,
    setActiveLesson: (lesson) => set({ activeLesson: lesson }),
    setActiveLessonById: (id) => {
        const lesson = LESSONS.find((l) => l.id === id);
        if (lesson) {
            set({ activeLesson: lesson });
        }
    },
    getNextLesson: (currentId) => {
        const currentIndex = LESSONS.findIndex((l) => l.id === currentId);
        if (currentIndex !== -1 && currentIndex < LESSONS.length - 1) {
            return LESSONS[currentIndex + 1];
        }
        return null;
    },
}));
