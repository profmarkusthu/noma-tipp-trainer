import { LessonConfig } from '../../types/lesson.types';

export const lesson06: LessonConfig = {
  id: 'lesson-06',
  title: 'Lektion 6: Mit g, h, c, v, b',
  description: 'Meistere die unteren Reihen-Tasten g, h, c, v, b',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'e', 'i', 'r', 't', 'n', 'u', 'm', 'g', 'h', 'c', 'v', 'b'],
  wordMode: false,
  minSpeed: 85,
  maxSpeed: 140,
  speedIncrement: 2,
  ballCatchDistance: 350,
  requiredScore: 70,
  starThresholds: [40, 60, 80],
  spawnRate: 0.75,
  blockCount: 50,
};
