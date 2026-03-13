import React from 'react';
import { LESSONS } from '../../config/lessons';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../ui/Button';
import './LessonSelectScreen.css';

interface LessonSelectScreenProps {
  onSelectLesson: (lessonId: string) => void;
  onBack: () => void;
}

export function LessonSelectScreen({
  onSelectLesson,
  onBack,
}: LessonSelectScreenProps): React.JSX.Element {
  const getLessonStats = useProgressStore((s) => s.getLessonStats);

  const renderStars = (stars: number) => {
    return '⭐'.repeat(stars) || 'Nicht versucht';
  };

  return (
    <div className="lesson-select-screen">
      <div className="screen-header">
        <h1>Lektionen</h1>
        <Button variant="secondary" size="small" onClick={onBack}>
          Zurück
        </Button>
      </div>

      <div className="lessons-grid">
        {LESSONS.map((lesson) => {
          const stats = getLessonStats(lesson.id);
          return (
            <div key={lesson.id} className="lesson-card">
              <h2>{lesson.title}</h2>
              <p className="lesson-description">{lesson.description}</p>
              <p className="lesson-characters">
                {lesson.characters.filter((c) => c !== ' ').length} Zeichen
              </p>
              <div className="lesson-stats">
                <div>Versuche: {stats.attempts}</div>
                <div>Best Score: {stats.bestScore}</div>
                <div className="lesson-stars">{renderStars(stats.stars)}</div>
              </div>
              <Button
                onClick={() => onSelectLesson(lesson.id)}
                className="lesson-button"
              >
                Spielen
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
