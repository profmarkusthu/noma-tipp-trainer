import { LessonConfig } from '../../types/lesson.types';

export const lesson02: LessonConfig = {
  id: 'lesson-02',
  title: 'Lektion 2: + d und k',
  description: 'Erweiterung mit d (linker Mittelfinger) und k (rechter Mittelfinger)',
  characters: ['f', 'j', 'd', 'k'],
  wordMode: false,
  minSpeed: 50,
  maxSpeed: 80,
  speedIncrement: 1,
  ballCatchDistance: 450,
  requiredScore: 30,
  starThresholds: [12, 22, 30],
  spawnRate: 0.43,
  blockCount: 42,
  maxCharRepeat: 3,
};
