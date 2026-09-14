import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';
import { MancaScriptLogo, MancaCircularIcon, RotatingStampBadge } from './MancaBrand';
import {
  Sparkles,
  ArrowRight,
  Tv,
  Globe,
  Radio,
  Video,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenContact?: () => void;
}
export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { customIconUrl, customFooterLogoUrl, siteTexts } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'El Canal', href: '#canal' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none bg-[#060A14] text-white"
      style={{
        background: 'radial-gradient(ellipse 85% 75% at 50% 30%, #0C1A3E 0%, #060A14 65%, #03050B 100%)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-none h-[450px] bg-[#2A52BE]/18 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-1/2 -translate-x-[560px] w-[350px] h-[350px] bg-[#1E3A8A]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/2 translate-x-[210px] w-[350px] h-[350px] bg-[#2A52BE]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="absolute top-[14%] left-[2%] sm:left-[4%] md:left-[6%] z-10 pointer-events-none hidden sm:block">
        <Magnet padding={120} strength={4}>
          <FadeIn delay={0.2} x={-60} y={0} duration={1}>
            <div className="w-[100px] sm:w-[130px] md:w-[170px] h-[100px] sm:h-[130px] md:h-[170px] rounded-full bg-gradient-to-br from-[#2A52BE]/40 to-transparent blur-2xl opacity-85" />
          </FadeIn>
        </Magnet>
      </div>

      <div className="absolute top-[16%] right-[2%] sm:right-[4%] md:right-[6%] z-10 pointer-events-none hidden sm:block">
        <Magnet padding={120} strength={4}>
          <FadeIn delay={0.25} x={60} y={0} duration={1}>
            <div className="w-[100px] sm:w-[130px] md:w-[170px] h-[100px] sm:h-[130px] md:h-[170px] rounded-3xl bg-gradient-to-br from-[#1E3A8A]/40 to-transparent blur-2xl opacity-85 rotate-12" />
          </FadeIn>
        </Magnet>
      </div>

      <div className="absolute bottom-[16%] left-[3%] sm:left-[6%] md:left-[8%] z-10 pointer-events-none hidden md:block">
        <Magnet padding={100} strength={5}>
          <FadeIn delay={0.35} x={-40} y={20} duration={1}>
            <div className="w-[90px] sm:w-[120px] md:w-[150px] h-[90px] sm:h-[120px] md:h-[150px] rounded-full border-2 border-[#2A52BE]/30 bg-[#2A52BE]/10 blur-md opacity-75" />
          </FadeIn>
        </Magnet>
      </div>

      <div className="absolute bottom-[16%] right-[3%] sm:right-[6%] md:right-[8%] z-10 pointer-events-none hidden md:block">
        <Magnet padding={100} strength={5}>
          <FadeIn delay={0.4} x={40} y={20} duration={1}>
            <div className="w-[110px] sm:w-[140px] md:w-[180px] h-[110px] sm:h-[140px] md:h-[180px] rounded-full bg-gradient-to-tl from-[#3870E0]/30 to-transparent blur-2xl opacity-75" />
          </FadeIn>
        </Magnet>
      </div>

      <header className="relative z-40 w-full px-5 sm:px-8 md:px-12 py-5 sm:py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="#inicio"
            className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
          >
            {resolveImage(customIconUrl, PLACEHOLDERS.logo) ? (
              <SmartImage
                src={resolveImage(customIconUrl, PLACEHOLDERS.logo)}
                fallbackSrc={PLACEHOLDERS.logo}
                alt="Manca Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#2A52BE] shadow-[0_0_20px_rgba(42,82,190,0.5)]"
              />
            ) : (
              <MancaCircularIcon size={42} interactive={true} />
            )}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-1.5 leading-tight">
                MANCA
                <span className="inline-block w-2 h-2 rounded-full bg-[#3870E0] animate-pulse" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-[#93C5FD] uppercase">
                Productora & Agencia 360
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A142A]/80 border border-[#2A52BE]/40 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] hover:text-white hover:bg-[#2A52BE]/20 transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <ContactButton
              label="Contáctanos"
              onClick={onOpenContact}
              size="sm"
              className="shadow-[0_0_25px_rgba(42,82,190,0.4)]"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#0A142A] border border-[#2A52BE]/40 text-white hover:bg-[#12224A] transition-colors cursor-pointer"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 rounded-2xl bg-[#081022] border border-[#2A52BE]/50 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-[#CBD5E1] hover:text-white hover:bg-[#2A52BE]/20 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#2A52BE]/20">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact?.();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#162B75] via-[#2A52BE] to-[#3870E0] text-white text-xs font-bold uppercase tracking-wider text-center shadow-lg"
                >
                  Contáctanos Ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-8 sm:py-14 text-center max-w-6xl mx-auto w-full">
        <FadeIn delay={0.05} y={20}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#101D42]/90 border border-[#2A52BE]/60 text-xs sm:text-sm tracking-widest uppercase text-[#93C5FD] mb-6 shadow-[0_0_30px_rgba(42,82,190,0.4)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#60A5FA]" />
            <span className="font-bold text-white">{siteTexts.heroSlogan || '#ConectandoPersonas'}</span>
            <span className="text-[#3B82F6] font-normal">•</span>
            <span>{siteTexts.heroHeadline || 'MANCA'}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={30} className="w-full">
          <h1
            id="hero-heading"
            className="hero-heading hero-heading-glow font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 150px)' }}
          >
            {siteTexts.heroHeadline || 'MANCA'}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15} y={20} duration={0.8} className="my-3 sm:my-5">
          <div className="relative inline-block hover:scale-105 transition-transform duration-300">
            <RotatingStampBadge size={130} customIconUrl={resolveImage(customIconUrl || customFooterLogoUrl, PLACEHOLDERS.logo)} />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="w-full max-w-3xl">
          <p className="text-base sm:text-lg md:text-xl text-[#CBD5E1] font-light leading-relaxed mb-8">
            {siteTexts.heroDescription ||
              'Impulsamos la transformación digital y damos visibilidad a las historias de nuestra región. Streaming multicámara profesional, coberturas en directo de festivales masivos, contenidos comunitarios y desarrollo web llave en mano con hosting y soporte garantizado.'}
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={20}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
            <ContactButton
              id="hero-primary-cta"
              label={siteTexts.heroCtaButton || 'Comenzar Proyecto'}
              onClick={onOpenContact}
              size="lg"
              className="w-full sm:w-auto shadow-[0_0_35px_rgba(42,82,190,0.5)]"
            />
            <a
              href="#servicios"
              className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#0E1834] border border-[#2A52BE]/50 hover:border-[#60A5FA] text-white text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-[#152554] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Explorar Servicios</span>
              <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="relative z-20 w-full px-5 sm:px-8 md:px-12 pb-8 pt-4">
        <div className="max-w-6xl mx-auto grid items-center justify-center border-t border-[#2A52BE]/20 pt-6">
          <a
            href="#galeria"
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#0A142A]/80 border border-[#2A52BE]/40 hover:border-[#60A5FA] text-xs uppercase tracking-widest text-[#93C5FD] hover:text-white transition-all duration-300 hover:bg-[#12224A] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <span>Descubrir Producciones</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#60A5FA] group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
