import { create } from 'zustand';

/**
 * Ticket Store for managing ticket-specific state within the tickets feature.
 * Handles the currently selected ticket, lock status (e.g., if someone else is editing),
 * and local editing state.
 */
export const useTicketStore = create((set) => ({
  // State
  selectedTicketId: null,
  isEditing: false,
  lockedBy: null, // e.g., { userId, name } if another user is currently editing
  draftContent: null, // Local changes before saving
  filters: {},
  sortBy: 'created_at',
  sortOrder: 'desc',
  currentPage: 1,
  pageSize: 10,
  
  // Actions
  setFilter: (key, value) => set((state) => ({ 
    filters: { ...state.filters, [key]: value },
    currentPage: 1 // Reset to page 1 on filter change
  })),
  setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }),
  setSortOrder: (sortOrder) => set({ sortOrder, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  
  selectTicket: (ticketId) => set({
    selectedTicketId: ticketId,
    isEditing: false,
    draftContent: null,
    lockedBy: null,
  }),

  clearSelection: () => set({
    selectedTicketId: null,
    isEditing: false,
    draftContent: null,
    lockedBy: null,
  }),

  startEditing: () => set({ isEditing: true }),
  
  cancelEditing: () => set({ 
    isEditing: false, 
    draftContent: null 
  }),

  updateDraft: (content) => set({ draftContent: content }),

  setLockStatus: (lockedBy) => set({ lockedBy }),
}));
