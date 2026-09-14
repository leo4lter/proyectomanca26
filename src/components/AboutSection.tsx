import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const { customIconUrl, siteTexts } = useSiteContent();

  const mancaBio =
    siteTexts.aboutBio ||
    "Somos Manca, una productora audiovisual y una agencia digital integral arraigada en la comunidad. Nuestra esencia radica en ser un puente: por un lado, damos visibilidad a las historias, talentos y eventos locales; por el otro, impulsamos la transformación digital de los comercios y empresas de la región.";

  return (
    <section
      id="nosotros"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #0A142E 0%, #060A14 70%, #03050B 100%)',
      }}
    >
      {/* Decorativos 100% locales (CSS puro, sin imágenes externas). No requieren reemplazo. */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <div className="w-[120px] sm:w-[160px] md:w-[210px] h-[120px] sm:h-[160px] md:h-[210px] rounded-full bg-gradient-to-br from-[#2A52BE]/25 to-transparent blur-2xl select-none pointer-events-none" />
        </FadeIn>
      </div>

      {/* 2. BOTTOM-LEFT */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <div className="w-[100px] sm:w-[140px] md:w-[180px] h-[100px] sm:h-[140px] md:h-[180px] rounded-3xl border border-[#2A52BE]/25 bg-[#2A52BE]/10 blur-md select-none pointer-events-none rotate-6" />
        </FadeIn>
      </div>

      {/* 3. TOP-RIGHT */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <div className="w-[120px] sm:w-[160px] md:w-[210px] h-[120px] sm:h-[160px] md:h-[210px] rounded-full bg-gradient-to-bl from-[#3870E0]/25 to-transparent blur-2xl select-none pointer-events-none" />
        </FadeIn>
      </div>

      {/* 4. BOTTOM-RIGHT */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <div className="w-[130px] sm:w-[170px] md:w-[220px] h-[130px] sm:h-[170px] md:h-[220px] rounded-full bg-gradient-to-tl from-[#1E3A8A]/30 to-transparent blur-2xl select-none pointer-events-none" />
        </FadeIn>
      </div>

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto text-center w-full">
        {/* Subtitle tag with page logo */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111D42]/90 border border-[#2A52BE]/50 text-xs tracking-widest uppercase text-[#93C5FD] mb-4 shadow-[0_0_20px_rgba(42,82,190,0.4)]">
            {/* LOGO: usa public/assets/img/logo-manca.svg salvo que lo cambies en el Admin */}
            {customIconUrl ? (
              <SmartImage
                src={resolveImage(customIconUrl, PLACEHOLDERS.logo)}
                fallbackSrc={PLACEHOLDERS.logo}
                alt="Logo Manca"
                className="w-5 h-5 rounded-full object-cover border border-[#2A52BE] shrink-0"
              />
            ) : (
              <SmartImage
                src={PLACEHOLDERS.logo}
                fallbackSrc={PLACEHOLDERS.logo}
                alt="Logo Manca"
                className="w-5 h-5 rounded-full object-cover border border-[#2A52BE] shrink-0"
              />
            )}
            <span className="font-semibold text-white">{siteTexts.aboutBadge || 'NUESTRA ESENCIA'}</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.05} y={30} className="w-full">
          <h2
            id="about-heading"
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 140px)' }}
          >
            {siteTexts.aboutHeading || 'NUESTRA ESENCIA'}
          </h2>
        </FadeIn>

        {/* Space between heading and text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Animated Paragraph - Scroll driven white fill */}
        <FadeIn delay={0.15} y={30} className="w-full">
          <AnimatedText text={mancaBio} id="about-text" />
        </FadeIn>

        {/* Space between text and button */}
        <div className="h-10 sm:h-12" />

        {/* Contact Button */}
        <FadeIn delay={0.25} y={20}>
          <ContactButton
            id="about-contact-button"
            label={siteTexts.aboutCtaButton || 'Conocer Más'}
            onClick={onOpenContact}
          />
        </FadeIn>
      </div>
    </section>
  );
};
