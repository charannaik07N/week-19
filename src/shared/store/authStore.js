import { create } from 'zustand';

/**
 * Authentication Store for managing the current user's session.
 */
export const useAuthStore = create((set) => ({
  // State
  isAuthenticated: false,
  user: null, // e.g., { id, name, email, role, avatar }
  token: null,
  isLoading: true, // Initially true while checking session on mount

  // Actions
  login: (userData, token) => set({
    isAuthenticated: true,
    user: userData,
    token,
    isLoading: false,
  }),

  logout: () => set({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
  }),

  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),

  setLoading: (isLoading) => set({ isLoading }),
}));
