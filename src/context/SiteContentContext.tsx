import React, { createContext, useContext, useState, useEffect } from 'react';
import { MarqueeItem, BrandItem, WebProjectItem, ChannelVideoItem, FestivalNightItem, SiteTexts } from '../types';
import { safeStorage } from '../utils/imageCompressor';
import { PLACEHOLDERS } from '../utils/images';
import { normalizeContentStrings } from '../utils/textEncoding';
import initialSiteData from '../data/siteContent.json';

// Base URL de la web ("./" = rutas relativas, funciona en Hostinger raíz o subcarpeta)
const SITE_BASE =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL
    ? (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL
    : './';
const contentApiUrl = (filename: string) => `${SITE_BASE}api/${filename}`;

interface SiteContentState {
  // Routing / Admin mode
  isAdminRoute: boolean;
  navigateToAdmin: () => void;
  navigateToPublic: () => void;

  // Editable Website Texts
  siteTexts: SiteTexts;
  setSiteTexts: React.Dispatch<React.SetStateAction<SiteTexts>>;
  updateSiteText: (key: keyof SiteTexts, value: string) => void;
  resetSiteTexts: () => void;

  // Brand Icon / Logo
  customIconUrl: string | null;
  setCustomIconUrl: (url: string | null) => void;

  // Footer Logo
  customFooterLogoUrl: string | null;
  setCustomFooterLogoUrl: (url: string | null) => void;

  // Marquee under Home
  marqueeItems: MarqueeItem[];
  setMarqueeItems: React.Dispatch<React.SetStateAction<MarqueeItem[]>>;
  updateMarqueeItem: (id: string, updated: Partial<MarqueeItem>) => void;
  addMarqueeItem: (item: Omit<MarqueeItem, 'id'>) => void;
  deleteMarqueeItem: (id: string) => void;

  // Partner Brands Carousel
  brandLogos: BrandItem[];
  setBrandLogos: React.Dispatch<React.SetStateAction<BrandItem[]>>;
  addBrandLogo: (brand: Omit<BrandItem, 'id'>) => void;
  deleteBrandLogo: (id: string) => void;

  // Developed Web Projects Carousel
  webProjects: WebProjectItem[];
  setWebProjects: React.Dispatch<React.SetStateAction<WebProjectItem[]>>;
  addWebProject: (project: Omit<WebProjectItem, 'id'>) => void;
  updateWebProject: (id: string, updated: Partial<WebProjectItem>) => void;
  deleteWebProject: (id: string) => void;

  // Festival Nights (Playas Doradas 2026)
  festivalNights: FestivalNightItem[];
  setFestivalNights: React.Dispatch<React.SetStateAction<FestivalNightItem[]>>;
  updateFestivalNight: (index: number, updated: Partial<FestivalNightItem>) => void;

  // Channel Videos (@elmancasg)
  channelVideos: ChannelVideoItem[];
  setChannelVideos: React.Dispatch<React.SetStateAction<ChannelVideoItem[]>>;
  updateChannelVideo: (id: string, updated: Partial<ChannelVideoItem>) => void;

  // Apply changes mechanism
  hasPendingChanges: boolean;
  setHasPendingChanges: (val: boolean) => void;
  lastAppliedTime: string | null;
  applyAllChanges: () => Promise<{ success: boolean; message: string; timestamp: string; hostingerSaved?: boolean }>;

  // Hostinger Integration & Cloud Storage
  hostingerUrl: string;
  setHostingerUrl: (url: string) => void;
  isHostingerConnected: boolean;
  testHostingerConnection: (urlToCheck?: string) => Promise<{ success: boolean; message: string; data?: any }>;
  uploadImageToHostinger: (file: File, suggestedName?: string) => Promise<string>;
  syncWithHostinger: () => Promise<{ success: boolean; message: string }>;

  // Backup & Restore
  exportContentJson: () => string;
  importContentJson: (jsonString: string) => boolean;

  // Reset to default
  resetToDefaults: () => void;

  // Active admin tab
  adminActiveTab: 'texts' | 'icon' | 'marquee' | 'brands' | 'webs' | 'festival' | 'hostinger';
  setAdminActiveTab: (tab: 'texts' | 'icon' | 'marquee' | 'brands' | 'webs' | 'festival' | 'hostinger') => void;
}

export const defaultSiteTexts: SiteTexts = {
  heroSlogan: '#ConectandoPersonas',
  heroHeadline: 'MANCA',
  heroSubheadline: 'Productora Audiovisual & Agencia Digital 360',
  heroDescription:
    'Impulsamos la transformación digital y damos visibilidad a las historias de nuestra región. Streaming multicámara profesional, coberturas en directo de festivales masivos, contenidos comunitarios y desarrollo web llave en mano con hosting y soporte garantizado.',
  heroCtaButton: 'Comenzar Proyecto',
  aboutBadge: 'NUESTRA ESENCIA',
  aboutHeading: 'NUESTRA ESENCIA',
  aboutBio:
    'Somos Manca, una productora audiovisual y una agencia digital integral arraigada en la comunidad. Nuestra esencia radica en ser un puente: por un lado, damos visibilidad a las historias, talentos y eventos locales; por el otro, impulsamos la transformación digital de los comercios y empresas de la región.',
  aboutCtaButton: 'Conocer Más',
  servicesBadge: 'NUESTROS PILARES FUNDAMENTALES',
  servicesHeading: 'SERVICIOS',
  servicesSubtitle:
    'Impulsamos proyectos a través de la comunicación visual, el streaming en vivo y la tecnología digital.',
  canalTitle: 'El Canal: @elmancasg',
  canalTagline: 'Impacto Comunitario • Contenido Propio & Deportes',
  canalDescription:
    'Creamos contenido propio que le da voz a deportes, eventos y personas que normalmente no tienen visibilidad. Un compromiso social que inspira a los niños y jóvenes de Sierra Grande y la región como verdaderos referentes.',
  projectsBadge: 'COBERTURAS, EL CANAL & TRANSFORMACIÓN DIGITAL',
  projectsHeading: 'PROYECTOS',
  projectsSubtitle:
    'Transmisiones en vivo masivas, producciones de El Canal y plataformas digitales para el desarrollo de nuestra gente.',
  contactBadge: '#ConectandoPersonas • ESTAMOS A TU DISPOSICIÓN',
  contactHeading: 'HABLEMOS DE TU PRÓXIMO PROYECTO',
  contactSubtitle:
    'Elegí el medio que te sea más cómodo: completá el formulario directo o escribinos a nuestro canal exclusivo de WhatsApp para una respuesta inmediata.',
  contactDescription:
    'Dejanos tu consulta mediante el formulario web o escribinos directamente por WhatsApp para recibir atención inmediata y asesoramiento personalizado.',
  contactPhone: '5492920214741',
  contactEmail: 'contacto@elmanca.com.ar',
  contactAddress: 'Sierra Grande & Playas Doradas, Río Negro, Patagonia Argentina',
  contactLocation: 'Sierra Grande & Playas Doradas, Río Negro, Patagonia Argentina',
  contactSchedule: 'Lunes a Sábado de 09:00 a 20:00 hs',
  contactWhatsAppText: '¡Hola Manca! Quisiera consultar por sus servicios de streaming y desarrollo web.',
};

const defaultFestivalNights: FestivalNightItem[] = [
  {
    night: 'Noche 1',
    title: 'Apertura & Escenario Principal',
    youtubeId: 'QMQ4kJgnf0M',
    url: 'https://www.youtube.com/live/QMQ4kJgnf0M?si=u7LGmLoHpSz_uQM1',
    thumbnail: 'https://i.ytimg.com/vi/QMQ4kJgnf0M/hqdefault.jpg',
    badge: 'Transmisión Oficial Noche 1',
  },
  {
    night: 'Noche 2',
    title: 'Artistas, Shows & Cobertura',
    youtubeId: '6sBlnahh6Y4',
    url: 'https://www.youtube.com/live/6sBlnahh6Y4?si=HVbcGwsiHIRzuAfj',
    thumbnail: 'https://i.ytimg.com/vi/6sBlnahh6Y4/hqdefault.jpg',
    badge: 'Transmisión Oficial Noche 2',
  },
  {
    night: 'Noche 3',
    title: 'Gran Cierre del Festival',
    youtubeId: 'dHIYvORgujw',
    url: 'https://www.youtube.com/live/dHIYvORgujw?si=J7qhGi9FixakN2CB',
    thumbnail: 'https://i.ytimg.com/vi/dHIYvORgujw/hqdefault.jpg',
    badge: 'Transmisión Oficial Noche 3',
  },
];

const defaultMarqueeItems: MarqueeItem[] = [
  // PLACEHOLDERS LOCALES: cada tarjeta usa public/assets/img/placeholder-galeria.svg
  // Para usar fotos propias: reemplazá ese archivo o subí una imagen desde el panel Admin.
  {
    id: 'm1',
    title: 'Fiesta Nacional de Playas Doradas 2026',
    category: 'Streaming de Gran Escala',
    image: PLACEHOLDERS.galeria,
    tag: 'Noches en Vivo 1, 2 y 3',
  },
  {
    id: 'm2',
    title: 'Transmisión Multicámara en Directo',
    category: 'Producción & Broadcast',
    image: PLACEHOLDERS.galeria,
    tag: 'Calidad Broadcast HD',
  },
  {
    id: 'm3',
    title: 'Radio Municipal & Estudios',
    category: 'Audio & Streaming',
    image: PLACEHOLDERS.galeria,
    tag: 'Sonido & Enlace Digital',
  },
  {
    id: 'm4',
    title: 'El Canal: Deportes Locales @elmancasg',
    category: 'Impacto Comunitario',
    image: PLACEHOLDERS.galeria,
    tag: 'Visibilidad a Jóvenes Talentos',
  },
  {
    id: 'm5',
    title: 'Diseño Web Integral con Hosting',
    category: 'Agencia Digital 360',
    image: PLACEHOLDERS.galeria,
    tag: 'Web + Dominio + Webmail',
  },
  {
    id: 'm6',
    title: 'Publicidad Audiovisual (4 videos/mes)',
    category: 'Contenido Comercial',
    image: PLACEHOLDERS.galeria,
    tag: 'Promoción $200.000',
  },
  {
    id: 'm7',
    title: 'Historias que Inspiran a Nuestra Comunidad',
    category: 'El Canal Comunitario',
    image: PLACEHOLDERS.galeria,
    tag: 'Referentes para Niños & Jóvenes',
  },
  {
    id: 'm8',
    title: 'Planes de Sponsor & Banners en Pantalla',
    category: 'Patrocinio en Video',
    image: PLACEHOLDERS.galeria,
    tag: 'Menciones & Presencia de Marca',
  },
];

const defaultBrandLogos: BrandItem[] = [
  // LOGOS DE MARCAS: usan public/assets/img/placeholder-marca.svg
  // Reemplazá ese archivo o cargá cada logo desde el panel Admin (pestaña Marcas).
  {
    id: 'b1',
    name: 'Fiesta Nacional de Playas Doradas',
    logo: PLACEHOLDERS.marca,
    category: 'Evento Oficial',
  },
  {
    id: 'b2',
    name: 'Radio Municipal Sierra Grande',
    logo: PLACEHOLDERS.marca,
    category: 'Medio Aliado',
  },
  {
    id: 'b3',
    name: 'Municipalidad Sierra Grande',
    logo: PLACEHOLDERS.marca,
    category: 'Institucional',
  },
  {
    id: 'b4',
    name: 'Club Atlético Comunitario',
    logo: PLACEHOLDERS.marca,
    category: 'Deportes',
  },
  {
    id: 'b5',
    name: 'Comercio & Empresa Regional',
    logo: PLACEHOLDERS.marca,
    category: 'Comercio Local',
  },
  {
    id: 'b6',
    name: 'Parador & Turismo Playas',
    logo: PLACEHOLDERS.marca,
    category: 'Turismo',
  },
  {
    id: 'b7',
    name: 'Distribuidora Costa Atlántica',
    logo: PLACEHOLDERS.marca,
    category: 'Sponsor Oficial',
  },
];

const defaultWebProjects: WebProjectItem[] = [
  // WEBS DESARROLLADAS: usan public/assets/img/placeholder-web.svg
  // Reemplazá ese archivo o subí capturas PNG/GIF desde el panel Admin (pestaña Webs).
  {
    id: 'w1',
    title: 'Portal Playas Doradas Turismo & Hospedajes',
    client: 'Secretaría de Turismo & Paradores',
    thumbnail: PLACEHOLDERS.web,
    liveUrl: '#',
    tag: 'Web Responsive + Webmail',
    description: 'Guía interactiva de balnearios, reservas y eventos con dominio oficial y hosting de alta velocidad.',
  },
  {
    id: 'w2',
    title: 'Comercio Digital & Catálogo Sierra Grande',
    client: 'Red de Comercios Regionales',
    thumbnail: PLACEHOLDERS.web,
    liveUrl: '#',
    tag: 'E-commerce & WhatsApp',
    description: 'Catálogo autogestionable con integración a WhatsApp Business para pedidos y consultas directas.',
  },
  {
    id: 'w3',
    title: 'Radio Municipal Streaming & Noticias Web',
    client: 'Emisora Municipal FM',
    thumbnail: PLACEHOLDERS.web,
    liveUrl: '#',
    tag: 'Streaming Audio Player + Noticias',
    description: 'Plataforma web con reproductor de radio en vivo las 24 hs, podcasts y noticias locales actualizadas.',
  },
  {
    id: 'w4',
    title: 'Portal de Eventos & Coberturas Comunitarias',
    client: 'Manca Productora',
    thumbnail: PLACEHOLDERS.web,
    liveUrl: '#',
    tag: 'Plataforma Multimedia',
    description: 'Transmisiones en vivo, galerías de fotos de alta resolución y archivo de transmisiones pasadas.',
  },
];

const defaultChannelVideos: ChannelVideoItem[] = [
  {
    id: 'yt_TPbwU237jqg',
    title: 'PASANTÍAS 2026 | Proyecto Educativo de la EEE Nº11 de Sierra Grande',
    youtubeId: 'TPbwU237jqg',
    thumbnail: 'https://i.ytimg.com/vi/TPbwU237jqg/hqdefault.jpg',
    views: '532 vistas',
    duration: 'Reportaje',
    date: 'Septiembre 2026',
  },
  {
    id: 'yt_sq3KAbJKZ9o',
    title: '🎉 DÍA DEL NIÑO EN SIERRA GRANDE: ¡VUTA MAHUIDA SE LLENO DE ALEGRIA! 🔥🎈',
    youtubeId: 'sq3KAbJKZ9o',
    thumbnail: 'https://i.ytimg.com/vi/sq3KAbJKZ9o/hqdefault.jpg',
    views: '393 vistas',
    duration: 'Comunidad',
    date: 'Agosto 2026',
  },
  {
    id: 'yt_h_mx1ZPC1sE',
    title: 'REINAUGURACIÓN DE LA PLAZA DE Bº ESFUERZO PROPIO E ISLAS MALVINAS | INFORMES SG',
    youtubeId: 'h-mx1ZPC1sE',
    thumbnail: 'https://i.ytimg.com/vi/h-mx1ZPC1sE/hqdefault.jpg',
    views: '253 vistas',
    duration: 'Informes SG',
    date: 'Agosto 2026',
  },
  {
    id: 'yt__Hc3iBt6NrM',
    title: '¡Histórico! La nieve volvió a Sierra Grande y recorrimos distintos puntos de nuestro pueblo.',
    youtubeId: '-Hc3iBt6NrM',
    thumbnail: 'https://i.ytimg.com/vi/-Hc3iBt6NrM/hqdefault.jpg',
    views: '545 vistas',
    duration: 'Cobertura',
    date: 'Julio 2026',
  },
  {
    id: 'yt_cA4vjirTuS8',
    title: 'LA HORA DEL PIQUE - #EP5 - 2026',
    youtubeId: 'cA4vjirTuS8',
    thumbnail: 'https://i.ytimg.com/vi/cA4vjirTuS8/hqdefault.jpg',
    views: '186 vistas',
    duration: 'Programa',
    date: 'Julio 2026',
  },
  {
    id: 'yt_wkSjdSsyPHI',
    title: '¡Así se viven las Vacaciones de Invierno en los Barrios de Sierra Grande! | INFORMES SG',
    youtubeId: 'wkSjdSsyPHI',
    thumbnail: 'https://i.ytimg.com/vi/wkSjdSsyPHI/hqdefault.jpg',
    views: '354 vistas',
    duration: 'Informes SG',
    date: 'Julio 2026',
  },
  {
    id: 'yt_gKaYcnlYagg',
    title: 'ARGENTINA ES FINALISTA DEL MUNDIAL 2026 - FESTEJOS EN SIERRA GRANDE',
    youtubeId: 'gKaYcnlYagg',
    thumbnail: 'https://i.ytimg.com/vi/gKaYcnlYagg/hqdefault.jpg',
    views: '823 vistas',
    duration: 'Festejos',
    date: 'Julio 2026',
  },
  {
    id: 'yt_z6Ml2HLe4L0',
    title: 'ACTO 9 DE JULIO | Escuela N°251 T.Tarde | #MancaenlasEscuelas EP. 3',
    youtubeId: 'z6Ml2HLe4L0',
    thumbnail: 'https://i.ytimg.com/vi/z6Ml2HLe4L0/hqdefault.jpg',
    views: '451 vistas',
    duration: 'Escuelas',
    date: 'Julio 2026',
  },
  {
    id: 'yt_QHh_51eVzIk',
    title: 'LA HORA DEL PIQUE - #EP4 - 2026',
    youtubeId: 'QHh_51eVzIk',
    thumbnail: 'https://i.ytimg.com/vi/QHh_51eVzIk/hqdefault.jpg',
    views: '201 vistas',
    duration: 'Programa',
    date: 'Julio 2026',
  },
  {
    id: 'yt_4Zr1wXE_2yM',
    title: 'Emprende SG | ABOGADA Fátima Maldonado: "UN DEUDOR DE ALIMENTOS ESTUVO 10 AÑOS SIN DAR UN PESO"',
    youtubeId: '4Zr1wXE_2yM',
    thumbnail: 'https://i.ytimg.com/vi/4Zr1wXE_2yM/hqdefault.jpg',
    views: '51 vistas',
    duration: 'Entrevista',
    date: 'Junio 2026',
  },
  {
    id: 'yt_8Hlhe1VMlW8',
    title: 'PROMESA A LA BANDERA 2026 | Escuela N° 62 | #MancaenlasEscuelas EP. 2',
    youtubeId: '8Hlhe1VMlW8',
    thumbnail: 'https://i.ytimg.com/vi/8Hlhe1VMlW8/hqdefault.jpg',
    views: '569 vistas',
    duration: 'Escuelas',
    date: 'Junio 2026',
  },
  {
    id: 'yt_1zpfzZoGYVQ',
    title: 'LA HORA DEL PIQUE - #EP2 - 2026',
    youtubeId: '1zpfzZoGYVQ',
    thumbnail: 'https://i.ytimg.com/vi/1zpfzZoGYVQ/hqdefault.jpg',
    views: '344 vistas',
    duration: 'Programa',
    date: 'Junio 2026',
  },
];

const SiteContentContext = createContext<SiteContentState | undefined>(undefined);

function checkIsAdminUrl(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname.startsWith('/admin') ||
    window.location.hash.startsWith('#admin') ||
    window.location.search.includes('admin=true')
  );
}

