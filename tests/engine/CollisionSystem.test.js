import { describe, it, expect } from 'vitest';
import { CollisionSystem } from '../../src/engine/systems/CollisionSystem';
describe('CollisionSystem', () => {
    describe('checkAABB', () => {
        it('should detect collision between overlapping rectangles', () => {
            const a = {
                id: 'a',
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            const b = {
                id: 'b',
                x: 120,
                y: 120,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            expect(CollisionSystem.checkAABB(a, b)).toBe(true);
        });
        it('should not detect collision between non-overlapping rectangles', () => {
            const a = {
                id: 'a',
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            const b = {
                id: 'b',
                x: 200,
                y: 200,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            expect(CollisionSystem.checkAABB(a, b)).toBe(false);
        });
        it('should detect collision when touching edges', () => {
            const a = {
                id: 'a',
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            const b = {
                id: 'b',
                x: 149,
                y: 100,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            expect(CollisionSystem.checkAABB(a, b)).toBe(true);
        });
        it('should be symmetric', () => {
            const a = {
                id: 'a',
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            const b = {
                id: 'b',
                x: 120,
                y: 120,
                width: 50,
                height: 50,
                velocity: { x: 0, y: 0 },
            };
            expect(CollisionSystem.checkAABB(a, b)).toBe(CollisionSystem.checkAABB(b, a));
        });
    });
    describe('distance', () => {
        it('should calculate distance between two points', () => {
            const distance = CollisionSystem.distance(0, 0, 3, 4);
            expect(distance).toBe(5); // 3-4-5 triangle
        });
        it('should return 0 for same point', () => {
            const distance = CollisionSystem.distance(10, 20, 10, 20);
            expect(distance).toBe(0);
        });
        it('should handle negative coordinates', () => {
            const distance = CollisionSystem.distance(-3, -4, 0, 0);
            expect(distance).toBe(5);
        });
        it('should calculate correct diagonal distance', () => {
            const distance = CollisionSystem.distance(0, 0, 1, 1);
            expect(distance).toBeCloseTo(Math.sqrt(2), 5);
        });
    });
    describe('checkCircleCollision', () => {
        it('should detect collision between overlapping circles', () => {
            const result = CollisionSystem.checkCircleCollision(0, 0, 10, 15, 0, 10);
            expect(result).toBe(true); // Distance = 15, r1 + r2 = 20
        });
        it('should not detect collision between separated circles', () => {
            const result = CollisionSystem.checkCircleCollision(0, 0, 5, 50, 0, 5);
            expect(result).toBe(false); // Distance = 50, r1 + r2 = 10
        });
        it('should detect collision at touching edge', () => {
            const result = CollisionSystem.checkCircleCollision(0, 0, 10, 19.9, 0, 10);
            expect(result).toBe(true); // Distance = 19.9, r1 + r2 = 20
        });
        it('should detect collision when circles overlap exactly', () => {
            const result = CollisionSystem.checkCircleCollision(10, 10, 5, 10, 10, 5);
            expect(result).toBe(true);
        });
        it('should be symmetric', () => {
            const result1 = CollisionSystem.checkCircleCollision(0, 0, 10, 15, 0, 10);
            const result2 = CollisionSystem.checkCircleCollision(15, 0, 10, 0, 0, 10);
            expect(result1).toBe(result2);
        });
    });
});
