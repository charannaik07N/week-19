import { clsx } from 'clsx';

/**
 * Merge class names conditionally.
 * Uses clsx internally for conditional class merging.
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Format a date relative to now (e.g., "2 min ago", "1 hour ago").
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 10) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return then.toLocaleDateString('en-US');
}

/**
 * Format a date to a short timestamp (e.g., "Jul 18, 2:30 PM").
 */
export function formatTimestamp(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Generate initials from a full name.
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format a ticket number with leading zeros (e.g., "#00105").
 */
export function formatTicketNumber(num) {
  return `#${String(num).padStart(5, '0')}`;
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text, maxLength = 60) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
}

/**
 * Format SLA timer (remaining seconds to human-readable).
 */
export function formatSLA(remainingMs) {
  if (remainingMs <= 0) return 'Breached';
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export const formatDateTime = formatTimestamp;
