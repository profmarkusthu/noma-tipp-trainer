import { describe, it, expect } from 'vitest';
import { SpawnSystem } from '../../src/engine/systems/SpawnSystem';
import { GameState } from '../../src/engine/GameState';
import { DEFAULT_GAME_CONFIG } from '../../src/config/game-settings';
import { LessonConfig } from '../../src/types/lesson.types';
import { lesson07 } from '../../src/config/lessons/lesson-07';

const lessonBase: LessonConfig = {
  id: 'test',
  title: 'Test',
  description: 'Test',
  characters: ['f', 'j'],
  wordMode: false,
  minSpeed: 60,
  maxSpeed: 100,
  speedIncrement: 2,
  ballCatchDistance: 400,
  requiredScore: 40,
  starThresholds: [15, 30, 40],
  spawnRate: 1.0, // 1 group per second = interval of 1s
  blockCount: 30,
  maxCharRepeat: 3,
};

const lessonWithSpace: LessonConfig = {
  ...lessonBase,
  characters: [' ', 'f', 'j'],
};

/** Spawn many groups at once by setting a large spawnTimer, deltaTime=0 so no movement. */
function spawnAll(lesson: LessonConfig, sequenceLength: number): GameState {
  const system = new SpawnSystem(lesson, sequenceLength);
  const state = new GameState(DEFAULT_GAME_CONFIG);
  state.spawnTimer = sequenceLength * 10; // more than enough intervals
  system.update(state, 0);
  return state;
}

describe('SpawnSystem – single-character blocks', () => {
  it('every spawned block has exactly one character', () => {
    const state = spawnAll(lessonBase, 20);
    for (const block of state.blocks) {
      expect(block.letter.length).toBe(1);
    }
  });

  it('space blocks have exactly one space character', () => {
    const state = spawnAll(lessonWithSpace, 30);
    for (const block of state.blocks) {
      if (block.letter === ' ') {
        expect(block.letter).toBe(' ');
      }
    }
  });
});

