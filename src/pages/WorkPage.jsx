import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FramedShowcase from '../components/FramedShowcase';
import projects from '../data/projects';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WORK PAGE — /work
   Full project grid with category filters and
   category-specific card layouts.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'photo', label: 'Photos' },
  { key: 'video', label: 'Videos' },
  { key: 'website', label: 'Websites & Apps' },
];

const CATEGORY_LABELS = {
  photo: 'photos',
  video: 'videos',
  website: 'websites & apps',
};

/* ──────────────────────────────────
   PHOTO CARD — masonry style
   ────────────────────────────────── */
function PhotoCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="masonry-item break-inside-avoid mb-4 group relative rounded-[16px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-auto block rounded-[16px]"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Caption overlay — slides up from bottom */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-5 pt-12 pb-5 rounded-b-[16px]"
        initial={{ y: '100%' }}
        animate={{ y: hovered ? '0%' : '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="font-display text-base font-semibold text-text-primary mb-1 leading-tight">{project.title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-2 line-clamp-2">{project.description}</p>
        <div className="flex items-center gap-2 text-[0.65rem] text-text-muted tracking-widest uppercase">
          <span>{project.year}</span>
          <span className="w-1 h-1 rounded-full bg-accent/50" />
          {project.tags[0] && <span className="text-accent">{project.tags[0]}</span>}
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ──────────────────────────────────
   VIDEO CARD — 16:9 thumbnail + hover preview & click modal
   ────────────────────────────────── */
function VideoCard({ project, onOpenVideo }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[16px] overflow-hidden bg-bg-card border border-white/[0.04] cursor-pointer hover:border-accent/30 transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenVideo && onOpenVideo(project)}
    >
      {/* 16:9 thumbnail / video frame */}
      <div className="relative aspect-video overflow-hidden rounded-t-[16px] bg-black/60">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${hovered && project.videoSrc ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : null}

        {/* Video element acting as live frame thumbnail and hover player */}
        {project.videoSrc ? (
          <video
            ref={videoRef}
            src={`${project.videoSrc}#t=0.1`}
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        ) : null}

        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          animate={{ opacity: hovered ? 1 : 0.75 }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute w-16 h-16 rounded-full border-2 border-accent/40"
            animate={hovered ? {
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6],
            } : { scale: 1, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-14 h-14 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(255,92,26,0.5)] text-white"
            animate={{ scale: hovered ? 1.15 : 0.95 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Metadata */}
      <div className="p-5">
        <h3 className="font-display text-base font-semibold text-text-primary mb-1 leading-tight group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between text-[0.65rem] text-text-muted tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-accent/50" />
            {project.tags[0] && <span className="text-accent">{project.tags[0]}</span>}
          </div>
          <span className="text-accent-bright font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            ▶ Play Video
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────
   WEBSITE CARD — floating browser frame
   with ambient glow via <FramedShowcase>
   ────────────────────────────────── */
function WebsiteCard({ project }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateY: (x - 0.5) * 10,   // max ±5deg
      rotateX: (0.5 - y) * 10,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer p-6"
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating browser frame with ambient glow */}
      <FramedShowcase
        glowColor="accent"
        glowIntensity="lg"
        showBrowserBar={true}
        hovered={hovered}
      >
        {/* URL bar inside the frame, below the browser dots */}
        <div className="flex items-center px-4 py-1.5 bg-[#141414] border-b border-white/[0.04]">
          <div className="flex-1 px-3 py-1 bg-white/[0.04] rounded-md text-[0.55rem] text-text-muted font-mono truncate">
            {project.siteUrl || `https://${project.title.toLowerCase().replace(/\s+/g, '-')}.com`}
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />

          {/* "Visit Site ↗" button on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href={project.siteUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-display font-semibold rounded-full shadow-[0_0_30px_rgba(255,92,26,0.3)] hover:bg-accent-bright transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Site
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </motion.div>
        </div>
      </FramedShowcase>

      {/* Metadata — outside the frame, below */}
      <div className="pt-5">
        <h3 className="font-display text-base font-semibold text-text-primary mb-1 leading-tight">{project.title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">{project.description}</p>
        <div className="flex items-center gap-2 text-[0.65rem] text-text-muted tracking-widest uppercase">
          <span>{project.year}</span>
          <span className="w-1 h-1 rounded-full bg-accent/50" />
          {project.tags[0] && <span className="text-accent">{project.tags[0]}</span>}
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────
   EMPTY STATE
   ────────────────────────────────── */
function EmptyState({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-accent/[0.06] border border-accent/15 flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <p className="text-text-secondary text-lg font-display">
        More {CATEGORY_LABELS[category] || category} coming soon.
      </p>
      <p className="text-text-muted text-sm mt-2">Check back later for new work.</p>
    </motion.div>
  );
}

/* ──────────────────────────────────
   RENDER CORRECT CARD TYPE
   ────────────────────────────────── */
function ProjectCard({ project, onOpenVideo }) {
  switch (project.category) {
    case 'video':
      return <VideoCard project={project} onOpenVideo={onOpenVideo} />;
    case 'website':
      return <WebsiteCard project={project} />;
    case 'photo':
    default:
      return <PhotoCard project={project} />;
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WORK PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const isEmpty = filtered.length === 0;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveVideoModal(null);
    };
    if (activeVideoModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoModal]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Page header */}
        <section className="pt-16 pb-8 px-6">
          <div className="max-w-[1200px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8 group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              ALL WORK
            </div>
            <h1
              className="font-display font-bold text-text-primary leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Every project,<br />
              <em className="italic font-light bg-gradient-to-br from-accent to-accent-bright bg-clip-text text-transparent">one place</em>.
            </h1>
            <p className="text-text-secondary text-base max-w-[500px] leading-relaxed">
              Browse through my complete portfolio — graphic designs, videos, and web experiences.
            </p>
          </div>
        </section>

        {/* Sticky filter bar */}
        <div className="sticky top-[60px] z-[100] bg-bg-base/80 backdrop-blur-xl border-b border-white/[0.06] transition-all">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeFilter === tab.key
                      ? 'text-white bg-accent shadow-[0_0_20px_rgba(255,92,26,0.2)]'
                      : 'text-text-muted hover:text-text-secondary bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  {tab.label}
                  {activeFilter === tab.key && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-accent -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project grid */}
        <section className="px-6 py-12">
          <div className="max-w-[1200px] mx-auto">
            {isEmpty ? (
              <EmptyState category={activeFilter} />
            ) : activeFilter === 'photo' ? (
              /* Masonry grid for photos */
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} onOpenVideo={(vid) => setActiveVideoModal(vid)} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              /* Standard grid for all / videos / websites */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} onOpenVideo={(vid) => setActiveVideoModal(vid)} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-bg-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-bg-elevated">
                <div>
                  <h3 className="text-text-primary font-display font-semibold text-lg">{activeVideoModal.title}</h3>
                  <p className="text-xs text-text-secondary">{activeVideoModal.description}</p>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent flex items-center justify-center text-text-secondary transition-colors text-lg"
                  aria-label="Close video"
                >
                  ✕
                </button>
              </div>
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeVideoModal.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
