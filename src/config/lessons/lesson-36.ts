import { LessonConfig } from '../../types/lesson.types';

export const lesson36: LessonConfig = {
  id: 'lesson-36',
  title: 'Lektion 36: Gemischte Wörter – Mittlere Geschwindigkeit',
  description: 'Gemischter Wortschatz auf mittlerer Geschwindigkeit',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'],
  wordMode: true,
  words: ['computer', 'software', 'internet', 'netzwerk', 'programm', 'datei', 'ordner', 'tastatur', 'bildschirm', 'drucker', 'telefon', 'handy', 'kamera', 'fernseher', 'radio', 'musik', 'film', 'buch', 'zeitung'],
  minSpeed: 90,
  maxSpeed: 140,
  speedIncrement: 2,
  ballCatchDistance: 355,
  requiredScore: 70,
  starThresholds: [35, 56, 70],
  spawnRate: 0.78,
  blockCount: 46,
};
