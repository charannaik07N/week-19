import { create } from 'zustand';

export const useActivityStore = create((set) => ({
  activities: [],
  addActivity: (activity) => set((state) => ({ activities: [activity, ...state.activities] })),
}));
