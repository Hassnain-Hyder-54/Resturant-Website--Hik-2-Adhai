'use client';

import { Toaster } from 'sonner';
import CartDrawer from '@/src/components/CartDrawer';

export default function App({ children }) {
  return (
    <>
      {children}
      <CartDrawer />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
