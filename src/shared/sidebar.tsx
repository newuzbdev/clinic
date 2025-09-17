"use client"

import type React from "react"

import { AppShell, ScrollArea, Text, UnstyledButton, Group, rem, ActionIcon } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  Stethoscope,
  Settings,
  MessageSquare,
  UserCheck,
  Activity,
  X,
} from "lucide-react"
import { useHeaderTitle } from "../providers/header-title-provider"
import { useSidebar } from "../hooks/use-sidebar"


interface NavItemProps {
  icon: React.ComponentType<any>
  label: string
  to: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon: Icon, label, to, active, onClick }: NavItemProps) {
  return (
    <UnstyledButton
      component={Link as any}
      to={to}
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        padding: rem(10),
        borderRadius: rem(6),
        color: active ? "#4263eb" : "#868e96",
        backgroundColor: active ? "#e7f5ff" : "transparent",
        fontSize: rem(14),
        marginBottom: rem(4),
        textDecoration: "none",
      }}
    >
      <Group gap="sm">
        <Icon size={18} />
        <Text size="sm" fw={active ? 600 : 400}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

interface NavSectionProps {
  title: string
  items: Array<{
    icon: React.ComponentType<any>
    label: string
    to: string
    key: string
  }>
  currentPath: string
}

function NavSection({ title, items, currentPath }: NavSectionProps) {
  const { setHeaderTitle } = useHeaderTitle()

  return (
    <div style={{ marginBottom: rem(24) }}>
      <Text
        size="xs"
        fw={600}
        c="dimmed"
        style={{
          marginBottom: rem(12),
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Text>
      {items.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, ...rest } = item;
        const isActive = item.to === currentPath || (item.to !== '/' && currentPath.startsWith(item.to));
        return (
          <NavItem
            {...rest}
            active={isActive}
            onClick={() => setHeaderTitle(item.label)}
            key={key}
          />
        );
      })}
    </div>
  )
}


export function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const mainMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/", key: "dashboard" },
  ]

  const applicationItems = [
    { icon: Settings, label: "Layouts", to: "/layouts", key: "layouts" },
  ]

  const clinicItems = [
    { icon: Stethoscope, label: "Doctors", to: "/doctors", key: "doctors" },
    { icon: Users, label: "Patients", to: "/patients", key: "patients" },
    { icon: Calendar, label: "Appointments", to: "/appointments", key: "appointments" },
    { icon: MapPin, label: "Locations", to: "/locations", key: "locations" },
    { icon: Stethoscope, label: "Services", to: "/services", key: "services" },
    { icon: Settings, label: "Specializations", to: "/specializations", key: "specializations" },
    { icon: Settings, label: "Assets", to: "/assets", key: "assets" },
    { icon: Activity, label: "Activities", to: "/activities", key: "activities" },
    { icon: MessageSquare, label: "Messages", to: "/messages", key: "messages" },
  ]

  const hrmItems = [
    { icon: UserCheck, label: "Staffs", to: "/staffs", key: "staffs" },
  ]

  return (
    <>
      {!collapsed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 199,
            display: "none",
          }}
          className="block lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <AppShell.Navbar
        style={{
          position: "fixed",
          height: "100vh",
          zIndex: 200,
          transform: collapsed ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
        className="lg:transform-none"
      >
        <div style={{ padding: rem(16), borderBottom: "1px solid #e9ecef" }}>
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <div
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#4263eb",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text c="white" size="xs" fw={700}>
                  T
                </Text>
              </div>
              <Text size="sm" fw={600}>
                Trustcare Clinic
              </Text>
            </Group>
            <ActionIcon variant="subtle" size="sm" onClick={toggleSidebar} className="lg:hidden">
              <X size={16} />
            </ActionIcon>
          </Group>
          <Text size="xs" c="dimmed" mt={4}>
            Las vegas
          </Text>
        </div>

        <ScrollArea style={{ flex: 1 }} p="md">
          <NavSection title="Main Menu" items={mainMenuItems} currentPath={currentPath} />
          <NavSection title="Applications" items={applicationItems} currentPath={currentPath} />
          <NavSection title="Clinic" items={clinicItems} currentPath={currentPath} />
          <NavSection title="HRM" items={hrmItems} currentPath={currentPath} />
        </ScrollArea>
      </AppShell.Navbar>
    </>
  )
}
