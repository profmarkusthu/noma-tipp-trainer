import React from 'react';
import { KeyDefinition } from '../../types/keyboard.types';
import { FINGER_COLORS } from '../../config/keyboard-layout';
import './KeyCap.css';

interface KeyCapProps {
  keyDef: KeyDefinition;
  isTarget: boolean;
  isPressed: boolean;
  isError: boolean;
}

export function KeyCap({ keyDef, isTarget, isPressed, isError }: KeyCapProps): JSX.Element {
  const fingerColor = FINGER_COLORS[keyDef.finger];

  const className = [
    'keycap',
    isTarget && 'keycap--target',
    isPressed && 'keycap--pressed',
    isError && 'keycap--error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      data-testid={`key-${keyDef.key}`}
      style={{
        '--finger-color': fingerColor,
      } as React.CSSProperties}
      title={`${keyDef.label} (${keyDef.finger})`}
    >
      <span className="keycap__label">{keyDef.label}</span>
      <div className="keycap__finger-indicator" style={{ backgroundColor: fingerColor }} />
    </div>
  );
}
