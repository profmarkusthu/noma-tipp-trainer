import React, { useState, useCallback } from 'react';
import { GameCanvas } from '../game/GameCanvas';
import { VirtualKeyboard } from '../keyboard/VirtualKeyboard';
import { Button } from '../ui/Button';
import { useGameStore } from '../../store/useGameStore';
import { LessonConfig } from '../../types/lesson.types';
import { GameResult } from '../../types/game.types';
import './GameScreen.css';

interface GameScreenProps {
  lesson: LessonConfig;
  onExit: () => void;
  onGameOver: (result: GameResult) => void;
  onLevelComplete: (result: GameResult) => void;
}

export function GameScreen({
  lesson,
  onExit,
  onGameOver,
  onLevelComplete,
}: GameScreenProps): React.JSX.Element {
  const [isRunning, setIsRunning] = useState(true);
  const targetLetter = useGameStore((s) => s.targetLetter);
  const lastPressedKey = useGameStore((s) => s.lastPressedKey);

  const handleGameOver = useCallback((result: GameResult) => {
    setIsRunning(false);
    onGameOver(result);
  }, [onGameOver]);

  const handleLevelComplete = useCallback(
    (result: GameResult) => {
      setIsRunning(false);
      onLevelComplete(result);
    },
    [onLevelComplete]
  );

  return (
    <div className="game-screen">
      <div className="game-screen__header">
        <h1 className="game-screen__title">{lesson.title}</h1>
        <Button variant="secondary" size="small" onClick={onExit}>
          Zurück
        </Button>
      </div>

      <GameCanvas
        lesson={lesson}
        isRunning={isRunning}
        onGameOver={handleGameOver}
        onLevelComplete={handleLevelComplete}
      />

      <VirtualKeyboard targetKey={targetLetter} lastPressedKey={lastPressedKey} />
    </div>
  );
}
