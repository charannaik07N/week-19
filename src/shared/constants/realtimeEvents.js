export const REALTIME_EVENTS = {
  // Ticket events
  TICKET_CREATED: 'ticket_created',
  TICKET_UPDATED: 'ticket_updated',
  TICKET_DELETED: 'ticket_deleted',
  TICKET_LOCKED: 'ticket_locked',
  TICKET_UNLOCKED: 'ticket_unlocked',
  TICKET_ASSIGNED: 'ticket_assigned',
  TICKET_RESOLVED: 'ticket_resolved',

  // Presence events
  PRESENCE_CHANGED: 'presence_changed',
  AGENT_JOINED: 'agent_joined',
  AGENT_LEFT: 'agent_left',

  // Notification events
  NOTIFICATION_CREATED: 'notification_created',
};

export const REALTIME_CHANNELS = {
  TICKETS: 'tickets',
  ACTIVITIES: 'activities',
  PRESENCE: 'presence',
  NOTIFICATIONS: 'notifications',
  AGENTS: 'agents',
};

export const TICKET_STATUSES = [
  'new',
  'open',
  'assigned',
  'locked',
  'in_progress',
  'waiting_customer',
  'resolved',
  'closed',
  'reopened',
];

export const TICKET_PRIORITIES = ['critical', 'high', 'medium', 'low'];

export const ACTIVITY_TYPES = [
  'ticket_created',
  'ticket_assigned',
  'ticket_locked',
  'ticket_unlocked',
  'status_changed',
  'priority_changed',
  'comment_added',
  'attachment_uploaded',
  'customer_replied',
  'ticket_closed',
  'ticket_reopened',
];

export const PRESENCE_STATUSES = [
  'online',
  'idle',
  'away',
  'editing',
  'viewing',
  'offline',
  'disconnected',
  'reconnecting',
];

export const CONNECTION_STATES = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected',
  RECONNECTING: 'reconnecting',
  OFFLINE: 'offline',
};

export const LOCK_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
export const HEARTBEAT_INTERVAL_MS = 30 * 1000; // 30 seconds
