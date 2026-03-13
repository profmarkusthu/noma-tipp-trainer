import { LessonConfig } from '../../types/lesson.types';

export const lesson39: LessonConfig = {
  id: 'lesson-39',
  title: 'Lektion 39: Geschwindigkeitschallenge',
  description: 'Alle Buchstaben und Wörter auf hoher Geschwindigkeit',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü', 'ß'],
  wordMode: true,
  words: ['schnell', 'effizient', 'präzise', 'sorgfältig', 'gewissenhaft', 'aufmerksam', 'konzentriert', 'ausdauernd', 'fleißig', 'begeistert', 'verlässlich', 'kreativ', 'kompetent', 'erfahren', 'erfolgreich'],
  minSpeed: 105,
  maxSpeed: 160,
  speedIncrement: 2,
  ballCatchDistance: 342,
  requiredScore: 85,
  starThresholds: [43, 68, 85],
  spawnRate: 0.85,
  blockCount: 48,
};
