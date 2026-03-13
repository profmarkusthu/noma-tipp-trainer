export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'left-thumb'
  | 'right-thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export interface KeyDefinition {
  key: string;
  label: string;
  finger: Finger;
  row: 0 | 1 | 2 | 3;
  offsetX?: number;
}

export type FingerColorMap = Record<Finger, string>;
