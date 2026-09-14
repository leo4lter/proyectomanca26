import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Phone, MessageCircle, Copy, Check, X } from 'lucide-react';

interface FloatingActionsProps {
  onOpenContactModal?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false);
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);

  const phoneNumber = '+54 9 2920 21-4741';
  const phoneClean = '5492920214741';
  const emailAddress = 'contacto@elmanca.com.ar';
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(
    '¡Hola Manca! Me comunico desde la web para realizar una consulta.'
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCopy = (text: string, type: 'phone' | 'email', e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <aside
      aria-label="Acciones de navegación y contacto"
      className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-end gap-3 pointer-events-none"
    >
      {showContactCard && (
        <div
          role="region"
          aria-label="Canales de contacto directo"
          className="pointer-events-auto mb-1 w-[300px] sm:w-[320px] rounded-2xl bg-[#081024]/95 border border-[#2A52BE] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200 text-white font-['Kanit']"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2A52BE]/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                Contacto Directo
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowContactCard(false)}
              className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar ventana de contacto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-2.5 rounded-xl bg-[#0C1738] hover:bg-[#14265E] border border-[#2A52BE]/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-[#60A5FA]">
                    WhatsApp / Llamada
                  </span>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {phoneNumber}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => handleCopy(phoneNumber, 'phone', e)}
                className="p-1.5 rounded-md hover:bg-white/10 text-[#94A3B8] hover:text-white"
                title="Copiar número"
                aria-label="Copiar número de teléfono"
              >
                {copiedType === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </a>

            <a
              href={`mailto:${emailAddress}?subject=Consulta%20desde%20la%20web%20Manca`}
              className="group flex items-center justify-between p-2.5 rounded-xl bg-[#0C1738] hover:bg-[#14265E] border border-[#2A52BE]/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2A52BE]/25 text-[#93C5FD] border border-[#2A52BE]/50 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-[#60A5FA]">
                    Correo Electrónico
                  </span>
                  <span className="text-xs font-semibold text-white tracking-wide break-all">
                    {emailAddress}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => handleCopy(emailAddress, 'email', e)}
                className="p-1.5 rounded-md hover:bg-white/10 text-[#94A3B8] hover:text-white"
                title="Copiar correo"
                aria-label="Copiar correo electrónico"
              >
                {copiedType === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </a>
          </div>

          <p className="text-[10px] text-[#64748B] text-center mt-3 font-light">
            Atención personalizada de Manca Productora Audiovisual
          </p>
        </div>
      )}

      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          type="button"
          id="scroll-to-top-button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          title="Volver arriba"
          className={`w-12 h-12 rounded-2xl bg-[#081024]/90 hover:bg-[#101D42] border-2 border-[#2A52BE]/60 hover:border-[#60A5FA] text-[#93C5FD] hover:text-white shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(42,82,190,0.8)] backdrop-blur-md flex items-center justify-center transition-all duration-300 transform cursor-pointer group ${
            showScrollTop
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
          }`}
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
        </button>

        <div className="relative group/contact">
          <a
            id="floating-contact-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contactar por WhatsApp a ${phoneNumber}`}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#162B75] via-[#2A52BE] to-[#3870E0] hover:from-[#1D3B9C] hover:to-[#4A85F6] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(42,82,190,0.7)] hover:shadow-[0_0_35px_rgba(42,82,190,1)] border-2 border-white/30 hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative"
          >
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-[#081024]" />
            </span>

            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowContactCard(!showContactCard);
            }}
            aria-label="Ver opciones de contacto telefónico y correo"
            className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#081024] border border-[#2A52BE] text-[#93C5FD] hover:text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
            title="Ver correo y teléfono"
          >
            <Mail className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
