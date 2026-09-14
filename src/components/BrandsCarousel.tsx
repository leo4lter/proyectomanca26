import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';
import { Sparkles } from 'lucide-react';

export const BrandsCarousel: React.FC = () => {
  const { brandLogos } = useSiteContent();
  const [paused, setPaused] = useState(false);
  const tripledLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section
      id="marcas"
      className="relative w-full bg-[#03060D] py-16 sm:py-24 overflow-hidden select-none border-t border-b border-[#2A52BE]/20"
    >
      {/* Background glow lines */}
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

      {/* Marquee Carousel Container */}
      <div className="relative w-full overflow-visible py-6 sponsor-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {/* Left & Right gradient fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#03060D] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#03060D] to-transparent z-10 pointer-events-none" />

        <div className={`flex gap-6 sm:gap-10 animate-marquee sponsor-track w-max items-center${paused ? ' marquee-paused' : ''}`}>
          {tripledLogos.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="group relative flex flex-col items-center justify-center w-[180px] sm:w-[220px] h-[95px] sm:h-[115px] px-6 py-4 rounded-2xl bg-[#060B18] border border-white/10 transition-all duration-300 hover:scale-105 hover:z-30 hover:border-[#3870E0] hover:bg-[#0A1636] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] cursor-pointer"
            >
              {/* Logo con grayscale by default, sustancialmente escala e ilumina al hover.
                  LOGOS DE MARCAS: placeholder en public/assets/img/placeholder-marca.svg.
                  Cambialo reemplazando ese archivo o desde el Admin (pestaña Marcas). */}
              <div className="w-full h-full flex items-center justify-center overflow-visible">
                <SmartImage
                  src={resolveImage(brand.logo, PLACEHOLDERS.marca)}
                  fallbackSrc={PLACEHOLDERS.marca}
                  alt={brand.name}
                  className="max-h-[50px] sm:max-h-[62px] max-w-[135px] sm:max-w-[165px] object-contain filter grayscale opacity-45 transition-all duration-300 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.95)]"
                />
              </div>

              {/* Tooltip / Label */}
              <span className="absolute -bottom-3 text-[10px] uppercase tracking-wider text-white font-semibold bg-[#03060D] px-3 py-0.5 rounded-full border border-[#2A52BE] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-[0_0_15px_rgba(42,82,190,0.6)] whitespace-nowrap scale-90 group-hover:scale-100">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
