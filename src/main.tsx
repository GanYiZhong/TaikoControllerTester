import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { KeyBindingsProvider } from './contexts/KeyBindingsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeyBindingsProvider>
      <App />
    </KeyBindingsProvider>
  </StrictMode>
);