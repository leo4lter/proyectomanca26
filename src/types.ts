export interface ServiceItem {
  number: string;
  name: string;
  subtitle?: string;
  description: string;
  badge?: string;
  highlightWords?: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface MarqueeItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tag: string;
}

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
  category?: string;
}

export interface WebProjectItem {
  id: string;
  title: string;
  client: string;
  thumbnail: string; // PNG or GIF
  liveUrl?: string;
  tag: string;
  description?: string;
}

export interface ChannelVideoItem {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  views?: string;
  duration?: string;
  date?: string;
}

export interface FestivalNightItem {
  night: string;
  title: string;
  youtubeId: string;
  url: string;
  thumbnail: string;
  badge?: string;
}

export interface SiteTexts {
  // Hero Section
  heroSlogan: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroCtaButton: string;

  // Nosotros (About Section)
  aboutBadge: string;
  aboutHeading: string;
  aboutBio: string;
  aboutCtaButton: string;

  // Servicios (Services Section)
  servicesBadge: string;
  servicesHeading: string;
  servicesSubtitle: string;

  // El Canal (Card 02)
  canalTitle: string;
  canalTagline: string;
  canalDescription: string;

  // Proyectos
  projectsBadge?: string;
  projectsHeading?: string;
  projectsSubtitle?: string;

  // Contacto (Contact Section)
  contactBadge: string;
  contactHeading: string;
  contactSubtitle: string;
  contactDescription?: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactLocation?: string;
  contactSchedule?: string;
  contactWhatsAppText: string;
}

