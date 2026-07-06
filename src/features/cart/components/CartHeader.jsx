import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  { id: 1, label: "Cart", icon: ShoppingCart },
  { id: 2, label: "Checkout", icon: CreditCard },
  { id: 3, label: "Confirmed", icon: CheckCircle },
];

export default function CartHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      {/* Progress Stepper */}
      <div className="mb-10 flex items-center justify-center gap-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = step.id === 1;
          const isDone = step.id < 1;
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#14B8A6] bg-[#14B8A6] text-white shadow-[0_0_0_4px_rgba(20,184,166,0.15)]"
                      : isDone
                      ? "border-[#14B8A6] bg-[#14B8A6] text-white"
                      : "border-slate-200 bg-white text-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-[#14B8A6]" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-3 mb-5 h-px w-16 bg-slate-200 md:w-24" />
              )}
            </div>
          );
        })}
      </div>

      {/* Title */}
      <div className="flex items-end justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-10 bg-teal-500/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-500">
              Your Selections
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Design Selections
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Review your architectural plans before proceeding to checkout.
          </p>
        </div>
      </div>
    </motion.div>
  );
}