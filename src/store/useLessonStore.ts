import { create } from 'zustand';
import { LessonConfig } from '../types/lesson.types';
import { LESSONS } from '../config/lessons';

interface LessonStore {
  activeLesson: LessonConfig | null;
  setActiveLesson: (lesson: LessonConfig | null) => void;
  setActiveLessonById: (id: string) => void;
  getNextLesson: (currentId: string) => LessonConfig | null;
}

export const useLessonStore = create<LessonStore>((set, get) => ({
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
