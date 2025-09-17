import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css';

import { RouterProviders } from './providers/router-providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider >
      <Notifications position="bottom-right" />
      <RouterProviders />
    </MantineProvider>
  </StrictMode>
)
