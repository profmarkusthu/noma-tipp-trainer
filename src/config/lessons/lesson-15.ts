import { LessonConfig } from '../../types/lesson.types';

export const lesson15: LessonConfig = {
  id: 'lesson-15',
  title: 'Lektion 15: + p und ü',
  description: 'Neue Tasten: p (rechter kleiner Finger oben) und ü (rechter kleiner Finger)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v', 'b', 'w', 'p', 'ü'],
  wordMode: false,
  minSpeed: 82,
  maxSpeed: 128,
  speedIncrement: 1,
  ballCatchDistance: 365,
  requiredScore: 62,
  starThresholds: [33, 50, 62],
  spawnRate: 0.72,
  blockCount: 52,
  maxCharRepeat: 2,
};
