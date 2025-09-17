import { AppShell } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { Sidebar } from "./sidebar"

import { useEffect } from "react"
import { Header,  } from "./header"
import { useSidebar } from "../hooks/use-sidebar"
import { HeaderTitleProvider } from "../providers/header-title-provider"

interface MainLayoutProps {
  children: React.ReactNode
  workspace?: "personal" | "organization"
}

export function MainLayout({ children }: MainLayoutProps) {
  const { width } = useViewportSize()
  const { isLg, setLg, collapsed } = useSidebar()

  useEffect(() => {
    const isLargeScreen = width >= 1024
    setLg(!isLargeScreen)
  }, [width, setLg])

  return (
    <HeaderTitleProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 240,
          breakpoint: "lg",
          collapsed: { mobile: collapsed, desktop: false },
        }}
        padding={0}
        style={{
          marginLeft: isLg ? 0 : 240,
          transition: "margin-left 0.3s ease",
        }}
        className="lg:ml-0"
      >
        <Header />
        <Sidebar  />

        <AppShell.Main
          style={{
            padding: "1rem",
            height: "calc(100vh - 60px)",
            overflowY: "auto",
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </HeaderTitleProvider>
  )
}
