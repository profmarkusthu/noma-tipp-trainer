import { LessonConfig } from '../../types/lesson.types';
import { lesson01 } from './lesson-01';
import { lesson02 } from './lesson-02';
import { lesson03 } from './lesson-03';
import { lesson04 } from './lesson-04';
import { lesson05 } from './lesson-05';
import { lesson06 } from './lesson-06';
import { lesson07 } from './lesson-07';
import { lesson08 } from './lesson-08';
import { lesson09 } from './lesson-09';
import { lesson10 } from './lesson-10';
import { lesson11 } from './lesson-11';
import { lesson12 } from './lesson-12';
import { lesson13 } from './lesson-13';
import { lesson14 } from './lesson-14';
import { lesson15 } from './lesson-15';
import { lesson16 } from './lesson-16';
import { lesson17 } from './lesson-17';
import { lesson18 } from './lesson-18';
import { lesson19 } from './lesson-19';
import { lesson20 } from './lesson-20';
import { lesson21 } from './lesson-21';
import { lesson22 } from './lesson-22';
import { lesson23 } from './lesson-23';
import { lesson24 } from './lesson-24';
import { lesson25 } from './lesson-25';
import { lesson26 } from './lesson-26';
import { lesson27 } from './lesson-27';
import { lesson28 } from './lesson-28';
import { lesson29 } from './lesson-29';
import { lesson30 } from './lesson-30';
import { lesson31 } from './lesson-31';
import { lesson32 } from './lesson-32';
import { lesson33 } from './lesson-33';
import { lesson34 } from './lesson-34';
import { lesson35 } from './lesson-35';
import { lesson36 } from './lesson-36';
import { lesson37 } from './lesson-37';
import { lesson38 } from './lesson-38';
import { lesson39 } from './lesson-39';
import { lesson40 } from './lesson-40';

export const LESSONS: LessonConfig[] = [
  lesson01, lesson02, lesson03, lesson04, lesson05,
  lesson06, lesson07, lesson08, lesson09, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20,
  lesson21, lesson22, lesson23, lesson24, lesson25,
  lesson26, lesson27, lesson28, lesson29, lesson30,
  lesson31, lesson32, lesson33, lesson34, lesson35,
  lesson36, lesson37, lesson38, lesson39, lesson40,
];

export function getLessonById(id: string): LessonConfig | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonIndex(id: string): number {
  return LESSONS.findIndex((l) => l.id === id);
}

export {
  lesson01, lesson02, lesson03, lesson04, lesson05,
  lesson06, lesson07, lesson08, lesson09, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20,
  lesson21, lesson22, lesson23, lesson24, lesson25,
  lesson26, lesson27, lesson28, lesson29, lesson30,
  lesson31, lesson32, lesson33, lesson34, lesson35,
  lesson36, lesson37, lesson38, lesson39, lesson40,
};
