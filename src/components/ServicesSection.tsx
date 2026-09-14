import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';
import { Sparkles } from 'lucide-react';

const pillarsData: ServiceItem[] = [
  {
    number: '01',
    name: 'Producción & Streaming Profesional',
    subtitle: 'Transmisiones de Gran Escala y Calidad Broadcast',
    description:
      'Brindamos servicios de transmisión en vivo de alta definición para terceros. Desde la radio municipal hasta coberturas masivas de nivel nacional, como la Fiesta Nacional de Playas Doradas 2026. Equipamiento multicámara, grafismo en tiempo real y audio profesional sin cortes.',
    badge: 'En Vivo HD',
  },
  {
    number: '02',
    name: 'Impacto Comunitario (El Canal)',
    subtitle: 'La Voz de Nuestros Deportistas y Talentos',
    description:
      'Creamos contenido propio que le da visibilidad a deportes, eventos y personas que habitualmente no tienen espacio en los medios tradicionales. Este compromiso social genera un impacto tan positivo que hoy los niños y jóvenes de la región nos ven como verdaderos referentes e inspiración.',
    badge: 'Compromiso Social',
  },
  {
    number: '03',
    name: 'Agencia Digital 360',
    subtitle: 'Soluciones Integrales para Empresas y Comercios',
    description:
      'Ofrecemos soluciones completas que eliminan los "dolores de cabeza" de comerciantes y emprendedores. Centralizamos diseño web, diseño gráfico corporativo, campañas en redes y publicidad audiovisual con resultados medibles.',
    badge: 'Cero Dolores de Cabeza',
  },
  {
    number: '04',
    name: 'Diseño Web Llave en Mano',
    subtitle: 'Hosting + Dominio + Webmail Incluidos',
    description:
      'Sitios web modernos, rápidos y optimizados para dispositivos móviles. Con un único pago anual: el primer pago consta de la creación completa de la página web más 1 año entero de mantenimiento preventivo, hosting de alta velocidad, registro de dominio propio y casillas de webmail corporativas.',
    badge: '1 Año Mantenimiento Incluido',
  },
  {
    number: '05',
    name: 'Publicidad Audiovisual',
    subtitle: 'Producción Periódica para Redes & Medios',
    description:
      'Campañas de video profesionales orientadas al crecimiento comercial de tu marca: plan mensual de 4 videos por mes con filmación, edición dinámica, subtitulado y formatos para Instagram Reels, TikTok y YouTube. Precio especial de promoción: $200.000.',
    badge: '4 Videos / Mes',
  },
];

export const ServicesSection: React.FC = () => {
  const { siteTexts } = useSiteContent();

  return (
    <section
      id="servicios"
      className="relative w-full bg-white text-[#060A14] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-32 pb-24 sm:pb-32 select-none shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Tag */}
        <FadeIn delay={0} y={20} className="w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A52BE]/10 border border-[#2A52BE]/30 text-xs tracking-widest uppercase text-[#2A52BE] mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{siteTexts.servicesBadge || 'NUESTROS PILARES FUNDAMENTALES'}</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.05} y={40} className="w-full text-center">
          <h2
            id="services-heading"
            className="font-black uppercase tracking-tight text-[#060A14] leading-none mb-4 text-center"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 150px)' }}
          >
            {siteTexts.servicesHeading || 'SERVICIOS'}
          </h2>
          <p className="text-base sm:text-lg text-[#060A14]/70 max-w-2xl mx-auto font-light mb-14 sm:mb-20">
            {siteTexts.servicesSubtitle ||
              'Impulsamos proyectos a través de la comunicación visual, el streaming en vivo y la tecnología digital.'}
          </p>
        </FadeIn>

        {/* Services / Pillars List - With Strict Uniform Vertical Alignment */}
        <div className="flex flex-col border-t-2 border-[#060A14]/10">
          {pillarsData.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.08}
              y={30}
              className="group border-b border-[#060A14]/10 py-8 sm:py-12 md:py-14 transition-colors duration-300 hover:bg-[#F8FAFC] px-4 sm:px-8 rounded-2xl"
            >
              {/* Structured Grid: Left number column (fixed 3 cols) & Right content column (9 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Left Column: Number & Badge */}
                <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start justify-between lg:justify-start gap-3">
                  <div
                    className="font-black text-[#060A14] group-hover:text-[#2A52BE] transition-colors leading-none tracking-tighter"
                    style={{ fontSize: 'clamp(3.2rem, 7vw, 98px)' }}
                  >
                    {item.number}
                  </div>
                  {item.badge && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2A52BE]/10 text-[#2A52BE] text-xs font-semibold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Right Column: Title, Subtitle, Description - Starts on the EXACT same vertical line */}
                <div className="lg:col-span-9 flex flex-col gap-2.5">
                  <h3
                    className="font-bold uppercase text-[#060A14] tracking-tight group-hover:text-[#2A52BE] transition-colors"
                    style={{ fontSize: 'clamp(1.35rem, 2.4vw, 2.15rem)' }}
                  >
                    {item.name}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2A52BE]">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="font-light leading-relaxed text-[#334155] max-w-3xl mt-1 text-sm sm:text-base md:text-[1.05rem]">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
