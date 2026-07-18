import React from 'react';
import clsx from 'clsx';

export function Timeline({ events = [], className }) {
  if (!events || events.length === 0) {
    return <div className="text-sm text-gray-500 py-4">No events found.</div>;
  }

  return (
    <div className={clsx("relative space-y-8 pl-4 sm:pl-0", className)}>
      {/* Vertical connector line */}
      <div className="absolute top-0 bottom-0 left-[1.35rem] sm:left-6 w-px bg-gray-200 dark:bg-gray-800" />
      
      {events.map((event, index) => (
        <div key={index} className="relative flex gap-4 sm:gap-6 items-start group">
          {/* Dot/Icon */}
          <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-full shrink-0 shadow-sm transition-colors group-hover:border-blue-500 dark:group-hover:border-blue-400">
            {event.icon ? (
              <div className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                {event.icon}
              </div>
            ) : (
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col pt-1 sm:pt-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{event.title}</h4>
              {event.date && (
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{event.date}</span>
              )}
            </div>
            {event.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{event.description}</p>
            )}
            {event.user && (
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md self-start border border-gray-200 dark:border-gray-700">
                {event.user}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
