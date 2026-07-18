'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div
      className="relative flex items-center border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide flex-nowrap"
      role="tablist"
      aria-label="Tab navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.value}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(tab.value)}
            className={cn(
              'relative px-4 py-2.5 min-h-[44px] text-sm font-medium whitespace-nowrap',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            )}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
