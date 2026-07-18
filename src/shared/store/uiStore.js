import { create } from 'zustand';

/**
 * Global UI Store for managing application-wide UI state.
 * Handles theme (dark/light mode), sidebar visibility, and global modals.
 */
export const useUIStore = create((set) => ({
  // State
  theme: 'system', // 'light', 'dark', or 'system'
  isSidebarOpen: true,
  isMobileSidebarOpen: false,
  activeModal: null, // null means no modal, otherwise string (e.g., 'SETTINGS_MODAL')
  modalProps: {},

  // Actions
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setMobileSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),

  isActivityDrawerOpen: false,
  setActivityDrawerOpen: (isOpen) => set({ isActivityDrawerOpen: isOpen }),
  toggleActivityDrawer: () => set((state) => ({ isActivityDrawerOpen: !state.isActivityDrawerOpen })),

  openModal: (modalId, props = {}) => set({ activeModal: modalId, modalProps: props }),
  closeModal: () => set({ activeModal: null, modalProps: {} }),
}));
