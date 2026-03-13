export type CharacterSet = string[];

export interface LessonConfig {
  id: string;
  title: string;
  description: string;
  characters: CharacterSet;
  wordMode: boolean;
  words?: string[];
  minSpeed: number; // px/s
  maxSpeed: number;
  speedIncrement: number;
  ballCatchDistance: number;
  requiredScore: number;
  starThresholds: [number, number, number];
  spawnRate?: number; // blocks per second - default 0.8
  blockCount?: number; // total blocks to spawn - default 30
}

export interface LessonProgress {
  lessonId: string;
  bestScore: number;
  stars: 0 | 1 | 2 | 3;
  attempts: number;
  completedAt?: string;
  wpm?: number;
}
