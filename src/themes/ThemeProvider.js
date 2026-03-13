import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeRegistry } from './ThemeRegistry';
import { defaultTheme } from './defaultTheme';
import { useProgressStore } from '../store/useProgressStore';
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
    const activeThemeId = useProgressStore((s) => s.activeThemeId);
    const setProgressTheme = useProgressStore((s) => s.setTheme);
    const [theme, setThemeState] = useState(defaultTheme);
    const [isLoading, setIsLoading] = useState(false);
    const setTheme = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const loaded = await ThemeRegistry.load(id);
            setThemeState(loaded);
            setProgressTheme(id);
        }
        finally {
            setIsLoading(false);
        }
    }, [setProgressTheme]);
    useEffect(() => {
        if (activeThemeId !== 'default') {
            setTheme(activeThemeId);
        }
    }, [activeThemeId, setTheme]);
    const availableThemes = ThemeRegistry.getAvailable();
    return (_jsx(ThemeContext.Provider, { value: { theme, setTheme, availableThemes, isLoading }, children: children }));
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return ctx;
}
