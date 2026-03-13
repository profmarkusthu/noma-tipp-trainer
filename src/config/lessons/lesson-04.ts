import { LessonConfig } from '../../types/lesson.types';

export const lesson04: LessonConfig = {
  id: 'lesson-04',
  title: 'Lektion 4: Mit a, o, e, i',
  description: 'Lerne die Vokale und oberen Reihen-Tasten a, o, e, i',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'e', 'i'],
  wordMode: false,
  minSpeed: 75,
  maxSpeed: 125,
  speedIncrement: 2,
  ballCatchDistance: 370,
  requiredScore: 55,
  starThresholds: [30, 50, 65],
  spawnRate: 0.65,
  blockCount: 45,
  maxCharRepeat: 2,
};
