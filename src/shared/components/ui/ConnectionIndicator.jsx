'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils';
import { useConnectionStore } from '@/shared/store/connectionStore';
import { CONNECTION_STATES } from '@/shared/constants/realtimeEvents';

const statusConfig = {
  [CONNECTION_STATES.CONNECTED]: {
    dot: 'bg-green-500',
    label: 'Connected',
    textColor: 'text-green-600 dark:text-green-400',
    showSpinner: false,
  },
  [CONNECTION_STATES.CONNECTING]: {
    dot: 'bg-amber-500',
    label: 'Connecting',
    textColor: 'text-amber-600 dark:text-amber-400',
    showSpinner: true,
  },
  [CONNECTION_STATES.DISCONNECTED]: {
    dot: 'bg-red-500',
    label: 'Disconnected',
    textColor: 'text-red-600 dark:text-red-400',
    showSpinner: false,
  },
  [CONNECTION_STATES.RECONNECTING]: {
    dot: 'bg-orange-500',
    label: 'Reconnecting',
    textColor: 'text-orange-600 dark:text-orange-400',
    showSpinner: true,
  },
  [CONNECTION_STATES.OFFLINE]: {
    dot: 'bg-slate-400',
    label: 'Offline',
    textColor: 'text-slate-500 dark:text-slate-400',
    showSpinner: false,
  },
};

export default function ConnectionIndicator({ className }) {
  const status = useConnectionStore((s) => s.status);
  const config = statusConfig[status] || statusConfig[CONNECTION_STATES.DISCONNECTED];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5',
        className
      )}
      role="status"
      aria-label={`Connection status: ${config.label}`}
    >
      {config.showSpinner ? (
        <Loader2
          className={cn('h-3 w-3 animate-spin', config.textColor)}
          aria-hidden="true"
        />
      ) : (
        <span
          className={cn('h-2 w-2 rounded-full shrink-0', config.dot)}
          aria-hidden="true"
        />
      )}
      <span className={cn('text-[11px] font-medium', config.textColor)}>
        {config.label}
      </span>
    </div>
  );
}