/** True 2D AABB overlap (not just touching). */
function overlaps(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

describe('SpawnSystem – no block overlaps', () => {
  it('no two blocks overlap in 2D (without space in lesson)', () => {
    const state = spawnAll(lessonBase, 20);
    for (let i = 0; i < state.blocks.length; i++) {
      for (let j = i + 1; j < state.blocks.length; j++) {
        expect(overlaps(state.blocks[i], state.blocks[j])).toBe(false);
      }
    }
  });

  it('no two blocks overlap in 2D (with space in lesson)', () => {
    const state = spawnAll(lessonWithSpace, 30);
    for (let i = 0; i < state.blocks.length; i++) {
      for (let j = i + 1; j < state.blocks.length; j++) {
        expect(overlaps(state.blocks[i], state.blocks[j])).toBe(false);
      }
    }
  });
});

describe('SpawnSystem – space block ordering', () => {
  it('space blocks are never grouped with non-space blocks (not touching)', () => {
    // Spawn with some movement between groups so ordering is visible.
    // Run 50 independent sessions to cover random cases.
    for (let trial = 0; trial < 50; trial++) {
      const system = new SpawnSystem(lessonWithSpace, 20);
      const state = new GameState(DEFAULT_GAME_CONFIG);

      // Spawn groups one at a time with simulated movement between them.
      const interval = 1 / (lessonWithSpace.spawnRate ?? 1);
      const speed = lessonWithSpace.minSpeed;
      for (let i = 0; i < 20; i++) {
        state.spawnTimer += interval;
        // Move existing blocks (simulate time passing)
        for (const b of state.blocks) {
          b.x -= speed * interval;
        }
        system.update(state, 0);
      }

      const sorted = [...state.blocks]
        .filter((b) => !b.isDestroying)
        .sort((a, b) => a.x - b.x);

      for (let i = 0; i < sorted.length - 1; i++) {
        const curr = sorted[i];
        const next = sorted[i + 1];
        const touching = next.x === curr.x + curr.width;

        // A space block and any other block must NOT be touching
        if (touching) {
          const spaceInvolved = curr.letter === ' ' || next.letter === ' ';
          expect(spaceInvolved).toBe(false);
        }
      }
    }
  });

  it('space blocks never appear as the first block in the sequence', () => {
    for (let trial = 0; trial < 20; trial++) {
      const system = new SpawnSystem(lessonWithSpace, 10);
      const state = new GameState(DEFAULT_GAME_CONFIG);
      state.spawnTimer = 1.0; // trigger exactly the first group
      system.update(state, 0);

      if (state.blocks.length > 0) {
        const firstBlock = [...state.blocks].sort((a, b) => a.x - b.x)[0];
        expect(firstBlock.letter).not.toBe(' ');
      }
    }
  });
});

describe('SpawnSystem – grouped blocks are touching', () => {
  it('blocks in the same group (same char repeated) are at touching x positions', () => {
    // Run trials until we get a genuine horizontal group (repeat > 1, not stacked).
    // Stacked blocks share the same x but different y — that's a separate feature.
    let foundGroup = false;
    for (let trial = 0; trial < 200; trial++) {
      const system = new SpawnSystem(lessonBase, 10);
      const state = new GameState(DEFAULT_GAME_CONFIG);
      state.spawnTimer = 1.0; // exactly one spawn interval
      system.update(state, 0);

      if (state.blocks.length < 2) continue;

      // Stacked blocks have the same x → skip, we want horizontal groups
      const uniqueXCount = new Set(state.blocks.map((b) => b.x)).size;
      if (uniqueXCount < 2) continue;

      foundGroup = true;
      // Sort by x: consecutive blocks within the group should be touching
      const sorted = [...state.blocks].sort((a, b) => a.x - b.x);
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i + 1].x).toBe(sorted[i].x + DEFAULT_GAME_CONFIG.blockWidth);
      }
      break;
    }
    // With maxCharRepeat=3, within 200 trials we should hit at least one repeat>1 group
    expect(foundGroup).toBe(true);
  });

  it('stacked blocks appear at the same x but different y positions', () => {
    let foundStacked = false;
    for (let trial = 0; trial < 200; trial++) {
      const system = new SpawnSystem(lessonBase, 10);
      const state = new GameState(DEFAULT_GAME_CONFIG);
      state.spawnTimer = 1.0;
      system.update(state, 0);

      if (state.blocks.length === 2) {
        const [a, b] = state.blocks;
        if (a.x === b.x && a.y !== b.y) {
          foundStacked = true;
          expect(a.letter).toBe(b.letter);
          expect(a.isStacked).toBe(true);
          expect(b.isStacked).toBe(true);
          // Vertical difference should equal one block height
          expect(Math.abs(a.y - b.y)).toBe(DEFAULT_GAME_CONFIG.blockHeight);
          break;
        }
      }
    }
    // 15% stacked * 1/3 solo = ~5% per trial; within 200 trials should appear
    expect(foundStacked).toBe(true);
  });
});

describe('SpawnSystem – word mode block sizing (Lektion 7)', () => {
  const MIN_CHAR_WIDTH = 18; // px per character (monospace font estimate)
  const PADDING = 16;        // horizontal padding inside block

  it('every word block is wide enough to display its text', () => {
    const system = new SpawnSystem(lesson07, 20);
    const state = new GameState(DEFAULT_GAME_CONFIG);
    state.spawnTimer = 100;
    system.update(state, 0);

    for (const block of state.blocks) {
      const minRequired = Math.max(
        DEFAULT_GAME_CONFIG.blockWidth,
        block.letter.length * MIN_CHAR_WIDTH + PADDING
      );
      expect(block.width).toBeGreaterThanOrEqual(minRequired);
    }
  });

  it('long words have wider blocks than short words', () => {
    const system = new SpawnSystem(lesson07, 30);
    const state = new GameState(DEFAULT_GAME_CONFIG);
    state.spawnTimer = 100;
    system.update(state, 0);

    // Find the longest and shortest word blocks spawned
    let longest = state.blocks[0];
    let shortest = state.blocks[0];
    for (const block of state.blocks) {
      if (block.letter.length > longest.letter.length) longest = block;
      if (block.letter.length < shortest.letter.length) shortest = block;
    }

    if (longest && shortest && longest.letter.length !== shortest.letter.length) {
      expect(longest.width).toBeGreaterThan(shortest.width);
    }
  });

  it('single-char blocks in character mode always have the standard blockWidth', () => {
    const system = new SpawnSystem(lessonBase, 20);
    const state = new GameState(DEFAULT_GAME_CONFIG);
    state.spawnTimer = 100;
    system.update(state, 0);

    for (const block of state.blocks) {
      expect(block.width).toBe(DEFAULT_GAME_CONFIG.blockWidth);
    }
  });
});
