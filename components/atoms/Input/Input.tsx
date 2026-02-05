import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1';
    const normalStyles = 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500';
    const errorStyles = 'border-error-500 focus:border-error-500 focus:ring-error-500';

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
