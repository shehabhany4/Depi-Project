import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { SITE_ADAPTATION_FEE } from "@/features/cart/constants/cartData";

export function useCheckoutForm() {
  const { items, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const siteAdaptation = items.length > 0 ? SITE_ADAPTATION_FEE : 0;
  const deposit = Math.round((subtotal + siteAdaptation) * 0.2);
  const tax = Math.round(deposit * 0.08);
  const dueToday = deposit + tax;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    clearCart();
  };

  return { items, subtotal, siteAdaptation, deposit, tax, dueToday, submitted, loading, handleSubmit };
}