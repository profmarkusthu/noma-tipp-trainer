import { LessonConfig } from '../../types/lesson.types';

export const lesson05: LessonConfig = {
  id: 'lesson-05',
  title: 'Lektion 5: + Leertaste',
  description: 'Die komplette Grundreihe mit Leertaste (Daumen)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö'],
  wordMode: false,
  minSpeed: 60,
  maxSpeed: 95,
  speedIncrement: 1,
  ballCatchDistance: 420,
  requiredScore: 40,
  starThresholds: [18, 30, 40],
  spawnRate: 0.53,
  blockCount: 46,
  maxCharRepeat: 3,
};
