import { LessonConfig } from '../../types/lesson.types';

export const lesson20: LessonConfig = {
  id: 'lesson-20',
  title: 'Lektion 20: Alle Tasten – Geschwindigkeit',
  description: 'Alle Buchstaben auf höherer Geschwindigkeit – Test deiner Fertigkeit',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'],
  wordMode: false,
  minSpeed: 100,
  maxSpeed: 160,
  speedIncrement: 2,
  ballCatchDistance: 340,
  requiredScore: 85,
  starThresholds: [45, 68, 85],
  spawnRate: 0.82,
  blockCount: 56,
  maxCharRepeat: 2,
};
