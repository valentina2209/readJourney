import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline';
    className?: string; 
}

export const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}