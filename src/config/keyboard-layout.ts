import { KeyDefinition, FingerColorMap } from '../types/keyboard.types';

export const FINGER_COLORS: FingerColorMap = {
  'left-pinky': '#FF6B6B',      // Rot
  'left-ring': '#FF9F43',       // Orange
  'left-middle': '#54A0FF',     // Blau
  'left-index': '#5F27CD',      // Lila
  'left-thumb': '#C8D6E5',      // Grau
  'right-thumb': '#C8D6E5',     // Grau
  'right-index': '#00D2D3',     // Türkis
  'right-middle': '#01CBC6',    // Blau-Grün
  'right-ring': '#10AC84',      // Grün
  'right-pinky': '#EE5A24',     // Dunkelorange
};

export const KEYBOARD_LAYOUT: KeyDefinition[][] = [
  // Reihe 1: 1234567890ß
  [
    { key: '1', label: '1', finger: 'left-pinky', row: 0 },
    { key: '2', label: '2', finger: 'left-ring', row: 0 },
    { key: '3', label: '3', finger: 'left-middle', row: 0 },
    { key: '4', label: '4', finger: 'left-index', row: 0 },
    { key: '5', label: '5', finger: 'left-index', row: 0 },
    { key: '6', label: '6', finger: 'right-index', row: 0 },
    { key: '7', label: '7', finger: 'right-index', row: 0 },
    { key: '8', label: '8', finger: 'right-middle', row: 0 },
    { key: '9', label: '9', finger: 'right-ring', row: 0 },
    { key: '0', label: '0', finger: 'right-pinky', row: 0 },
    { key: 'ß', label: 'ß', finger: 'right-pinky', row: 0 },
  ],
  // Reihe 2: QWERTZUIOPÜ
  [
    { key: 'q', label: 'Q', finger: 'left-pinky', row: 1 },
    { key: 'w', label: 'W', finger: 'left-ring', row: 1 },
    { key: 'e', label: 'E', finger: 'left-middle', row: 1 },
    { key: 'r', label: 'R', finger: 'left-index', row: 1 },
    { key: 't', label: 'T', finger: 'left-index', row: 1 },
    { key: 'z', label: 'Z', finger: 'right-index', row: 1 },
    { key: 'u', label: 'U', finger: 'right-index', row: 1 },
    { key: 'i', label: 'I', finger: 'right-middle', row: 1 },
    { key: 'o', label: 'O', finger: 'right-ring', row: 1 },
    { key: 'p', label: 'P', finger: 'right-pinky', row: 1 },
    { key: 'ü', label: 'Ü', finger: 'right-pinky', row: 1 },
  ],
  // Reihe 3: ASDFGHJKLÖ (Grundstellung)
  [
    { key: 'a', label: 'A', finger: 'left-pinky', row: 2 },
    { key: 's', label: 'S', finger: 'left-ring', row: 2 },
    { key: 'd', label: 'D', finger: 'left-middle', row: 2 },
    { key: 'f', label: 'F', finger: 'left-index', row: 2 },
    { key: 'g', label: 'G', finger: 'left-index', row: 2 },
    { key: 'h', label: 'H', finger: 'right-index', row: 2 },
    { key: 'j', label: 'J', finger: 'right-index', row: 2 },
    { key: 'k', label: 'K', finger: 'right-middle', row: 2 },
    { key: 'l', label: 'L', finger: 'right-ring', row: 2 },
    { key: 'ö', label: 'Ö', finger: 'right-pinky', row: 2 },
    { key: 'ä', label: 'Ä', finger: 'right-pinky', row: 2 },
  ],
  // Reihe 4: YXCVBNM
  [
    { key: 'y', label: 'Y', finger: 'left-pinky', row: 3 },
    { key: 'x', label: 'X', finger: 'left-ring', row: 3 },
    { key: 'c', label: 'C', finger: 'left-middle', row: 3 },
    { key: 'v', label: 'V', finger: 'left-index', row: 3 },
    { key: 'b', label: 'B', finger: 'left-index', row: 3 },
    { key: 'n', label: 'N', finger: 'right-index', row: 3 },
    { key: 'm', label: 'M', finger: 'right-index', row: 3 },
    { key: ',', label: ',', finger: 'right-middle', row: 3 },
    { key: '.', label: '.', finger: 'right-ring', row: 3 },
    { key: '-', label: '-', finger: 'right-pinky', row: 3 },
  ],
];

export function getKeyDefinition(key: string): KeyDefinition | undefined {
  const lower = key.toLowerCase();
  for (const row of KEYBOARD_LAYOUT) {
    const found = row.find((k) => k.key === lower);
    if (found) return found;
  }
  return undefined;
}
