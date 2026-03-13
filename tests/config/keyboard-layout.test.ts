import { describe, it, expect } from 'vitest';
import { KEYBOARD_LAYOUT, getKeyDefinition } from '../../src/config/keyboard-layout';

describe('keyboard-layout – Leertaste', () => {
  it('KEYBOARD_LAYOUT should contain a space key', () => {
    const allKeys = KEYBOARD_LAYOUT.flat();
    const spaceKey = allKeys.find((k) => k.key === ' ');
    expect(spaceKey).toBeDefined();
  });

  it('getKeyDefinition should return an entry for space character', () => {
    const def = getKeyDefinition(' ');
    expect(def).toBeDefined();
  });

  it('space key label should be "Leertaste"', () => {
    const def = getKeyDefinition(' ');
    expect(def?.label).toBe('Leertaste');
  });

  it('space key should be assigned to a thumb finger', () => {
    const def = getKeyDefinition(' ');
    expect(def?.finger).toMatch(/thumb/);
  });
});
