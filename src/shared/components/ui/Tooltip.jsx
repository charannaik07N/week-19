'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/shared/utils';

const sidePositions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowPositions = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-800 dark:border-t-slate-200 border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 dark:border-b-slate-200 border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-800 dark:border-l-slate-200 border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-800 dark:border-r-slate-200 border-y-transparent border-l-transparent',
};

export default function Tooltip({
  content,
  children,
  side = 'top',
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 200);
  }, []);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  if (!content) return children;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <div
        className={cn(
          'absolute z-50 pointer-events-none',
          'transition-opacity duration-150 ease-in-out',
          visible ? 'opacity-100' : 'opacity-0',
          sidePositions[side]
        )}
        role="tooltip"
        aria-hidden={!visible}
      >
        <div
          className={cn(
            'px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
            'bg-slate-800 text-white',
            'dark:bg-slate-200 dark:text-slate-900',
            'shadow-md'
          )}
        >
          {content}
        </div>
        <div
          className={cn(
            'absolute w-0 h-0 border-4',
            arrowPositions[side]
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
