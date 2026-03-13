export const defaultTheme = {
    id: 'default',
    name: 'Standard',
    description: 'Standard Game Theme',
    assets: {
        sprites: {
            playerIdle: {
                src: '/sprites/player-idle.png',
                frameWidth: 32,
                frameHeight: 32,
                frameCount: 1,
                fps: 1,
            },
            playerRun: {
                src: '/sprites/player-run.png',
                frameWidth: 32,
                frameHeight: 32,
                frameCount: 8,
                fps: 12,
            },
            playerDie: {
                src: '/sprites/player-die.png',
                frameWidth: 32,
                frameHeight: 32,
                frameCount: 6,
                fps: 8,
            },
            letterBlock: {
                src: '/sprites/block.png',
                frameWidth: 48,
                frameHeight: 48,
                frameCount: 1,
                fps: 1,
            },
            pursuitBall: {
                src: '/sprites/ball.png',
                frameWidth: 24,
                frameHeight: 24,
                frameCount: 1,
                fps: 1,
            },
        },
        colors: {
            background: '#87CEEB',
            platformColor: '#8B4513',
            hudBackground: 'rgba(0, 0, 0, 0.5)',
            hudText: '#FFFFFF',
            blockColor: '#FF6B6B',
            ballColor: '#FFD700',
        },
    },
};
