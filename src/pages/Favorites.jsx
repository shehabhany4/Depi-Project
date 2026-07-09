// src/pages/Favorites.jsx
import { useNavigate } from "react-router-dom";
import { useFavoritesQuery } from "@/features/favorites/hooks/useFavorites";
import HousePlanCard from "@/components/houses/HousePlanCard";
import { Heart, Search } from "lucide-react";
import { motion } from "framer-motion";
import favBg from "/src/assets/images/favBackground.png";

export function Favorites() {
  const navigate = useNavigate();
  const { data: favorites, isLoading } = useFavoritesQuery();

  // ✅ Loading state with spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const favoritePlans = (favorites || [])
    .filter((f) => f.plans?.status !== "sold_out")
    .map((f) => f.plans)
    .filter(Boolean); // ✅ remove any null/undefined

  // ✅ Empty state (after loading finishes)
  if (favoritePlans.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your favorites are empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any favorites yet.
          </p>
          <button
            onClick={() => navigate("/plans")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8    py-3 rounded-xl font-medium transition-colors mt-5"
          >
            Browse Plans
          </button>
        </div>
      </div>
    );
  }

  // ✅ Has favorites
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-10 overflow-hidden rounded-3xl"
        style={{ minHeight: "clamp(260px, 30vw, 360px)" }}
      >
        {/* Background image */}
        <img
          src={favBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,125,123,0.85) 0%, rgba(23,167,162,0.7) 100%)" }} />

        {/* Glow behind title */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)" }}
        />

        {/* Blueprint construction grid */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-[0.06] pointer-events-none overflow-hidden hidden md:block">
          <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal guide lines */}
            <line x1="0" y1="40" x2="500" y2="40" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="160" x2="500" y2="160" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="200" x2="500" y2="200" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="240" x2="500" y2="240" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="280" x2="500" y2="280" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="320" x2="500" y2="320" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="360" x2="500" y2="360" stroke="white" strokeWidth="0.5" />
            {/* Vertical guide lines */}
            <line x1="40" y1="0" x2="40" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="80" y1="0" x2="80" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="120" y1="0" x2="120" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="160" y1="0" x2="160" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="240" y1="0" x2="240" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="280" y1="0" x2="280" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="320" y1="0" x2="320" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="360" y1="0" x2="360" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="400" y1="0" x2="400" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="440" y1="0" x2="440" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="480" y1="0" x2="480" y2="400" stroke="white" strokeWidth="0.5" />
            {/* Perspective lines */}
            <line x1="250" y1="50" x2="0" y2="400" stroke="white" strokeWidth="0.3" strokeDasharray="3,4" />
            <line x1="250" y1="50" x2="500" y2="400" stroke="white" strokeWidth="0.3" strokeDasharray="3,4" />
            {/* Measurement marks */}
            <line x1="10" y1="40" x2="10" y2="45" stroke="white" strokeWidth="0.5" />
            <line x1="20" y1="40" x2="20" y2="45" stroke="white" strokeWidth="0.5" />
            <text x="12" y="38" fill="white" fontSize="4" opacity="0.5">+0.00</text>
            <text x="12" y="78" fill="white" fontSize="4" opacity="0.5">+3.00</text>
            <text x="12" y="118" fill="white" fontSize="4" opacity="0.5">+6.00</text>
            <text x="12" y="158" fill="white" fontSize="4" opacity="0.5">+9.00</text>
            <text x="12" y="198" fill="white" fontSize="4" opacity="0.5">+12.00</text>
            {/* Architectural drafting marks */}
            <circle cx="250" cy="50" r="3" stroke="white" strokeWidth="0.3" fill="none" />
            <circle cx="250" cy="50" r="1.5" stroke="white" strokeWidth="0.3" fill="none" />
            <line x1="247" y1="50" x2="253" y2="50" stroke="white" strokeWidth="0.3" />
            <line x1="250" y1="47" x2="250" y2="53" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Right side decorative glow */}
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-2xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(23,167,162,0.3) 0%, transparent 60%)" }}
        />



        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 md:py-20" style={{ minHeight: "clamp(260px, 30vw, 360px)" }}>
          {/* Floating sparkles */}
          <motion.svg
            animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute top-14 left-[18%] w-3 h-3 text-white/30 hidden sm:block"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 0L7.35 4.65L12 6L7.35 7.35L6 12L4.65 7.35L0 6L4.65 4.65Z" />
          </motion.svg>
          <motion.svg
            animate={{ y: [0, -10, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-20 right-[22%] w-2.5 h-2.5 text-white/25 hidden sm:block"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 0L7.35 4.65L12 6L7.35 7.35L6 12L4.65 7.35L0 6L4.65 4.65Z" />
          </motion.svg>
          <motion.svg
            animate={{ y: [0, -6, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            className="absolute top-10 right-[35%] w-2 h-2 text-white/20 hidden sm:block"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 0L7.35 4.65L12 6L7.35 7.35L6 12L4.65 7.35L0 6L4.65 4.65Z" />
          </motion.svg>
          <motion.svg
            animate={{ y: [0, -7, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 left-[28%] w-2 h-2 text-white/20 hidden sm:block"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 0L7.35 4.65L12 6L7.35 7.35L6 12L4.65 7.35L0 6L4.65 4.65Z" />
          </motion.svg>

          {/* Floating dots */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-24 left-[30%] w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-16 right-[30%] w-1 h-1 rounded-full bg-white/15 hidden sm:block"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight"
          >
            Favorites
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-4 max-w-lg text-lg sm:text-xl text-white/80 leading-relaxed"
          >
            Your saved house plans, all in one place. Browse, compare, and access your favorite designs anytime.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            whileHover={{ y: -3, scale: 1.03, boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/plans")}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-teal-50"
            style={{ color: "#0B7D7B", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
          >
            <Search size={18} />
            Browse More Plans
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoritePlans.map((plan) => (
          <HousePlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}