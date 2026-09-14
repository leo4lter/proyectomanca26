import React, { useState } from 'react';
import { Mail, Phone, Send, CircleCheck as CheckCircle2, MessageCircle, Sparkles, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';

export const ContactSection: React.FC = () => {
  const { siteTexts } = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Producción & Streaming Profesional',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'Producción & Streaming Profesional',
      message: '',
    });
  };

  const cleanPhone = (siteTexts.contactPhone || '5492920214741').replace(/[^0-9]/g, '');

  const generateWhatsAppUrl = (customText?: string) => {
    const basePhone = cleanPhone || '5492920214741';
    const text =
      customText ||
      `¡Hola Manca! Mi nombre es ${formData.name || 'un cliente'}. Me interesa consultar por: ${formData.service}. ${formData.message ? `Mensaje: ${formData.message}` : ''}`;
    return `https://wa.me/${basePhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="contacto"
      className="relative w-full bg-[#050914] text-white px-5 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-[#2A52BE]/30 overflow-hidden"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      <span id="contact" className="sr-only" />

      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#2A52BE]/12 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111F4A] border border-[#2A52BE]/40 text-xs tracking-widest uppercase text-[#93C5FD] mb-4 font-semibold shadow-[0_0_20px_rgba(42,82,190,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-[#3870E0]" />
              <span>{siteTexts.contactBadge || '#ConectandoPersonas • ESTAMOS A TU DISPOSICIÓN'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {siteTexts.contactHeading || 'Iniciemos tu Próximo Proyecto'}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light mt-3 max-w-2xl mx-auto">
              {siteTexts.contactDescription ||
                'Dejanos tu consulta mediante el formulario web o escribinos directamente por WhatsApp para recibir atención inmediata y asesoramiento personalizado.'}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 bg-[#081024] border border-[#2A52BE]/40 rounded-[30px] sm:rounded-[36px] p-6 sm:p-9 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2A52BE]/25">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#93C5FD]">
                  Formulario Oficial
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white mt-0.5">
                  Envianos un Mensaje
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#111F4A] border border-[#2A52BE]/50 flex items-center justify-center text-[#60A5FA]">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center justify-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-5 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p className="text-sm text-[#CBD5E1] max-w-md font-light leading-relaxed mb-6">
                  Muchas gracias <strong className="text-white font-semibold">{formData.name}</strong>. Hemos registrado tu consulta sobre <span className="text-[#93C5FD] font-medium">{formData.service}</span>. Te responderemos cuanto antes.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Enviar también por WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#111F4A] hover:bg-[#1A2E6E] text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-[#2A52BE]/40 cursor-pointer"
                  >
                    Nueva Consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                      Nombre o Comercio *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ej: Juan Pérez / Mi Negocio"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+54 9 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                    Correo Electrónico *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="contacto@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-service" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                    Servicio o Interés Principal
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3870E0] transition-colors cursor-pointer"
                  >
                    <option value="Producción & Streaming Profesional">
                      Producción & Streaming Profesional (Eventos, Transmisiones)
                    </option>
                    <option value="Sponsor en Streaming">
                      Sponsor en Streaming ($60.000/mes • $150.000/trim • $500.000/año)
                    </option>
                    <option value="Publicidad Audiovisual (4 videos/mes)">
                      Publicidad Audiovisual (4 videos al mes - Promo $200.000)
                    </option>
                    <option value="Desarrollo Web Llave en Mano">
                      Desarrollo Web Llave en Mano (Hosting + Dominio + 1 Año Soporte)
                    </option>
                    <option value="Impacto Comunitario / El Canal">
                      Difusión Deportiva & Comunitaria en El Canal (@elmancasg)
                    </option>
                    <option value="Agencia Digital 360">
                      Agencia Digital 360 (Diseño Gráfico, Identidad & Redes)
                    </option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                    Mensaje / Detalle de la Idea *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Contanos fechas estimadas, lugar, objetivos o requerimientos especiales de tu proyecto..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#050B18] border border-[#2A52BE]/35 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-4 rounded-full bg-gradient-to-r from-[#2A52BE] to-[#3870E0] hover:from-[#1E3A8A] hover:to-[#2A52BE] text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(42,82,190,0.5)] hover:shadow-[0_0_35px_rgba(42,82,190,0.8)] active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta al Equipo</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="w-full bg-[#07131B] border-2 border-emerald-500/50 rounded-[30px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En línea • WhatsApp directo</span>
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5 fill-emerald-400" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white leading-tight">
                ¿Preferís Escribirnos por WhatsApp?
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2 leading-relaxed">
                Contactate al instante con Leo y el equipo de producción de Manca. Respondemos en minutos cualquier duda sobre streaming, eventos o desarrollo web.
              </p>

              <a
                href={generateWhatsAppUrl('¡Hola Manca! Me comunico desde el sitio web para hacer una consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 fill-white text-white shrink-0" />
                  <div className="text-left">
                    <span className="block text-[11px] text-emerald-100 font-medium tracking-normal normal-case">
                      Abrir chat directo
                    </span>
                    <span className="font-extrabold tracking-wide text-sm sm:text-base">
                      +54 9 2920 21-4741
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="mt-6 pt-5 border-t border-emerald-500/20">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400/90 font-bold block mb-3">
                  Elegí tu consulta y abrí el chat directo:
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${cleanPhone || '5492920214741'}?text=${encodeURIComponent('¡Hola Manca! Quisiera cotizar un servicio de Streaming y cobertura audiovisual.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/40 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/50 text-xs text-[#E2E8F0] flex items-center justify-between transition-colors group/opt cursor-pointer"
                  >
                    <span>🔴 Cotizar Streaming / Cobertura</span>
                    <span className="text-emerald-400 text-[11px] font-semibold group-hover/opt:underline">
                      Consultar →
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/${cleanPhone || '5492920214741'}?text=${encodeURIComponent('¡Hola Manca! Me interesa contratar el plan de Desarrollo Web + Hosting y soporte.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/40 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/50 text-xs text-[#E2E8F0] flex items-center justify-between transition-colors group/opt cursor-pointer"
                  >
                    <span>💻 Web + Hosting Llave en Mano</span>
                    <span className="text-emerald-400 text-[11px] font-semibold group-hover/opt:underline">
                      Consultar →
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/${cleanPhone || '5492920214741'}?text=${encodeURIComponent('¡Hola Manca! Quiero información para patrocinar y publicitar en El Canal @elmancasg.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/40 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/50 text-xs text-[#E2E8F0] flex items-center justify-between transition-colors group/opt cursor-pointer"
                  >
                    <span>📢 Publicitar en El Canal (@elmancasg)</span>
                    <span className="text-emerald-400 text-[11px] font-semibold group-hover/opt:underline">
                      Consultar →
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#081024] border border-[#2A52BE]/30 rounded-[28px] p-5 sm:p-6 text-xs text-[#94A3B8] flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>{siteTexts.contactLocation || 'Sierra Grande & Playas Doradas, Río Negro, Patagonia Argentina'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <a
                  href={`mailto:${siteTexts.contactEmail || 'contacto@elmanca.com.ar'}`}
                  className="text-white hover:text-[#60A5FA] transition-colors"
                >
                  {siteTexts.contactEmail || 'contacto@elmanca.com.ar'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span>{siteTexts.contactSchedule || 'Lunes a Sábado de 09:00 a 20:00 hs'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
