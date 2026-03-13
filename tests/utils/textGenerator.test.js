import { describe, it, expect } from 'vitest';
import { generateSequence, generateCharacterSequence, generateWordSequence, } from '../../src/utils/textGenerator';
import { lesson01, lesson04 } from '../../src/config/lessons';
describe('textGenerator', () => {
    describe('generateCharacterSequence', () => {
        it('should generate sequence of requested length', () => {
            const sequence = generateCharacterSequence(['a', 'b', 'c'], 10);
            expect(sequence).toHaveLength(10);
        });
        it('should only include allowed characters', () => {
            const chars = ['a', 'b', 'c'];
            const sequence = generateCharacterSequence(chars, 20);
            expect(sequence.every((c) => chars.includes(c))).toBe(true);
        });
        it('should not repeat consecutive characters', () => {
            const chars = ['a', 'b', 'c'];
            const sequence = generateCharacterSequence(chars, 100);
            for (let i = 1; i < sequence.length; i++) {
                expect(sequence[i]).not.toBe(sequence[i - 1]);
            }
        });
        it('should generate different sequences on multiple calls', () => {
            const seq1 = generateCharacterSequence(['a', 'b', 'c', 'd', 'e'], 20);
            const seq2 = generateCharacterSequence(['a', 'b', 'c', 'd', 'e'], 20);
            // With more characters and longer sequences, it's extremely likely they differ
            // (though theoretically they could be the same, so this is probabilistic)
            expect(seq1.join('')).not.toBe(seq2.join(''));
        });
    });
    describe('generateWordSequence', () => {
        it('should generate sequence of requested length', () => {
            const words = ['das', 'die', 'der'];
            const sequence = generateWordSequence(words, 10);
            expect(sequence).toHaveLength(10);
        });
        it('should only include words from list', () => {
            const words = ['das', 'die', 'der'];
            const sequence = generateWordSequence(words, 20);
            expect(sequence.every((w) => words.includes(w))).toBe(true);
        });
        it('can repeat words', () => {
            const words = ['das'];
            const sequence = generateWordSequence(words, 5);
            expect(sequence).toEqual(['das', 'das', 'das', 'das', 'das']);
        });
    });
    describe('generateSequence', () => {
        it('should generate characters for character mode lesson', () => {
            const sequence = generateSequence(lesson01, 20);
            expect(sequence).toHaveLength(20);
            expect(sequence.every((c) => lesson01.characters.includes(c))).toBe(true);
        });
        it('should generate words for word mode lesson', () => {
            const sequence = generateSequence(lesson04, 10);
            expect(sequence).toHaveLength(10);
            if (lesson04.wordMode && lesson04.words) {
                expect(sequence.every((w) => lesson04.words.includes(w))).toBe(true);
            }
        });
        it('should delegate to correct generator based on lesson mode', () => {
            // Lesson 01 is character mode
            const charSeq = generateSequence(lesson01, 15);
            expect(charSeq.length).toBe(15);
            // Lesson 04 is word mode
            const wordSeq = generateSequence(lesson04, 10);
            expect(wordSeq.length).toBe(10);
        });
        it('should use lesson default length if not specified', () => {
            const sequence = generateSequence(lesson01);
            expect(sequence.length).toBe(30); // Default in function
        });
    });
});
