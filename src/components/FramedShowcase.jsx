import { useState } from 'react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FRAMED SHOWCASE
   
   Reusable floating browser-frame component with an
   ambient glow radiating from behind. Inspired by
   Gcore-style floating device mockups.

   Props:
     children       — content rendered inside the frame
                       (image, video, iframe, etc.)
     glowColor      — 'accent' (default) | any CSS color
     glowIntensity  — 'md' (default) | 'lg'
     showBrowserBar — true (default) | false
     className      — extra classes on the outer wrapper
     hovered        — external hover state (optional,
                       drives glow "wake up" animation)
   
   Implementation notes:
   • Glow is a genuinely blurred <div>, NOT box-shadow.
     box-shadow looks flat; a blurred bg element gives
     the volumetric ambient-light feel.
   • Glow div is sized ~120-130% of the frame and
     uses filter: blur(60-80px).
   • On hover, glow opacity + scale increase slightly
     (400ms ease) so the card feels like it's "waking up".
   • The frame itself: rounded-2xl, overflow-hidden,
     border border-white/10.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Map intensity to blur / opacity / scale values */
const GLOW_CONFIG = {
  md: { blur: 60, opacity: 0.25, hoverOpacity: 0.4, scale: 1.15, hoverScale: 1.2 },
  lg: { blur: 80, opacity: 0.35, hoverOpacity: 0.55, scale: 1.25, hoverScale: 1.35 },
};

/* Resolve glowColor prop to an actual CSS color */
function resolveColor(glowColor) {
  if (glowColor === 'accent') return 'rgba(255, 92, 26, 1)';
  return glowColor;
}

export default function FramedShowcase({
  children,
  glowColor = 'accent',
  glowIntensity = 'md',
  showBrowserBar = true,
  className = '',
  hovered = false,
}) {
  const [internalHover, setInternalHover] = useState(false);
  const isHovered = hovered || internalHover;

  const config = GLOW_CONFIG[glowIntensity] || GLOW_CONFIG.md;
  const color = resolveColor(glowColor);

  return (
    <div
      className={`framed-showcase relative ${className}`}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
    >
      {/* ── Ambient glow — blurred div behind the frame ── */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          /* Center the glow and make it larger than the frame */
          transform: `scale(${isHovered ? config.hoverScale : config.scale})`,
          opacity: isHovered ? config.hoverOpacity : config.opacity,
          background: `radial-gradient(ellipse at center, ${color}, transparent 70%)`,
          filter: `blur(${config.blur}px)`,
          transition: 'opacity 400ms ease, transform 400ms ease',
          willChange: 'opacity, transform',
        }}
      />

      {/* ── Frame container ── */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-bg-card shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Browser bar */}
        {showBrowserBar && <BrowserBar />}

        {/* Content area */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Thin browser top bar ── */
function BrowserBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#141414] border-b border-white/[0.06]">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
        <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
        <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
      </div>
    </div>
  );
}
