import { motion } from "framer-motion";
import { CreditCard, Lock, User } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
};

function Field({ label, id, placeholder, icon: Icon, register, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          placeholder={placeholder}
          {...(register ? register(id) : {})}
          className={`w-full rounded-2xl border bg-white py-3.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all duration-200
            focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10
            ${Icon ? "pl-11 pr-4" : "px-4"}
            ${error ? "border-red-300" : "border-slate-200 hover:border-slate-300"}`}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
      </div>
    </div>
  );
}

export default function PaymentForm({ register, errors }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.05)] transition-shadow duration-500 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.07)] md:p-10"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#14B8A6] to-[#0F4F4A] transition-transform duration-500 group-hover:scale-x-100" />

      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#14B8A6]/10">
          <CreditCard className="h-5 w-5 text-[#14B8A6]" strokeWidth={1.8} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          Payment Method
        </h2>
      </div>

      {/* Card brands + SSL */}
      <div className="mb-6 flex items-center gap-2">
        {["VISA", "MC", "AMEX"].map((brand) => (
          <div key={brand} className="flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3">
            <span className="text-[10px] font-bold tracking-wider text-slate-400">{brand}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3 w-3" />
          <span>256-bit SSL</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Field label="Cardholder Name" id="cardName" placeholder="John Smith" icon={User} register={register} error={errors?.cardName} />
        <Field label="Card Number" id="cardNumber" placeholder="•••• •••• •••• ••••" icon={CreditCard} register={register} error={errors?.cardNumber} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expiry Date" id="expiry" placeholder="MM / YY" register={register} error={errors?.expiry} />
          <Field label="CVC" id="cvc" placeholder="•••" register={register} error={errors?.cvc} />
        </div>
      </div>
    </motion.div>
  );
}