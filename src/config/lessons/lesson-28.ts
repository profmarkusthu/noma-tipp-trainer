import { LessonConfig } from '../../types/lesson.types';

export const lesson28: LessonConfig = {
  id: 'lesson-28',
  title: 'Lektion 28: Nomen und Verben',
  description: 'Gebräuchliche Nomen und Verben auf Deutsch',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['arbeit', 'schule', 'familie', 'freund', 'stadt', 'land', 'haus', 'wohnung', 'auto', 'buch', 'musik', 'sport', 'reise', 'sprache', 'lernen', 'spielen', 'laufen', 'lesen', 'schreiben', 'hören'],
  minSpeed: 70,
  maxSpeed: 115,
  speedIncrement: 1,
  ballCatchDistance: 378,
  requiredScore: 47,
  starThresholds: [23, 37, 47],
  spawnRate: 0.68,
  blockCount: 40,
};
