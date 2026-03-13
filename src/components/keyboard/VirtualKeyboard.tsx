import React from 'react';
import { KEYBOARD_LAYOUT, FINGER_COLORS } from '../../config/keyboard-layout';
import { KeyCap } from './KeyCap';
import './VirtualKeyboard.css';

interface VirtualKeyboardProps {
  targetKey: string | null;
  lastPressedKey: string | null;
}

export function VirtualKeyboard({ targetKey, lastPressedKey }: VirtualKeyboardProps): JSX.Element {
  const isError = lastPressedKey && targetKey && lastPressedKey.toLowerCase() !== targetKey.toLowerCase();

  return (
    <div className="virtual-keyboard">
      <div className="virtual-keyboard__keys">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((keyDef) => (
              <KeyCap
                key={keyDef.key}
                keyDef={keyDef}
                isTarget={targetKey?.toLowerCase() === keyDef.key.toLowerCase()}
                isPressed={lastPressedKey?.toLowerCase() === keyDef.key.toLowerCase()}
                isError={
                  lastPressedKey?.toLowerCase() === keyDef.key.toLowerCase() && isError
                }
              />
            ))}
          </div>
        ))}
      </div>

      <div className="keyboard-legend">
        <div className="legend-title">Fingerzuordnung:</div>
        <div className="legend-colors">
          {(Object.entries(FINGER_COLORS) as [string, string][])
            .slice(0, 5)
            .map(([finger, color]) => (
              <div key={finger} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: color }}
                />
                <span>{finger.replace('-', ' ')}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
