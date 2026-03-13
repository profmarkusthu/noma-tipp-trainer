import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { GameCanvas } from '../game/GameCanvas';
import { VirtualKeyboard } from '../keyboard/VirtualKeyboard';
import { Button } from '../ui/Button';
import { useGameStore } from '../../store/useGameStore';
import './GameScreen.css';
export function GameScreen({ lesson, onExit, onGameOver, onLevelComplete, }) {
    const [isRunning, setIsRunning] = useState(true);
    const targetLetter = useGameStore((s) => s.targetLetter);
    const lastPressedKey = useGameStore((s) => s.lastPressedKey);
    const handleGameOver = useCallback((result) => {
        setIsRunning(false);
        onGameOver(result);
    }, [onGameOver]);
    const handleLevelComplete = useCallback((result) => {
        setIsRunning(false);
        onLevelComplete(result);
    }, [onLevelComplete]);
    return (_jsxs("div", { className: "game-screen", children: [_jsxs("div", { className: "game-screen__header", children: [_jsx("h1", { className: "game-screen__title", children: lesson.title }), _jsx(Button, { variant: "secondary", size: "small", onClick: onExit, children: "Zur\u00FCck" })] }), _jsx(GameCanvas, { lesson: lesson, isRunning: isRunning, onGameOver: handleGameOver, onLevelComplete: handleLevelComplete }), _jsx(VirtualKeyboard, { targetKey: targetLetter, lastPressedKey: lastPressedKey })] }));
}
