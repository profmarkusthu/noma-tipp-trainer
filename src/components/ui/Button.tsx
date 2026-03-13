import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
