import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../../engine/GameEngine';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useKeyboardInput } from '../../hooks/useKeyboardInput';
import { useGameStore } from '../../store/useGameStore';
import { LessonConfig } from '../../types/lesson.types';
import { DEFAULT_GAME_CONFIG } from '../../config/game-settings';
import { useTheme } from '../../themes/ThemeProvider';
import { GameResult } from '../../types/game.types';
import './GameCanvas.css';

interface GameCanvasProps {
  lesson: LessonConfig;
  isRunning: boolean;
  onGameOver: (result: GameResult) => void;
  onLevelComplete: (result: GameResult) => void;
}

export function GameCanvas({
  lesson,
  isRunning,
  onGameOver,
  onLevelComplete,
}: GameCanvasProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const { theme } = useTheme();
  const updateFromSnapshot = useGameStore((s) => s.updateFromSnapshot);
  const setLastPressedKey = useGameStore((s) => s.setLastPressedKey);

  // Initialize game engine
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new GameEngine(lesson, DEFAULT_GAME_CONFIG);
      engineRef.current.start();
    }
  }, [lesson]);

  // Game loop
  useGameLoop((deltaTime) => {
    if (!engineRef.current) return;

    engineRef.current.update(deltaTime);
    const snapshot = engineRef.current.getSnapshot();

    updateFromSnapshot(snapshot);

    // Check game status
    if (snapshot.phase === 'game-over') {
      const result: GameResult = {
        lessonId: lesson.id,
        score: snapshot.score,
        wrongInputs: snapshot.wrongInputs,
        elapsedSeconds: snapshot.currentTime,
        blocksCleared: snapshot.blocksCleared,
        totalBlocks: snapshot.totalBlocks,
        isGameOver: true,
      };
      onGameOver(result);
    } else if (snapshot.phase === 'level-complete') {
      const result: GameResult = {
        lessonId: lesson.id,
        score: snapshot.score,
        wrongInputs: snapshot.wrongInputs,
        elapsedSeconds: snapshot.currentTime,
        blocksCleared: snapshot.blocksCleared,
        totalBlocks: snapshot.totalBlocks,
        isGameOver: false,
      };
      onLevelComplete(result);
    }

    // Render
    renderGame(canvasRef.current, snapshot, theme);
  }, isRunning);

  // Keyboard input
  useKeyboardInput({
    onKeyPress: (key) => {
      if (engineRef.current) {
        const isCorrect = engineRef.current.handleKeyPress(key);
        setLastPressedKey(key);
        // Clear the last pressed key after 200ms
        setTimeout(() => setLastPressedKey(null), 200);
      }
    },
    isActive: isRunning,
  });

  return (
    <div className="game-canvas-container">
      <canvas
        ref={canvasRef}
        width={DEFAULT_GAME_CONFIG.canvasWidth}
        height={DEFAULT_GAME_CONFIG.canvasHeight}
        className="game-canvas"
      />
    </div>
  );
}

function renderGame(
  canvas: HTMLCanvasElement | null,
  snapshot: any,
  theme: any
): void {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const config = DEFAULT_GAME_CONFIG;

  // Clear background
  ctx.fillStyle = theme.assets.colors.background;
  ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

  // Draw platform
  ctx.fillStyle = theme.assets.colors.platformColor;
  ctx.fillRect(
    0,
    config.canvasHeight - config.platformHeight,
    config.canvasWidth,
    config.platformHeight
  );

  // Draw blocks
  for (const block of snapshot.blocks) {
    if (block.isDestroying) {
      // Block destruction animation: grow and fade
      const progress = block.destroyAnimationFrame / 10;
      const scale = 1 + progress * 0.5; // Grows from 1 to 1.5x
      const alpha = Math.max(0, 1 - progress); // Fades from 1 to 0

      ctx.globalAlpha = alpha;

      // Draw scaled block
      const centerX = block.x + block.width / 2;
      const centerY = block.y + block.height / 2;
      const scaledWidth = block.width * scale;
      const scaledHeight = block.height * scale;

      ctx.fillStyle = theme.assets.colors.blockColor;
      ctx.fillRect(
        centerX - scaledWidth / 2,
        centerY - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );

      // Border
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        centerX - scaledWidth / 2,
        centerY - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );
    } else {
      ctx.globalAlpha = 1;
      ctx.fillStyle = theme.assets.colors.blockColor;
      ctx.fillRect(block.x, block.y, block.width, block.height);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(block.x, block.y, block.width, block.height);
    }

    // Draw letter (only if not destroying)
    if (!block.isDestroying) {
      ctx.fillStyle = '#000';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Display lowercase (case-sensitive for 10-finger training)
      ctx.fillText(
        block.letter,
        block.x + block.width / 2,
        block.y + block.height / 2
      );
    }
    ctx.globalAlpha = 1;
  }

  // Draw player (Roboter-Kopf)
  const px = snapshot.player.x;
  const py = snapshot.player.y;
  const pw = snapshot.player.width;
  const ph = snapshot.player.height;
  const cx = px + pw / 2;
  const cy = py + ph / 2;

  // Robot body - blue square
  ctx.fillStyle = '#1E90FF';
  ctx.fillRect(px, py, pw, ph);

  // Robot head outline - darker blue
  ctx.strokeStyle = '#004D99';
  ctx.lineWidth = 2;
  ctx.strokeRect(px + 2, py + 2, pw - 4, ph - 4);

  // Left eye - white
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx - 8, cy - 5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Right eye - white
  ctx.beginPath();
  ctx.arc(cx + 8, cy - 5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Antenna (vertical line on top)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, py);
  ctx.lineTo(cx, py - 5);
  ctx.stroke();

  // Antenna tip (small circle)
  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.arc(cx, py - 7, 2, 0, Math.PI * 2);
  ctx.fill();

  // Mouth - horizontal line
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 6, cy + 5);
  ctx.lineTo(cx + 6, cy + 5);
  ctx.stroke();

  // Ball removed from gameplay

  // Draw HUD
  ctx.fillStyle = theme.assets.colors.hudBackground;
  ctx.fillRect(0, 0, config.canvasWidth, 40);

  ctx.fillStyle = theme.assets.colors.hudText;
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Score: ${snapshot.score}`, 10, 20);
  ctx.fillText(
    `Blocks: ${snapshot.blocksCleared}/${snapshot.totalBlocks}`,
    200,
    20
  );
  ctx.fillText(
    `Lives: ${snapshot.player.lives}`,
    500,
    20
  );
  ctx.fillText(
    `Wrong: ${snapshot.wrongInputs}`,
    700,
    20
  );

  if (snapshot.phase === 'game-over') {
    drawGameOverOverlay(ctx, config);
  } else if (snapshot.phase === 'level-complete') {
    drawLevelCompleteOverlay(ctx, config);
  }
}

function drawGameOverOverlay(ctx: CanvasRenderingContext2D, config: any): void {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAME OVER', config.canvasWidth / 2, config.canvasHeight / 2);
}

function drawLevelCompleteOverlay(ctx: CanvasRenderingContext2D, config: any): void {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('LEVEL COMPLETE!', config.canvasWidth / 2, config.canvasHeight / 2);
}
