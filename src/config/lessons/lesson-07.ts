import { LessonConfig } from '../../types/lesson.types';

export const lesson07: LessonConfig = {
  id: 'lesson-07',
  title: 'Lektion 7: + e und i',
  description: 'Neue Tasten: e (linker Mittelfinger oben) und i (rechter Mittelfinger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i'],
  wordMode: false,
  minSpeed: 65,
  maxSpeed: 105,
  speedIncrement: 1,
  ballCatchDistance: 400,
  requiredScore: 46,
  starThresholds: [22, 36, 46],
  spawnRate: 0.58,
  blockCount: 48,
  maxCharRepeat: 2,
};
