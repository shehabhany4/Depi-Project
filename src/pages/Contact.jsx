import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, Send, CheckCircle,
  User, AtSign, FileText
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const heroImages = import.meta.glob("/src/assets/images/homes/Picture_{1,2,3,4,5,6}.avif", {
  eager: true,
  query: { format: "url" },
  import: "default",
});
const heroImageList = Object.values(heroImages);

const showcaseImages = import.meta.glob("/src/assets/images/homes/Picture_{12,13,14,15}.avif", {
  eager: true,
  query: { format: "url" },
  import: "default",
});
const showcaseList = Object.values(showcaseImages);

const stagger = {
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUpFast = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function HeroSlider({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative flex min-h-[500px] items-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004f4f]/90 via-[#004f4f]/50 to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-xl">
          <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold tracking-[0.15em] text-teal-200">
            WE'RE HERE TO HELP
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
            Let's Build Something Beautiful Together
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-white/80">
            Have a question about our house designs or floor plans? The HOMI team is ready
            to help you create the home of your dreams.
          </motion.p>
        </div>
      </motion.div>

      <svg className="absolute -bottom-[2px] left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="#F8FAFA">
        <path d="M0 60 Q360 0 720 30 Q1080 60 1440 0 L1440 60 L0 60 Z" />
      </svg>
    </div>
  );
}

function ShowcaseSlider({ images }) {
  return (
    <motion.div
      className="relative h-full min-h-[400px] overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[0]})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-xl font-bold text-white">Modern Living Spaces</h3>
        <p className="mt-1 text-sm text-white/80">
          Designed with comfort, elegance, and your lifestyle in mind.
        </p>
      </div>
    </motion.div>
  );
}

export function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contacts").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (err) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: "name", label: "Full Name", type: "text", icon: User, required: true, placeholder: "John Doe", col: true },
    { name: "email", label: "Email", type: "email", icon: AtSign, required: true, placeholder: "john@example.com", col: true },
    { name: "phone", label: "Phone", type: "tel", icon: Phone, required: false, placeholder: "+20 123 456 7890", col: false },
    { name: "subject", label: "Subject", type: "text", icon: FileText, required: false, placeholder: "Order Inquiry", col: false },
  ];

  if (sent) {
    return (
      <motion.div
        className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-md text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          >
            <CheckCircle size={40} className="text-green-600" />
          </motion.div>
          <h2 className="mb-2 text-2xl font-bold text-neutral-900">Message Sent!</h2>
          <p className="mb-6 text-neutral-500">
            Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
          </p>
          <div className="flex justify-center gap-3">
            <motion.button
              onClick={() => setSent(false)}
              className="rounded-xl bg-[#008080] px-6 py-2.5 font-medium text-white transition-all hover:bg-[#006666]"
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,128,128,0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Send Another
            </motion.button>
            <motion.button
              onClick={() => navigate("/plans")}
              className="rounded-xl bg-neutral-100 px-6 py-2.5 font-medium text-neutral-700 transition-all hover:bg-neutral-200"
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              Browse Plans
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-[#F8FAFA]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <HeroSlider images={heroImageList.length > 0 ? heroImageList : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"]} />

      <motion.section
        id="contact-form"
        className="relative z-10 mx-auto max-w-7xl px-4 pb-12 mt-8 sm:mt-12 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-5 shadow-xl sm:gap-8 sm:p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <motion.h2
              className="mb-4 text-xl font-bold text-neutral-900 sm:mb-6 sm:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Send Us a Message
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {formFields.map((field) => (
                  <motion.div
                    key={field.name}
                    variants={fadeUpFast}
                  >
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <field.icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#008080] focus:bg-white focus:ring-2 focus:ring-[#008080]/20"
                        required={field.required}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUpFast}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#008080] focus:bg-white focus:ring-2 focus:ring-[#008080]/20"
                  required
                />
              </motion.div>

              <motion.div
                variants={fadeUpFast}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008080] py-3 font-semibold text-white transition-all hover:bg-[#006666] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,128,128,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <><div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending...</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>

          <div className="relative hidden lg:block">
            <ShowcaseSlider images={showcaseList.length > 0 ? showcaseList : ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"]} />
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
