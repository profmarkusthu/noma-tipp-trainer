import { LessonConfig } from '../../types/lesson.types';

export class DifficultySystem {
  private minSpeed: number;
  private maxSpeed: number;
  private speedIncrement: number;
  currentSpeed: number;
  correctInputs: number = 0;

  constructor(lesson: LessonConfig) {
    this.minSpeed = lesson.minSpeed;
    this.maxSpeed = lesson.maxSpeed;
    this.speedIncrement = lesson.speedIncrement;
    this.currentSpeed = lesson.minSpeed;
  }

  recordCorrectInput(): void {
    this.correctInputs++;
    const newSpeed = this.minSpeed + this.correctInputs * this.speedIncrement;
    this.currentSpeed = Math.min(newSpeed, this.maxSpeed);
  }

  recordWrongInput(): void {
    // Optional: decrease speed slightly on wrong input
    // this.currentSpeed = Math.max(this.currentSpeed - 5, this.minSpeed);
  }

  reset(): void {
    this.correctInputs = 0;
    this.currentSpeed = this.minSpeed;
  }
}
