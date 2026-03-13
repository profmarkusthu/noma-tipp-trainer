export class SpawnSystem {
    constructor(lesson, sequenceLength = 30) {
        Object.defineProperty(this, "characterSequence", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "sequenceIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "spawnRate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.8
        }); // default: 0.8 blocks per second
        this.spawnRate = lesson.spawnRate || 0.8; // Use lesson config or default
        this.characterSequence = this.generateSequence(lesson, sequenceLength);
        this.sequenceIndex = 0;
    }
    update(state, deltaTime) {
        state.spawnTimer += deltaTime;
        const spawnInterval = 1 / this.spawnRate;
        while (state.spawnTimer >= spawnInterval &&
            state.blocks.length < state.config.maxBlocksOnScreen &&
            this.sequenceIndex < this.characterSequence.length) {
            state.spawnTimer -= spawnInterval;
            this.spawnBlock(state);
        }
    }
    spawnBlock(state) {
        const letter = this.characterSequence[this.sequenceIndex];
        this.sequenceIndex++;
        const block = {
            id: `block-${state.nextBlockId++}`,
            x: state.config.canvasWidth,
            y: state.config.canvasHeight - state.config.platformHeight - state.config.blockHeight,
            width: state.config.blockWidth,
            height: state.config.blockHeight,
            velocity: { x: -1, y: 0 }, // will be set per frame
            letter,
            isDestroying: false,
            destroyAnimationFrame: 0,
            createdAt: state.currentTime,
        };
        state.blocks.push(block);
        state.totalBlocks++;
    }
    generateSequence(lesson, length) {
        if (lesson.wordMode && lesson.words) {
            return this.shuffleWords(lesson.words, length);
        }
        return this.generateCharacterSequence(lesson, length);
    }
    generateCharacterSequence(lesson, length) {
        const result = [];
        let lastChar = '';
        for (let i = 0; i < length; i++) {
            const available = lesson.characters.filter((c) => c !== lastChar);
            const char = available[Math.floor(Math.random() * available.length)];
            result.push(char);
            lastChar = char;
        }
        return result;
    }
    shuffleWords(words, length) {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(words[Math.floor(Math.random() * words.length)]);
        }
        return result;
    }
    hasMoreBlocks() {
        return this.sequenceIndex < this.characterSequence.length;
    }
    reset(lesson, sequenceLength = 30) {
        this.characterSequence = this.generateSequence(lesson, sequenceLength);
        this.sequenceIndex = 0;
    }
}
