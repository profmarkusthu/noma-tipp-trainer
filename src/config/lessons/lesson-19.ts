import { LessonConfig } from '../../types/lesson.types';

export const lesson19: LessonConfig = {
  id: 'lesson-19',
  title: 'Lektion 19: Alle Tasten – Wiederholung',
  description: 'Festigung aller Tasten auf mittlerer Geschwindigkeit',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'],
  wordMode: false,
  minSpeed: 90,
  maxSpeed: 140,
  speedIncrement: 2,
  ballCatchDistance: 350,
  requiredScore: 75,
  starThresholds: [40, 60, 75],
  spawnRate: 0.78,
  blockCount: 55,
  maxCharRepeat: 2,
};
