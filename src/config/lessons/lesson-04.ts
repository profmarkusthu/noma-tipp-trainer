import { LessonConfig } from '../../types/lesson.types';

export const lesson04: LessonConfig = {
  id: 'lesson-04',
  title: 'Lektion 4: + a und ö',
  description: 'Vollständige Grundreihe: a (linker kleiner Finger) und ö (rechter kleiner Finger)',
  characters: ['f', 'j', 'd', 'k', 's', 'l', 'a', 'ö'],
  wordMode: false,
  minSpeed: 58,
  maxSpeed: 90,
  speedIncrement: 1,
  ballCatchDistance: 430,
  requiredScore: 38,
  starThresholds: [16, 28, 38],
  spawnRate: 0.50,
  blockCount: 46,
  maxCharRepeat: 3,
};
