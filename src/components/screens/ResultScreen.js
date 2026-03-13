import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../ui/Button';
import './ResultScreen.css';
export function ResultScreen({ result, lesson, onReplay, onBack, }) {
    // Calculate WPM: (characters / 5) / (minutes)
    const wpm = Math.round((result.blocksCleared / 5) / (result.elapsedSeconds / 60));
    // Format time as m:ss
    const minutes = Math.floor(result.elapsedSeconds / 60);
    const seconds = Math.floor(result.elapsedSeconds % 60);
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    // Calculate stars
    const [star1, star2, star3] = lesson.starThresholds;
    let stars = 0;
    if (result.score >= star1)
        stars = 1;
    if (result.score >= star2)
        stars = 2;
    if (result.score >= star3)
        stars = 3;
    const title = result.isGameOver ? 'Spiel vorbei!' : 'Lektion abgeschlossen!';
    const status = result.isGameOver ? 'Verloren' : 'Gewonnen';
    return (_jsx("div", { className: "result-screen", children: _jsxs("div", { className: "result-container", children: [_jsx("h1", { className: "result-title", children: title }), _jsx("div", { className: "result-status", children: _jsx("span", { className: `status-badge status-${result.isGameOver ? 'loss' : 'win'}`, children: status }) }), _jsx("div", { className: "result-stars", children: Array(3)
                        .fill(0)
                        .map((_, i) => (_jsx("span", { className: `star ${i < stars ? 'filled' : 'empty'}`, children: "\u2605" }, i))) }), _jsxs("div", { className: "result-stats", children: [_jsxs("div", { className: "stat-row", children: [_jsx("div", { className: "stat-label", children: "Score:" }), _jsx("div", { className: "stat-value", children: result.score })] }), _jsxs("div", { className: "stat-row", children: [_jsx("div", { className: "stat-label", children: "Fehler:" }), _jsx("div", { className: "stat-value", children: result.wrongInputs })] }), _jsxs("div", { className: "stat-row", children: [_jsx("div", { className: "stat-label", children: "Zeit:" }), _jsx("div", { className: "stat-value", children: timeStr })] }), _jsxs("div", { className: "stat-row", children: [_jsx("div", { className: "stat-label", children: "WPM:" }), _jsx("div", { className: "stat-value", children: isFinite(wpm) ? wpm : 0 })] }), _jsxs("div", { className: "stat-row", children: [_jsx("div", { className: "stat-label", children: "Bl\u00F6cke:" }), _jsxs("div", { className: "stat-value", children: [result.blocksCleared, "/", result.totalBlocks] })] })] }), _jsxs("div", { className: "result-buttons", children: [_jsx(Button, { onClick: onReplay, className: "btn-primary", children: "Wiederholen" }), _jsx(Button, { onClick: onBack, variant: "secondary", children: "Zur\u00FCck zu den Lektionen" })] })] }) }));
}