function getNormalizedStorage<T>(key: string, fallback: T): T {
  const stored = safeStorage.get<T>(key, fallback);
  const normalized = normalizeContentStrings(stored);

  if (JSON.stringify(stored) !== JSON.stringify(normalized)) {
    safeStorage.set(key, normalized);
  }

  return normalized;
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Route state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => checkIsAdminUrl());
  const [adminActiveTab, setAdminActiveTab] = useState<
    'texts' | 'icon' | 'marquee' | 'brands' | 'webs' | 'festival' | 'hostinger'
  >('texts');

  // Hostinger Cloud URL configuration & connection status
  const [hostingerUrl, setHostingerUrlState] = useState<string>(() => {
    return safeStorage.get<string>('manca_hostinger_url', 'https://elmanca.com.ar');
  });
  const [isHostingerConnected, setIsHostingerConnected] = useState<boolean>(false);

  const setHostingerUrl = (url: string) => {
    const clean = url.trim().replace(/\/+$/, '');
    setHostingerUrlState(clean);
    safeStorage.set('manca_hostinger_url', clean);
  };

  // Watch for URL changes (popstate and hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminRoute(checkIsAdminUrl());
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminRoute(true);
  };

  const navigateToPublic = () => {
    if (window.location.hash.startsWith('#admin')) {
      window.location.hash = '';
    }
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminRoute(false);
  };

  // State with safeStorage fallback to initialSiteData
  const [customIconUrl, setCustomIconUrlState] = useState<string | null>(() => {
    return safeStorage.get<string | null>(
      'manca_custom_icon',
      initialSiteData?.customIconUrl || null
    );
  });

  const [customFooterLogoUrl, setCustomFooterLogoUrlState] = useState<string | null>(() => {
    return safeStorage.get<string | null>(
      'manca_footer_logo',
      initialSiteData?.customFooterLogoUrl || null
    );
  });

  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);
  const [lastAppliedTime, setLastAppliedTime] = useState<string | null>(() => {
    return safeStorage.get<string | null>(
      'manca_last_applied_time',
      initialSiteData?.lastAppliedTime || null
    );
  });

  const [marqueeItems, setMarqueeItemsState] = useState<MarqueeItem[]>(() => {
    return getNormalizedStorage<MarqueeItem[]>(
      'manca_marquee_items',
      (initialSiteData?.marqueeItems as MarqueeItem[]) || defaultMarqueeItems
    );
  });

  const [brandLogos, setBrandLogosState] = useState<BrandItem[]>(() => {
    return getNormalizedStorage<BrandItem[]>(
      'manca_brand_logos',
      (initialSiteData?.brandLogos as BrandItem[]) || defaultBrandLogos
    );
  });

  const [webProjects, setWebProjectsState] = useState<WebProjectItem[]>(() => {
    return getNormalizedStorage<WebProjectItem[]>(
      'manca_web_projects',
      (initialSiteData?.webProjects as WebProjectItem[]) || defaultWebProjects
    );
  });

  const [festivalNights, setFestivalNightsState] = useState<FestivalNightItem[]>(() => {
    return getNormalizedStorage<FestivalNightItem[]>(
      'manca_festival_nights',
      (initialSiteData?.festivalNights as FestivalNightItem[]) || defaultFestivalNights
    );
  });

  const [channelVideos, setChannelVideosState] = useState<ChannelVideoItem[]>(() => {
    const saved = getNormalizedStorage<ChannelVideoItem[] | null>('manca_channel_videos_v2', null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    const legacy = getNormalizedStorage<ChannelVideoItem[] | null>('manca_channel_videos', null);
    const isOutdatedLegacy =
      !legacy ||
      legacy.length === 0 ||
      legacy.some(
        (v) =>
          v.id === 'v1' ||
          v.id === 'v2' ||
          v.thumbnail?.includes('unsplash') ||
          v.title?.includes('Fiesta Nacional de Playas Doradas 2026 - Transmisión Oficial en Vivo')
      );
    if (!isOutdatedLegacy && legacy && legacy.length > 0) {
      return legacy;
    }
    safeStorage.set('manca_channel_videos_v2', defaultChannelVideos);
    safeStorage.set('manca_channel_videos', defaultChannelVideos);
    return defaultChannelVideos;
  });

  const [siteTexts, setSiteTextsState] = useState<SiteTexts>(() => {
    const saved = getNormalizedStorage<SiteTexts | null>('manca_site_texts', null);
    if (saved && typeof saved === 'object') {
      return { ...defaultSiteTexts, ...saved };
    }
    const fromJson = (initialSiteData as any)?.siteTexts;
    if (fromJson && typeof fromJson === 'object') {
      return { ...defaultSiteTexts, ...fromJson };
    }
    return defaultSiteTexts;
  });

  const setSiteTexts: React.Dispatch<React.SetStateAction<SiteTexts>> = (val) => {
    setHasPendingChanges(true);
    setSiteTextsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_site_texts', next);
      return next;
    });
  };

  const updateSiteText = (key: keyof SiteTexts, value: string) => {
    setHasPendingChanges(true);
    setSiteTextsState((prev) => {
      const next = { ...prev, [key]: value };
      safeStorage.set('manca_site_texts', next);
      return next;
    });
  };

  const resetSiteTexts = () => {
    setHasPendingChanges(true);
    setSiteTextsState(defaultSiteTexts);
    safeStorage.set('manca_site_texts', defaultSiteTexts);
  };

  // Global Sync: Fetch live published content from Hostinger or server API on boot
  useEffect(() => {
    let isMounted = true;

    const applyIncomingData = (data: any) => {
      if (!isMounted || !data || typeof data !== 'object') return;
      const normalizedData = normalizeContentStrings(data);
      const contentWasRepaired = JSON.stringify(data) !== JSON.stringify(normalizedData);

      if (contentWasRepaired) setHasPendingChanges(true);

      if (normalizedData.siteTexts && typeof normalizedData.siteTexts === 'object') {
        setSiteTextsState((prev) => {
          const merged = { ...prev, ...normalizedData.siteTexts };
          safeStorage.set('manca_site_texts', merged);
          return merged;
        });
      }

      if (normalizedData.customIconUrl !== undefined) {
        setCustomIconUrlState(normalizedData.customIconUrl);
        if (normalizedData.customIconUrl) {
          safeStorage.set('manca_custom_icon', normalizedData.customIconUrl);
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (link) link.href = normalizedData.customIconUrl;
        }
      }
      if (normalizedData.customFooterLogoUrl !== undefined) {
        setCustomFooterLogoUrlState(normalizedData.customFooterLogoUrl);
        if (normalizedData.customFooterLogoUrl) {
          safeStorage.set('manca_footer_logo', normalizedData.customFooterLogoUrl);
        }
      }
      if (Array.isArray(normalizedData.marqueeItems) && normalizedData.marqueeItems.length > 0) {
        setMarqueeItemsState(normalizedData.marqueeItems);
        safeStorage.set('manca_marquee_items', normalizedData.marqueeItems);
      }
      if (Array.isArray(normalizedData.brandLogos) && normalizedData.brandLogos.length > 0) {
        setBrandLogosState(normalizedData.brandLogos);
        safeStorage.set('manca_brand_logos', normalizedData.brandLogos);
      }
      if (Array.isArray(normalizedData.webProjects) && normalizedData.webProjects.length > 0) {
        setWebProjectsState(normalizedData.webProjects);
        safeStorage.set('manca_web_projects', normalizedData.webProjects);
      }
      if (Array.isArray(normalizedData.festivalNights) && normalizedData.festivalNights.length > 0) {
        setFestivalNightsState(normalizedData.festivalNights);
        safeStorage.set('manca_festival_nights', normalizedData.festivalNights);
      }
      if (Array.isArray(normalizedData.channelVideos) && normalizedData.channelVideos.length > 0) {
        setChannelVideosState(normalizedData.channelVideos);
        safeStorage.set('manca_channel_videos', normalizedData.channelVideos);
      }
      if (normalizedData.lastAppliedTime) {
        setLastAppliedTime(normalizedData.lastAppliedTime);
        safeStorage.set('manca_last_applied_time', normalizedData.lastAppliedTime);
      }
    };

    const fetchContent = async () => {
      // 1. If hostingerUrl is configured, try Hostinger API first
      const cleanHostinger = hostingerUrl?.trim().replace(/\/+$/, '');
      if (cleanHostinger) {
        try {
          const hRes = await fetch(`${cleanHostinger}/api/content.php`, { mode: 'cors' });
          if (hRes.ok) {
            const hData = await hRes.json();
            if (hData && !hData.error && (hData.marqueeItems || hData.brandLogos || hData.customIconUrl)) {
              applyIncomingData(hData);
              setIsHostingerConnected(true);
              return;
            }
          }
        } catch (e) {
          // Hostinger not yet reached or CORS pending, proceed to local API
        }
      }

      // 1b. Hostinger PHP API en la MISMA web (rutas relativas: funciona en raíz o subcarpeta)
      try {
        const hRes = await fetch(contentApiUrl('content.php'), { mode: 'cors' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (hData && !hData.error && (hData.marqueeItems || hData.brandLogos || hData.customIconUrl)) {
            applyIncomingData(hData);
            return;
          }
        }
      } catch (e) {
        // Sin API PHP en esta ubicación, continuamos
      }

      // 2. Local Node/Express server /api/content
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data) applyIncomingData(data);
        }
      } catch (err) {
        // Fallback silently to local storage or initialSiteData
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [hostingerUrl]);

  // Test Hostinger Connection
  const testHostingerConnection = async (urlToCheck?: string) => {
    const targetUrl = (urlToCheck || hostingerUrl).trim().replace(/\/+$/, '');
    if (!targetUrl) {
      return { success: false, message: 'Ingresa la URL de tu sitio en Hostinger.' };
    }
    try {
      const endpoint = `${targetUrl}/api/content.php`;
      const res = await fetch(endpoint, { method: 'GET', mode: 'cors' });
      if (res.ok) {
        const data = await res.json();
        setIsHostingerConnected(true);
        return {
          success: true,
          message: '¡Conexión exitosa con Hostinger! La API respondió correctamente.',
          data,
        };
      } else {
        setIsHostingerConnected(false);
        return {
          success: false,
          message: `Hostinger respondió con código ${res.status}. Verifica haber subido la carpeta 'api' dentro de 'public_html/'.`,
        };
      }
    } catch (err: any) {
      setIsHostingerConnected(false);
      return {
        success: false,
        message: `No se pudo conectar con ${targetUrl}/api/content.php. Asegúrate de que el dominio esté activo y hayas subido los archivos PHP.`,
      };
    }
  };

  // Upload Image to Hostinger (with fallback to local /api/upload)
  const uploadImageToHostinger = async (file: File, suggestedName = 'manca'): Promise<string> => {
    const { compressImageFile } = await import('../utils/imageCompressor');
    const compressed = await compressImageFile(file, 1600, 0.88);
    const cleanHostinger = hostingerUrl.trim().replace(/\/+$/, '');

    // 1. Try configured Hostinger endpoint
    if (cleanHostinger) {
      try {
        const res = await fetch(`${cleanHostinger}/api/upload.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: compressed, name: suggestedName }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.url) {
            setIsHostingerConnected(true);
            return data.url;
          }
        }
      } catch (err) {
        console.warn('Hostinger upload error, trying local server fallback:', err);
      }
    }

    // 1.5. API PHP de la misma web (Hostinger: api/upload.php)
    try {
      const res = await fetch(contentApiUrl('upload.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: compressed, name: suggestedName }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.url) return data.url;
      }
    } catch (err3) {
      console.warn('Local PHP upload error:', err3);
    }

    // 2. Try local server or same-domain Hostinger (/api/upload.php or /api/upload)
    try {
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: compressed, name: suggestedName }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) return data.url;
      }
    } catch (e) {}

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: compressed, name: suggestedName }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) return data.url;
      }
    } catch (err2) {
      console.warn('Local /api/upload error:', err2);
    }

    // 3. Fallback to compressed base64
    return compressed;
  };

  // Manual trigger to sync current site state directly with Hostinger
  const syncWithHostinger = async () => {
    const cleanHostinger = hostingerUrl.trim().replace(/\/+$/, '');
    if (!cleanHostinger) {
      return { success: false, message: 'Por favor ingresa la URL de Hostinger.' };
    }
    const payload = {
      siteTexts,
      customIconUrl,
      customFooterLogoUrl,
      lastAppliedTime: new Date().toLocaleTimeString('es-AR'),
      marqueeItems,
      brandLogos,
      webProjects,
      festivalNights,
      channelVideos,
    };
    try {
      const res = await fetch(`${cleanHostinger}/api/content.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsHostingerConnected(true);
        return {
          success: true,
          message: '¡Todo el sitio fue sincronizado y guardado con éxito en Hostinger!',
        };
      }
      return { success: false, message: `Hostinger devolvió código ${res.status}` };
    } catch (err) {
      return {
        success: false,
        message: 'No se pudo contactar con Hostinger. Revisa que content.php esté en public_html/api/.',
      };
    }
  };

  const setCustomFooterLogoUrl = (url: string | null) => {
    setCustomFooterLogoUrlState(url);
    setHasPendingChanges(true);
    if (url) {
      safeStorage.set('manca_footer_logo', url);
    } else {
      safeStorage.remove('manca_footer_logo');
    }
  };

  // Sync favicon if icon changed
  const setCustomIconUrl = (url: string | null) => {
    setCustomIconUrlState(url);
    setHasPendingChanges(true);
    if (url) {
      safeStorage.set('manca_custom_icon', url);
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = url;
    } else {
      safeStorage.remove('manca_custom_icon');
    }
  };

  const setMarqueeItems: React.Dispatch<React.SetStateAction<MarqueeItem[]>> = (val) => {
    setHasPendingChanges(true);
    setMarqueeItemsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_marquee_items', next);
      return next;
    });
  };

  const updateMarqueeItem = (id: string, updated: Partial<MarqueeItem>) => {
    setHasPendingChanges(true);
    setMarqueeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addMarqueeItem = (item: Omit<MarqueeItem, 'id'>) => {
    setHasPendingChanges(true);
    const newItem: MarqueeItem = { ...item, id: `m_${Date.now()}` };
    setMarqueeItems((prev) => [newItem, ...prev]);
  };

  const deleteMarqueeItem = (id: string) => {
    setHasPendingChanges(true);
    setMarqueeItems((prev) => prev.filter((item) => item.id !== id));
  };

  const setBrandLogos: React.Dispatch<React.SetStateAction<BrandItem[]>> = (val) => {
    setHasPendingChanges(true);
    setBrandLogosState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_brand_logos', next);
      return next;
    });
  };

  const addBrandLogo = (brand: Omit<BrandItem, 'id'>) => {
    setHasPendingChanges(true);
    const newBrand: BrandItem = { ...brand, id: `b_${Date.now()}` };
    setBrandLogos((prev) => [...prev, newBrand]);
  };

  const deleteBrandLogo = (id: string) => {
    setHasPendingChanges(true);
    setBrandLogos((prev) => prev.filter((b) => b.id !== id));
  };

  const setWebProjects: React.Dispatch<React.SetStateAction<WebProjectItem[]>> = (val) => {
    setHasPendingChanges(true);
    setWebProjectsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_web_projects', next);
      return next;
    });
  };

  const addWebProject = (project: Omit<WebProjectItem, 'id'>) => {
    setHasPendingChanges(true);
    const newProj: WebProjectItem = { ...project, id: `w_${Date.now()}` };
    setWebProjects((prev) => [newProj, ...prev]);
  };

  const updateWebProject = (id: string, updated: Partial<WebProjectItem>) => {
    setHasPendingChanges(true);
    setWebProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteWebProject = (id: string) => {
    setHasPendingChanges(true);
    setWebProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const setFestivalNights: React.Dispatch<React.SetStateAction<FestivalNightItem[]>> = (val) => {
    setHasPendingChanges(true);
    setFestivalNightsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_festival_nights', next);
      return next;
    });
  };

  const updateFestivalNight = (index: number, updated: Partial<FestivalNightItem>) => {
    setHasPendingChanges(true);
    setFestivalNights((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updated } : item))
    );
  };

  const setChannelVideos: React.Dispatch<React.SetStateAction<ChannelVideoItem[]>> = (val) => {
    setHasPendingChanges(true);
    setChannelVideosState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_channel_videos', next);
      safeStorage.set('manca_channel_videos_v2', next);
      return next;
    });
  };

  const updateChannelVideo = (id: string, updated: Partial<ChannelVideoItem>) => {
    setHasPendingChanges(true);
    setChannelVideos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  // Export content as JSON string
  const exportContentJson = () => {
    const data = {
      siteTexts,
      customIconUrl,
      customFooterLogoUrl,
      lastAppliedTime,
      marqueeItems,
      brandLogos,
      webProjects,
      festivalNights,
      channelVideos,
    };
    return JSON.stringify(data, null, 2);
  };

  // Import content from JSON string
  const importContentJson = (jsonString: string): boolean => {
    try {
      const data = normalizeContentStrings(JSON.parse(jsonString));
      if (!data || typeof data !== 'object') return false;

      if (data.siteTexts && typeof data.siteTexts === 'object') {
        setSiteTexts((prev) => ({ ...prev, ...data.siteTexts }));
      }
      if (data.customIconUrl !== undefined) {
        setCustomIconUrl(data.customIconUrl);
      }
      if (data.customFooterLogoUrl !== undefined) {
        setCustomFooterLogoUrl(data.customFooterLogoUrl);
      }
      if (Array.isArray(data.marqueeItems)) {
        setMarqueeItems(data.marqueeItems);
      }
      if (Array.isArray(data.brandLogos)) {
        setBrandLogos(data.brandLogos);
      }
      if (Array.isArray(data.webProjects)) {
        setWebProjects(data.webProjects);
      }
      if (Array.isArray(data.festivalNights)) {
        setFestivalNights(data.festivalNights);
      }
      if (Array.isArray(data.channelVideos)) {
        setChannelVideos(data.channelVideos);
      }

      setHasPendingChanges(true);
      return true;
    } catch (e) {
      console.error('Invalid JSON import:', e);
      return false;
    }
  };

  // Master APPLY CHANGES function - Persists to browser, server API & workspace code
  const applyAllChanges = async () => {
    const now = new Date().toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // 1. Immediate client-side update
    safeStorage.set('manca_site_texts', siteTexts);

    if (customIconUrl) {
      safeStorage.set('manca_custom_icon', customIconUrl);
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = customIconUrl;
    } else {
      safeStorage.remove('manca_custom_icon');
    }

    if (customFooterLogoUrl) {
      safeStorage.set('manca_footer_logo', customFooterLogoUrl);
    } else {
      safeStorage.remove('manca_footer_logo');
    }

    safeStorage.set('manca_marquee_items', marqueeItems);
    safeStorage.set('manca_brand_logos', brandLogos);
    safeStorage.set('manca_web_projects', webProjects);
    safeStorage.set('manca_festival_nights', festivalNights);
    safeStorage.set('manca_channel_videos', channelVideos);
    safeStorage.set('manca_channel_videos_v2', channelVideos);
    safeStorage.set('manca_last_applied_time', now);
    setLastAppliedTime(now);
    setHasPendingChanges(false);

    // 2. Server-side persistence (Local Express server)
    const payload = {
      siteTexts,
      customIconUrl,
      customFooterLogoUrl,
      lastAppliedTime: now,
      marqueeItems,
      brandLogos,
      webProjects,
      festivalNights,
      channelVideos,
    };

    let serverSaved = false;
    let hostingerSaved = false;

    // Save to Hostinger if configured
    const cleanHostinger = hostingerUrl.trim().replace(/\/+$/, '');
    if (cleanHostinger) {
      try {
        const hRes = await fetch(`${cleanHostinger}/api/content.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (hRes.ok) {
          hostingerSaved = true;
          setIsHostingerConnected(true);
        }
      } catch (err) {
        console.warn('Could not save directly to Hostinger:', err);
      }
    }

    // Guardar en la API PHP de la misma web (Hostinger: api/content.php)
    try {
      const res = await fetch(contentApiUrl('content.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        hostingerSaved = true;
      }
    } catch (err) {
      console.warn('Could not save to API content.php:', err);
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        serverSaved = true;
      }
    } catch (err) {
      console.warn('Could not reach /api/content:', err);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('manca_content_applied', {
          detail: { timestamp: now, serverSaved, hostingerSaved },
        })
      );
    }

    const message = hostingerSaved
      ? '¡Cambios guardados con éxito en tu servidor de Hostinger! Ya están visibles en vivo para todos.'
      : serverSaved
      ? '¡Cambios aplicados y guardados en el servidor! Si tienes Hostinger conectado, revisa la pestaña Hostinger.'
      : '¡Cambios aplicados localmente!';

    return {
      success: true,
      message,
      timestamp: now,
      hostingerSaved,
    };
  };

  const resetToDefaults = () => {
    safeStorage.remove('manca_site_texts');
    safeStorage.remove('manca_custom_icon');
    safeStorage.remove('manca_footer_logo');
    safeStorage.remove('manca_marquee_items');
    safeStorage.remove('manca_brand_logos');
    safeStorage.remove('manca_web_projects');
    safeStorage.remove('manca_festival_nights');
    safeStorage.remove('manca_channel_videos');
    safeStorage.remove('manca_last_applied_time');
    setSiteTextsState(defaultSiteTexts);
    setCustomIconUrlState(null);
    setCustomFooterLogoUrlState(null);
    setMarqueeItemsState(defaultMarqueeItems);
    setBrandLogosState(defaultBrandLogos);
    setWebProjectsState(defaultWebProjects);
    setFestivalNightsState(defaultFestivalNights);
    setChannelVideosState(defaultChannelVideos);
    setLastAppliedTime(null);
    setHasPendingChanges(false);

    // Also reset server content
    try {
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteTexts: defaultSiteTexts,
          customIconUrl: null,
          customFooterLogoUrl: null,
          lastAppliedTime: null,
          marqueeItems: defaultMarqueeItems,
          brandLogos: defaultBrandLogos,
          webProjects: defaultWebProjects,
          festivalNights: defaultFestivalNights,
          channelVideos: defaultChannelVideos,
        }),
      }).catch(() => {});
    } catch (e) {}
  };

  return (
    <SiteContentContext.Provider
      value={{
        isAdminRoute,
        navigateToAdmin,
        navigateToPublic,
        siteTexts,
        setSiteTexts,
        updateSiteText,
        resetSiteTexts,
        customIconUrl,
        setCustomIconUrl,
        customFooterLogoUrl,
        setCustomFooterLogoUrl,
        marqueeItems,
        setMarqueeItems,
        updateMarqueeItem,
        addMarqueeItem,
        deleteMarqueeItem,
        brandLogos,
        setBrandLogos,
        addBrandLogo,
        deleteBrandLogo,
        webProjects,
        setWebProjects,
        addWebProject,
        updateWebProject,
        deleteWebProject,
        festivalNights,
        setFestivalNights,
        updateFestivalNight,
        channelVideos,
        setChannelVideos,
        updateChannelVideo,
        hasPendingChanges,
        setHasPendingChanges,
        lastAppliedTime,
        applyAllChanges,
        hostingerUrl,
        setHostingerUrl,
        isHostingerConnected,
        testHostingerConnection,
        uploadImageToHostinger,
        syncWithHostinger,
        exportContentJson,
        importContentJson,
        resetToDefaults,
        adminActiveTab,
        setAdminActiveTab,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
