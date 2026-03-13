import { LessonConfig } from '../../types/lesson.types';

export const lesson03: LessonConfig = {
  id: 'lesson-03',
  title: 'Lektion 3: + s und l',
  description: 'Erweiterung mit s (linker Ringfinger) und l (rechter Ringfinger)',
  characters: ['f', 'j', 'd', 'k', 's', 'l'],
  wordMode: false,
  minSpeed: 55,
  maxSpeed: 85,
  speedIncrement: 1,
  ballCatchDistance: 440,
  requiredScore: 35,
  starThresholds: [15, 25, 35],
  spawnRate: 0.48,
  blockCount: 44,
  maxCharRepeat: 3,
};
