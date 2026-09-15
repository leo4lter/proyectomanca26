import React, { useState, useEffect, useRef } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';
import { Sparkles, X } from 'lucide-react';
import type { BrandItem } from '../types';

export const BrandsCarousel: React.FC = () => {
  const { brandLogos } = useSiteContent();
  const [paused, setPaused] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  const tripledLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  useEffect(() => {
    if (!selectedBrand) return;
    lightboxCloseRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedBrand(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedBrand]);

  return (
    <>
      <section
        id="marcas"
        className="relative w-full bg-[#03060D] py-16 sm:py-24 overflow-hidden select-none border-t border-b border-[#2A52BE]/20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[160px] bg-[#2A52BE]/10 blur-[90px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-10 sm:mb-12 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1B3E] border border-[#2A52BE]/40 text-xs tracking-widest uppercase text-[#93C5FD] mb-2.5 font-medium shadow-[0_0_15px_rgba(42,82,190,0.3)]">
            <Sparkles className="w-3 h-3 text-[#3B82F6]" />
            <span>CONFIANZA & ALIANZAS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Marcas & Comercios que Trabajan con Nosotros
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
            Impulsando el crecimiento conjunto de la región en transmisiones masivas, patrocinios y medios digitales.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden py-6 sponsor-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#03060D] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#03060D] to-transparent z-10 pointer-events-none" />

          <div
            className={`flex gap-6 sm:gap-10 animate-marquee sponsor-track w-max items-center${
              paused ? ' marquee-paused' : ''
            }`}
          >
            {tripledLogos.map((brand, idx) => (
              <button
                key={`${brand.id}-${idx}`}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className="group relative flex flex-col items-center justify-center w-[180px] sm:w-[220px] h-[95px] sm:h-[115px] px-6 py-4 rounded-2xl bg-[#060B18] border border-white/10 transition-all duration-300 hover:scale-110 hover:z-30 hover:border-[#3870E0] hover:bg-[#0A1636] hover:shadow-[0_0_40px_rgba(59,130,246,0.85)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#03060D]"
                aria-label={`Ver ${brand.name}`}
              >
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <SmartImage
                    src={resolveImage(brand.logo, PLACEHOLDERS.marca)}
                    fallbackSrc={PLACEHOLDERS.marca}
                    alt={brand.name}
                    className="max-h-[50px] sm:max-h-[62px] max-w-[135px] sm:max-w-[165px] object-contain filter grayscale opacity-50 transition-all duration-300 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]"
                  />
                </div>

                <span className="absolute -bottom-3 text-[10px] uppercase tracking-wider text-white font-semibold bg-[#03060D] px-3 py-0.5 rounded-full border border-[#2A52BE] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-[0_0_15px_rgba(42,82,190,0.6)] whitespace-nowrap scale-90 group-hover:scale-100">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedBrand && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedBrand(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedBrand.name}
            className="relative w-full max-w-lg rounded-3xl bg-[#0A1224] border-2 border-[#2A52BE] shadow-[0_0_80px_rgba(42,82,190,0.6)] overflow-hidden animate-[projIn_0.4s_ease_both]"
          >
            <button
              ref={lightboxCloseRef}
              type="button"
              onClick={() => setSelectedBrand(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center p-8 sm:p-12 gap-6">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-[#060B18] border border-[#2A52BE]/40 flex items-center justify-center overflow-hidden p-6">
                <SmartImage
                  src={resolveImage(selectedBrand.logo, PLACEHOLDERS.marca)}
                  fallbackSrc={PLACEHOLDERS.marca}
                  alt={selectedBrand.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="text-center">
                {selectedBrand.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#2A52BE]/20 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-3">
                    {selectedBrand.category}
                  </span>
                )}
                <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                  {selectedBrand.name}
                </h4>
                <p className="text-sm text-[#94A3B8] font-light mt-2">
                  Trabajando junto a Manca para impulsar el crecimiento de nuestra región.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
