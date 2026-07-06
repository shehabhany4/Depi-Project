import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import {
  CheckoutHeader,
  ProjectDetailsForm,
  PaymentForm,
  CheckoutSummary,
  SuccessScreen,
  useCheckoutForm,
} from "@/features/checkout";
import FooterSection from "@/features/Home/components/FooterSection";

export const Checkout = () => {
  const { register, handleSubmit: handleRHFSubmit, formState: { errors } } = useForm();
  const { items, subtotal, siteAdaptation, deposit, tax, dueToday, submitted, loading, handleSubmit } =
    useCheckoutForm();

  return (
    <>
    <section className="relative min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] px-6 pb-24 pt-10">
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0F4F4A 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessScreen key="success" />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckoutHeader currentStep={2} />

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12 xl:grid-cols-[1fr_420px]">

                {/* Left: Forms */}
                <div className="flex flex-col gap-6">
                  <ProjectDetailsForm register={register} errors={errors} />
                  <PaymentForm register={register} errors={errors} />
                </div>

                {/* Right: Summary sticky */}
                <div className="sticky top-8 self-start">
                  <CheckoutSummary
                    items={items}
                    subtotal={subtotal}
                    siteAdaptation={siteAdaptation}
                    deposit={deposit}
                    tax={tax}
                    dueToday={dueToday}
                    loading={loading}
                    onSubmit={handleRHFSubmit(handleSubmit)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    <FooterSection/>
    </>
  );
};