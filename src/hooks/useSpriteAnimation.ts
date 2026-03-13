import { useEffect, useRef } from 'react';
import { SpriteConfig } from '../types/theme.types';

export interface DrawSpriteParams {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  sprite: SpriteConfig;
  frameIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function drawSprite(params: DrawSpriteParams): void {
  const { ctx, image, sprite, frameIndex, x, y, width, height } = params;

  const frame = frameIndex % sprite.frameCount;
  const sx = frame * sprite.frameWidth;
  const sy = 0;

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
}

export function useSpriteAnimation(
  spriteConfig: SpriteConfig
): { frameIndex: number; image: HTMLImageElement | null } {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameIndexRef = useRef(0);
  const frameTimeRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const image = new Image();
    image.src = spriteConfig.src;
    image.onload = () => {
      imageRef.current = image;
    };
  }, [spriteConfig.src]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const frameDuration = 1 / spriteConfig.fps;
      frameTimeRef.current += deltaTime;

      if (frameTimeRef.current >= frameDuration) {
        frameTimeRef.current -= frameDuration;
        frameIndexRef.current = (frameIndexRef.current + 1) % spriteConfig.frameCount;
      }
    }, 16);

    return () => clearInterval(interval);
  }, [spriteConfig.fps, spriteConfig.frameCount]);

  return {
    frameIndex: frameIndexRef.current,
    image: imageRef.current,
  };
}
