import { LessonConfig } from '../../types/lesson.types';

export const lesson29: LessonConfig = {
  id: 'lesson-29',
  title: 'Lektion 29: Längere Wörter',
  description: 'Wörter mit 5–7 Buchstaben trainieren',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['spielen', 'lachen', 'denken', 'fragen', 'antworten', 'singen', 'tanzen', 'träumen', 'vergessen', 'erinnern', 'verstehen', 'erklären', 'zeigen', 'erzählen', 'finden', 'benutzen'],
  minSpeed: 72,
  maxSpeed: 118,
  speedIncrement: 1,
  ballCatchDistance: 375,
  requiredScore: 50,
  starThresholds: [25, 40, 50],
  spawnRate: 0.70,
  blockCount: 42,
};
