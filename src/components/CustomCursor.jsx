import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CUSTOM CURSOR — Two-layer architecture

   Inner dot  : 8px solid, tracks mousemove 1:1 via ref + RAF
   Outer ring : 32px, follows with spring lag (stiffness 500, damping 28)

   Three hover states:
   1. Default         → dot + thin ring outline
   2. Over clickable  → ring scales to 48px + orange fill, dot hides
   3. Over text/input → thin vertical caret line

   Performance:
   - transform: translate3d() only (compositor thread)
   - Inner dot updated via requestAnimationFrame + ref (no re-renders)
   - Outer ring via Framer Motion useSpring

   Touch devices: don't render at all.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function CustomCursor() {
  const [isTouch] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : true
  );
  const [hoverState, setHoverState] = useState('default'); // 'default' | 'clickable' | 'text'

  // Refs for the inner dot (updated via RAF, not React state)
  const dotRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  // Framer Motion springs for the outer ring
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springConfig = { stiffness: 500, damping: 28 };
  const springX = useSpring(ringX, springConfig);
  const springY = useSpring(ringY, springConfig);

  useEffect(() => {
    // Touch device check
    if (isTouch) {
      return;
    }

    // ── RAF loop for inner dot ──
    const updateDot = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }
      rafId.current = requestAnimationFrame(updateDot);
    };
    rafId.current = requestAnimationFrame(updateDot);

    // ── mousemove handler ──
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      // Update spring values for the ring (Framer handles smoothing)
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    // ── Hover detection ──
    const isClickable = (el) =>
      el.closest('a') ||
      el.closest('button') ||
      el.closest('[role="button"]') ||
      el.closest('.card') ||
      el.closest('.skill-card-wrapper') ||
      el.closest('.masonry-item') ||
      el.tagName === 'A' ||
      el.tagName === 'BUTTON';

    const isTextInput = (el) =>
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.isContentEditable ||
      el.closest('[contenteditable]');

    const onMouseOver = (e) => {
      if (isTextInput(e.target)) {
        setHoverState('text');
      } else if (isClickable(e.target)) {
        setHoverState('clickable');
      } else {
        setHoverState('default');
      }
    };

    const onMouseOut = () => {
      setHoverState('default');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Hide native cursor
    const style = document.createElement('style');
    style.id = 'custom-cursor-styles';
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      const s = document.getElementById('custom-cursor-styles');
      if (s) s.remove();
    };
  }, [isTouch, ringX, ringY]);

  if (isTouch) return null;

  const showDot = hoverState === 'default';
  const showRing = hoverState !== 'text';
  const showCaret = hoverState === 'text';

  return (
    <>
      {/* Inner dot — 8px, no lag, RAF-driven */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: showDot ? '#FF5C1A' : 'transparent',
          transition: 'background-color 0.15s ease',
          willChange: 'transform',
        }}
      />

      {/* Outer ring — 32px default, spring-lagged */}
      {showRing && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
          style={{
            x: springX,
            y: springY,
            width: hoverState === 'clickable' ? 48 : 32,
            height: hoverState === 'clickable' ? 48 : 32,
            marginLeft: hoverState === 'clickable' ? -24 : -16,
            marginTop: hoverState === 'clickable' ? -24 : -16,
            border: hoverState === 'clickable' ? 'none' : '1.5px solid rgba(255, 92, 26, 0.5)',
            backgroundColor: hoverState === 'clickable' ? 'rgba(255, 92, 26, 0.15)' : 'transparent',
            boxShadow: hoverState === 'clickable' ? '0 0 25px rgba(255, 92, 26, 0.2)' : 'none',
            transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, background-color 0.25s ease, border 0.25s ease, box-shadow 0.25s ease',
            willChange: 'transform',
          }}
        />
      )}

      {/* Text caret — thin vertical line */}
      {showCaret && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: springX,
            y: springY,
            width: 2,
            height: 24,
            marginLeft: -1,
            marginTop: -12,
            backgroundColor: '#FF5C1A',
            borderRadius: 1,
            willChange: 'transform',
          }}
        />
      )}
    </>
  );
}
