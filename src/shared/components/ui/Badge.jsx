'use client';

import { Lock } from 'lucide-react';
import { cn } from '@/shared/utils';
import { capitalize } from '@/shared/utils';
import {
  TICKET_STATUS_COLORS,
  PRIORITY_COLORS,
  PRESENCE_COLORS,
} from '@/shared/constants/colors';

const semanticColors = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-600' },
  green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-600' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-600' },
  slate: { bg: 'bg-slate-50 dark:bg-slate-900/20', text: 'text-slate-700 dark:text-slate-400', dot: 'bg-slate-600' },
};

const variantColorMaps = {
  status: TICKET_STATUS_COLORS,
  priority: PRIORITY_COLORS,
  semantic: semanticColors,
};

const sizeClasses = {
  sm: 'px-1 py-0.5 text-[10px] gap-1',
  md: 'px-1.5 py-0.5 text-xs gap-1.5',
};

const dotSizes = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

const fallbackColors = {
  bg: 'bg-slate-100 dark:bg-slate-800',
  text: 'text-slate-600 dark:text-slate-400',
  dot: 'bg-slate-400',
};

export default function Badge({
  variant = 'status',
  value,
  size = 'md',
  className,
}) {
  const baseClasses = 'inline-flex items-center rounded-md font-medium transition-all duration-150 ease-in-out';

  if (variant === 'lock') {
    return (
      <span
        className={cn(
          baseClasses,
          'gap-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
          sizeClasses[size],
          className
        )}
        aria-label="Locked"
      >
        <Lock
          className={cn(size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3')}
          aria-hidden="true"
        />
        <span>Locked</span>
      </span>
    );
  }

  if (variant === 'presence') {
    const dotColor = PRESENCE_COLORS[value] || 'bg-slate-400';
    return (
      <span
        className={cn(
          baseClasses,
          'gap-1.5 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
          sizeClasses[size],
          className
        )}
        aria-label={`Status: ${value}`}
      >
        <span
          className={cn('rounded-full shrink-0', dotSizes[size], dotColor)}
          aria-hidden="true"
        />
        <span>{capitalize(value)}</span>
      </span>
    );
  }

  const colorMap = variantColorMaps[variant];
  const colors = colorMap?.[value] || fallbackColors;

  return (
    <span
      className={cn(
        baseClasses,
        colors.bg,
        colors.text,
        sizeClasses[size],
        className
      )}
      aria-label={`${variant}: ${value}`}
    >
      <span
        className={cn('rounded-full shrink-0', dotSizes[size], colors.dot)}
        aria-hidden="true"
      />
      <span>{capitalize(value)}</span>
    </span>
  );
}
