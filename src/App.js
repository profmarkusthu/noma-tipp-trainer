import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MenuScreen } from './components/screens/MenuScreen';
import { LessonSelectScreen } from './components/screens/LessonSelectScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { ThemeProvider } from './themes/ThemeProvider';
import { useProgressStore } from './store/useProgressStore';
import { useLessonStore } from './store/useLessonStore';
import { useGameStore } from './store/useGameStore';
import { getLessonById } from './config/lessons';
import './App.css';
function AppContent() {
    const [currentScreen, setCurrentScreen] = useState('menu');
    const [lastResult, setLastResult] = useState(null);
    const [replayKey, setReplayKey] = useState(0);
    const { activeLesson, setActiveLessonById } = useLessonStore();
    const recordLessonResult = useProgressStore((s) => s.recordLessonResult);
    const resetGameStore = useGameStore((s) => s.reset);
    const handleSelectLesson = (lessonId) => {
        const lesson = getLessonById(lessonId);
        if (lesson) {
            setActiveLessonById(lessonId);
            setCurrentScreen('game');
        }
    };
    const handleGameOver = (result) => {
        setLastResult(result);
        setCurrentScreen('result');
    };
    const handleLevelComplete = (result) => {
        // Calculate stars based on score
        const lesson = getLessonById(result.lessonId);
        if (!lesson)
            return;
        const [star1, star2, star3] = lesson.starThresholds;
        let stars = 0;
        if (result.score >= star1)
            stars = 1;
        if (result.score >= star2)
            stars = 2;
        if (result.score >= star3)
            stars = 3;
        const progress = useProgressStore.getState().getProgress(result.lessonId);
        const attempts = (progress?.attempts || 0) + 1;
        recordLessonResult({
            lessonId: result.lessonId,
            bestScore: Math.max(result.score, progress?.bestScore || 0),
            stars: Math.max(stars, progress?.stars || 0),
            attempts,
            completedAt: new Date().toISOString(),
            wpm: Math.round((result.blocksCleared / 5) / (result.elapsedSeconds / 60)),
        });
        setLastResult(result);
        setCurrentScreen('result');
    };
    const handleReplay = () => {
        resetGameStore();
        setReplayKey((k) => k + 1);
        setCurrentScreen('game');
    };
    const handleResultBack = () => {
        setLastResult(null);
        setCurrentScreen('lessons');
    };
    return (_jsxs("div", { className: "app", children: [currentScreen === 'menu' && (_jsx(MenuScreen, { onPlayClick: () => setCurrentScreen('lessons'), onLessonsClick: () => setCurrentScreen('lessons') })), currentScreen === 'lessons' && (_jsx(LessonSelectScreen, { onSelectLesson: handleSelectLesson, onBack: () => setCurrentScreen('menu') })), currentScreen === 'game' && activeLesson && (_jsx(GameScreen, { lesson: activeLesson, onExit: () => setCurrentScreen('lessons'), onGameOver: handleGameOver, onLevelComplete: handleLevelComplete }, replayKey)), currentScreen === 'result' && lastResult && activeLesson && (_jsx(ResultScreen, { result: lastResult, lesson: activeLesson, onReplay: handleReplay, onBack: handleResultBack }))] }));
}
export function App() {
    return (_jsx(ThemeProvider, { children: _jsx(AppContent, {}) }));
}
