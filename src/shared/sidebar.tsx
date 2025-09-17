"use client"

import type React from "react"

import { AppShell, ScrollArea, Text, UnstyledButton, Group, rem, ActionIcon } from "@mantine/core"
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
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <UnstyledButton
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
    active?: boolean
    key: string
  }>
}

function NavSection({ title, items }: NavSectionProps) {
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
        return (
          <NavItem
            {...rest}
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

  const mainMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true, key: "dashboard" },

  ]

  const applicationItems = [{ icon: Settings, label: "Layouts", active: false, key: "layouts" }]

  const clinicItems = [
    { icon: Stethoscope, label: "Doctors", active: false, key: "doctors" },
    { icon: Users, label: "Patients", active: false, key: "patients" },
    { icon: Calendar, label: "Appointments", active: false, key: "appointments" },
    { icon: MapPin, label: "Locations", active: false, key: "locations" },
    { icon: Stethoscope, label: "Services", active: false, key: "services" },
    { icon: Settings, label: "Specializations", active: false, key: "specializations" },
    { icon: Settings, label: "Assets", active: false, key: "assets" },
    { icon: Activity, label: "Activities", active: false, key: "activities" },
    { icon: MessageSquare, label: "Messages", active: false, key: "messages" },
  ]

  const hrmItems = [{ icon: UserCheck, label: "Staffs", active: false, key: "staffs" }]

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
          <NavSection title="Main Menu" items={mainMenuItems} />
          <NavSection title="Applications" items={applicationItems} />
          <NavSection title="Clinic" items={clinicItems} />
          <NavSection title="HRM" items={hrmItems} />
        </ScrollArea>
      </AppShell.Navbar>
    </>
  )
}
