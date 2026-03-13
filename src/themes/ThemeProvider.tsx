import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Theme } from '../types/theme.types';
import { ThemeRegistry } from './ThemeRegistry';
import { defaultTheme } from './defaultTheme';
import { useProgressStore } from '../store/useProgressStore';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (id: string) => Promise<void>;
  availableThemes: string[];
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const activeThemeId = useProgressStore((s) => s.activeThemeId);
  const setProgressTheme = useProgressStore((s) => s.setTheme);
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(false);

  const setTheme = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const loaded = await ThemeRegistry.load(id);
        setThemeState(loaded);
        setProgressTheme(id);
      } finally {
        setIsLoading(false);
      }
    },
    [setProgressTheme]
  );

  useEffect(() => {
    if (activeThemeId !== 'default') {
      setTheme(activeThemeId);
    }
  }, [activeThemeId, setTheme]);

  const availableThemes = ThemeRegistry.getAvailable();

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
