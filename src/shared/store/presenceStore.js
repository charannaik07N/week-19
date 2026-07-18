import { create } from 'zustand';

export const usePresenceStore = create((set) => ({
  onlineAgents: [],
  setOnlineAgents: (agents) => set({ onlineAgents: agents }),
}));
