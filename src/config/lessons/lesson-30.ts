import { LessonConfig } from '../../types/lesson.types';

export const lesson30: LessonConfig = {
  id: 'lesson-30',
  title: 'Lektion 30: Häufige deutsche Wörter',
  description: 'Die 30 häufigsten deutschen Wörter in Wortform',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä'],
  wordMode: true,
  words: ['das', 'ist', 'ich', 'nicht', 'die', 'und', 'sie', 'was', 'der', 'wie', 'von', 'dem', 'auch', 'des', 'mit', 'auf', 'an', 'für', 'im', 'noch', 'werden', 'hat', 'dann', 'wenn', 'so'],
  minSpeed: 75,
  maxSpeed: 120,
  speedIncrement: 2,
  ballCatchDistance: 370,
  requiredScore: 55,
  starThresholds: [27, 43, 55],
  spawnRate: 0.72,
  blockCount: 42,
};
