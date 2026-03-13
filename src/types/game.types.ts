export type GamePhase = 'idle' | 'running' | 'paused' | 'game-over' | 'level-complete';

export interface Vec2 {
  x: number;
  y: number;
}

export interface GameEntity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: Vec2;
}

export interface LetterBlock extends GameEntity {
  letter: string;
  isDestroying: boolean;
  destroyAnimationFrame: number;
  createdAt: number;
}

export interface Player extends GameEntity {
  animationState: 'idle' | 'run' | 'die';
  currentFrame: number;
  lives: number;
}

export interface PursuitBall extends GameEntity {
  speed: number;
  catchDistance: number;
}

export interface GameResult {
  lessonId: string;
  score: number;
  wrongInputs: number;
  elapsedSeconds: number;
  blocksCleared: number;
  totalBlocks: number;
  isGameOver: boolean;
}

export interface GameSnapshot {
  phase: GamePhase;
  player: Player;
  blocks: LetterBlock[];
  ball: PursuitBall;
  score: number;
  targetLetter: string | null;
  currentTime: number;
  blocksCleared: number;
  totalBlocks: number;
  wrongInputs: number;
  currentWordProgress: string;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  platformHeight: number;
  playerStartX: number;
  playerWidth: number;
  playerHeight: number;
  ballStartX: number;
  ballSize: number;
  blockWidth: number;
  blockHeight: number;
  spawnRate: number; // blocks per second
  maxBlocksOnScreen: number;
}
