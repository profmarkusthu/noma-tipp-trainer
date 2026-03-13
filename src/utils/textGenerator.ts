import { LessonConfig } from '../types/lesson.types';

export function generateSequence(lesson: LessonConfig, length: number = 30): string[] {
  if (lesson.wordMode && lesson.words) {
    return generateWordSequence(lesson.words, length);
  }
  return generateCharacterSequence(lesson.characters, length);
}

export function generateCharacterSequence(characters: string[], length: number): string[] {
  const result: string[] = [];
  let lastChar = '';

  for (let i = 0; i < length; i++) {
    const available = characters.filter((c) => c !== lastChar);
    const char = available[Math.floor(Math.random() * available.length)];
    result.push(char);
    lastChar = char;
  }

  return result;
}

export function generateWordSequence(words: string[], length: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < length; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result;
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
