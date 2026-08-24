'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const existing = get().items.find((entry) => entry.id === item.id);
        set({
          items: existing
            ? get().items.map((entry) =>
                entry.id === item.id
                  ? { ...entry, quantity: Math.min(entry.quantity + 1, 20) }
                  : entry,
              )
            : [...get().items, { ...item, quantity: 1 }],
          isOpen: true,
        });
      },
      setQuantity: (id, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((entry) => entry.id !== id)
              : get().items.map((entry) =>
                  entry.id === id
                    ? { ...entry, quantity: Math.min(quantity, 20) }
                    : entry,
                ),
        }),
      removeItem: (id) =>
        set({ items: get().items.filter((entry) => entry.id !== id) }),
      clearCart: () => set({ items: [], isOpen: false }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'hiik-jamshoro-cart' },
  ),
);
