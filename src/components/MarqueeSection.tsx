import React, { useRef, useState, useEffect } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';

export const MarqueeSection: React.FC = () => {
  const { marqueeItems } = useSiteContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Split into two dynamic rows
  const half = Math.ceil(marqueeItems.length / 2);
  const row1Items = marqueeItems.slice(0, half);
  const row2Items = marqueeItems.slice(half).length > 0 ? marqueeItems.slice(half) : marqueeItems;

  // Tripled for infinite feel
  const row1Tripled = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const row2Tripled = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  const row1Transform = `translateX(${offset - 150}px)`;
  const row2Transform = `translateX(${-(offset - 150)}px)`;

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-20 sm:pt-28 md:pt-36 pb-14"
      style={{
        background: 'linear-gradient(180deg, #060A14 0%, #080E1C 50%, #060A14 100%)',
      }}
    >
      {/* Glow background accents */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[250px] bg-[#2A52BE]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[250px] bg-[#1E3A8A]/10 blur-[100px] pointer-events-none" />

      {/* Header bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
            Galería de Producciones & Coberturas
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-4"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Tripled.map((item, index) => (
            <div
              key={`row1-${item.id}-${index}`}
              className="group relative w-[calc(100vw-2.5rem)] max-w-[360px] sm:w-[420px] sm:max-w-none h-[240px] sm:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#0A1226] border border-[#2A52BE]/20 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-[#2A52BE]"
            >
              {/* GALERÍA: placeholder en public/assets/img/placeholder-galeria.svg */}
              <SmartImage
                src={resolveImage(item.image, PLACEHOLDERS.galeria)}
                fallbackSrc={PLACEHOLDERS.galeria}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark vignette gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/50 to-transparent" />

              {/* Tag pill */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#060A14]/80 border border-[#2A52BE]/60 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#93C5FD] uppercase">
                  {item.tag}
                </span>
              </div>

              {/* Title and Category */}
              <div className="absolute bottom-3.5 left-4 right-4 flex flex-col">
                <span className="text-[11px] font-medium tracking-widest text-[#60A5FA] uppercase">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-tight mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-4"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Tripled.map((item, index) => (
            <div
              key={`row2-${item.id}-${index}`}
              className="group relative w-[calc(100vw-2.5rem)] max-w-[360px] sm:w-[420px] sm:max-w-none h-[240px] sm:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#0A1226] border border-[#2A52BE]/20 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-[#2A52BE]"
            >
              <SmartImage
                src={resolveImage(item.image, PLACEHOLDERS.galeria)}
                fallbackSrc={PLACEHOLDERS.galeria}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/50 to-transparent" />

              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#060A14]/80 border border-[#2A52BE]/60 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#93C5FD] uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-3.5 left-4 right-4 flex flex-col">
                <span className="text-[11px] font-medium tracking-widest text-[#60A5FA] uppercase">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-tight mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
