import { create } from "zustand"

interface SidebarState {
  collapsed: boolean
  isLg: boolean
  toggleSidebar: () => void
  setLg: (isLg: boolean) => void
}

export const useSidebar = create<SidebarState>((set) => ({
  collapsed: false,
  isLg: false,
  toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
  setLg: (isLg: boolean) => set({ isLg, collapsed: isLg }),
}))
