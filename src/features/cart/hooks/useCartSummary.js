import { useCartStore } from "@/store/cartStore";
import { SITE_ADAPTATION_FEE } from "../constants/cartData";

export function useCartSummary() {
  const { items, removeItem, updateQty } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const siteAdaptation = items.length > 0 ? SITE_ADAPTATION_FEE : 0;
  const total = subtotal + siteAdaptation;

  return {
    items,
    removeItem,
    updateQty,
    subtotal,
    siteAdaptation,
    total,
    isEmpty: items.length === 0,
  };
}