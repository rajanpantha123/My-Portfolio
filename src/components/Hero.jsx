import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SectionReveal, { RevealItem } from './SectionReveal';
import MagneticButton from './MagneticButton';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO PORTRAIT — Uses /Rajan.jpg (same as About section)
   with orange rim-light glow treatment.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroPortrait() {
  return (
    <div className="w-full h-full relative group">
      <img
        src="/Rajan.jpg"
        alt="Rajan Pantha"
        className="w-full h-full object-cover object-[center_20%] rounded-2xl transition-transform duration-600 group-hover:scale-105"
      />
      {/* Orange rim-light edge glow */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-accent/20 to-transparent pointer-events-none rounded-2xl" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none rounded-2xl" />
      {/* Inner border with hover accent */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[inset_0_0_30px_rgba(255,92,26,0.06)]" />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STAT CARD with parallax
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StatCard({ number, label, className, mouseX, mouseY, offsetFactor = 1 }) {
  // Translate opposite to mouse movement (5-10px range)
  const x = useTransform(mouseX, [0, 1], [8 * offsetFactor, -8 * offsetFactor]);
  const y = useTransform(mouseY, [0, 1], [6 * offsetFactor, -6 * offsetFactor]);

  return (
    <motion.div
      className={`absolute bg-bg-card/70 backdrop-blur-xl border border-white/[0.08] rounded-[14px] px-5 py-4 z-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] ${className}`}
      style={{ x, y }}
      whileHover={{ y: -4, borderColor: 'rgba(255, 92, 26, 0.4)', boxShadow: '0 0 30px rgba(255,92,26,0.08), 0 15px 50px rgba(0,0,0,0.5)' }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <div className="font-display text-2xl font-bold leading-none mb-1 bg-gradient-to-br from-accent to-accent-bright bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-xs text-text-secondary tracking-wide whitespace-nowrap">{label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  // Normalized mouse position (0-1) for parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <SectionReveal
      id="home"
      className="min-h-screen flex items-center px-[4%] pt-28 pb-16 relative overflow-hidden"
    >
      {/* Oversized background wordmark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-transparent pointer-events-none select-none z-0 whitespace-nowrap"
        style={{
          fontSize: 'clamp(12rem, 22vw, 28rem)',
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
          letterSpacing: '-0.05em',
        }}
        aria-hidden="true"
      >
        RAJAN
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute top-[30%] right-[15%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,92,26,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Rotated side labels */}
      <div className="absolute left-[2%] top-1/2 -translate-y-1/2 rotate-180 font-display text-[0.65rem] tracking-[0.3em] uppercase text-text-muted [writing-mode:vertical-rl] max-md:hidden" aria-hidden="true">
        PORTFOLIO — 2025
      </div>
      <div className="absolute right-[2%] top-1/2 -translate-y-1/2 font-display text-[0.65rem] tracking-[0.3em] uppercase text-text-muted [writing-mode:vertical-rl] max-md:hidden" aria-hidden="true">
        CREATIVE.DEV
      </div>

      {/* Main grid */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1400px] mx-auto w-full relative z-[1]"
      >
        {/* Text side */}
        <RevealItem className="relative z-[2] max-lg:text-center max-lg:order-1">
          <div className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">
            ● DIGITAL ARCHITECT
          </div>
          <h1
            className="font-display font-bold text-text-primary mb-6 leading-[1.0]"
            style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', letterSpacing: '-0.03em' }}
          >
            Building<br />
            <em className="italic font-light bg-gradient-to-br from-accent via-accent-bright to-[#FFB347] bg-clip-text text-transparent">experiences</em><br />
            that matter<span className="text-accent">.</span>
          </h1>
          <p className="text-[1.1rem] text-text-secondary max-w-[440px] leading-relaxed mb-8 max-lg:mx-auto">
            Creative Video Editor &amp; Web Designer crafting immersive digital interfaces with cinematic precision.
          </p>
          <div className="flex gap-4 flex-wrap max-lg:justify-center">
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-display text-sm font-semibold tracking-wide rounded-full relative overflow-hidden shadow-[0_0_30px_rgba(255,92,26,0.15)] hover:bg-accent-bright hover:shadow-[0_0_50px_rgba(255,92,26,0.4)] hover:-translate-y-0.5 transition-all duration-400 group"
              >
                <span className="relative z-[2]">View My Work</span>
                <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-600 group-hover:left-full" />
              </a>
            </MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-text-primary font-display text-sm font-medium tracking-wide rounded-full border border-white/10 hover:border-accent hover:text-accent hover:shadow-[0_0_25px_rgba(255,92,26,0.06)] hover:-translate-y-0.5 transition-all duration-400"
            >
              Get In Touch
            </a>
          </div>
        </RevealItem>

        {/* Image side */}
        <RevealItem className="relative max-lg:order-2 max-lg:max-w-[500px] max-lg:mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] aspect-[3/4] max-h-[620px] ml-auto">
            <HeroPortrait />
            {/* Glowing right edge */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-accent/15 to-transparent pointer-events-none" />
          </div>

          {/* Floating stat cards with parallax */}
          <StatCard number="20+" label="Projects Delivered" className="top-[8%] -left-[15%] max-lg:-left-[5%] max-md:left-0 max-md:top-[2%]" mouseX={mouseX} mouseY={mouseY} offsetFactor={1} />
          <StatCard number="100%" label="Client Satisfaction" className="bottom-[12%] -left-[10%] max-lg:left-0 max-md:bottom-[2%] max-md:left-[5%]" mouseX={mouseX} mouseY={mouseY} offsetFactor={-0.8} />
          <StatCard number="2+" label="Years Experience" className="top-[40%] -right-[5%] max-lg:-right-[2%] max-md:right-0" mouseX={mouseX} mouseY={mouseY} offsetFactor={1.2} />
        </RevealItem>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[2] max-md:hidden">
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-text-muted">SCROLL</span>
      </div>
    </SectionReveal>
  );
}
