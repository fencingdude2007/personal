import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FrameSequenceProvider } from './context/FrameSequenceContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FrameSequenceProvider>
      <App />
    </FrameSequenceProvider>
  </StrictMode>,
);
