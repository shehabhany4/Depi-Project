import { useState } from "react";

const imageModules = import.meta.glob("/src/assets/images/**/*.{avif,jpg,jpeg,png,gif,webp,svg}", {
  eager: true,
  query: { format: "url" },
  import: "default",
});

function resolveImage(path) {
  if (!path) return null;
  const key = path.startsWith("@/") ? path.replace("@", "/src") : path;
  return imageModules[key] || null;
}

export default function FloorPlansSection({ plan }) {
  const images = plan.images?.plans || [];
  const resolved = images.map(resolveImage).filter(Boolean);
  const [current, setCurrent] = useState(0);

  if (!resolved.length) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">Floor Plans</h2>

      <div className="overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={resolved[current]}
          alt={`Floor plan ${current + 1}`}
          className="h-auto w-full object-contain"
        />
      </div>

      {resolved.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {resolved.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-blue-500 ring-inset shadow-md"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-20 w-28 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
