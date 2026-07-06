import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  CartHeader,
  CartItemCard,
  OrderSummary,
  EmptyCart,
  useCartSummary,
} from "@/features/cart";
import FooterSection from "@/features/Home/components/FooterSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

export const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQty, subtotal, siteAdaptation, total, isEmpty } =
    useCartSummary();

  return (
    <>
     <section className="relative min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] px-6 pb-24 pt-10">
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0F4F4A 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <CartHeader />

        {isEmpty ? (
          <EmptyCart />
        ) : (

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px] lg:gap-12 xl:grid-cols-[1fr_420px]">
            {/* Left: Items */}
            <div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onRemove={removeItem}
                      onQtyChange={updateQty}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Add Another Design */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate("/pricing")}
                className="group mt-6 inline-flex items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-5 py-3 text-sm font-medium text-slate-500 transition-all hover:border-[#14B8A6]/50 hover:bg-white hover:text-[#14B8A6]"
              >
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                Add Another Design
              </motion.button>
            </div>

            {/* Right: Summary */}
            <div className="self-start">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                siteAdaptation={siteAdaptation}
                total={total}
              />
            </div>
          </div>
        )}
      </div>
    </section>
    <FooterSection/>
    </>
  );
};