import React, { useState } from 'react';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BrandsCarousel } from './components/BrandsCarousel';
import { PricingSection } from './components/PricingSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingActions } from './components/FloatingActions';

function MainApp() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { isAdminRoute } = useSiteContent();

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  // If URL is /admin or #admin, render the private Admin Dashboard
  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  // Otherwise, render the 100% clean public spectator experience
  return (
    <div
      id="main-wrapper"
      className="w-full min-h-screen relative"
      style={{
        backgroundColor: '#060A14',
        overflowX: 'clip',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <HeroSection onOpenContact={handleOpenContact} />
      <MarqueeSection />
      <AboutSection onOpenContact={handleOpenContact} />

      {/* 4. SERVICES SECTION - PILARES FUNDAMENTALES */}
      <ServicesSection />

      {/* 5. BRANDS CAROUSEL (Debajo de Servicios: logos B&N con iluminación al hover) */}
      <BrandsCarousel />

      {/* 6. PRICING SECTION - PLANES & PATROCINIO */}
      <PricingSection onOpenContact={handleOpenContact} />

      {/* 7. PROJECTS SECTION (Fiesta Nacional Playas Doradas en directo, El Canal @elmancasg, y Webs con carrusel GIF/PNG) */}
      <ProjectsSection onOpenContact={handleOpenContact} />

      {/* 8. CONTACT SECTION (Formulario Web Completo + Apartado Exclusivo WhatsApp) */}
      <ContactSection />

      {/* 9. BRAND FOOTER (Logo de la marca, links y copyright) */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

      {/* Floating Action Buttons: Scroll to Top (icon only) & Direct Contact */}
      <FloatingActions onOpenContactModal={handleOpenContact} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SiteContentProvider>
        <MainApp />
      </SiteContentProvider>
    </ErrorBoundary>
  );
}
