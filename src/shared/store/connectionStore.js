import { create } from 'zustand';

/**
 * Connection Store for managing realtime connection state.
 * Useful for tracking WebSocket or SSE connectivity.
 */
export const useConnectionStore = create((set) => ({
  // State
  status: 'disconnected', // 'connected', 'disconnected', 'reconnecting', 'error'
  lastConnectedAt: null,
  error: null,
  reconnectAttempts: 0,

  // Actions
  setConnected: () => set({ 
    status: 'connected', 
    lastConnectedAt: new Date().toISOString(),
    error: null,
    reconnectAttempts: 0
  }),
  
  setDisconnected: (error = null) => set({ 
    status: 'disconnected', 
    error 
  }),
  
  setReconnecting: (attemptCount) => set({ 
    status: 'reconnecting',
    reconnectAttempts: attemptCount
  }),
  
  setError: (error) => set({ error }),
}));
