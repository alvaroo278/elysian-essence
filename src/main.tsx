import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Add Google Fonts
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap';
document.head.appendChild(link);

// Update title
document.title = "Elysian Essence | Perfumes de Lujo";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);