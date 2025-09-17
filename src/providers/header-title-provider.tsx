"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface HeaderTitleContextType {
  headerTitle: string
  setHeaderTitle: (title: string) => void
}

const HeaderTitleContext = createContext<HeaderTitleContextType | undefined>(undefined)

export function HeaderTitleProvider({ children }: { children: ReactNode }) {
  const [headerTitle, setHeaderTitle] = useState("Admin Dashboard")

  return <HeaderTitleContext.Provider value={{ headerTitle, setHeaderTitle }}>{children}</HeaderTitleContext.Provider>
}

export function useHeaderTitle() {
  const context = useContext(HeaderTitleContext)
  if (context === undefined) {
    throw new Error("useHeaderTitle must be used within a HeaderTitleProvider")
  }
  return context
}
