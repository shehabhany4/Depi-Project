import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

const fmt = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

function SummaryRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${accent ? "font-medium text-[#14B8A6]" : "text-white/60"}`}>
        {label}
      </span>
      <span className={`text-sm ${accent ? "font-semibold text-[#14B8A6]" : "font-medium text-white/80"}`}>
        {value}
      </span>
    </div>
  );
}

export default function CheckoutSummary({ items, subtotal, siteAdaptation, deposit, tax, dueToday, loading, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative overflow-hidden rounded-[28px] shadow-[0_8px_32px_rgba(15,79,74,0.25),0_32px_64px_rgba(15,79,74,0.15)]"
    >
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F4F4A] to-[#071e1c]" />
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#14B8A6]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#14B8A6]/5 blur-3xl" />

      <div className="relative z-10 p-7">
        <h3 className="mb-6 text-lg font-semibold text-white">Order Summary</h3>

        {/* Items */}
        <div className="mb-5 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-white/10">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#14B8A6]">
                  Architectural Plan
                </p>
                <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/50">${item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-5 h-px w-full bg-white/10" />

        {/* Breakdown */}
        <div className="space-y-3">
          <SummaryRow label="Plan Fee" value={fmt(subtotal)} />
          <SummaryRow label="Site Adaptation (Est.)" value={fmt(siteAdaptation)} />
          <SummaryRow label="Initial Deposit (20%)" value={fmt(deposit)} accent />
          <SummaryRow label="Estimated Tax" value={fmt(tax)} />
        </div>

        <div className="my-5 h-px w-full bg-white/10" />

        {/* Due Today */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Due Today</p>
            <p className="text-3xl font-bold tracking-tight text-white">{fmt(dueToday)}</p>
          </div>
          <p className="text-xs text-white/30">20% deposit</p>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          disabled={loading || items.length === 0}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#14B8A6] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(20,184,166,0.4)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(20,184,166,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>Confirm & Pay Deposit</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </>
          )}
        </motion.button>

        <div className="mt-4 flex items-center justify-center gap-2 text-white/30">
          <Lock className="h-3.5 w-3.5" />
          <span className="text-xs">Encrypted &amp; Secure Payment</span>
        </div>
      </div>
    </motion.div>
  );
}