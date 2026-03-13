import { LessonConfig } from '../../types/lesson.types';

export const lesson11: LessonConfig = {
  id: 'lesson-11',
  title: 'Lektion 11: + o',
  description: 'Neue Taste: o (rechter Ringfinger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o'],
  wordMode: false,
  minSpeed: 74,
  maxSpeed: 118,
  speedIncrement: 1,
  ballCatchDistance: 380,
  requiredScore: 55,
  starThresholds: [28, 44, 55],
  spawnRate: 0.65,
  blockCount: 50,
  maxCharRepeat: 2,
};
