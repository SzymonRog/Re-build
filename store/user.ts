import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User  {
    id: string
    email: string
    name: string
    image?: string
}

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    clearUser: () => void
}


export const useUserStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => {
        set({ user, isAuthenticated: true });
    },
    clearUser: () => set({ user: null, isAuthenticated: false }),
}))