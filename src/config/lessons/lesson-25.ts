import { LessonConfig } from '../../types/lesson.types';

export const lesson25: LessonConfig = {
  id: 'lesson-25',
  title: 'Lektion 25: Alltägliche Wörter',
  description: 'Gebräuchliche Alltagswörter trainieren',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'n', 'm', 'o', 'c', 'v', 'b'],
  wordMode: true,
  words: ['haben', 'machen', 'kommen', 'sehen', 'gehen', 'fahren', 'leben', 'sagen', 'finden', 'denken', 'nehmen', 'geben', 'stehen', 'halten', 'bitte', 'danke', 'nein', 'viel', 'gut', 'auch', 'noch', 'mehr'],
  minSpeed: 62,
  maxSpeed: 105,
  speedIncrement: 1,
  ballCatchDistance: 390,
  requiredScore: 40,
  starThresholds: [19, 31, 40],
  spawnRate: 0.63,
  blockCount: 38,
};
