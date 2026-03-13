import { LessonConfig } from '../../types/lesson.types';

export const lesson18: LessonConfig = {
  id: 'lesson-18',
  title: 'Lektion 18: + ä und ß',
  description: 'Neue Tasten: ä (rechter kleiner Finger) und ß (rechter kleiner Finger oben)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v', 'b', 'w', 'p', 'ü', 'x', 'y', 'q', 'ä', 'ß'],
  wordMode: false,
  minSpeed: 87,
  maxSpeed: 135,
  speedIncrement: 1,
  ballCatchDistance: 355,
  requiredScore: 70,
  starThresholds: [36, 56, 70],
  spawnRate: 0.75,
  blockCount: 54,
  maxCharRepeat: 2,
};
