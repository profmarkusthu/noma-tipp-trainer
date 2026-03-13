import { LessonConfig } from '../../types/lesson.types';

export const lesson06: LessonConfig = {
  id: 'lesson-06',
  title: 'Lektion 6: + g und h',
  description: 'Neue Tasten: g (linker Zeigefinger innen) und h (rechter Zeigefinger innen)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h'],
  wordMode: false,
  minSpeed: 63,
  maxSpeed: 100,
  speedIncrement: 1,
  ballCatchDistance: 410,
  requiredScore: 43,
  starThresholds: [20, 33, 43],
  spawnRate: 0.55,
  blockCount: 48,
  maxCharRepeat: 3,
};
