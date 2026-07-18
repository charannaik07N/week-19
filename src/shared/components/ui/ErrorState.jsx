'use client';

import { AlertTriangle } from 'lucide-react';
import { cn } from '@/shared/utils';
import Button from '@/shared/components/ui/Button';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-8 text-center'
      )}
      role="alert"
      aria-label={title}
    >
      <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40">
        <AlertTriangle
          className="h-8 w-8 text-red-500 dark:text-red-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {onRetry && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
