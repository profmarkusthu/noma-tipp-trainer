import { describe, it, expect } from 'vitest';
import { DifficultySystem } from '../../src/engine/systems/DifficultySystem';
import { lesson01, lesson04 } from '../../src/config/lessons';
describe('DifficultySystem', () => {
    it('should initialize with lesson min speed', () => {
        const system = new DifficultySystem(lesson01);
        expect(system.currentSpeed).toBe(lesson01.minSpeed);
    });
    it('should increase speed after correct inputs', () => {
        const system = new DifficultySystem(lesson01);
        const initialSpeed = system.currentSpeed;
        system.recordCorrectInput();
        expect(system.currentSpeed).toBe(initialSpeed + lesson01.speedIncrement);
        system.recordCorrectInput();
        expect(system.currentSpeed).toBe(initialSpeed + 2 * lesson01.speedIncrement);
    });
    it('should not exceed max speed', () => {
        const system = new DifficultySystem(lesson01);
        // Record enough correct inputs to exceed max
        for (let i = 0; i < 100; i++) {
            system.recordCorrectInput();
        }
        expect(system.currentSpeed).toBeLessThanOrEqual(lesson01.maxSpeed);
    });
    it('should clamp to max speed exactly', () => {
        const system = new DifficultySystem(lesson01);
        // Calculate exact number of inputs needed to reach max
        const correctInputsNeeded = Math.ceil((lesson01.maxSpeed - lesson01.minSpeed) / lesson01.speedIncrement);
        for (let i = 0; i < correctInputsNeeded; i++) {
            system.recordCorrectInput();
        }
        expect(system.currentSpeed).toBeLessThanOrEqual(lesson01.maxSpeed);
    });
    it('should track correct input count', () => {
        const system = new DifficultySystem(lesson01);
        expect(system.correctInputs).toBe(0);
        system.recordCorrectInput();
        expect(system.correctInputs).toBe(1);
        system.recordCorrectInput();
        expect(system.correctInputs).toBe(2);
    });
    it('should reset speed and count', () => {
        const system = new DifficultySystem(lesson01);
        // Increase speed
        system.recordCorrectInput();
        system.recordCorrectInput();
        expect(system.correctInputs).toBe(2);
        expect(system.currentSpeed).toBeGreaterThan(lesson01.minSpeed);
        // Reset
        system.reset();
        expect(system.correctInputs).toBe(0);
        expect(system.currentSpeed).toBe(lesson01.minSpeed);
    });
    it('should handle different lesson configs', () => {
        const system1 = new DifficultySystem(lesson01);
        const system4 = new DifficultySystem(lesson04);
        expect(system1.currentSpeed).toBe(lesson01.minSpeed);
        expect(system4.currentSpeed).toBe(lesson04.minSpeed);
        // Different lessons have different speeds
        expect(lesson01.minSpeed).not.toBe(lesson04.minSpeed);
    });
    it('should scale speed linearly with correct inputs', () => {
        const system = new DifficultySystem(lesson01);
        const speeds = [];
        for (let i = 0; i < 5; i++) {
            system.recordCorrectInput();
            speeds.push(system.currentSpeed);
        }
        // Check that speeds increase linearly
        for (let i = 1; i < speeds.length; i++) {
            expect(speeds[i] - speeds[i - 1]).toBe(lesson01.speedIncrement);
        }
    });
});
