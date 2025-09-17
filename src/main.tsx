import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'

import { RouterProviders } from './providers/router-providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider >
      <RouterProviders />
    </MantineProvider>
  </StrictMode>
)
