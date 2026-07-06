import { motion } from "framer-motion";
import { ArrowRight, Shield, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fmt = (n) => "$" + n.toLocaleString("en-US");

function LineItem({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/60">{label}</span>
      <span className={`text-sm font-medium ${accent ? "text-[#14B8A6]" : "text-white/90"}`}>
        {value}
      </span>
    </div>
  );
}

export default function OrderSummary({ items, subtotal, siteAdaptation, total }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="sticky overflow-hidden rounded-[28px] shadow-[0_8px_32px_rgba(15,79,74,0.25),0_32px_64px_rgba(15,79,74,0.15)]"
    >
      {/* Dark gradient background — الـ signature element */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F4F4A] to-[#071e1c]" />

      {/* Subtle radial glow */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#14B8A6]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#14B8A6]/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 p-7">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold  text-white">Order Summary</h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
            {items.length} {items.length === 1 ? "Plan" : "Plans"}
          </span>
        </div>

        {/* Line Items */}
        <div className="space-y-3.5">
          <LineItem label={`Subtotal (${items.length} ${items.length === 1 ? "Plan" : "Plans"})`} value={fmt(subtotal)} />
          <LineItem label="Site Adaptation Est." value={fmt(siteAdaptation)} />
          <LineItem label="Consultation Fee" value="Waived" accent />
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-white/10" />

        {/* Total */}
        <div className="mb-6">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-white/40">
            Total Amount
          </p>
          <p className="text-4xl font-bold tracking-tight text-white">
            {fmt(total)}
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/checkout")}
          disabled={items.length === 0}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#14B8A6] py-4 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(20,184,166,0.4)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(20,184,166,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          {/* shimmer on hover */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>

        {/* Trust badges */}
        <div className="mt-5 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 text-white/40">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-xs">Secure payment</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 text-white/40">
            <Tag className="h-3.5 w-3.5" />
            <span className="text-xs">Best price guarantee</span>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-white/25">
          Prices are estimates and subject to final site survey.
        </p>
      </div>
    </motion.div>
  );
}