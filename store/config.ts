import { create } from 'zustand'

type ConfigStore = {
    name: string
    setName: (name: string) => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
    name: 'Bez_nazwy',
    setName: (name) => set({ name }),
}))