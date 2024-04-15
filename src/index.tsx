import './styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { ThemeProvider } from 'next-theme-kit';
import AppProvider from '@components/state/app-provider';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Could not find root element in index.html!');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider useLocalStorage useSystem={false}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
