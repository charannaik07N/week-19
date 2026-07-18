'use client';

import { cn } from '@/shared/utils';

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}) {
  const baseClasses =
    'relative overflow-hidden bg-slate-200 dark:bg-slate-700/50 rounded before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent';

  const variantClasses = {
    text: cn('h-4 w-full rounded', baseClasses),
    circle: cn('rounded-full', baseClasses),
    card: cn('rounded-xl', baseClasses),
    row: cn('h-14 w-full rounded-lg', baseClasses),
  };

  return (
    <div
      className={cn(variantClasses[variant], className)}
      style={{
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
      }}
      aria-hidden="true"
      role="presentation"
    >
      <style suppressHydrationWarning>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

export function TicketCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton variant="text" className="h-5 w-3/4" />
          <Skeleton variant="text" className="h-4 w-1/2" />
        </div>
        <Skeleton variant="circle" width="32px" height="32px" className="shrink-0" />
      </div>
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Skeleton variant="text" className="h-5 w-16 rounded-md" />
        <Skeleton variant="text" className="h-5 w-14 rounded-md" />
        <Skeleton variant="text" className="h-3 w-20 ml-auto" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton variant="text" className="h-5 w-32" />
          <Skeleton variant="text" className="h-4 w-24" />
        </div>
        <Skeleton variant="text" className="h-8 w-24 rounded-lg" />
      </div>
      <div className="flex-1 flex items-end gap-2 mt-4 min-h-[200px]">
        {[40, 70, 45, 90, 65, 55, 80, 30, 60, 100, 75, 50].map((h, i) => (
          <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800/50 rounded-t-sm relative overflow-hidden" style={{ height: `${h}%` }}>
             <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex gap-4">
        <Skeleton variant="text" className="h-4 w-1/4" />
        <Skeleton variant="text" className="h-4 w-1/4" />
        <Skeleton variant="text" className="h-4 w-1/4" />
        <Skeleton variant="text" className="h-4 w-1/4" />
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-4 py-3 flex gap-4 items-center">
            <Skeleton variant="text" className="h-4 w-1/4" />
            <Skeleton variant="text" className="h-4 w-1/4" />
            <Skeleton variant="text" className="h-4 w-1/4" />
            <Skeleton variant="text" className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

