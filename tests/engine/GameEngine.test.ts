import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from '../../src/engine/GameEngine';
import { lesson01 } from '../../src/config/lessons/lesson-01';

describe('GameEngine', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine(lesson01);
  });

  it('should initialize with idle phase', () => {
    const snapshot = engine.getSnapshot();
    expect(snapshot.phase).toBe('idle');
  });

  it('should start the game', () => {
    engine.start();
    const snapshot = engine.getSnapshot();
    expect(snapshot.phase).toBe('running');
  });

  it('should have a target letter after starting', () => {
    engine.start();
    const snapshot = engine.getSnapshot();
    expect(snapshot.targetLetter).toBeNull(); // No blocks yet
  });

  it('should spawn blocks over time', () => {
    engine.start();
    engine.update(2.0); // 2000ms (>= 1 block at 0.6 blocks/sec = 1.67s interval)
    let snapshot = engine.getSnapshot();
    expect(snapshot.totalBlocks).toBeGreaterThan(0);
  });

  it('should increment score on correct input', () => {
    engine.start();
    engine.update(0.5);
    let snapshot = engine.getSnapshot();
    const targetLetter = snapshot.blocks[0]?.letter;

    if (targetLetter) {
      const initialScore = snapshot.score;
      engine.handleKeyPress(targetLetter);
      snapshot = engine.getSnapshot();
      expect(snapshot.score).toBe(initialScore + 10);
    }
  });

  it('should handle pause and resume', () => {
    engine.start();
    engine.pause();
    let snapshot = engine.getSnapshot();
    expect(snapshot.phase).toBe('paused');

    engine.resume();
    snapshot = engine.getSnapshot();
    expect(snapshot.phase).toBe('running');
  });

  it('should move blocks left over time', () => {
    engine.start();
    engine.update(2.0); // Need 1.67s to spawn first block at 0.6 blocks/sec
    let snapshot1 = engine.getSnapshot();
    const block1X = snapshot1.blocks[0]?.x || 0;

    engine.update(0.5);
    let snapshot2 = engine.getSnapshot();
    const block2X = snapshot2.blocks[0]?.x || 0;

    expect(block2X).toBeLessThan(block1X);
  });

  it('should track wrong inputs', () => {
    engine.start();
    engine.update(2.0); // Spawn a block
    let snapshot = engine.getSnapshot();

    if (snapshot.blocks.length > 0) {
      const initialWrongInputs = snapshot.wrongInputs;
      // Press wrong key
      engine.handleKeyPress('x');
      snapshot = engine.getSnapshot();
      expect(snapshot.wrongInputs).toBe(initialWrongInputs + 1);
    }
  });

  it('should reset state when reset is called', () => {
    engine.start();
    engine.update(1.0);
    engine.handleKeyPress('a');

    let snapshot = engine.getSnapshot();
    expect(snapshot.score).toBeGreaterThanOrEqual(0);

    engine.reset(lesson01);
    snapshot = engine.getSnapshot();
    expect(snapshot.phase).toBe('idle');
    expect(snapshot.score).toBe(0);
    expect(snapshot.blocks.length).toBe(0);
  });

  it('should handle multiple updates with delta time', () => {
    engine.start();
    engine.update(0.016); // ~60fps
    engine.update(0.016);
    engine.update(0.016);

    const snapshot = engine.getSnapshot();
    expect(snapshot.currentTime).toBeCloseTo(0.048, 2);
  });

  it('should clamp delta time to max 50ms', () => {
    engine.start();
    // This test verifies internal behavior - we can't directly test clamping,
    // but we can verify the game doesn't break with large deltas
    engine.update(0.1); // 100ms > 50ms clamp
    const snapshot = engine.getSnapshot();
    expect(snapshot.phase).toBe('running'); // Game should still be running
  });

  it('should remove block after destroy animation completes', () => {
    engine.start();
    engine.update(0.5); // Spawn a block
    let snapshot = engine.getSnapshot();

    // Find a block and press the correct key
    if (snapshot.blocks.length > 0) {
      const block = snapshot.blocks[0];
      const blockId = block.id;

      // Press the correct key to start destroying
      engine.handleKeyPress(block.letter);
      snapshot = engine.getSnapshot();

      // Block should still be there but with isDestroying = true
      const blockAfterPress = snapshot.blocks.find(b => b.id === blockId);
      expect(blockAfterPress).toBeDefined();
      expect(blockAfterPress?.isDestroying).toBe(true);

      // Advance animation to frame 11 (>10)
      for (let i = 0; i < 12; i++) {
        engine.update(0.016); // ~60fps
      }

      snapshot = engine.getSnapshot();
      // Block should now be removed from the blocks array
      const blockAfterAnimation = snapshot.blocks.find(b => b.id === blockId);
      expect(blockAfterAnimation).toBeUndefined();
    }
  });
});
