import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { KEYBOARD_LAYOUT, FINGER_COLORS } from '../../config/keyboard-layout';
import { KeyCap } from './KeyCap';
import './VirtualKeyboard.css';
export function VirtualKeyboard({ targetKey, lastPressedKey }) {
    const isError = lastPressedKey && targetKey && lastPressedKey.toLowerCase() !== targetKey.toLowerCase();
    return (_jsxs("div", { className: "virtual-keyboard", children: [_jsx("div", { className: "virtual-keyboard__keys", children: KEYBOARD_LAYOUT.map((row, rowIndex) => (_jsx("div", { className: "keyboard-row", children: row.map((keyDef) => (_jsx(KeyCap, { keyDef: keyDef, isTarget: targetKey?.toLowerCase() === keyDef.key.toLowerCase(), isPressed: lastPressedKey?.toLowerCase() === keyDef.key.toLowerCase(), isError: lastPressedKey?.toLowerCase() === keyDef.key.toLowerCase() && isError }, keyDef.key))) }, rowIndex))) }), _jsxs("div", { className: "keyboard-legend", children: [_jsx("div", { className: "legend-title", children: "Fingerzuordnung:" }), _jsx("div", { className: "legend-colors", children: Object.entries(FINGER_COLORS)
                            .slice(0, 5)
                            .map(([finger, color]) => (_jsxs("div", { className: "legend-item", children: [_jsx("div", { className: "legend-color", style: { backgroundColor: color } }), _jsx("span", { children: finger.replace('-', ' ') })] }, finger))) })] })] }));
}
