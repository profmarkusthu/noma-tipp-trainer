import { LessonConfig } from '../../types/lesson.types';

export const lesson03: LessonConfig = {
  id: 'lesson-03',
  title: 'Lektion 3: Grundstellung f, j, d, k, s, l',
  description: 'Meistere die komplette Grundstellung aller 6 Finger',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l'],
  wordMode: false,
  minSpeed: 70,
  maxSpeed: 120,
  speedIncrement: 2,
  ballCatchDistance: 380,
  requiredScore: 50,
  starThresholds: [25, 45, 60],
  spawnRate: 0.6,
  blockCount: 40,
  maxCharRepeat: 3,
};
