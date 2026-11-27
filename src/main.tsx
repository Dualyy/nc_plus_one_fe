import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import UserProvider from './contexts/Provider/UserProvider.tsx';
import VenueProvider from './contexts/Provider/VenueProvider.tsx';

const container = document.getElementById("root");
if (!container) throw new Error("DOM element #root not found");

createRoot(container).render(
  
    <BrowserRouter>
      <UserProvider>
        <VenueProvider>
          <App />
        </VenueProvider>
      </UserProvider>
    </BrowserRouter>
  ,
)
