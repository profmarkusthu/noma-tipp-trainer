import React from 'react';
import { GameResult } from '../../types/game.types';
import { LessonConfig } from '../../types/lesson.types';
import { Button } from '../ui/Button';
import './ResultScreen.css';

interface ResultScreenProps {
  result: GameResult;
  lesson: LessonConfig;
  onReplay: () => void;
  onBack: () => void;
}

export function ResultScreen({
  result,
  lesson,
  onReplay,
  onBack,
}: ResultScreenProps): React.JSX.Element {
  // Calculate WPM: (characters / 5) / (minutes)
  const wpm = Math.round((result.blocksCleared / 5) / (result.elapsedSeconds / 60));

  // Format time as m:ss
  const minutes = Math.floor(result.elapsedSeconds / 60);
  const seconds = Math.floor(result.elapsedSeconds % 60);
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Calculate stars
  const [star1, star2, star3] = lesson.starThresholds;
  let stars = 0;
  if (result.score >= star1) stars = 1;
  if (result.score >= star2) stars = 2;
  if (result.score >= star3) stars = 3;

  const title = result.isGameOver ? 'Spiel vorbei!' : 'Lektion abgeschlossen!';
  const status = result.isGameOver ? 'Verloren' : 'Gewonnen';

  return (
    <div className="result-screen">
      <div className="result-container">
        <h1 className="result-title">{title}</h1>

        <div className="result-status">
          <span className={`status-badge status-${result.isGameOver ? 'loss' : 'win'}`}>
            {status}
          </span>
        </div>

        <div className="result-stars">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <span key={i} className={`star ${i < stars ? 'filled' : 'empty'}`}>
                ★
              </span>
            ))}
        </div>

        <div className="result-stats">
          <div className="stat-row">
            <div className="stat-label">Score:</div>
            <div className="stat-value">{result.score}</div>
          </div>

          <div className="stat-row">
            <div className="stat-label">Fehler:</div>
            <div className="stat-value">{result.wrongInputs}</div>
          </div>

          <div className="stat-row">
            <div className="stat-label">Zeit:</div>
            <div className="stat-value">{timeStr}</div>
          </div>

          <div className="stat-row">
            <div className="stat-label">WPM:</div>
            <div className="stat-value">{isFinite(wpm) ? wpm : 0}</div>
          </div>

          <div className="stat-row">
            <div className="stat-label">Blöcke:</div>
            <div className="stat-value">
              {result.blocksCleared}/{result.totalBlocks}
            </div>
          </div>
        </div>

        <div className="result-buttons">
          <Button onClick={onReplay} className="btn-primary">
            Wiederholen
          </Button>
          <Button onClick={onBack} variant="secondary">
            Zurück zu den Lektionen
          </Button>
        </div>
      </div>
    </div>
  );
}
