import { GameState } from './GameState';
import { GameSnapshot, GameConfig } from '../types/game.types';
import { LessonConfig } from '../types/lesson.types';
import { CollisionSystem } from './systems/CollisionSystem';
import { DifficultySystem } from './systems/DifficultySystem';
import { SpawnSystem } from './systems/SpawnSystem';
import { DEFAULT_GAME_CONFIG } from '../config/game-settings';

export class GameEngine {
  private state: GameState;
  private difficultySystem: DifficultySystem;
  private spawnSystem: SpawnSystem;
  private currentLesson: LessonConfig;

  constructor(lesson: LessonConfig, config: GameConfig = DEFAULT_GAME_CONFIG) {
    this.state = new GameState(config);
    this.difficultySystem = new DifficultySystem(lesson);
    this.spawnSystem = new SpawnSystem(lesson, lesson.blockCount || 30);
    this.currentLesson = lesson;
    this.setupBall();
  }

  private setupBall(): void {
    this.state.ball.speed = this.currentLesson.minSpeed;
    this.state.ball.catchDistance = this.currentLesson.ballCatchDistance;
  }

  start(): void {
    if (this.state.phase === 'idle') {
      this.state.phase = 'running';
      this.selectNextTarget();
    }
  }

  pause(): void {
    if (this.state.phase === 'running') {
      this.state.phase = 'paused';
    }
  }

  resume(): void {
    if (this.state.phase === 'paused') {
      this.state.phase = 'running';
    }
  }

  update(deltaTime: number): void {
    if (this.state.phase !== 'running') return;

    this.state.currentTime += deltaTime;

    // Get player speed from difficulty (Spieler läuft so schnell wie Schwierigkeit)
    const playerSpeed = this.difficultySystem.currentSpeed;

    // Dynamic spawn rate: faster players get faster blocks
    // Scale from base rate to doubled rate based on player progress
    const speedRatio = playerSpeed / this.currentLesson.maxSpeed;
    const baseSpawnRate = this.currentLesson.spawnRate || 0.8;
    const maxDynamicSpawnRate = baseSpawnRate * 2; // Double rate for very fast players
    (this.spawnSystem as any).spawnRate = baseSpawnRate + speedRatio * (maxDynamicSpawnRate - baseSpawnRate);

    // Spawn new blocks
    this.spawnSystem.update(this.state, deltaTime);

    // Update target after spawning new blocks
    this.selectNextTarget();

    // Ball speed is 15% faster - gradually catches up if player is slow
    const ballSpeed = playerSpeed * 1.15;
    this.state.ball.speed = ballSpeed;

    // Update blocks - they move to the left (towards player)
    for (const block of this.state.blocks) {
      block.x -= playerSpeed * deltaTime;

      if (block.isDestroying) {
        block.destroyAnimationFrame++;
        // Block will be removed from array when animation completes (see filter below)
      }
    }

    // Update player - moves to the right with difficulty-based speed
    this.state.player.x += playerSpeed * deltaTime;

    // Constrain player to stay near the center (max 100px right of center)
    const centerX = this.state.config.playerStartX + 100;
    if (this.state.player.x > centerX) {
      this.state.player.x = centerX;
    }

    // Update player animation
    if (this.state.player.animationState === 'run') {
      this.state.player.currentFrame++;
      if (this.state.player.currentFrame > 7) {
        this.state.player.currentFrame = 0;
      }
    }

    // Ball no longer used - removed from gameplay

    // Check collisions: player hitting block (without destroying it)
    for (const block of this.state.blocks) {
      if (!block.isDestroying) {
        const playerHitsBlock = CollisionSystem.checkAABB(
          this.state.player,
          block
        );
        if (playerHitsBlock) {
          // Player hit an undestroyed block - lose a life
          this.loseLife();
          return;
        }
      }
    }

    // Ball collision removed - no longer needed for gameplay

    // Remove off-screen blocks and finished destroy animations
    this.state.blocks = this.state.blocks.filter((block) => {
      // Keep block if it's still on screen AND not finished destroying
      if (block.x + block.width <= 0) return false; // Remove off-screen
      if (block.isDestroying && block.destroyAnimationFrame > 10) return false; // Remove after animation
      return true;
    });

    // Check if level complete
    if (!this.spawnSystem.hasMoreBlocks() && this.state.blocks.length === 0) {
      this.levelComplete();
    }
  }

  handleKeyPress(key: string): boolean {
    if (this.state.phase !== 'running') return false;

    if (this.state.targetLetter === null) {
      return false;
    }

    // For word mode: check if next character is correct
    const nextExpectedChar = this.state.targetLetter[this.state.currentWordProgress.length];
    const isCorrect = key === nextExpectedChar;

    if (isCorrect && this.state.targetLetter) {
      // Add to progress
      this.state.currentWordProgress += key;

      // Check if entire word/letter is complete
      if (this.state.currentWordProgress === this.state.targetLetter) {
        // Find and destroy the matching block
        const blockIndex = this.state.blocks.findIndex(
          (b) => !b.isDestroying && b.letter === this.state.targetLetter
        );

        if (blockIndex !== -1) {
          const block = this.state.blocks[blockIndex];
          block.isDestroying = true;
          block.destroyAnimationFrame = 0;

          // Award score
          this.state.score += 10;
          this.state.blocksCleared++;

          // Update difficulty
          this.difficultySystem.recordCorrectInput();

          // Clear progress and select next target
          this.state.currentWordProgress = '';
          this.selectNextTarget();

          // Run animation
          this.state.player.animationState = 'run';
          this.state.player.currentFrame = 0;

          return true;
        }
      } else {
        // Partial word correct, show progress
        return true;
      }
    } else if (!isCorrect) {
      this.state.wrongInputs++;
      this.state.currentWordProgress = ''; // Reset on wrong input
      this.difficultySystem.recordWrongInput();
    }

    return false;
  }

  private selectNextTarget(): void {
    // Get next letter from the first non-destroyed block
    const nextBlock = this.state.blocks.find((b) => !b.isDestroying);
    if (nextBlock) {
      this.state.targetLetter = nextBlock.letter;
    } else {
      this.state.targetLetter = null;
    }
  }

  private loseLife(): void {
    this.state.player.lives--;
    if (this.state.player.lives <= 0) {
      this.gameOver();
    } else {
      // Reset player to starting position
      this.state.player.x = this.currentLesson?.ballCatchDistance
        ? this.state.config.playerStartX
        : this.state.config.playerStartX;
      this.state.player.animationState = 'idle';
      // Select next target
      this.selectNextTarget();
    }
  }

  private gameOver(): void {
    this.state.phase = 'game-over';
    this.state.player.animationState = 'die';
  }

  private levelComplete(): void {
    this.state.phase = 'level-complete';
    this.state.player.animationState = 'idle';
  }

  getSnapshot(): GameSnapshot {
    return this.state.snapshot();
  }

  getState(): GameState {
    return this.state;
  }

  reset(lesson: LessonConfig, config: GameConfig = DEFAULT_GAME_CONFIG): void {
    this.currentLesson = lesson;
    this.state.reset(config);
    this.difficultySystem = new DifficultySystem(lesson);
    this.spawnSystem = new SpawnSystem(lesson, lesson.blockCount || 30);
    this.setupBall();
  }
}
