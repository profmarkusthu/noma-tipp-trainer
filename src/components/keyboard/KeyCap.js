import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FINGER_COLORS } from '../../config/keyboard-layout';
import './KeyCap.css';
export function KeyCap({ keyDef, isTarget, isPressed, isError }) {
    const fingerColor = FINGER_COLORS[keyDef.finger];
    const className = [
        'keycap',
        isTarget && 'keycap--target',
        isPressed && 'keycap--pressed',
        isError && 'keycap--error',
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("div", { className: className, "data-testid": `key-${keyDef.key}`, style: {
            '--finger-color': fingerColor,
        }, title: `${keyDef.label} (${keyDef.finger})`, children: [_jsx("span", { className: "keycap__label", children: keyDef.label }), _jsx("div", { className: "keycap__finger-indicator", style: { backgroundColor: fingerColor } })] }));
}
