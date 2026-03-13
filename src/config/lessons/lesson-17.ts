import { LessonConfig } from '../../types/lesson.types';

export const lesson17: LessonConfig = {
  id: 'lesson-17',
  title: 'Lektion 17: + q',
  description: 'Neue Taste: q (linker kleiner Finger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v', 'b', 'w', 'p', 'ü', 'x', 'y', 'q'],
  wordMode: false,
  minSpeed: 85,
  maxSpeed: 132,
  speedIncrement: 1,
  ballCatchDistance: 358,
  requiredScore: 67,
  starThresholds: [35, 54, 67],
  spawnRate: 0.74,
  blockCount: 54,
  maxCharRepeat: 2,
};
