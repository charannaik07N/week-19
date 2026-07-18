export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TICKETS: '/tickets',
  TICKET_DETAIL: (id) => `/tickets/${id}`,
  ANALYTICS: '/analytics',
  AGENTS: '/agents',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  PROFILE: '/profile',
};

export const SIDEBAR_ITEMS = [
  { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { label: 'Live Tickets', href: '/tickets', icon: 'Ticket' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { label: 'Activity', href: '/activity', icon: 'Activity' },
  { label: 'Team', href: '/team', icon: 'Users' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];
