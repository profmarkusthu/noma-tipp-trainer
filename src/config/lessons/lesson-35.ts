import { LessonConfig } from '../../types/lesson.types';

export const lesson35: LessonConfig = {
  id: 'lesson-35',
  title: 'Lektion 35: Zeitwörter und Zahlen',
  description: 'Wörter für Zeit, Datum und Zahlwörter',
  characters: [' ', 'a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['heute', 'morgen', 'gestern', 'jetzt', 'früh', 'abend', 'nacht', 'woche', 'monat', 'jahr', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag', 'sonntag', 'januar', 'februar', 'august'],
  minSpeed: 86,
  maxSpeed: 136,
  speedIncrement: 2,
  ballCatchDistance: 358,
  requiredScore: 66,
  starThresholds: [33, 53, 66],
  spawnRate: 0.77,
  blockCount: 44,
};
