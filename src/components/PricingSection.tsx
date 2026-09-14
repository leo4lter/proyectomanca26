import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { Check, Sparkles, Star, Film, Monitor, ShieldCheck, Zap } from 'lucide-react';

interface PricingSectionProps {
  onOpenContact?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const [billingCycle, setBillingCycle] = useState<'mensual' | 'trimestral' | 'anual'>('mensual');

  const sponsorPrices = {
    mensual: { price: '$60.000', period: '/ mes', save: '' },
    trimestral: { price: '$150.000', period: '/ trimestre', save: 'Ahorrá $30.000' },
    anual: { price: '$500.000', period: '/ año', save: 'Ahorrá $220.000 (¡El más elegido!)' },
  };

  return (
    <section
      id="planes"
      className="relative w-full bg-[#080E1E] text-white px-5 sm:px-8 md:px-12 py-24 sm:py-32 select-none border-t border-[#2A52BE]/30 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2A52BE]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111F4D] border border-[#2A52BE]/50 text-xs tracking-widest uppercase text-[#93C5FD] mb-4 shadow-[0_0_15px_rgba(42,82,190,0.3)]">
              <Zap className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>PLANES & PATROCINIO</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} y={30}>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 110px)' }}
            >
              PRECIOS CLAROS
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#CBD5E1] font-light max-w-2xl mx-auto">
              Invertí en visibilidad masiva para tu comercio o empresa con planes transparentes diseñados para crecer.
            </p>
          </FadeIn>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Sponsor Básico */}
          <FadeIn delay={0.1} y={30} className="flex">
            <div className="w-full rounded-[32px] sm:rounded-[40px] bg-[#0A142A] border-2 border-[#2A52BE]/40 p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-[#3870E0] transition-colors">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#2A52BE]/20 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
                  Presencia en Streaming
                </div>
                <h3 className="text-2xl font-bold uppercase text-white tracking-wide">
                  Sponsor Básico
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 mb-6">
                  Ideal para comercios locales que desean visibilidad en vivo en cada transmisión.
                </p>

                {/* Period Selector Toggle */}
                <div className="flex rounded-xl bg-[#060A14] p-1 border border-[#2A52BE]/30 mb-6">
                  {(['mensual', 'trimestral', 'anual'] as const).map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setBillingCycle(cycle)}
                      className={`flex-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        billingCycle === cycle
                          ? 'bg-[#2A52BE] text-white shadow-md'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {cycle}
                    </button>
                  ))}
                </div>

                {/* Price Display */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {sponsorPrices[billingCycle].price}
                    </span>
                    <span className="text-sm text-[#94A3B8] font-medium">
                      {sponsorPrices[billingCycle].period}
                    </span>
                  </div>
                  {sponsorPrices[billingCycle].save && (
                    <span className="inline-block mt-1 text-xs text-[#60A5FA] font-semibold">
                      {sponsorPrices[billingCycle].save}
                    </span>
                  )}
                </div>

                {/* Feature List */}
                <ul className="flex flex-col gap-3 text-sm text-[#E2E8F0] mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span><strong className="text-white">Menciones en vivo</strong> durante las transmisiones</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span><strong className="text-white">Banners en pantalla</strong> en rotación continua</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span>Presencia en streaming de eventos deportivos y culturales</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span>Logo en zócalos de gráfica oficial</span>
                  </li>
                </ul>
              </div>

              <ContactButton
                id="sponsor-plan-button"
                label="Elegir Sponsor"
                onClick={onOpenContact}
                className="w-full text-center"
              />
            </div>
          </FadeIn>

          {/* Card 2: Publicidad Audiovisual (Featured) */}
          <FadeIn delay={0.2} y={30} className="flex">
            <div className="w-full rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#101E44] to-[#0A142A] border-2 border-[#3870E0] p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_20px_60px_rgba(42,82,190,0.4)]">
              {/* Popular Tag */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#3870E0] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                ★ Promo Destacada
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#3870E0]/30 text-[#93C5FD] text-xs font-semibold uppercase tracking-wider mb-4">
                  Publicidad Audiovisual
                </div>
                <h3 className="text-2xl font-bold uppercase text-white tracking-wide">
                  Plan Contenido Mensual
                </h3>
                <p className="text-xs text-[#CBD5E1] mt-1 mb-6">
                  4 videos de calidad profesional al mes para impulsar tus ventas en redes sociales.
                </p>

                {/* Price Display */}
                <div className="mb-6 bg-[#060A14]/70 p-4 rounded-2xl border border-[#2A52BE]/40">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] block mb-1">
                    Precio Promoción
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      $200.000
                    </span>
                    <span className="text-sm text-[#94A3B8] font-medium">/ mes</span>
                  </div>
                  <span className="text-[11px] text-[#60A5FA] font-medium block mt-1">
                    Incluye 4 producciones completas mensuales
                  </span>
                </div>

                {/* Feature List */}
                <ul className="flex flex-col gap-3 text-sm text-[#E2E8F0] mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span><strong className="text-white">4 videos por mes</strong> (1 por semana)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span>Planificación, rodaje y edición profesional</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span>Formato optimizado para Reels, TikTok y Shorts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#60A5FA] shrink-0" />
                    <span>Subtitulado dinámico, música y animación</span>
                  </li>
                </ul>
              </div>

              <ContactButton
                id="video-plan-button"
                label="Contratar Publicidad"
                onClick={onOpenContact}
                className="w-full text-center"
              />
            </div>
          </FadeIn>

          {/* Card 3: Diseño Web Integral */}
          <FadeIn delay={0.3} y={30} className="flex">
            <div className="w-full rounded-[32px] sm:rounded-[40px] bg-[#0A142A] border-2 border-[#2A52BE]/40 p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-[#3870E0] transition-colors">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#2A52BE]/20 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
                  Agencia Digital 360
                </div>
                <h3 className="text-2xl font-bold uppercase text-white tracking-wide">
                  Diseño Web Integral
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 mb-6">
                  Solución llave en mano para comerciantes y empresas sin complicaciones técnicas.
                </p>

                {/* Price Display */}
                <div className="mb-6 bg-[#060A14]/70 p-4 rounded-2xl border border-[#2A52BE]/30">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] block mb-1">
                    Modalidad Anual
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Único Pago Anual
                  </div>
                  <span className="text-[11px] text-[#CBD5E1] font-light block mt-1 leading-snug">
                    El primer pago incluye la <strong>creación de la página</strong> + <strong>1 año entero de mantenimiento</strong>.
                  </span>
                </div>

                {/* Feature List */}
                <ul className="flex flex-col gap-3 text-sm text-[#E2E8F0] mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span><strong className="text-white">Hosting de alta velocidad</strong> incluido</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span><strong className="text-white">Dominio web propio</strong> (.com o .com.ar)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span><strong className="text-white">Casillas de Webmail</strong> corporativas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span>Diseño adaptable a celulares y computadoras</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#3870E0] shrink-0" />
                    <span>Soporte y mantenimiento garantizado</span>
                  </li>
                </ul>
              </div>

              <ContactButton
                id="web-plan-button"
                label="Cotizar Mi Web"
                onClick={onOpenContact}
                className="w-full text-center"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
