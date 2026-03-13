import { LessonConfig } from '../../types/lesson.types';

export const lesson10: LessonConfig = {
  id: 'lesson-10',
  title: 'Lektion 10: + n und m',
  description: 'Neue Tasten: n (rechter Zeigefinger unten) und m (rechter Mittelfinger unten)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm'],
  wordMode: false,
  minSpeed: 72,
  maxSpeed: 115,
  speedIncrement: 1,
  ballCatchDistance: 385,
  requiredScore: 52,
  starThresholds: [26, 42, 52],
  spawnRate: 0.63,
  blockCount: 50,
  maxCharRepeat: 2,
};
