import { LessonConfig } from '../../types/lesson.types';

export const lesson32: LessonConfig = {
  id: 'lesson-32',
  title: 'Lektion 32: Berufe und Personen',
  description: 'Wörter rund um Berufe und Personen',
  characters: [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'z', 'ä', 'ö', 'ü'],
  wordMode: true,
  words: ['arzt', 'lehrer', 'schüler', 'student', 'kind', 'eltern', 'mutter', 'vater', 'bruder', 'schwester', 'freund', 'kollege', 'chef', 'mitarbeiter', 'kunde', 'bürger', 'nachbar'],
  minSpeed: 80,
  maxSpeed: 128,
  speedIncrement: 2,
  ballCatchDistance: 365,
  requiredScore: 60,
  starThresholds: [30, 48, 60],
  spawnRate: 0.74,
  blockCount: 43,
};
