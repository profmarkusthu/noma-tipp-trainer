import { GameState } from '../GameState';
import { LetterBlock } from '../../types/game.types';
import { LessonConfig } from '../../types/lesson.types';

interface SpawnEntry {
  char: string;
  isGroupedWithPrev: boolean; // touching the previous block in this group
  isBonus: boolean;           // extra points + flame visual
  isStacked: boolean;         // spawn as a pair stacked vertically
}

export class SpawnSystem {
  private characterSequence: SpawnEntry[] = [];
  private sequenceIndex: number = 0;
  private spawnRate: number = 0.8;

  constructor(lesson: LessonConfig, sequenceLength: number = 30) {
    this.spawnRate = lesson.spawnRate || 0.8;
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
      this.spawnNextGroup(state);
    }
  }

  private spawnNextGroup(state: GameState): void {
    // Collect all entries in this group (first + any grouped-with-prev)
    const group: SpawnEntry[] = [this.characterSequence[this.sequenceIndex]];
    this.sequenceIndex++;

    while (
      this.sequenceIndex < this.characterSequence.length &&
      this.characterSequence[this.sequenceIndex].isGroupedWithPrev
    ) {
      group.push(this.characterSequence[this.sequenceIndex]);
      this.sequenceIndex++;
    }

    // Find rightmost existing block to avoid overlaps from off-screen groups
    let rightEdge = state.config.canvasWidth;
    for (const block of state.blocks) {
      if (!block.isDestroying) {
        rightEdge = Math.max(rightEdge, block.x + block.width);
      }
    }

    const blockWidth = state.config.blockWidth;
    // When previous group's tail is still off-screen, add explicit gap between groups
    const startX =
      rightEdge > state.config.canvasWidth
        ? rightEdge + blockWidth
        : state.config.canvasWidth;

    // Stacked: single solo char spawned as two vertically stacked blocks
    if (group.length === 1 && group[0].isStacked) {
      this.spawnBlockAt(state, group[0].char, startX, group[0].isBonus, true, 0);
      this.spawnBlockAt(state, group[0].char, startX, group[0].isBonus, true, state.config.blockHeight);
    } else {
      // Normal group: blocks touch each other horizontally
      for (let i = 0; i < group.length; i++) {
        this.spawnBlockAt(state, group[i].char, startX + i * blockWidth, group[i].isBonus, false, 0);
      }
    }
  }

  private spawnBlockAt(
    state: GameState,
    letter: string,
    x: number,
    isBonus: boolean,
    isStacked: boolean,
    yOffset: number
  ): void {
    // Single chars: fixed blockWidth. Words: scale to fit text.
    const blockWidth =
      letter.length > 1
        ? Math.max(state.config.blockWidth, letter.length * 18 + 16)
        : state.config.blockWidth;

    const block: LetterBlock = {
      id: `block-${state.nextBlockId++}`,
      x,
      y: state.config.canvasHeight - state.config.platformHeight - state.config.blockHeight - yOffset,
      width: blockWidth,
      height: state.config.blockHeight,
      velocity: { x: -1, y: 0 },
      letter,
      isBonus,
      isStacked,
      isDestroying: false,
      destroyAnimationFrame: 0,
      createdAt: state.currentTime,
    };

    state.blocks.push(block);
    state.totalBlocks++;
  }

  private generateSequence(lesson: LessonConfig, length: number): SpawnEntry[] {
    if (lesson.wordMode && lesson.words) {
      return this.shuffleWords(lesson.words, length).map((word) => ({
        char: word,
        isGroupedWithPrev: false,
        isBonus: false,
        isStacked: false,
      }));
    }
    return this.generateCharacterSequence(lesson, length);
  }

  private generateCharacterSequence(lesson: LessonConfig, length: number): SpawnEntry[] {
    const result: SpawnEntry[] = [];
    let lastBaseChar = '';
    const maxRepeat = lesson.maxCharRepeat ?? 1;
    const hasSpace = lesson.characters.includes(' ');
    const chars = lesson.characters.filter((c) => c !== ' ');

    while (result.length < length) {
      const available = chars.filter((c) => c !== lastBaseChar);
      const char = available[Math.floor(Math.random() * available.length)];
      const repeat = maxRepeat > 1 ? Math.floor(Math.random() * maxRepeat) + 1 : 1;

      // Bonus and stacked only for solo chars; mutually exclusive
      const isStacked = repeat === 1 && Math.random() < 0.15;
      const isBonus = !isStacked && Math.random() < 0.20;

      for (let r = 0; r < repeat; r++) {
        result.push({
          char,
          isGroupedWithPrev: r > 0,
          isBonus: r === 0 ? isBonus : false,
          isStacked: r === 0 ? isStacked : false,
        });
      }
      lastBaseChar = char;

      if (hasSpace && result.length < length && Math.random() < 0.5) {
        result.push({ char: ' ', isGroupedWithPrev: false, isBonus: false, isStacked: false });
      }
    }

    return result.slice(0, length);
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
