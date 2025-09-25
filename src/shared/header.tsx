"use client"


import { AppShell, Group, Text, TextInput, ActionIcon, Menu, Avatar, UnstyledButton } from "@mantine/core"
import { useColorScheme } from "../providers/color-scheme-context";
import { useSidebar } from "../hooks/use-sidebar"
import { useHeaderTitle } from "../providers/header-title-provider"
import { useLogout } from "../config/querys/login-query"
import { Menu as IconMenu2, Search as IconSearch, Bell as IconBell, Sun as IconSun, ChevronDown as IconChevronDown, User as IconUser, Settings as IconSettings, LogOut as IconLogout } from "lucide-react"


export function Header() {
  const { toggleSidebar } = useSidebar()
  const { headerTitle } = useHeaderTitle()
  const logoutMutation = useLogout()

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <ActionIcon variant="subtle" size="lg" onClick={toggleSidebar} className="lg:hidden">
            <IconMenu2 size={18} />
          </ActionIcon>
          <Text size="xl" fw={600} className="ml-0 lg:ml-12">
            {headerTitle}
          </Text>
        </Group>

        <Group>
          <TextInput
            placeholder="Search"
            leftSection={<IconSearch size={16} />}
            style={{ width: 300 }}
            visibleFrom="md"
          />

          <ActionIcon variant="subtle" size="lg">
            <IconBell size={18} />
          </ActionIcon>

          <ActionIcon variant="subtle" size="lg" onClick={toggleColorScheme} title="Toggle color scheme">
            <IconSun size={18} color={isDark ? '#facc15' : undefined} />
          </ActionIcon>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar size={32} radius="xl" />
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      John Doe
                    </Text>
                    <Text size="xs" c="dimmed">
                      Administrator
                    </Text>
                  </div>
                  <IconChevronDown size={14} />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
              <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout size={14} />}
                color="red"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  )
}
