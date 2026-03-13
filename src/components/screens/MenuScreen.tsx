import React from 'react';
import { Button } from '../ui/Button';
import './MenuScreen.css';

interface MenuScreenProps {
  onPlayClick: () => void;
  onLessonsClick: () => void;
}

export function MenuScreen({ onPlayClick, onLessonsClick }: MenuScreenProps): React.JSX.Element {
  return (
    <div className="menu-screen">
      <div className="menu-content">
        <h1 className="menu-title">🤖 Noma Tipp-Trainer</h1>
        <p className="menu-subtitle">Noma steht für Noah und Markus – 10-Finger Tippen lernen, spielerisch und macht Spaß!</p>

        <div className="menu-buttons">
          <Button onClick={onPlayClick} size="large">
            Spielen
          </Button>
          <Button onClick={onLessonsClick} size="large" variant="secondary">
            Lektionen
          </Button>
        </div>

        <div className="menu-info">
          <h2>Wie geht's?</h2>
          <ul>
            <li>Buchstaben-Blöcke kommen von rechts auf dich zu</li>
            <li>Drücke die richtige Taste, um den Block zu zerstören</li>
            <li>Je schneller und besser, desto mehr Punkte!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
