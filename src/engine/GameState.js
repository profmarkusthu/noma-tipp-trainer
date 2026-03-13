import { DEFAULT_GAME_CONFIG } from '../config/game-settings';
export class GameState {
    constructor(config = DEFAULT_GAME_CONFIG) {
        Object.defineProperty(this, "phase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'idle'
        });
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "blocks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "ball", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "score", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "targetLetter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "currentTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "blocksCleared", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "totalBlocks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "wrongInputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        }); // Track wrong key presses
        Object.defineProperty(this, "currentWordProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        }); // For word mode: typed letters so far
        Object.defineProperty(this, "spawnTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "nextBlockId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = config;
        this.player = {
            id: 'player',
            x: config.playerStartX,
            y: config.canvasHeight - config.platformHeight - config.playerHeight,
            width: config.playerWidth,
            height: config.playerHeight,
            velocity: { x: 0, y: 0 },
            animationState: 'idle',
            currentFrame: 0,
            lives: 3, // Start with 3 lives
        };
        this.ball = {
            id: 'ball',
            x: config.ballStartX,
            y: config.canvasHeight - config.platformHeight - config.ballSize,
            width: config.ballSize,
            height: config.ballSize,
            velocity: { x: 0, y: 0 },
            speed: 150, // px/s, will be overridden by lesson config
            catchDistance: 400,
        };
    }
    snapshot() {
        return {
            phase: this.phase,
            player: { ...this.player },
            blocks: this.blocks.map((b) => ({ ...b })),
            ball: { ...this.ball },
            score: this.score,
            targetLetter: this.targetLetter,
            currentTime: this.currentTime,
            blocksCleared: this.blocksCleared,
            totalBlocks: this.totalBlocks,
            wrongInputs: this.wrongInputs,
            currentWordProgress: this.currentWordProgress,
        };
    }
    reset(config = DEFAULT_GAME_CONFIG) {
        this.config = config;
        this.phase = 'idle';
        this.blocks = [];
        this.score = 0;
        this.targetLetter = null;
        this.currentTime = 0;
        this.blocksCleared = 0;
        this.totalBlocks = 0;
        this.wrongInputs = 0;
        this.currentWordProgress = '';
        this.spawnTimer = 0;
        this.nextBlockId = 0;
        this.player.x = config.playerStartX;
        this.player.y = config.canvasHeight - config.platformHeight - config.playerHeight;
        this.player.animationState = 'idle';
        this.player.currentFrame = 0;
        this.player.lives = 1;
        this.ball.x = config.ballStartX;
        this.ball.y = config.canvasHeight - config.platformHeight - config.ballSize;
    }
}
