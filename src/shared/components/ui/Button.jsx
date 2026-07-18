'use client';

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils';

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus-visible:ring-blue-600',
  success:
    'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus-visible:ring-green-600',
  warning:
    'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 focus-visible:ring-amber-500',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-visible:ring-red-600',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 focus-visible:ring-slate-500',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700 focus-visible:ring-slate-500',
  icon:
    'bg-transparent text-slate-500 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:active:bg-slate-700 focus-visible:ring-slate-500',
};

const sizes = {
  sm: 'h-7 px-2.5 text-xs gap-1.5',
  md: 'h-8 px-3 text-sm gap-1.5',
  lg: 'h-9 px-4 text-sm gap-2',
};

const iconSizes = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-9 w-9',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon: Icon,
    children,
    className,
    onClick,
    type = 'button',
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const isIcon = variant === 'icon';
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-all duration-150 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-offset-slate-900',
        'disabled:opacity-50 disabled:pointer-events-none',
        'select-none cursor-pointer',
        variants[variant],
        isIcon ? iconSizes[size] : sizes[size],
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : null}
      {!isIcon && children && (
        <span className={cn(loading && 'opacity-0', 'truncate')}>
          {loading ? null : children}
        </span>
      )}
      {loading && !isIcon && children && (
        <span className="sr-only">Loading</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

