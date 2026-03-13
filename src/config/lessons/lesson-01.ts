import { LessonConfig } from '../../types/lesson.types';

export const lesson01: LessonConfig = {
  id: 'lesson-01',
  title: 'Lektion 1: f und j',
  description: 'Lerne die Grundstellung: f (linker Zeigefinger) und j (rechter Zeigefinger)',
  characters: ['f', 'j'],
  wordMode: false,
  minSpeed: 45,
  maxSpeed: 75,
  speedIncrement: 1,
  ballCatchDistance: 460,
  requiredScore: 25,
  starThresholds: [10, 18, 25],
  spawnRate: 0.40,
  blockCount: 40,
  maxCharRepeat: 4,
};
