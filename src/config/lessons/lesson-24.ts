import { LessonConfig } from '../../types/lesson.types';

export const lesson24: LessonConfig = {
  id: 'lesson-24',
  title: 'Lektion 24: Einfache deutsche Wörter',
  description: 'Häufige deutsche Wörter mit den bisher gelernten Tasten',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'n', 'm', 'o'],
  wordMode: true,
  words: ['das', 'die', 'der', 'und', 'ist', 'nicht', 'sie', 'er', 'es', 'am', 'um', 'an', 'in', 'den', 'ein', 'mit', 'sein', 'auch', 'haus', 'kind', 'mann', 'frau', 'hand'],
  minSpeed: 60,
  maxSpeed: 100,
  speedIncrement: 1,
  ballCatchDistance: 395,
  requiredScore: 38,
  starThresholds: [18, 29, 38],
  spawnRate: 0.62,
  blockCount: 38,
};
