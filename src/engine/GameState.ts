import { GamePhase, GameSnapshot, LetterBlock, Player, PursuitBall, GameConfig } from '../types/game.types';
import { DEFAULT_GAME_CONFIG } from '../config/game-settings';

export class GameState {
  phase: GamePhase = 'idle';
  player: Player;
  blocks: LetterBlock[] = [];
  ball: PursuitBall;
  score: number = 0;
  targetLetter: string | null = null;
  currentTime: number = 0;
  blocksCleared: number = 0;
  totalBlocks: number = 0;
  wrongInputs: number = 0; // Track wrong key presses
  currentWordProgress: string = ''; // For word mode: typed letters so far
  spawnTimer: number = 0;
  nextBlockId: number = 0;

  config: GameConfig;

  constructor(config: GameConfig = DEFAULT_GAME_CONFIG) {
    this.config = config;

    this.player = {
      id: 'player',
      x: config.playerStartX,
      y: config.canvasHeight - config.platformHeight - config.playerHeight,
      width: config.playerWidth,
      height: config.playerHeight,
      velocity: { x: 0, y: 0 },
      animationState: 'idle',
      currentFrame: 0,
      lives: 3, // Start with 3 lives
    };

    this.ball = {
      id: 'ball',
      x: config.ballStartX,
      y: config.canvasHeight - config.platformHeight - config.ballSize,
      width: config.ballSize,
      height: config.ballSize,
      velocity: { x: 0, y: 0 },
      speed: 150, // px/s, will be overridden by lesson config
      catchDistance: 400,
    };
  }

  snapshot(): GameSnapshot {
    return {
      phase: this.phase,
      player: { ...this.player },
      blocks: this.blocks.map((b) => ({ ...b })),
      ball: { ...this.ball },
      score: this.score,
      targetLetter: this.targetLetter,
      currentTime: this.currentTime,
      blocksCleared: this.blocksCleared,
      totalBlocks: this.totalBlocks,
      wrongInputs: this.wrongInputs,
      currentWordProgress: this.currentWordProgress,
    };
  }

  reset(config: GameConfig = DEFAULT_GAME_CONFIG) {
    this.config = config;
    this.phase = 'idle';
    this.blocks = [];
    this.score = 0;
    this.targetLetter = null;
    this.currentTime = 0;
    this.blocksCleared = 0;
    this.totalBlocks = 0;
    this.wrongInputs = 0;
    this.currentWordProgress = '';
    this.spawnTimer = 0;
    this.nextBlockId = 0;

    this.player.x = config.playerStartX;
    this.player.y = config.canvasHeight - config.platformHeight - config.playerHeight;
    this.player.animationState = 'idle';
    this.player.currentFrame = 0;
    this.player.lives = 1;

    this.ball.x = config.ballStartX;
    this.ball.y = config.canvasHeight - config.platformHeight - config.ballSize;
  }
}
