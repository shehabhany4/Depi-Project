import { create } from "zustand";
import { INITIAL_CART_ITEMS, SITE_ADAPTATION_FEE } from "@/features/cart/constants/cartData";

export const useCartStore = create((set, get) => ({
  items: INITIAL_CART_ITEMS,

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...item, qty: 1 }] }));
    }
  },

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQty: (id, qty) => {
    if (qty < 1) return;
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),
}));