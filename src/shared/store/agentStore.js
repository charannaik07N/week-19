import { create } from 'zustand';

export const useAgentStore = create((set) => ({
  currentAgent: {
    id: 'agent-001',
    name: 'Sarah Johnson',
    role: 'Senior Support Agent',
    department: 'Logistics',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  agents: [],
  setAgents: (agents) => set({ agents }),
}));
