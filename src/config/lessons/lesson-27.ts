import { LessonConfig } from '../../types/lesson.types';

export const lesson27: LessonConfig = {
  id: 'lesson-27',
  title: 'Lektion 27: Wörter mit Umlauten',
  description: 'Wörter mit ä, ö, ü',
  characters: [' ', 'a', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['über', 'für', 'können', 'müssen', 'öffnen', 'träumen', 'lärm', 'schön', 'früh', 'stück', 'mögen', 'natürlich', 'täglich', 'längst', 'häufig', 'übrig', 'führen', 'fühlen'],
  minSpeed: 67,
  maxSpeed: 110,
  speedIncrement: 1,
  ballCatchDistance: 382,
  requiredScore: 45,
  starThresholds: [22, 35, 45],
  spawnRate: 0.67,
  blockCount: 40,
};
