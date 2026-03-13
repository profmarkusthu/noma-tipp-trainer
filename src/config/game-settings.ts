import { GameConfig } from '../types/game.types';

export const DEFAULT_GAME_CONFIG: GameConfig = {
  canvasWidth: 1024,
  canvasHeight: 320,
  platformHeight: 100,
  playerStartX: 100, 
  playerWidth: 32,
  playerHeight: 32,
  ballStartX: -50,
  ballSize: 24,
  blockWidth: 48,
  blockHeight: 48,
  spawnRate: 0.8, // blocks per second (weniger häufig = weiter auseinander)
  maxBlocksOnScreen: 12,
};
