import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User  {
    email: string
    name: string
    image?: string
}

interface AuthState {
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