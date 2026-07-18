export const COLORS = {
  primary: {
    DEFAULT: '#2563EB',
    light: '#3B82F6',
    dark: '#1D4ED8',
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950',
  },
  success: {
    DEFAULT: '#16A34A',
    light: '#22C55E',
    dark: '#15803D',
    bg: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-600',
    bgLight: 'bg-green-50',
    bgDark: 'dark:bg-green-950',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    bg: 'bg-amber-500',
    text: 'text-amber-500',
    border: 'border-amber-500',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950',
  },
  danger: {
    DEFAULT: '#DC2626',
    light: '#EF4444',
    dark: '#B91C1C',
    bg: 'bg-red-600',
    text: 'text-red-600',
    border: 'border-red-600',
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-950',
  },
};

export const TICKET_STATUS_COLORS = {
  new: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  open: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  assigned: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-500' },
  locked: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300', dot: 'bg-slate-400' },
  in_progress: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-300', dot: 'bg-cyan-500' },
  waiting_customer: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  resolved: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
  closed: { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-500 dark:text-slate-400', dot: 'bg-slate-400' },
  reopened: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' },
};

export const PRIORITY_COLORS = {
  critical: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500', border: 'border-red-500' },
  high: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500', border: 'border-amber-500' },
  medium: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500', border: 'border-blue-500' },
  low: { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-400', border: 'border-slate-400' },
};

export const PRESENCE_COLORS = {
  online: 'bg-green-500',
  idle: 'bg-amber-400',
  away: 'bg-orange-400',
  editing: 'bg-green-500',
  viewing: 'bg-blue-500',
  offline: 'bg-slate-400',
  disconnected: 'bg-red-500',
  reconnecting: 'bg-orange-500',
};
