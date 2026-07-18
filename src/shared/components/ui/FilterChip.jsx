'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';

export default function FilterChip({
  label,
  selected = false,
  onClick,
  count,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
        'border transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-offset-slate-900',
        'select-none cursor-pointer',
        selected
          ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800'
      )}
      aria-pressed={selected}
      aria-label={`Filter: ${label}${count !== undefined ? `, ${count} items` : ''}`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded text-[10px] font-semibold',
            selected
              ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          )}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
