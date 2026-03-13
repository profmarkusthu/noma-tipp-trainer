import { LessonConfig } from '../../types/lesson.types';

export const lesson07: LessonConfig = {
  id: 'lesson-07',
  title: 'Lektion 7: Erste Wörter',
  description: 'Tippe einfache deutsche Wörter mit allen gelernten Tasten',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'e', 'i', 'r', 't', 'n', 'u', 'm', 'g', 'h', 'c', 'v', 'b'],
  wordMode: true,
  words: [
    'das', 'die', 'der', 'und', 'ist', 'sie', 'er', 'es', 'am', 'um', 'an', 'in', 'on',
    'den', 'mit', 'bei', 'gibt', 'haus', 'kind', 'mann', 'mutter', 'vater', 'zeit'
  ],
  minSpeed: 50,
  maxSpeed: 120,
  speedIncrement: 1,
  ballCatchDistance: 400,
  requiredScore: 30,
  starThresholds: [20, 40, 60],
  spawnRate: 0.8,
  blockCount: 30,
};
