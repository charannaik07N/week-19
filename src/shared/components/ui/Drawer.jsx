'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  width = 'w-96',
}) {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="fixed inset-0 bg-black/30"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className={cn(
              'fixed top-0 right-0 h-full',
              'bg-white dark:bg-slate-900',
              'border-l border-slate-200 dark:border-slate-800',
              'shadow-md flex flex-col',
              width
            )}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100',
                  'dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                )}
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
