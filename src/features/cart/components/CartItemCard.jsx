import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";

const fmt = (n) => "$" + n.toLocaleString("en-US");

export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.96,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CartItemCard({ item, onRemove, onQtyChange }) {
  return (
    <motion.div
      layout
      variants={itemVariants}
      exit="exit"
      whileHover={{ y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.05)] transition-shadow duration-500 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08),0_0_0_1px_rgba(20,184,166,0.1)]"
    >
      {/* Teal top border on hover */}
      <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#14B8A6] to-[#0F4F4A] transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56 md:w-64">
          <motion.img
            src={item.image}
            alt={item.title}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full object-cover"
          />
          {/* Price badge */}
          <div className="absolute bottom-3 left-3 rounded-xl bg-[#0F4F4A]/90 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-sm font-bold text-white">{fmt(item.price)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <span className="mb-3 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#14B8A6]">
              Architectural Plan
            </span>
            <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 md:text-base">
              {item.description}
            </p>
          </div>

          <div className="my-5 h-px w-full bg-slate-100" />

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={() => onQtyChange(item.id, item.qty - 1)}
                disabled={item.qty <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-white hover:text-slate-800 hover:shadow-sm disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-slate-800">
                {item.qty}
              </span>
              <button
                onClick={() => onQtyChange(item.id, item.qty + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-white hover:text-slate-800 hover:shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14B8A6] transition-opacity hover:opacity-60">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <button
                onClick={() => onRemove(item.id)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-400 transition-opacity hover:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}