'use client';

import { cn } from '@/shared/utils';
import { Search, Inbox, AlertTriangle } from 'lucide-react';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50',
        className
      )}
      role="status"
      aria-label={title}
    >
      {Icon && (
        <div className="mb-4 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
          <Icon
            className="h-6 w-6 text-slate-400 dark:text-slate-500"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      )}
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

EmptyState.NoTickets = function NoTickets({ action, className }) {
  return (
    <EmptyState
      icon={Inbox}
      title="No tickets found"
      description="You're all caught up. There are no tickets matching your current criteria."
      action={action}
      className={className}
    />
  );
};

EmptyState.NoSearch = function NoSearch({ action, className }) {
  return (
    <EmptyState
      icon={Search}
      title="No search results"
      description="We couldn't find any results for your search. Try checking for typos or using different keywords."
      action={action}
      className={className}
    />
  );
};

EmptyState.ServerError = function ServerError({ action, className }) {
  return (
    <EmptyState
      icon={AlertTriangle}
      title="Something went wrong"
      description="We encountered an error while trying to fetch the data. Please try again."
      action={action}
      className={className}
    />
  );
};
