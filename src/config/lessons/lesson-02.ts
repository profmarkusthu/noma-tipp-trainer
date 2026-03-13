import { LessonConfig } from '../../types/lesson.types';

export const lesson02: LessonConfig = {
  id: 'lesson-02',
  title: 'Lektion 2: f, j, d, k',
  description: 'Erweitere dein Wissen mit den Tasten d und k',
  characters: [' ', 'f', 'j', 'd', 'k'],
  wordMode: false,
  minSpeed: 65,
  maxSpeed: 110,
  speedIncrement: 2,
  ballCatchDistance: 390,
  requiredScore: 45,
  starThresholds: [20, 35, 45],
  spawnRate: 0.55,
  blockCount: 25,
};
