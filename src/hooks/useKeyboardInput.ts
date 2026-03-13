import { useEffect, useCallback } from 'react';

interface KeyboardInputOptions {
  onKeyPress: (key: string) => void;
  isActive: boolean;
}

export function useKeyboardInput({ onKeyPress, isActive }: KeyboardInputOptions): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      // Allow alphanumeric, punctuation, and space
      if (event.key.length === 1) {
        onKeyPress(event.key);
      } else if (event.key === ' ') {
        // Space key support
        onKeyPress(' ');
      }
    },
    [onKeyPress, isActive]
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive, handleKeyDown]);
}
