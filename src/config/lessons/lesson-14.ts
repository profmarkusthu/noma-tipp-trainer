import { LessonConfig } from '../../types/lesson.types';

export const lesson14: LessonConfig = {
  id: 'lesson-14',
  title: 'Lektion 14: + w',
  description: 'Neue Taste: w (linker Ringfinger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v', 'b', 'w'],
  wordMode: false,
  minSpeed: 80,
  maxSpeed: 125,
  speedIncrement: 1,
  ballCatchDistance: 368,
  requiredScore: 60,
  starThresholds: [32, 48, 60],
  spawnRate: 0.70,
  blockCount: 52,
  maxCharRepeat: 2,
};
