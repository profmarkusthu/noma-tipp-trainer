import { GameState } from '../GameState';
import { LetterBlock } from '../../types/game.types';
import { LessonConfig } from '../../types/lesson.types';

export class SpawnSystem {
  private characterSequence: string[] = [];
  private sequenceIndex: number = 0;
  private spawnRate: number = 0.8; // default: 0.8 blocks per second

  constructor(lesson: LessonConfig, sequenceLength: number = 30) {
    this.spawnRate = lesson.spawnRate || 0.8; // Use lesson config or default
    this.characterSequence = this.generateSequence(lesson, sequenceLength);
    this.sequenceIndex = 0;
  }

  update(state: GameState, deltaTime: number): void {
    state.spawnTimer += deltaTime;
    const spawnInterval = 1 / this.spawnRate;

    while (
      state.spawnTimer >= spawnInterval &&
      state.blocks.length < state.config.maxBlocksOnScreen &&
      this.sequenceIndex < this.characterSequence.length
    ) {
      state.spawnTimer -= spawnInterval;
      this.spawnBlock(state);
    }
  }

  private spawnBlock(state: GameState): void {
    const letter = this.characterSequence[this.sequenceIndex];
    this.sequenceIndex++;

    const block: LetterBlock = {
      id: `block-${state.nextBlockId++}`,
      x: state.config.canvasWidth,
      y: state.config.canvasHeight - state.config.platformHeight - state.config.blockHeight,
      width: state.config.blockWidth,
      height: state.config.blockHeight,
      velocity: { x: -1, y: 0 }, // will be set per frame
      letter,
      isDestroying: false,
      destroyAnimationFrame: 0,
      createdAt: state.currentTime,
    };

    state.blocks.push(block);
    state.totalBlocks++;
  }

  private generateSequence(lesson: LessonConfig, length: number): string[] {
    if (lesson.wordMode && lesson.words) {
      return this.shuffleWords(lesson.words, length);
    }
    return this.generateCharacterSequence(lesson, length);
  }

  private generateCharacterSequence(lesson: LessonConfig, length: number): string[] {
    const result: string[] = [];
    let lastChar = '';

    for (let i = 0; i < length; i++) {
      const available = lesson.characters.filter((c) => c !== lastChar);
      const char = available[Math.floor(Math.random() * available.length)];
      result.push(char);
      lastChar = char;
    }

    return result;
  }

  private shuffleWords(words: string[], length: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result;
  }

  hasMoreBlocks(): boolean {
    return this.sequenceIndex < this.characterSequence.length;
  }

  reset(lesson: LessonConfig, sequenceLength: number = 30): void {
    this.characterSequence = this.generateSequence(lesson, sequenceLength);
    this.sequenceIndex = 0;
  }
}
