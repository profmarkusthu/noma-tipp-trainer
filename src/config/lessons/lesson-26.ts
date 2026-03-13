import { LessonConfig } from '../../types/lesson.types';

export const lesson26: LessonConfig = {
  id: 'lesson-26',
  title: 'Lektion 26: Wörter mit w und p',
  description: 'Wörter die w und p enthalten',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z'],
  wordMode: true,
  words: ['wort', 'wald', 'wasser', 'wind', 'weg', 'welt', 'wenn', 'was', 'wie', 'wo', 'wer', 'plan', 'preis', 'punkt', 'platz', 'papier', 'person', 'bitte', 'dank', 'prima'],
  minSpeed: 65,
  maxSpeed: 108,
  speedIncrement: 1,
  ballCatchDistance: 385,
  requiredScore: 43,
  starThresholds: [21, 33, 43],
  spawnRate: 0.65,
  blockCount: 40,
};
