import { LessonConfig } from '../../types/lesson.types';
import { lesson01 } from './lesson-01';
import { lesson02 } from './lesson-02';
import { lesson03 } from './lesson-03';
import { lesson04 } from './lesson-04';
import { lesson05 } from './lesson-05';
import { lesson06 } from './lesson-06';
import { lesson07 } from './lesson-07';

export const LESSONS: LessonConfig[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07];

export function getLessonById(id: string): LessonConfig | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonIndex(id: string): number {
  return LESSONS.findIndex((l) => l.id === id);
}

export { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07 };
