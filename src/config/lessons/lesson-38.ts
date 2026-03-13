import { LessonConfig } from '../../types/lesson.types';

export const lesson38: LessonConfig = {
  id: 'lesson-38',
  title: 'Lektion 38: Zusammengesetzte Wörter',
  description: 'Typisch deutsche Komposita',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü', 'ß'],
  wordMode: true,
  words: ['tageszeit', 'heimweg', 'fußball', 'hochzeit', 'jahrestag', 'aufgabe', 'haushalt', 'kindheit', 'gesellschaft', 'hauptbahnhof', 'spielplatz', 'krankenhaus', 'lebensmittel', 'jahreszeit', 'unterricht', 'freizeit'],
  minSpeed: 98,
  maxSpeed: 152,
  speedIncrement: 2,
  ballCatchDistance: 347,
  requiredScore: 78,
  starThresholds: [40, 63, 78],
  spawnRate: 0.82,
  blockCount: 46,
};
