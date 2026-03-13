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
      const progress = block.destroyAnimationFrame / 10;
      const scale = 1 + progress * 0.5;
      const alpha = Math.max(0, 1 - progress);
      ctx.globalAlpha = alpha;
      const centerX = block.x + block.width / 2;
      const centerY = block.y + block.height / 2;
      const scaledWidth = block.width * scale;
      const scaledHeight = block.height * scale;
      ctx.fillStyle = block.isBonus ? '#FFD700' : theme.assets.colors.blockColor;
      ctx.fillRect(centerX - scaledWidth / 2, centerY - scaledHeight / 2, scaledWidth, scaledHeight);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - scaledWidth / 2, centerY - scaledHeight / 2, scaledWidth, scaledHeight);
    } else {
      ctx.globalAlpha = 1;

      // Block fill color
      let fillColor = theme.assets.colors.blockColor;
      if (block.letter === ' ') fillColor = '#88DDFF';
      else if (block.isBonus) fillColor = '#FFD700';      // gold
      else if (block.isStacked) fillColor = '#FF6B35';    // orange-red

      ctx.fillStyle = fillColor;
      ctx.fillRect(block.x, block.y, block.width, block.height);

      // Border: stacked blocks get a thicker highlight border
      ctx.strokeStyle = block.isStacked ? '#CC2200' : '#333';
      ctx.lineWidth = block.isStacked ? 3 : 2;
      ctx.strokeRect(block.x, block.y, block.width, block.height);

      // Stacked badge "×2" in top-right corner
      if (block.isStacked) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('×2', block.x + block.width - 3, block.y + 2);
      }

      // Flames above bonus blocks
      if (block.isBonus) {
        drawFlame(ctx, block.x, block.y, block.width, snapshot.currentTime);
      }
    }

    // Letter label
    if (!block.isDestroying) {
      ctx.fillStyle = block.isBonus ? '#333' : '#000';
      const fontSize = block.letter.length <= 1 ? 22 : block.letter.length <= 4 ? 18 : 14;
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const displayChar = block.letter === ' ' ? '⎵' : block.letter;
      ctx.fillText(displayChar, block.x + block.width / 2, block.y + block.height / 2);
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

function drawFlame(
  ctx: CanvasRenderingContext2D,
  bx: number,
  by: number,
  bw: number,
  time: number
): void {
  const cx = bx + bw / 2;
  const t = time * 4; // animation speed

  // Three flame layers from outer (red-orange) to inner (yellow)
  const layers = [
    { color: 'rgba(220,40,0,0.85)',  widthFactor: 0.45, heightFactor: 1.0, phase: 0 },
    { color: 'rgba(255,130,0,0.90)', widthFactor: 0.32, heightFactor: 0.75, phase: 1.1 },
    { color: 'rgba(255,230,0,0.95)', widthFactor: 0.18, heightFactor: 0.50, phase: 2.3 },
  ];

  ctx.save();
  for (const layer of layers) {
    const hw = bw * layer.widthFactor;
    const h  = 18 * layer.heightFactor;
    const sway = Math.sin(t + layer.phase) * 3;

    ctx.fillStyle = layer.color;
    ctx.beginPath();
    ctx.moveTo(cx - hw + sway, by);
    ctx.quadraticCurveTo(cx - hw * 0.4 + sway, by - h * 0.5, cx + sway * 0.3, by - h);
    ctx.quadraticCurveTo(cx + hw * 0.4 + sway, by - h * 0.5, cx + hw + sway, by);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}
