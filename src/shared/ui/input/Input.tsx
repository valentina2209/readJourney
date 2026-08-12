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
        <div
          className={`${styles.inputWrapper} ${
            error ? styles.inputWrapperHasError : ''
          }`}
        >
          {label && <span className={styles.label}>{label}</span>}
          <input
            ref={ref}
            className={`${styles.input} ${className}`}
            {...props}
          />
          {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';