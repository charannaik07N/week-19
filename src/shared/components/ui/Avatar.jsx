'use client';

import { useState } from 'react';
import { cn } from '@/shared/utils';
import { getInitials } from '@/shared/utils';
import { PRESENCE_COLORS } from '@/shared/constants/colors';

const sizeClasses = {
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-11 w-11 text-sm',
};

const presenceDotSizes = {
  sm: 'h-2 w-2 border',
  md: 'h-2.5 w-2.5 border-[1.5px]',
  lg: 'h-3 w-3 border-2',
};

const presenceDotPositions = {
  sm: '-bottom-0.5 -right-0.5',
  md: '-bottom-0.5 -right-0.5',
  lg: 'bottom-0 right-0',
};

export default function Avatar({
  name,
  src,
  size = 'md',
  showPresence = false,
  presenceStatus = 'offline',
  className,
}) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(name);
  const showImage = src && !imgError;

  return (
    <div
      className={cn('relative inline-flex shrink-0', className)}
      aria-label={name ? `Avatar for ${name}` : 'Avatar'}
    >
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full',
          'bg-slate-200 text-slate-600 font-medium',
          'dark:bg-slate-700 dark:text-slate-300',
          'select-none overflow-hidden',
          sizeClasses[size]
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={name || 'User avatar'}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>
      {showPresence && (
        <span
          className={cn(
            'absolute rounded-full',
            'border-white dark:border-slate-900',
            presenceDotSizes[size],
            presenceDotPositions[size],
            PRESENCE_COLORS[presenceStatus] || 'bg-slate-400'
          )}
          aria-label={`${presenceStatus}`}
        />
      )}
    </div>
  );
}
