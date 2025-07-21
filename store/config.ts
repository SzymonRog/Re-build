import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ConfigState = {
    name: string
    setName: (name: string) => void
}

export const useConfigStore = create<ConfigState>()(
    persist(
        (set) => ({
            name: '',
            setName: (name) => set({ name }),
        }),
        {
            name: 'config-store', // klucz w localStorage
        }
    )
)