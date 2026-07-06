import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="relative mb-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-gradient-to-br from-[#0F4F4A]/10 to-[#14B8A6]/5">
          <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none">
            <rect x="8" y="20" width="48" height="36" rx="4" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M20 20V16a12 12 0 0 1 24 0v4" stroke="#0F4F4A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="32" cy="38" r="4" fill="#14B8A6" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute inset-0 animate-ping rounded-[32px] bg-[#14B8A6]/5" style={{ animationDuration: "2.5s" }} />
      </div>

      <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-800">
        Your cart is empty
      </h3>
      <p className="mb-8 max-w-xs text-base text-slate-400">
        Explore our architectural plans and add your favorites to get started.
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/pricing")}
        className="group inline-flex items-center gap-2 rounded-2xl bg-[#0F4F4A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(15,79,74,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(15,79,74,0.4)]"
      >
        Browse Designs
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  );
}