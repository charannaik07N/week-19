'use client';

import { AlertTriangle, AlertCircle, Info, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/shared/utils';

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-500',
    textColor: 'text-amber-800 dark:text-amber-200',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500',
    textColor: 'text-red-800 dark:text-red-200',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-800 dark:text-blue-200',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-green-50 dark:bg-green-950/40',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500',
    textColor: 'text-green-800 dark:text-green-200',
  },
};

export default function AlertBanner({
  type = 'info',
  message,
  action,
  onDismiss,
}) {
  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'w-full px-4 py-3 flex items-center gap-3',
        'border-b',
        config.bg,
        config.border
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon
        className={cn('h-4 w-4 shrink-0', config.iconColor)}
        aria-hidden="true"
      />
      <p
        className={cn(
          'flex-1 text-sm font-medium',
          config.textColor
        )}
      >
        {message}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'text-sm font-medium px-3 py-1 rounded-lg',
            'transition-colors duration-150',
            'bg-white/60 dark:bg-slate-800/60',
            'hover:bg-white dark:hover:bg-slate-800',
            config.textColor,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          )}
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'p-1 rounded-lg transition-colors duration-150',
            'text-slate-400 hover:text-slate-600',
            'dark:text-slate-500 dark:hover:text-slate-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          )}
          aria-label="Dismiss alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
