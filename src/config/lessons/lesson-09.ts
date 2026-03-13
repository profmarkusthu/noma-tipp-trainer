import { LessonConfig } from '../../types/lesson.types';

export const lesson09: LessonConfig = {
  id: 'lesson-09',
  title: 'Lektion 9: + t und z',
  description: 'Neue Tasten: t (linker Zeigefinger) und z (rechter Zeigefinger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z'],
  wordMode: false,
  minSpeed: 70,
  maxSpeed: 112,
  speedIncrement: 1,
  ballCatchDistance: 390,
  requiredScore: 50,
  starThresholds: [25, 40, 50],
  spawnRate: 0.62,
  blockCount: 50,
  maxCharRepeat: 2,
};
