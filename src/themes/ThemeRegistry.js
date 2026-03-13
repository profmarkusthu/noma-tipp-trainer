import { defaultTheme } from './defaultTheme';
class ThemeRegistryImpl {
    constructor() {
        Object.defineProperty(this, "registry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        // Register default theme
        this.register('default', () => Promise.resolve(defaultTheme));
    }
    register(id, loader) {
        this.registry.set(id, loader);
    }
    async load(id) {
        // Return cached theme if available
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }
        const loader = this.registry.get(id);
        if (!loader) {
            throw new Error(`Theme "${id}" not found`);
        }
        const theme = await loader();
        this.cache.set(id, theme);
        return theme;
    }
    getAvailable() {
        return Array.from(this.registry.keys());
    }
    clear() {
        this.cache.clear();
    }
}
export const ThemeRegistry = new ThemeRegistryImpl();
