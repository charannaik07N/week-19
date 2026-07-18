'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useNotificationStore } from '@/features/notifications/store/notificationStore';
import { cn } from '@/shared/utils';

const TOAST_ICONS = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const TOAST_STYLES = {
  success: 'border-green-500 bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-200',
  warning: 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200',
  error: 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200',
};

function Toast({ toast }) {
  const removeToast = useNotificationStore((s) => s.removeToast);
  const Icon = TOAST_ICONS[toast.type] || Info;
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 shadow-md',
        'min-w-[320px] max-w-[420px]',
        style
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold">{toast.title}</p>
        )}
        <p className="text-sm">{toast.message}</p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const toasts = useNotificationStore((s) => s.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
