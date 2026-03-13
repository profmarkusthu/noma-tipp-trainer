import { LessonConfig } from '../../types/lesson.types';

export const lesson08: LessonConfig = {
  id: 'lesson-08',
  title: 'Lektion 8: + r und u',
  description: 'Neue Tasten: r (linker Zeigefinger oben) und u (rechter Zeigefinger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u'],
  wordMode: false,
  minSpeed: 68,
  maxSpeed: 108,
  speedIncrement: 1,
  ballCatchDistance: 395,
  requiredScore: 48,
  starThresholds: [23, 38, 48],
  spawnRate: 0.60,
  blockCount: 50,
  maxCharRepeat: 2,
};
