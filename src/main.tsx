import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { RouterProviders } from './providers/router-providers';
import { ColorSchemeContext } from './providers/color-scheme-context';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
       <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          colors: {
            dark: [
              '#d5d7e0', '#acaebf', '#8c8fa3', '#666980', '#4d4f66',
              '#34354a', '#2b2c3d', '#1d1e30', '#0c0d21', '#01010a',
            ],
          },
          other: { colorScheme },
        }}
        forceColorScheme={colorScheme}
      >
        <Notifications position="bottom-right" />
        <RouterProviders />
      </MantineProvider>
      </QueryClientProvider>
    </ColorSchemeContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
