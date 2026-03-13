import { LessonConfig } from '../../types/lesson.types';

export const lesson34: LessonConfig = {
  id: 'lesson-34',
  title: 'Lektion 34: Natur und Wetter',
  description: 'Wörter aus Natur und Wetterbeschreibungen',
  characters: [' ', 'a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['sonne', 'regen', 'wind', 'wolke', 'schnee', 'frost', 'nebel', 'gewitter', 'sturm', 'blitz', 'donner', 'baum', 'blume', 'gras', 'wald', 'wiese', 'tier', 'vogel', 'fisch', 'hund', 'katze'],
  minSpeed: 84,
  maxSpeed: 133,
  speedIncrement: 2,
  ballCatchDistance: 360,
  requiredScore: 64,
  starThresholds: [32, 51, 64],
  spawnRate: 0.76,
  blockCount: 44,
};
