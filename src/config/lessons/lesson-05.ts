import { LessonConfig } from '../../types/lesson.types';

export const lesson05: LessonConfig = {
  id: 'lesson-05',
  title: 'Lektion 5: Mit r, t, n, u, m',
  description: 'Erweitere mit den Tasten r, t, n, u, m',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'e', 'i', 'r', 't', 'n', 'u', 'm'],
  wordMode: false,
  minSpeed: 80,
  maxSpeed: 130,
  speedIncrement: 2,
  ballCatchDistance: 360,
  requiredScore: 60,
  starThresholds: [35, 55, 70],
  spawnRate: 0.7,
  blockCount: 40,
};
