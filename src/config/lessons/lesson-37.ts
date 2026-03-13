import { LessonConfig } from '../../types/lesson.types';

export const lesson37: LessonConfig = {
  id: 'lesson-37',
  title: 'Lektion 37: Schnelle Wörter',
  description: 'Bekannter Wortschatz in höherem Tempo',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['aber', 'weil', 'wenn', 'obwohl', 'trotzdem', 'jedoch', 'deshalb', 'daher', 'also', 'damit', 'sodass', 'seitdem', 'bevor', 'nachdem', 'während', 'sobald', 'damit', 'dabei', 'dazu', 'davon'],
  minSpeed: 95,
  maxSpeed: 148,
  speedIncrement: 2,
  ballCatchDistance: 350,
  requiredScore: 75,
  starThresholds: [38, 60, 75],
  spawnRate: 0.80,
  blockCount: 46,
};
