// src/entities/user/store/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { removeFromStorage } from '@/src/services/auth/auth-token-service';
import { authService } from '@/src/services/auth/auth.service';

import type { User } from '../../auth/model/types';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: async () => {
        try {
          await authService.logout();
          set({ user: null });
          removeFromStorage();
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);
