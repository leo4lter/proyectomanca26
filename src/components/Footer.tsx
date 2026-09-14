import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';
import { MancaCircularIcon } from './MancaBrand';
import { ContactButton } from './ContactButton';
import { Phone, Mail } from 'lucide-react';

export const Footer: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact }) => {
  const { customIconUrl, customFooterLogoUrl } = useSiteContent();
  // LOGO FOOTER: se muestra public/assets/img/logo-footer.svg por defecto.
  const footerLogo = resolveImage(customFooterLogoUrl, PLACEHOLDERS.logoFooter);
  const iconLogo = resolveImage(customIconUrl, PLACEHOLDERS.logo);

  return (
    <footer
      id="pie"
      className="relative z-10 w-full bg-[#03060E] border-t border-[#2A52BE]/30 px-5 sm:px-8 md:px-12 pt-16 pb-12 select-none"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-2.5">
            {customFooterLogoUrl ? (
              <SmartImage
                src={footerLogo}
                fallbackSrc={PLACEHOLDERS.logoFooter}
                alt="Logo Manca Footer"
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain"
              />
            ) : customIconUrl ? (
              <div className="flex items-center gap-3">
                <SmartImage
                  src={iconLogo}
                  fallbackSrc={PLACEHOLDERS.logo}
                  alt="Logo Manca"
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#2A52BE] shadow-[0_0_15px_rgba(42,82,190,0.6)]"
                />
                <span className="text-white font-black text-2xl tracking-wider uppercase font-['Kanit']">
                  MANCA
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Si borrás logo-footer.svg e icon-web.svg, se usa el vector interno */}
                <SmartImage
                  src={PLACEHOLDERS.logo}
                  fallbackSrc={PLACEHOLDERS.logo}
                  alt="Logo Manca"
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#2A52BE] shadow-[0_0_15px_rgba(42,82,190,0.6)]"
                />
                <span className="text-white font-black text-2xl tracking-wider uppercase font-['Kanit']">
                  MANCA
                </span>
              </div>
            )}
          </div>
          <p className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
            #ConectandoPersonas • Productora Audiovisual & Agencia Digital 360
          </p>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-md font-light">
            El puente entre las historias locales y la transformación digital de nuestros comercios y eventos.
          </p>

          {/* Official Contact Details */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-xs">
            <a
              href="https://wa.me/5492920214741?text=Hola%20Manca%2C%20quisiera%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#60A5FA] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">+54 9 2920 21-4741</span>
            </a>
            <a
              href="mailto:contacto@elmanca.com.ar?subject=Consulta%20desde%20la%20web%20Manca"
              className="flex items-center gap-2 text-white hover:text-[#60A5FA] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span className="font-medium">contacto@elmanca.com.ar</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ContactButton
            id="footer-contact-button"
            label="Iniciar Conversación"
            onClick={onOpenContact}
          />
        </div>
      </div>

      {/* Discreet Copyright */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3">
        <p>© 2026 Manca • Todos los derechos reservados.</p>
        <p className="text-[11px] text-[#475569]">#ConectandoPersonas</p>
      </div>
    </footer>
  );
};
