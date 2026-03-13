export class DifficultySystem {
    constructor(lesson) {
        Object.defineProperty(this, "minSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "speedIncrement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "currentSpeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "correctInputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.minSpeed = lesson.minSpeed;
        this.maxSpeed = lesson.maxSpeed;
        this.speedIncrement = lesson.speedIncrement;
        this.currentSpeed = lesson.minSpeed;
    }
    recordCorrectInput() {
        this.correctInputs++;
        const newSpeed = this.minSpeed + this.correctInputs * this.speedIncrement;
        this.currentSpeed = Math.min(newSpeed, this.maxSpeed);
    }
    recordWrongInput() {
        // Optional: decrease speed slightly on wrong input
        // this.currentSpeed = Math.max(this.currentSpeed - 5, this.minSpeed);
    }
    reset() {
        this.correctInputs = 0;
        this.currentSpeed = this.minSpeed;
    }
}
