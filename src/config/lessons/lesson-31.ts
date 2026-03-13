import { LessonConfig } from '../../types/lesson.types';

export const lesson31: LessonConfig = {
  id: 'lesson-31',
  title: 'Lektion 31: Adjektive',
  description: 'Deutsche Adjektive – Eigenschaften beschreiben',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['gut', 'schlecht', 'schön', 'klein', 'groß', 'schnell', 'langsam', 'warm', 'kalt', 'neu', 'alt', 'jung', 'stark', 'schwach', 'laut', 'leise', 'hell', 'dunkel', 'frisch', 'müde'],
  minSpeed: 78,
  maxSpeed: 123,
  speedIncrement: 2,
  ballCatchDistance: 368,
  requiredScore: 57,
  starThresholds: [28, 45, 57],
  spawnRate: 0.73,
  blockCount: 42,
};
