import { LessonConfig } from '../../types/lesson.types';

export const lesson33: LessonConfig = {
  id: 'lesson-33',
  title: 'Lektion 33: Orte und Gebäude',
  description: 'Wörter für Orte, Städte und Gebäude',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['stadt', 'dorf', 'land', 'berg', 'see', 'fluss', 'strasse', 'brücke', 'markt', 'platz', 'park', 'schule', 'krankenhaus', 'bahnhof', 'museum', 'theater', 'kirche', 'burg', 'schloss'],
  minSpeed: 82,
  maxSpeed: 130,
  speedIncrement: 2,
  ballCatchDistance: 362,
  requiredScore: 62,
  starThresholds: [31, 50, 62],
  spawnRate: 0.75,
  blockCount: 44,
};
