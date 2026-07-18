'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 8 },
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className={cn(
              'relative w-full rounded-xl shadow-md',
              'bg-white dark:bg-slate-900',
              'border border-slate-200 dark:border-slate-800',
              sizeClasses[size]
            )}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
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
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
