import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessScreen() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="relative mb-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#0F4F4A] to-[#14B8A6] shadow-[0_8px_32px_rgba(20,184,166,0.4)]">
          <CheckCircle className="h-14 w-14 text-white" strokeWidth={1.5} />
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#14B8A6]/20"
        />
      </div>

      <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
        Order Confirmed!
      </h2>
      <p className="mb-2 max-w-sm text-base text-slate-500">
        Your deposit has been received. Our team will contact you within 24 hours to begin the project.
      </p>
      <p className="mb-10 text-sm font-medium text-[#14B8A6]">
        Confirmation sent to your email.
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        className="group inline-flex items-center gap-2 rounded-2xl bg-[#0F4F4A] px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(15,79,74,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(15,79,74,0.4)]"
      >
        Back to Home
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  );
}