import { LessonConfig } from '../../types/lesson.types';

export const lesson12: LessonConfig = {
  id: 'lesson-12',
  title: 'Lektion 12: + c und v',
  description: 'Neue Tasten: c (linker Mittelfinger unten) und v (linker Zeigefinger unten)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v'],
  wordMode: false,
  minSpeed: 76,
  maxSpeed: 120,
  speedIncrement: 1,
  ballCatchDistance: 375,
  requiredScore: 57,
  starThresholds: [29, 46, 57],
  spawnRate: 0.67,
  blockCount: 50,
  maxCharRepeat: 2,
};
