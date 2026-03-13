import { LessonConfig } from '../../types/lesson.types';

export const lesson01: LessonConfig = {
  id: 'lesson-01',
  title: 'Lektion 1: f und j',
  description: 'Lerne die Grundstellung mit den Tasten f und j',
  characters: [' ', 'f', 'j'],
  wordMode: false,
  minSpeed: 60,
  maxSpeed: 100,
  speedIncrement: 2,
  ballCatchDistance: 400,
  requiredScore: 40,
  starThresholds: [15, 30, 40],
  spawnRate: 0.5,
  blockCount: 30,
  maxCharRepeat: 4,  // f, ff, fff, ffff
};
