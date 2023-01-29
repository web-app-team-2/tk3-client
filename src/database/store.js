import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: 'store',
    },
  ),
);

export default useUserStore;
