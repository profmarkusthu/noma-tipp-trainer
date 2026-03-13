import { LessonConfig } from '../../types/lesson.types';

export const lesson21: LessonConfig = {
  id: 'lesson-21',
  title: 'Lektion 21: Erste Wörter (Grundreihe)',
  description: 'Einfache Wörter nur mit Grundreihen-Buchstaben',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h'],
  wordMode: true,
  words: ['lag', 'flog', 'log', 'lud', 'gal', 'dag', 'had', 'half', 'held', 'dahl', 'all', 'hall', 'fall', 'soll', 'lkad', 'jod', 'glas', 'ask'],
  minSpeed: 50,
  maxSpeed: 90,
  speedIncrement: 1,
  ballCatchDistance: 420,
  requiredScore: 30,
  starThresholds: [14, 23, 30],
  spawnRate: 0.55,
  blockCount: 35,
};
