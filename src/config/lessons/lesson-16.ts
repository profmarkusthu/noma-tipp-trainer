import { LessonConfig } from '../../types/lesson.types';

export const lesson16: LessonConfig = {
  id: 'lesson-16',
  title: 'Lektion 16: + x und y',
  description: 'Neue Tasten: x (linker Ringfinger unten) und y (linker kleiner Finger unten)',
  characters: [' ', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ö', 'g', 'h', 'e', 'i', 'r', 'u', 't', 'z', 'n', 'm', 'o', 'c', 'v', 'b', 'w', 'p', 'ü', 'x', 'y'],
  wordMode: false,
  minSpeed: 84,
  maxSpeed: 130,
  speedIncrement: 1,
  ballCatchDistance: 360,
  requiredScore: 65,
  starThresholds: [34, 52, 65],
  spawnRate: 0.73,
  blockCount: 52,
  maxCharRepeat: 2,
};
