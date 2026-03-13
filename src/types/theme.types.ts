export interface SpriteConfig {
  src: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  fps: number;
}

export interface BackgroundLayer {
  src: string;
  scrollSpeed: number;
  repeatX: boolean;
}

export interface ThemeColors {
  background: string;
  platformColor: string;
  hudBackground: string;
  hudText: string;
  blockColor: string;
  ballColor: string;
}

export interface ThemeAssets {
  sprites: {
    playerIdle: SpriteConfig;
    playerRun: SpriteConfig;
    playerDie: SpriteConfig;
    letterBlock: SpriteConfig;
    pursuitBall: SpriteConfig;
  };
  colors: ThemeColors;
  backgroundLayers?: BackgroundLayer[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  assets: ThemeAssets;
}
