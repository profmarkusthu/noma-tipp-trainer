import { LessonConfig } from '../../types/lesson.types';

export const lesson40: LessonConfig = {
  id: 'lesson-40',
  title: 'Lektion 40: Meisterprüfung',
  description: 'Die finale Herausforderung – maximale Geschwindigkeit, alle Tasten',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'],
  wordMode: true,
  words: ['außergewöhnlich', 'verantwortungsbewusst', 'zufriedenstellend', 'selbstständig', 'qualitätsbewusst', 'dienstleistung', 'berücksichtigen', 'zusammenarbeit', 'entwicklung', 'möglichkeiten', 'schwierigkeiten', 'entscheidung', 'voraussetzung', 'bewerbungsunterlagen'],
  minSpeed: 115,
  maxSpeed: 180,
  speedIncrement: 3,
  ballCatchDistance: 335,
  requiredScore: 100,
  starThresholds: [50, 80, 100],
  spawnRate: 0.90,
  blockCount: 50,
};
