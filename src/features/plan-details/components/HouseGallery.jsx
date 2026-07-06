import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

export default function HouseGallery({ images }) {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  const goTo = useCallback((i) => {
    if (i >= 0 && i < images.length) {
      setCurrent(i);
      carouselRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  }, [images.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== current) setCurrent(idx);
  }, [current]);

  if (!images?.length) return null;

  /* ───────── Desktop layout ───────── */
  const desktop = (
    <div className="hidden h-full flex-row gap-4 md:flex">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-neutral-100">
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
          <Home size={14} />
          Tour
        </div>

        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-full w-full object-cover transition-opacity duration-300"
            style={{ opacity: i === current ? 1 : 0, position: i === current ? "relative" : "absolute", inset: 0 }}
          />
        ))}

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={20} className="text-neutral-700" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronRight size={20} className="text-neutral-700" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto md:h-full md:w-52 md:shrink-0 md:flex-col md:overflow-x-hidden md:gap-2">
        {images.map((src, i) => (
          <button
            key={`thumb-${i}`}
            onClick={() => goTo(i)}
            className={`shrink-0 overflow-hidden rounded-xl transition-all duration-300 md:flex-1 ${
              i === current
                ? "ring-2 ring-blue-500 ring-inset shadow-md"
                : "opacity-70 hover:opacity-100 hover:scale-[1.02]"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );

  /* ───────── Mobile carousel ───────── */
  const mobile = (
    <div className="flex flex-col md:hidden">
      <div className="relative aspect-video w-full">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto rounded-2xl bg-neutral-100 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((src, i) => (
            <div key={`slide-${i}`} className="relative h-full w-full shrink-0 snap-start">
              <img src={src} alt="" className="h-full w-full object-cover" />
              {i === 0 && (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
                  <Home size={14} />
                  Tour
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition-transform active:scale-90"
        >
          <ChevronLeft size={18} className="text-neutral-700" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition-transform active:scale-90"
        >
          <ChevronRight size={18} className="text-neutral-700" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 py-3">
        {images.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-neutral-800" : "w-2 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {desktop}
      {mobile}
    </>
  );
}
