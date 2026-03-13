import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LESSONS } from '../../config/lessons';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../ui/Button';
import './LessonSelectScreen.css';
export function LessonSelectScreen({ onSelectLesson, onBack, }) {
    const getLessonStats = useProgressStore((s) => s.getLessonStats);
    const renderStars = (stars) => {
        return '⭐'.repeat(stars) || 'Nicht versucht';
    };
    return (_jsxs("div", { className: "lesson-select-screen", children: [_jsxs("div", { className: "screen-header", children: [_jsx("h1", { children: "Lektionen" }), _jsx(Button, { variant: "secondary", size: "small", onClick: onBack, children: "Zur\u00FCck" })] }), _jsx("div", { className: "lessons-grid", children: LESSONS.map((lesson) => {
                    const stats = getLessonStats(lesson.id);
                    return (_jsxs("div", { className: "lesson-card", children: [_jsx("h2", { children: lesson.title }), _jsx("p", { className: "lesson-description", children: lesson.description }), _jsxs("p", { className: "lesson-characters", children: [lesson.characters.filter((c) => c !== ' ').length, " Zeichen"] }), _jsxs("div", { className: "lesson-stats", children: [_jsxs("div", { children: ["Versuche: ", stats.attempts] }), _jsxs("div", { children: ["Best Score: ", stats.bestScore] }), _jsx("div", { className: "lesson-stars", children: renderStars(stats.stars) })] }), _jsx(Button, { onClick: () => onSelectLesson(lesson.id), className: "lesson-button", children: "Spielen" })] }, lesson.id));
                }) })] }));
}
