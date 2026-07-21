import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rightElement?: ReactNode;
    className?: string; 
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, rightElement, className = '', ...props }, ref) => {
        return (
            <div className={styles.fieldWrapper}>
                {label && <label className={styles.label}>{label}</label>}
                <div className={styles.inputWrapper}>
                    <input
                        ref={ref}
                        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
                        {...props}
                    />
                    {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
                </div>
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        )
    }
)

Input.displayName = 'Input';