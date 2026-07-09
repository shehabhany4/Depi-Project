// src/pages/Favorites.jsx
import { useNavigate } from "react-router-dom";
import { useFavoritesQuery } from "@/features/favorites/hooks/useFavorites";
import HousePlanCard from "@/components/houses/HousePlanCard";
import { Heart } from "lucide-react"; // or any icon you have

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
      <h1 className="text-4xl font-bold mb-6  ">Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoritePlans.map((plan) => (
          <HousePlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}