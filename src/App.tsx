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

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

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

      <ServicesSection />

      <BrandsCarousel />

      <PricingSection onOpenContact={handleOpenContact} />

      <ProjectsSection onOpenContact={handleOpenContact} />

      <ContactSection />

      <Footer onOpenContact={handleOpenContact} />

      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

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
