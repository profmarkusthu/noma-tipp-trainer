import { LessonConfig } from '../../types/lesson.types';

export const lesson13: LessonConfig = {
  id: 'lesson-13',
  title: 'Lektion 13: + b',
  description: 'Neue Taste: b (linker Zeigefinger unten Mitte)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v', 'b'],
  wordMode: false,
  minSpeed: 78,
  maxSpeed: 122,
  speedIncrement: 1,
  ballCatchDistance: 370,
  requiredScore: 58,
  starThresholds: [30, 47, 58],
  spawnRate: 0.68,
  blockCount: 52,
  maxCharRepeat: 2,
};
