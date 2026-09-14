import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { SiteTexts } from '../types';
import {
  Type,
  FileText,
  Sparkles,
  RotateCcw,
  Check,
  HelpCircle,
  Smartphone,
  Mail,
  MapPin,
  Clock,
  Compass,
  Layers,
  Phone,
  Radio,
} from 'lucide-react';

export const AdminTextsTab: React.FC = () => {
  const { siteTexts, updateSiteText, resetSiteTexts } = useSiteContent();
  const [activeSection, setActiveSection] = useState<'all' | 'hero' | 'about' | 'services' | 'projects' | 'contact'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleReset = () => {
    if (window.confirm('¿Deseas restablecer todos los textos de la web a los valores predeterminados de Manca?')) {
      resetSiteTexts();
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A52BE]/20 text-[#93C5FD] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#2A52BE]/40">
              <Type className="w-3.5 h-3.5 text-[#3870E0]" />
              <span>Editor Integral de Textos</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
              Textos & Títulos del Sitio Web
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
              Modificá cualquier texto, título, eslogan o información de contacto en tiempo real. Al finalizar, hacé clic en <strong className="text-emerald-400 font-semibold">"Aplicar & Guardar"</strong> en la barra superior.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              title="Restablecer textos por defecto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Textos</span>
            </button>
          </div>
        </div>

        {/* Section Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[#2A52BE]/20">
          <span className="text-xs text-[#94A3B8] self-center mr-1">Filtrar por sección:</span>
          {[
            { id: 'all', label: 'Todas las secciones' },
            { id: 'hero', label: '1. Portada (Hero)' },
            { id: 'about', label: '2. Nuestra Esencia' },
            { id: 'services', label: '3. Servicios' },
            { id: 'projects', label: '4. Proyectos & Canal' },
            { id: 'contact', label: '5. Contacto & Info' },
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-[#3870E0] text-white shadow-md'
                  : 'bg-[#060C1B] text-[#93C5FD] hover:bg-[#14234C] border border-[#2A52BE]/30'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SECCIÓN HERO / PORTADA */}
      {(activeSection === 'all' || activeSection === 'hero') && (
        <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#2A52BE]/30">
            <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 border border-[#2A52BE]/50 flex items-center justify-center text-[#60A5FA]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                1. Portada Principal (Hero Section)
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Textos principales visibles al ingresar al sitio web
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Slogan */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center justify-between">
                <span>Eslogan / Etiqueta Superior</span>
                <span className="text-[10px] text-slate-400 font-normal">Encima del título</span>
              </label>
              <input
                type="text"
                value={siteTexts.heroSlogan || ''}
                onChange={(e) => updateSiteText('heroSlogan', e.target.value)}
                placeholder="#ConectandoPersonas"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center justify-between">
                <span>Título Principal</span>
                <span className="text-[10px] text-slate-400 font-normal">Tipografía grande</span>
              </label>
              <input
                type="text"
                value={siteTexts.heroHeadline || ''}
                onChange={(e) => updateSiteText('heroHeadline', e.target.value)}
                placeholder="MANCA"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center justify-between">
                <span>Descripción Narrativa</span>
                <span className="text-[10px] text-slate-400 font-normal">Párrafo debajo del logo central</span>
              </label>
              <textarea
                rows={3}
                value={siteTexts.heroDescription || ''}
                onChange={(e) => updateSiteText('heroDescription', e.target.value)}
                placeholder="Impulsamos la transformación digital y damos visibilidad a las historias de nuestra región..."
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0] resize-y"
              />
            </div>

            {/* CTA Button */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center justify-between">
                <span>Texto del Botón de Contacto</span>
                <span className="text-[10px] text-slate-400 font-normal">Botón primario</span>
              </label>
              <input
                type="text"
                value={siteTexts.heroCtaButton || ''}
                onChange={(e) => updateSiteText('heroCtaButton', e.target.value)}
                placeholder="Comenzar Proyecto"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. SECCIÓN NUESTRA ESENCIA / SOBRE NOSOTROS */}
      {(activeSection === 'all' || activeSection === 'about') && (
        <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#2A52BE]/30">
            <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 border border-[#2A52BE]/50 flex items-center justify-center text-[#60A5FA]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                2. Nuestra Esencia (Sobre Nosotros)
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Sección que presenta los valores e historia de Manca con animación de lectura
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Etiqueta / Badge Superior
              </label>
              <input
                type="text"
                value={siteTexts.aboutBadge || ''}
                onChange={(e) => updateSiteText('aboutBadge', e.target.value)}
                placeholder="NUESTRA ESENCIA"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Título Grande
              </label>
              <input
                type="text"
                value={siteTexts.aboutHeading || ''}
                onChange={(e) => updateSiteText('aboutHeading', e.target.value)}
                placeholder="NUESTRA ESENCIA"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center justify-between">
                <span>Biografía Narrativa (Texto Animado por Scroll)</span>
                <span className="text-[10px] text-slate-400 font-normal">Se ilumina palabra por palabra al scrollear</span>
              </label>
              <textarea
                rows={4}
                value={siteTexts.aboutBio || ''}
                onChange={(e) => updateSiteText('aboutBio', e.target.value)}
                placeholder="Somos Manca, una productora audiovisual y una agencia digital integral..."
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0] resize-y"
              />
            </div>

            {/* Button */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Texto del Botón
              </label>
              <input
                type="text"
                value={siteTexts.aboutCtaButton || ''}
                onChange={(e) => updateSiteText('aboutCtaButton', e.target.value)}
                placeholder="Conocer Más"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. SECCIÓN SERVICIOS */}
      {(activeSection === 'all' || activeSection === 'services') && (
        <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#2A52BE]/30">
            <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 border border-[#2A52BE]/50 flex items-center justify-center text-[#60A5FA]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                3. Servicios & Pilares Fundamentales
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Cabecera de la sección de servicios principales (fondo blanco)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Services Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Etiqueta / Badge Superior
              </label>
              <input
                type="text"
                value={siteTexts.servicesBadge || ''}
                onChange={(e) => updateSiteText('servicesBadge', e.target.value)}
                placeholder="NUESTROS PILARES FUNDAMENTALES"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Services Heading */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Título Grande
              </label>
              <input
                type="text"
                value={siteTexts.servicesHeading || ''}
                onChange={(e) => updateSiteText('servicesHeading', e.target.value)}
                placeholder="SERVICIOS"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Services Subtitle */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Subtítulo Descriptivo
              </label>
              <textarea
                rows={2}
                value={siteTexts.servicesSubtitle || ''}
                onChange={(e) => updateSiteText('servicesSubtitle', e.target.value)}
                placeholder="Impulsamos proyectos a través de la comunicación visual, el streaming en vivo y la tecnología digital."
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0] resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. SECCIÓN PROYECTOS & EL CANAL */}
      {(activeSection === 'all' || activeSection === 'projects') && (
        <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#2A52BE]/30">
            <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 border border-[#2A52BE]/50 flex items-center justify-center text-[#60A5FA]">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                4. Proyectos & El Canal
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Cabecera de la sección de proyectos, videos de YouTube y webs desarrolladas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Projects Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Etiqueta / Badge Superior
              </label>
              <input
                type="text"
                value={siteTexts.projectsBadge || ''}
                onChange={(e) => updateSiteText('projectsBadge', e.target.value)}
                placeholder="COBERTURAS, EL CANAL & TRANSFORMACIÓN DIGITAL"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Projects Heading */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Título Grande
              </label>
              <input
                type="text"
                value={siteTexts.projectsHeading || ''}
                onChange={(e) => updateSiteText('projectsHeading', e.target.value)}
                placeholder="PROYECTOS"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Projects Subtitle */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Subtítulo Descriptivo
              </label>
              <textarea
                rows={2}
                value={siteTexts.projectsSubtitle || ''}
                onChange={(e) => updateSiteText('projectsSubtitle', e.target.value)}
                placeholder="Transmisiones en vivo masivas, producciones de El Canal y plataformas digitales para el desarrollo de nuestra gente."
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0] resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. SECCIÓN CONTACTO & DATOS OFICIALES */}
      {(activeSection === 'all' || activeSection === 'contact') && (
        <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#2A52BE]/30">
            <div className="w-8 h-8 rounded-xl bg-[#2A52BE]/20 border border-[#2A52BE]/50 flex items-center justify-center text-[#60A5FA]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                5. Contacto & Canales de Comunicación
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Textos de la sección de contacto, número de WhatsApp para cotizaciones, email y ubicación
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contact Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Etiqueta / Badge Superior
              </label>
              <input
                type="text"
                value={siteTexts.contactBadge || ''}
                onChange={(e) => updateSiteText('contactBadge', e.target.value)}
                placeholder="#ConectandoPersonas • ESTAMOS A TU DISPOSICIÓN"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Contact Heading */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Título Grande
              </label>
              <input
                type="text"
                value={siteTexts.contactHeading || ''}
                onChange={(e) => updateSiteText('contactHeading', e.target.value)}
                placeholder="Iniciemos tu Próximo Proyecto"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Contact Description */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold">
                Descripción del Formulario
              </label>
              <textarea
                rows={2}
                value={siteTexts.contactDescription || ''}
                onChange={(e) => updateSiteText('contactDescription', e.target.value)}
                placeholder="Dejanos tu consulta mediante el formulario web o escribinos directamente por WhatsApp para recibir atención inmediata y asesoramiento personalizado."
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0] resize-y"
              />
            </div>

            {/* WhatsApp Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Teléfono de WhatsApp Oficial</span>
              </label>
              <input
                type="text"
                value={siteTexts.contactPhone || ''}
                onChange={(e) => updateSiteText('contactPhone', e.target.value)}
                placeholder="5492920214741"
                className="w-full bg-[#050B18] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
              <span className="text-[11px] text-slate-400">
                Formato internacional sin espacios ni signos (Ej: 5492920214741)
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Correo Electrónico de Contacto</span>
              </label>
              <input
                type="email"
                value={siteTexts.contactEmail || ''}
                onChange={(e) => updateSiteText('contactEmail', e.target.value)}
                placeholder="contacto@elmanca.com.ar"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Ubicación / Región</span>
              </label>
              <input
                type="text"
                value={siteTexts.contactLocation || ''}
                onChange={(e) => updateSiteText('contactLocation', e.target.value)}
                placeholder="Sierra Grande & Playas Doradas, Río Negro, Patagonia Argentina"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>

            {/* Schedule */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Horario de Atención</span>
              </label>
              <input
                type="text"
                value={siteTexts.contactSchedule || ''}
                onChange={(e) => updateSiteText('contactSchedule', e.target.value)}
                placeholder="Lunes a Sábado de 09:00 a 20:00 hs"
                className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3870E0]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
