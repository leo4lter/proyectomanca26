import React, { useEffect, useRef, useState } from 'react';
import { X, Mail, Send, CheckCircle2, Sparkles, Phone, MessageSquare, Clock, MessageCircle } from 'lucide-react';
import { MancaCircularIcon } from './MancaBrand';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Producción & Streaming Profesional',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Producción & Streaming Profesional',
        message: '',
      });
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-md transition-opacity" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-xl bg-[#081024] border-2 border-[#2A52BE]/60 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-white"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full border border-[#2A52BE]/30 hover:bg-[#2A52BE]/20 text-[#93C5FD] transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#2A52BE]/30 border border-[#3870E0] flex items-center justify-center mb-6 text-white shadow-[0_0_25px_rgba(42,82,190,0.8)]">
              <CheckCircle2 className="w-10 h-10 text-[#60A5FA]" />
            </div>
            <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mb-2">
              ¡Mensaje Enviado con Éxito!
            </h3>
            <p className="text-sm sm:text-base text-[#CBD5E1] max-w-sm">
              Muchas gracias por comunicarte con Manca. El equipo de producción revisará tu solicitud y se pondrá en contacto a la brevedad.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111F4A] border border-[#2A52BE]/50 text-xs tracking-widest uppercase text-[#93C5FD] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#3870E0]" />
                <span>#ConectandoPersonas</span>
              </div>
              <h3 id="contact-modal-title" className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Impulsemos tu <span className="text-[#3870E0]">proyecto</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                Contanos tu evento, negocio, comercio o idea. Te responderemos con una propuesta a tu medida.
              </p>

              {/* Direct WhatsApp Call-to-Action */}
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5 fill-emerald-500/30" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Escribinos por WhatsApp
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8]">
                      +54 9 2920 21-4741 • Respuesta directa
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/5492920214741?text=Hola%20Manca%2C%20quisiera%20hacer%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  <span>Chatear Ahora</span>
                </a>
              </div>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[11px] uppercase tracking-widest text-[#64748B] font-medium">
                  O completá el formulario
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="modal-contact-name" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                    Nombre / Empresa
                  </label>
                  <input
                    id="modal-contact-name"
                    type="text"
                    required
                    placeholder="Tu nombre o negocio"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#050B18] border border-[#2A52BE]/30 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="modal-contact-phone" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="modal-contact-phone"
                    type="tel"
                    required
                    placeholder="+54 9 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#050B18] border border-[#2A52BE]/30 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-contact-email" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                  Correo Electrónico
                </label>
                <input
                  id="modal-contact-email"
                  type="email"
                  required
                  placeholder="contacto@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#050B18] border border-[#2A52BE]/30 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors"
                />
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-contact-service" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                  Interés o Servicio Principal
                </label>
                <select
                  id="modal-contact-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#050B18] border border-[#2A52BE]/30 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3870E0] transition-colors"
                >
                  <option value="Producción & Streaming Profesional">
                    Producción & Streaming Profesional (Eventos, Transmisiones)
                  </option>
                  <option value="Sponsor Básico en Streaming">
                    Sponsor Básico en Streaming ($60.000/mes • $150.000/trim • $500.000/año)
                  </option>
                  <option value="Publicidad Audiovisual (4 videos/mes)">
                    Publicidad Audiovisual (4 videos/mes - Promo $200.000)
                  </option>
                  <option value="Diseño Web Llave en Mano">
                    Diseño Web Llave en Mano (Hosting + Dominio + Webmail + 1 año de mantenimiento)
                  </option>
                  <option value="Impacto Comunitario / El Canal">
                    Impacto Comunitario / Difusión Deportiva & Cultural
                  </option>
                  <option value="Agencia Digital 360">
                    Agencia Digital 360 (Diseño Gráfico, Redes & Soluciones)
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-contact-message" className="text-xs uppercase tracking-wider text-[#93C5FD] font-medium">
                  Detalles del Proyecto o Consulta
                </label>
                <textarea
                  id="modal-contact-message"
                  required
                  rows={3}
                  placeholder="Contanos tus necesidades, objetivos o fechas clave..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#050B18] border border-[#2A52BE]/30 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0] transition-colors resize-none"
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Clock className="w-3.5 h-3.5 text-[#3870E0]" />
                  <span>Respuesta en menos de 24 h</span>
                </div>
                <button
                  id="modal-submit-button"
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#162B75] via-[#2A52BE] to-[#3870E0] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white shadow-lg transition-all hover:brightness-110 active:scale-95 sm:px-8 sm:py-3 sm:text-sm"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
