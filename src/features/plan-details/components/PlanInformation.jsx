import { Heart, Ruler, BedDouble, Bath, Building2, Warehouse, Move, Maximize2, Grid3x3, Layers, Triangle, Hammer, Shield } from "lucide-react";
import { useFavorites } from "@/store/useFavorites";

function formatPrice(price) {
  return `EGP ${Number(price).toLocaleString("en-EG")}`;
}

function DetailCard({ icon: Icon, label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-center gap-3 rounded-xl bg-neutral-50 p-4 transition-shadow hover:shadow-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white shadow-sm">
        <Icon size={16} className="text-teal-600" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</p>
        <p className="text-sm font-semibold text-neutral-800 truncate">{value}</p>
      </div>
    </div>
  );
}

function SpecTag({ children }) {
  return (
    <span className="inline-block rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700">
      {children}
    </span>
  );
}

export default function PlanInformation({ plan }) {
  const favoriteIds = useFavorites((s) => s.favoriteIds);
  const toggleFavorite = useFavorites((s) => s.toggleFavorite);
  const isFav = favoriteIds.includes(plan.id);

  const f = plan.filters || {};
  const dims = plan.dimensions || {};
  const area = plan.area_breakdown || {};
  const roof = plan.roof || {};

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">{plan.title}</h1>
            <p className="mt-2 text-2xl font-bold text-teal-600">{formatPrice(plan.price_egp)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {f.style && <SpecTag>{f.style}</SpecTag>}
              {f.plan_type && <SpecTag>{f.plan_type}</SpecTag>}
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(plan.id)}
            className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
              isFav ? "bg-red-50 text-red-500" : "bg-neutral-100 text-neutral-500 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Plan Specifications</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <DetailCard icon={Ruler} label="Living Area" value={`${f.total_area_m2} m²`} />
          <DetailCard icon={BedDouble} label="Bedrooms" value={f.bedrooms} />
          <DetailCard icon={Bath} label="Bathrooms" value={f.bathrooms} />
          <DetailCard icon={Building2} label="Floors / Stories" value={f.floors} />
          <DetailCard icon={Warehouse} label="Garage" value={f.garage?.cars ? `${f.garage.cars}-Car ${f.garage.type}` : null} />
          <DetailCard icon={Move} label="Width" value={dims.width_m ? `${dims.width_m} m` : null} />
          <DetailCard icon={Maximize2} label="Depth" value={dims.depth_m ? `${dims.depth_m} m` : null} />
          <DetailCard icon={Grid3x3} label="Total Area" value={area.total_m2 ? `${area.total_m2} m²` : null} />
          <DetailCard icon={Layers} label="First Floor" value={area.first_floor_m2 ? `${area.first_floor_m2} m²` : null} />
          <DetailCard icon={Triangle} label="Roof Pitch" value={roof.primary_pitch || null} />
          <DetailCard icon={Hammer} label="Framing" value={roof.framing_type || null} />
          <DetailCard icon={Shield} label="Foundation" value={plan.foundation?.length ? plan.foundation.join(", ") : null} />
        </div>
      </div>


    </div>
  );
}
