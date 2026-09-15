import React, { useState, useEffect, useRef } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { MancaCircularIcon } from './MancaBrand';
import { PLACEHOLDERS, resolveImage } from '../utils/images';
import { SmartImage } from './SmartImage';
import {
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Youtube,
  Radio,
  Globe,
  Sparkles,
  X,
  Tv,
  Phone,
  Mail,
} from 'lucide-react';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const ProjectsSection: React.FC<{ onOpenContact?: () => void }> = ({
  onOpenContact,
}) => {
  const { webProjects, channelVideos, customIconUrl, customFooterLogoUrl, festivalNights, siteTexts } = useSiteContent();

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoCloseButtonRef = useRef<HTMLButtonElement>(null);
  const videoTriggerRef = useRef<HTMLButtonElement | null>(null);

  const [webIndex, setWebIndex] = useState(0);

  const [openProject, setOpenProject] = useState<string | null>('01');

  const [showAllVideos, setShowAllVideos] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined') {
        if (window.location.hash === '#canal') {
          setOpenProject('02');
          const el = document.getElementById('canal');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (window.location.hash === '#proyectos' || window.location.hash === '#projects') {
          setOpenProject('01');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  const openVideo = (videoId: string, trigger: HTMLButtonElement) => {
    videoTriggerRef.current = trigger;
    setActiveVideoId(videoId);
  };

  const closeVideo = () => setActiveVideoId(null);

  useEffect(() => {
    if (!activeVideoId) return;

    videoCloseButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeVideo();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      videoTriggerRef.current?.focus();
    };
  }, [activeVideoId]);

  const nextWeb = () => {
    setWebIndex((prev) => (prev + 1) % webProjects.length);
  };
  const prevWeb = () => {
    setWebIndex((prev) => (prev - 1 + webProjects.length) % webProjects.length);
  };
  const hasLiveUrl = (url?: string) => Boolean(url && url !== '#');

  const playasDoradasNights = festivalNights;
  const latestVideo = channelVideos.length > 0 ? channelVideos[0] : null;

  return (
    <section
      id="proyectos"
      className="relative z-10 w-full bg-[#060A14] pt-24 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 overflow-hidden border-t border-[#2A52BE]/20"
    >
      <span id="projects" className="sr-only" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#2A52BE]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto mb-16 sm:mb-24 text-center">
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111D42]/80 border border-[#2A52BE]/40 text-xs tracking-widest uppercase text-[#93C5FD] mb-4">
            <Radio className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{siteTexts.projectsBadge || 'COBERTURAS, EL CANAL & TRANSFORMACIÓN DIGITAL'}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05} y={35} className="w-full">
          <h2
            id="projects-heading"
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            {siteTexts.projectsHeading || 'PROYECTOS'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#CBD5E1] font-light max-w-2xl mx-auto mt-2">
            {siteTexts.projectsSubtitle ||
              'Transmisiones en vivo masivas, producciones de El Canal y plataformas digitales para el desarrollo de nuestra gente.'}
          </p>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 pb-16">
        <div
          className={`w-full rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border-2 transition-all duration-300 ${
            openProject === '01'
              ? 'border-[#3870E0] bg-[#0A1224] shadow-[0_20px_50px_rgba(42,82,190,0.35)]'
              : 'border-[#2A52BE]/30 bg-[#070D1B] hover:border-[#2A52BE]/70'
          } p-5 sm:p-7 md:p-9`}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <button
              id="project-toggle-01"
              type="button"
              onClick={() => toggleProject('01')}
              aria-expanded={openProject === '01'}
              aria-controls="project-panel-01"
              className="flex flex-1 min-w-0 items-center gap-4 sm:gap-6 rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A1224]"
            >
              <span
                className={`font-black leading-none select-none transition-colors duration-300 ${
                  openProject === '01' ? 'text-[#3870E0]' : 'text-[#2A52BE]/60'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                01
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
                    Producción & Streaming Profesional
                  </span>
                  <span className="text-[#93C5FD]/40">•</span>
                  <span className="text-xs text-[#CBD5E1]/70">Cobertura Oficial Multicámara</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mt-0.5 transition-colors">
                  Fiesta Nacional de Playas Doradas 2026
                </h3>
              </div>
            </button>

            <div className="flex flex-wrap items-center gap-3 self-end lg:self-auto">
              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>3 Noches en Directo</span>
              </span>

              <button
                type="button"
                onClick={() => toggleProject('01')}
                aria-expanded={openProject === '01'}
                aria-controls="project-panel-01"
                className={`min-h-11 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  openProject === '01'
                    ? 'bg-[#2A52BE] text-white border-[#3870E0] shadow-md'
                    : 'bg-[#101D3D] text-[#93C5FD] border-[#2A52BE]/40 hover:bg-[#2A52BE] hover:text-white'
                }`}
              >
                <span>{openProject === '01' ? 'Plegar' : 'Desplegar'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openProject === '01' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div id="project-panel-01" role="region" aria-labelledby="project-toggle-01" aria-hidden={openProject !== '01'} className={`proj-panel ${openProject === '01' ? 'open' : ''}`}>
            <div className="proj-panel-inner">
            <div className={`proj-content pt-6 mt-6 border-t border-[#2A52BE]/30 ${openProject === '01' ? '' : 'pointer-events-none'}`} style={openProject === '01' ? undefined : {visibility: 'hidden' as const}}>
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light max-w-3xl leading-relaxed mb-6">
                Transmisión de gran escala en directo para miles de espectadores. Mirá las 3 transmisiones completas con audio de consola y cámaras en escenario.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {playasDoradasNights.map((nightItem) => (
                  <div
                    key={nightItem.night}
                    className="group relative rounded-2xl overflow-hidden bg-[#040812] border-2 border-[#2A52BE]/30 hover:border-[#3870E0] shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <SmartImage
                        src={resolveImage(nightItem.thumbnail, PLACEHOLDERS.galeria)}
                        fallbackSrc={PLACEHOLDERS.galeria}
                        alt={nightItem.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                        <button
                          type="button"
                          onClick={(event) => openVideo(nightItem.youtubeId, event.currentTarget)}
                          aria-label={`Reproducir ${nightItem.title}`}
                          className="w-12 h-12 rounded-full bg-[#2A52BE] text-white flex items-center justify-center shadow-[0_0_20px_rgba(42,82,190,0.9)] transform group-hover:scale-110 transition-transform cursor-pointer"
                          title="Ver en pantalla completa"
                        >
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </button>
                      </div>

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 backdrop-blur-md">
                        <span className="text-[11px] font-bold tracking-wider text-white uppercase">
                          {nightItem.night}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600/90 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                          EN VIVO
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between bg-[#081126]">
                      <div>
                        <span className="text-[10px] text-[#60A5FA] uppercase tracking-wider font-semibold block">
                          Fiesta Nacional 2026
                        </span>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight mt-0.5">
                          {nightItem.title}
                        </h4>
                      </div>

                      <a
                        href={nightItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#14234C] hover:bg-[#2A52BE] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                      >
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span>Ver en YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            </div>
          </div>

        <div
          id="canal"
          className={`w-full rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border-2 transition-all duration-300 ${
            openProject === '02'
              ? 'border-[#3870E0] bg-[#0A1224] shadow-[0_20px_50px_rgba(42,82,190,0.35)]'
              : 'border-[#2A52BE]/30 bg-[#070D1B] hover:border-[#2A52BE]/70'
          } p-5 sm:p-7 md:p-9`}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <button
              id="project-toggle-02"
              type="button"
              onClick={() => toggleProject('02')}
              aria-expanded={openProject === '02'}
              aria-controls="project-panel-02"
              className="flex flex-1 min-w-0 items-center gap-4 sm:gap-6 rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A1224]"
            >
              <span
                className={`font-black leading-none select-none transition-colors duration-300 ${
                  openProject === '02' ? 'text-[#3870E0]' : 'text-[#2A52BE]/60'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                02
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
                    Impacto Comunitario
                  </span>
                  <span className="text-[#93C5FD]/40">•</span>
                  <span className="text-xs text-[#CBD5E1]/70">Contenido Propio & Deportes</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mt-0.5 transition-colors">
                  El Canal: @elmancasg
                </h3>
              </div>
            </button>

            <div className="flex flex-wrap items-center gap-3 self-end lg:self-auto">
              <a
                href="https://www.youtube.com/@elmancasg"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>@elmancasg</span>
              </a>

              <button
                type="button"
                onClick={() => toggleProject('02')}
                aria-expanded={openProject === '02'}
                aria-controls="project-panel-02"
                className={`min-h-11 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  openProject === '02'
                    ? 'bg-[#2A52BE] text-white border-[#3870E0] shadow-md'
                    : 'bg-[#101D3D] text-[#93C5FD] border-[#2A52BE]/40 hover:bg-[#2A52BE] hover:text-white'
                }`}
              >
                <span>{openProject === '02' ? 'Plegar' : 'Desplegar'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openProject === '02' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div id="project-panel-02" role="region" aria-labelledby="project-toggle-02" aria-hidden={openProject !== '02'} className={`proj-panel ${openProject === '02' ? 'open' : ''}`}>
            <div className="proj-panel-inner">
            <div className={`proj-content pt-6 mt-6 border-t border-[#2A52BE]/30 ${openProject === '02' ? '' : 'pointer-events-none'}`} style={openProject === '02' ? undefined : {visibility: 'hidden' as const}}>
              <div className="mb-6 p-4 sm:p-6 rounded-2xl bg-[#091122] border border-red-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_10px_30px_rgba(239,68,68,0.12)]">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
                    <YoutubeIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-wide">
                        El Manca SG
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/40">
                        Canal Oficial
                      </span>
                    </div>
                    <p className="text-xs text-[#93C5FD] mt-0.5 font-medium">
                      @elmancasg • +1.290 suscriptores • 116 producciones
                    </p>
                    <p className="text-xs text-[#CBD5E1] mt-1 font-light hidden sm:block">
                      Transmisiones en vivo, coberturas masivas y el ciclo de entrevistas deportivas "Ecos de Cancha".
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <a
                    href="https://www.youtube.com/@elmancasg?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                    <span>Suscribirse</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@elmancasg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#14265E] hover:bg-[#1E3A8A] text-[#93C5FD] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-[#2A52BE]/40 cursor-pointer"
                  >
                    <span>Ver en YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light max-w-3xl leading-relaxed mb-6">
                Creamos contenido propio que le da voz a deportes, eventos y personas que normalmente no tienen visibilidad. Un compromiso social que inspira a los niños y jóvenes de Sierra Grande y la región como verdaderos referentes.
              </p>

              <div className="mb-8 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#081022] border border-[#2A52BE]/30 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between gap-2.5 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                    <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                      ÚLTIMO VIDEO SUBIDO
                    </h4>
                  </div>
                  {latestVideo && (
                    <span className="text-[10px] text-[#93C5FD] font-semibold uppercase tracking-wider hidden sm:block">
                      {latestVideo.date} • {latestVideo.views}
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
                  {latestVideo ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${latestVideo.youtubeId}?rel=0`}
                      title={latestVideo.title}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                      <YoutubeIcon className="w-12 h-12 text-red-500/50" />
                      <span className="text-sm text-[#94A3B8] font-light">No hay videos disponibles</span>
                    </div>
                  )}
                </div>

                {latestVideo && (
                  <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight line-clamp-1">
                      {latestVideo.title}
                    </h5>
                    <a
                      href={`https://www.youtube.com/watch?v=${latestVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-400 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                    >
                      <YoutubeIcon />
                      <span>Ver en YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {channelVideos.slice(0, showAllVideos ? channelVideos.length : 6).map((vid) => (
                  <div
                    key={vid.id}
                    className="group/item rounded-2xl overflow-hidden bg-[#070E20] border border-[#2A52BE]/30 hover:border-[#3870E0] transition-all flex flex-col shadow-md"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <SmartImage
                        src={resolveImage(vid.thumbnail, PLACEHOLDERS.galeria)}
                        fallbackSrc={PLACEHOLDERS.galeria}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-center justify-center">
                        <button
                          type="button"
                          onClick={(event) => openVideo(vid.youtubeId, event.currentTarget)}
                          className="w-11 h-11 rounded-full bg-[#2A52BE] hover:bg-[#3870E0] text-white flex items-center justify-center shadow-lg transform group-hover/item:scale-110 transition-transform cursor-pointer"
                          aria-label={`Reproducir ${vid.title}`}
                        >
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </button>
                      </div>

                      {vid.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/85 border border-white/10 text-[10px] font-mono text-white">
                          {vid.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#081228]">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#60A5FA] font-semibold uppercase tracking-wider mb-1">
                          <span>{vid.date || 'El Canal'}</span>
                          {vid.views && <span className="text-[#94A3B8] font-normal lowercase">{vid.views}</span>}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight line-clamp-2 leading-snug">
                          {vid.title}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                        <button
                          type="button"
                          onClick={(event) => openVideo(vid.youtubeId, event.currentTarget)}
                          className="text-[#60A5FA] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Reproducir</span>
                        </button>
                        <a
                          href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#94A3B8] hover:text-[#60A5FA] flex items-center gap-1 transition-colors"
                        >
                          <span>YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {channelVideos.length > 6 && (
                <div className="flex justify-center mb-6">
                  <button
                    type="button"
                    onClick={() => setShowAllVideos(!showAllVideos)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0E1B38] hover:bg-[#2A52BE] border border-[#2A52BE]/40 text-xs font-bold text-white transition-all cursor-pointer shadow-md"
                  >
                    <span>{showAllVideos ? 'Mostrar menos videos' : `Ver más videos del canal (${channelVideos.length})`}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAllVideos ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )}

              <div className="p-4 rounded-xl bg-[#091122] border border-[#2A52BE]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#CBD5E1]">
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <YoutubeIcon className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Explorá todas las transmisiones, coberturas completas y entrevistas en nuestro canal oficial.</span>
                </div>
                <a
                  href="https://www.youtube.com/@elmancasg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-400 hover:text-white font-bold uppercase tracking-wider text-[11px] transition-colors shrink-0 cursor-pointer"
                >
                  <span>Abrir @elmancasg en YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            </div>
            </div>
          </div>

        <div
          className={`w-full rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border-2 transition-all duration-300 ${
            openProject === '03'
              ? 'border-[#3870E0] bg-[#0A1224] shadow-[0_20px_50px_rgba(42,82,190,0.35)]'
              : 'border-[#2A52BE]/30 bg-[#070D1B] hover:border-[#2A52BE]/70'
          } p-5 sm:p-7 md:p-9`}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <button
              id="project-toggle-03"
              type="button"
              onClick={() => toggleProject('03')}
              aria-expanded={openProject === '03'}
              aria-controls="project-panel-03"
              className="flex flex-1 min-w-0 items-center gap-4 sm:gap-6 rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A1224]"
            >
              <span
                className={`font-black leading-none select-none transition-colors duration-300 ${
                  openProject === '03' ? 'text-[#3870E0]' : 'text-[#2A52BE]/60'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                03
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
                    Agencia Digital 360
                  </span>
                  <span className="text-[#93C5FD]/40">•</span>
                  <span className="text-xs text-[#CBD5E1]/70">Hosting, Dominio & Webmail</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mt-0.5 transition-colors">
                  Transformación Digital & Sitios Web
                </h3>
              </div>
            </button>

            <div className="flex flex-wrap items-center gap-3 self-end lg:self-auto">
              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-[#162A60] border border-[#2A52BE]/50 text-[#93C5FD] text-xs font-semibold uppercase tracking-wider items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#3B82F6]" />
                <span>Webs Llave en Mano</span>
              </span>

              <button
                type="button"
                onClick={() => toggleProject('03')}
                aria-expanded={openProject === '03'}
                aria-controls="project-panel-03"
                className={`min-h-11 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  openProject === '03'
                    ? 'bg-[#2A52BE] text-white border-[#3870E0] shadow-md'
                    : 'bg-[#101D3D] text-[#93C5FD] border-[#2A52BE]/40 hover:bg-[#2A52BE] hover:text-white'
                }`}
              >
                <span>{openProject === '03' ? 'Plegar' : 'Desplegar'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openProject === '03' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div id="project-panel-03" role="region" aria-labelledby="project-toggle-03" aria-hidden={openProject !== '03'} className={`proj-panel ${openProject === '03' ? 'open' : ''}`}>
            <div className="proj-panel-inner">
            <div className={`proj-content pt-6 mt-6 border-t border-[#2A52BE]/30 ${openProject === '03' ? '' : 'pointer-events-none'}`} style={openProject === '03' ? undefined : {visibility: 'hidden' as const}}>
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light max-w-3xl leading-relaxed mb-6">
                Diseños web llave en mano para comerciantes y empresas. Cada proyecto incluye hosting de alta velocidad, dominio propio y webmail corporativo con 1 año de mantenimiento preventivo.
              </p>

              {webProjects.length > 0 && (
                <div className="relative rounded-3xl overflow-hidden bg-[#060B18] border border-[#2A52BE]/40 p-4 sm:p-6 mb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 relative aspect-[16/9] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#02050D] border border-[#2A52BE]/50 shadow-2xl group/web">
                      <SmartImage
                        src={resolveImage(webProjects[webIndex].thumbnail, PLACEHOLDERS.web)}
                        fallbackSrc={PLACEHOLDERS.web}
                        alt={webProjects[webIndex].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/web:scale-105"
                      />

                      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start gap-2">
                        <span className="max-w-full truncate px-3 py-1 rounded-full bg-black/80 border border-white/20 text-xs font-semibold text-white tracking-wider uppercase backdrop-blur-md">
                          {webProjects[webIndex].client}
                        </span>
                        <span className="max-w-full truncate px-2.5 py-0.5 rounded-full bg-[#2A52BE]/90 text-[10px] font-bold text-white uppercase tracking-wider">
                          {webProjects[webIndex].tag}
                        </span>
                      </div>

                      {hasLiveUrl(webProjects[webIndex].liveUrl) && (
                        <div className="absolute bottom-3 right-3">
                          <a
                            href={webProjects[webIndex].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-[#2A52BE] border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg hover:scale-105"
                          >
                            <span>Visitar Sitio</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                      {!hasLiveUrl(webProjects[webIndex].liveUrl) && (
                        <span className="absolute bottom-3 right-3 rounded-xl border border-white/20 bg-black/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] backdrop-blur-md">
                          Sitio pr&oacute;ximamente
                        </span>
                      )}
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122045] border border-[#2A52BE]/40 text-xs font-semibold uppercase tracking-wider text-[#93C5FD] mb-3">
                          <Sparkles className="w-3 h-3 text-[#3B82F6]" />
                          <span>Desarrollo #{webIndex + 1} de {webProjects.length}</span>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                          {webProjects[webIndex].title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#93C5FD] font-semibold uppercase tracking-wider mb-2">
                          Cliente: {webProjects[webIndex].client}
                        </p>

                        <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                          {webProjects[webIndex].description ||
                            'Sitio web responsivo de alta velocidad, optimizado para conversión, catálogo y contacto directo vía WhatsApp.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5">
                          {webProjects.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setWebIndex(i)}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                i === webIndex ? 'w-6 bg-[#3B82F6]' : 'w-2 bg-white/20 hover:bg-white/40'
                              }`}
                              aria-label={`Ir al proyecto ${i + 1}`}
                              aria-current={i === webIndex ? 'true' : undefined}
                              title={`Ir al proyecto ${i + 1}`}
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={prevWeb}
                            className="p-2.5 rounded-full bg-[#101D3D] hover:bg-[#2A52BE] text-white border border-[#2A52BE]/40 transition-colors cursor-pointer"
                            title="Anterior"
                            aria-label="Proyecto anterior"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={nextWeb}
                            className="p-2.5 rounded-full bg-[#101D3D] hover:bg-[#2A52BE] text-white border border-[#2A52BE]/40 transition-colors cursor-pointer"
                            title="Siguiente"
                            aria-label="Proyecto siguiente"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
            </div>
          </div>
      </div>

      {activeVideoId && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) closeVideo(); }}>
          <div role="dialog" aria-modal="true" aria-label="Reproductor de video" className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border-2 border-[#2A52BE] shadow-[0_0_80px_rgba(42,82,190,0.8)]">
            <button
              ref={videoCloseButtonRef}
              type="button"
              onClick={closeVideo}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              title="Cerrar video"
              aria-label="Cerrar video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="Reproductor de Streaming Manca"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/80 hover:bg-[#2A52BE] border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-colors whitespace-nowrap"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>Si no se reproduce, abrílo en YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
