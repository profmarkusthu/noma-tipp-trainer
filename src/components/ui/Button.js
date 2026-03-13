import { jsx as _jsx } from "react/jsx-runtime";
import './Button.css';
export function Button({ children, variant = 'primary', size = 'medium', className, ...props }) {
    return (_jsx("button", { className: `btn btn--${variant} btn--${size} ${className || ''}`, ...props, children: children }));
}
