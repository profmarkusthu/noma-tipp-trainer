import { Theme } from '../types/theme.types';
import { defaultTheme } from './defaultTheme';

class ThemeRegistryImpl {
  private registry: Map<string, () => Promise<Theme>> = new Map();
  private cache: Map<string, Theme> = new Map();

  constructor() {
    // Register default theme
    this.register('default', () => Promise.resolve(defaultTheme));
  }

  register(id: string, loader: () => Promise<Theme>): void {
    this.registry.set(id, loader);
  }

  async load(id: string): Promise<Theme> {
    // Return cached theme if available
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    const loader = this.registry.get(id);
    if (!loader) {
      throw new Error(`Theme "${id}" not found`);
    }

    const theme = await loader();
    this.cache.set(id, theme);
    return theme;
  }

  getAvailable(): string[] {
    return Array.from(this.registry.keys());
  }

  clear(): void {
    this.cache.clear();
  }
}

export const ThemeRegistry = new ThemeRegistryImpl();
