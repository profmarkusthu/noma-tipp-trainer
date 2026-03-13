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

    // Dynamic block width: 18px per character + 16px padding, min 48px
    const blockWidth = Math.max(state.config.blockWidth, letter.length * 18 + 16);

    const block: LetterBlock = {
      id: `block-${state.nextBlockId++}`,
      x: state.config.canvasWidth,
      y: state.config.canvasHeight - state.config.platformHeight - state.config.blockHeight,
      width: blockWidth,
      height: state.config.blockHeight,
      velocity: { x: -1, y: 0 },
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
    let lastBaseChar = '';
    const maxRepeat = lesson.maxCharRepeat ?? 1;
    const hasSpace = lesson.characters.includes(' ');
    const chars = lesson.characters.filter((c) => c !== ' ');

    for (let i = 0; i < length; i++) {
      const available = chars.filter((c) => c !== lastBaseChar);
      const char = available[Math.floor(Math.random() * available.length)];
      const repeat = maxRepeat > 1 ? Math.floor(Math.random() * maxRepeat) + 1 : 1;

      // Build block string: if space in lesson and repeat > 1,
      // optionally insert spaces BETWEEN characters (never at start or end)
      let block: string;
      if (hasSpace && repeat > 1) {
        const parts: string[] = [char];
        for (let r = 1; r < repeat; r++) {
          if (Math.random() < 0.4) parts.push(' ');
          parts.push(char);
        }
        block = parts.join('');
      } else {
        block = char.repeat(repeat);
      }

      result.push(block);
      lastBaseChar = char;
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
