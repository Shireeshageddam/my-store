
import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  addToCart: (product) => set((state) => ({ items: [...state.items, product] })),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
  clearCart: () => set({ items: [] }),
}))
