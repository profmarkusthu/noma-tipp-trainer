import { LessonConfig } from '../../types/lesson.types';

export const lesson23: LessonConfig = {
  id: 'lesson-23',
  title: 'Lektion 23: Kurze Wörter mit n, m, t',
  description: 'Häufige Wörter mit n, m, t, u',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'n', 'm'],
  wordMode: true,
  words: ['und', 'mit', 'man', 'nur', 'nimm', 'nun', 'sein', 'ihn', 'tim', 'uni', 'rum', 'drum', 'guten', 'trinkt', 'der', 'den', 'mit', 'ihm'],
  minSpeed: 58,
  maxSpeed: 98,
  speedIncrement: 1,
  ballCatchDistance: 400,
  requiredScore: 35,
  starThresholds: [16, 27, 35],
  spawnRate: 0.60,
  blockCount: 35,
};
