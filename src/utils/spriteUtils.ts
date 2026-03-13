import { SpriteConfig } from '../types/theme.types';

export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export function preloadSpriteSheet(sprite: SpriteConfig): Promise<HTMLImageElement> {
  return preloadImage(sprite.src);
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sprite: SpriteConfig,
  frameIndex: number,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const frame = frameIndex % sprite.frameCount;
  const sx = frame * sprite.frameWidth;
  const sy = 0;

  try {
    ctx.drawImage(
      image,
      sx,
      sy,
      sprite.frameWidth,
      sprite.frameHeight,
      x,
      y,
      width,
      height
    );
  } catch (e) {
    // Image not yet loaded
  }
}

export function calculateAnimationFrame(
  fps: number,
  totalFrames: number,
  elapsed: number
): number {
  const frameDuration = 1 / fps;
  const frame = Math.floor((elapsed % (totalFrames * frameDuration)) / frameDuration);
  return frame % totalFrames;
}
