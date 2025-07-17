import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  fullWidth = false,
  className,
  ...props
}, ref) => {
  const baseClasses = 'px-3 py-2 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  const variantClasses = {
    default: 'bg-white border border-gray-300 rounded-lg focus:border-blue-500',
    filled: 'bg-gray-50 border-0 rounded-lg focus:bg-white focus:shadow-sm',
  };
  
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : '';
  
  const iconPadding = {
    left: leftIcon ? 'pl-10' : '',
    right: rightIcon ? 'pr-10' : '',
  };
  
  return (
    <div className={clsx('relative', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 w-5 h-5">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          className={clsx(
            baseClasses,
            variantClasses[variant],
            errorClasses,
            iconPadding.left,
            iconPadding.right,
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 w-5 h-5">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={clsx(
          'mt-1 text-sm',
          error ? 'text-red-600' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';