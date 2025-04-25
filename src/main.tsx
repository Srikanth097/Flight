import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from './context/AuthProvider.tsx';
import { FlightProvider } from './context/FlightContext.tsx';
// import { CartProvider } from './context/CartContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FlightProvider>
      {/* <CartProvider> */}
        <App />
      {/* </CartProvider> */}
      </FlightProvider>
    </AuthProvider>
  </StrictMode>,
)