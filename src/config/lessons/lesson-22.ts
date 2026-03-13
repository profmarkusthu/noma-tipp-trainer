import { LessonConfig } from '../../types/lesson.types';

export const lesson22: LessonConfig = {
  id: 'lesson-22',
  title: 'Lektion 22: Kurze Wörter mit e, i, r',
  description: 'Häufige kurze deutsche Wörter mit e, i, r',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r'],
  wordMode: true,
  words: ['die', 'der', 'dir', 'ihre', 'hier', 'sie', 'er', 'es', 'ire', 'ried', 'eis', 'ige', 'frei', 'drei', 'rei', 'sei', 'gel', 'gier', 'real'],
  minSpeed: 55,
  maxSpeed: 95,
  speedIncrement: 1,
  ballCatchDistance: 410,
  requiredScore: 33,
  starThresholds: [15, 25, 33],
  spawnRate: 0.58,
  blockCount: 35,
};
