import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionReveal, { RevealItem } from './SectionReveal';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SKILLS DATA
   Each skill has a `category` for filtering and a
   `backDescription` for the flip-card back face.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const skills = [
  {
    id: 'video',
    category: 'video',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4V20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4V20" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Video Editing',
    description: 'Cinematic editing, motion graphics, and color grading with professional-grade tools.',
    backDescription: '2+ years editing promotional reels, social media content, and event coverage at NIT Legend. Proficient in color grading workflows and motion graphics transitions.',
    tools: [
      { name: 'DaVinci Resolve', icon: '🎞️', image: '/logos/Davinci Resolve.png' },
      { name: 'CapCut', icon: '✂️', image: '/logos/Capcut.png' },
    ],
    level: 85,
    levelText: 'Advanced',
    wide: false,
  },
  {
    id: 'web',
    category: 'development',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 16L3 12L7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 16L21 12L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Web Design',
    description: 'Responsive, pixel-perfect web experiences with modern front-end technologies.',
    backDescription: 'Built multiple responsive websites and landing pages using HTML, CSS, and JavaScript. Currently learning React and modern frameworks to deliver richer experiences.',
    tools: [
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '🎨' },
      { name: 'JavaScript', icon: '⚡' },
    ],
    level: 90,
    levelText: 'Expert',
    wide: true,
  },
  {
    id: 'uiux',
    category: 'design',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
        <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'User-centered design thinking, wireframing, prototyping and interface architecture.',
    backDescription: 'Designed user flows and wireframes in Figma for training institute portals. Focused on accessibility and intuitive navigation for non-technical users.',
    tools: [
      { name: 'Figma', icon: '🖌️', image: '/logos/Figma.png' },
    ],
    level: 80,
    levelText: 'Advanced',
    wide: false,
  },
  {
    id: 'graphic',
    category: 'design',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.5 4.5 14.5 6 14.5C7.5 14.5 7.5 12.5 9 12.5C10.5 12.5 11 14.5 11 16C11 17.5 10.5 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/>
        <circle cx="11.5" cy="6.5" r="1.5" fill="currentColor"/>
        <circle cx="16.5" cy="8.5" r="1.5" fill="currentColor"/>
        <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: 'Graphic Design',
    description: 'Brand identity, digital illustrations, and print-ready visual compositions.',
    backDescription: 'Created 50+ branded creatives for social media campaigns, event promotions, and print materials at NIT Legend. Expert in Photoshop compositing and Illustrator vector work.',
    tools: [
      { name: 'Photoshop', icon: '📸', image: '/logos/Adobe Photoshop.png' },
      { name: 'Illustrator', icon: '✏️', image: '/logos/Adobe Illustrator.png' },
      { name: 'Canva', icon: '🖼️', image: '/logos/Canva.png' },
    ],
    level: 92,
    levelText: 'Expert',
    wide: false,
  },
  {
    id: 'computing',
    category: 'development',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 20H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Basic Computing',
    description: 'Proficient in productivity suites, system administration, and digital workflows.',
    backDescription: 'Trained 30+ students in MS Office workflows at NIT Legend. Comfortable managing digital document pipelines, spreadsheet automation, and presentation design.',
    tools: [
      { name: 'MS Word', icon: '📝', image: '/logos/Ms Word.png' },
      { name: 'Excel', icon: '📊', image: '/logos/MS Excel.png' },
      { name: 'PowerPoint', icon: '📋', image: '/logos/MS Powerpoint.png' },
    ],
    level: 95,
    levelText: 'Expert',
    wide: false,
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILTER TABS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SKILL_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'design', label: 'Design' },
  { key: 'development', label: 'Development' },
  { key: 'video', label: 'Video' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INDIVIDUAL SKILL CARD — with flip & depth layering
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SkillCard({ skill, flippedId, setFlippedId }) {
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const isInView = useInView(progressRef, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const isFlipped = flippedId === skill.id;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;
    setTilt({ rotateX, rotateY });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = () => {
    setFlippedId(isFlipped ? null : skill.id);
  };

  // Tool stagger variants
  const toolContainerVariants = {
    rest: { transition: { staggerChildren: 0.05 } },
    hover: { transition: { staggerChildren: 0.08 } },
  };

  const toolItemVariants = {
    rest: { opacity: 0.4, scale: 0.95 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`skill-card-wrapper ${skill.wide ? 'md:col-span-2' : ''} min-w-[280px] md:min-w-0 snap-start`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        className="relative w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: isFlipped ? 0 : tilt.rotateX,
          rotateY: isFlipped ? 180 : tilt.rotateY,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        onMouseMove={!isFlipped ? handleMouseMove : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* ─── FRONT FACE ─── */}
        <motion.div
          className={`relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-bg-card p-8 transition-shadow duration-500 ${
            isHovered && !isFlipped ? 'shadow-2xl' : 'shadow-lg'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={!isFlipped ? {
            borderColor: 'rgba(255, 92, 26, 0.25)',
          } : undefined}
        >
          {/* Cursor-following radial glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[20px]"
            style={{
              opacity: isHovered && !isFlipped ? 1 : 0,
              background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,92,26,0.08), transparent 60%)`,
            }}
          />

          <div className="relative z-[1]">
            {/* Icon badge */}
            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-[14px] bg-accent/[0.06] border border-accent/15 text-2xl mb-5 transition-all duration-400"
              style={{ boxShadow: isHovered ? '0 0 20px rgba(255,92,26,0.15)' : 'none' }}
            >
              {skill.icon}
            </div>

            <h3 className="font-display text-lg font-semibold text-text-primary mb-2 tracking-tight">
              {skill.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              {skill.description}
            </p>

            {/* Tool logos — always visible at 40% opacity, full on hover */}
            <motion.div
              className="mb-5 min-h-[36px]"
              variants={toolContainerVariants}
              initial="rest"
              animate={isHovered && !isFlipped ? 'hover' : 'rest'}
            >
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool) => (
                  <motion.span
                    key={tool.name}
                    variants={toolItemVariants}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent-bright bg-accent/[0.06] border border-accent/12 rounded-full"
                  >
                    {tool.image ? (
                      <img src={tool.image} alt={tool.name} className="w-4 h-4 object-contain" />
                    ) : (
                      <span>{tool.icon}</span>
                    )}
                    {tool.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <div ref={progressRef} className="relative h-1 bg-white/[0.06] rounded-full overflow-visible">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: 'linear-gradient(90deg, #FF5C1A, #FF7A3D)',
                  boxShadow: '0 0 12px rgba(255,92,26,0.3)',
                }}
                initial={{ width: '0%' }}
                animate={isInView ? { width: `${skill.level}%` } : { width: '0%' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-bright"
                  animate={isInView ? {
                    boxShadow: ['0 0 4px rgba(255,92,26,0.5)', '0 0 16px rgba(255,92,26,0.8)', '0 0 4px rgba(255,92,26,0.5)'],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                />
              </motion.div>
              <span className="absolute right-0 -top-5 text-[0.65rem] font-medium tracking-widest uppercase text-accent-bright">
                {skill.levelText}
              </span>
            </div>

            {/* Flip hint */}
            <div className="mt-4 text-[0.6rem] text-text-muted tracking-wide uppercase flex items-center gap-1.5 opacity-60">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              Click to flip
            </div>
          </div>
        </motion.div>

        {/* ─── BACK FACE ─── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[20px] border border-accent/20 bg-bg-card p-8 flex flex-col justify-center items-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-[52px] h-[52px] flex items-center justify-center rounded-[14px] bg-accent/[0.08] border border-accent/20 text-accent text-2xl mb-5">
            {skill.icon}
          </div>
          <h3 className="font-display text-lg font-semibold text-text-primary mb-4 tracking-tight">
            {skill.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-[280px]">
            {skill.backDescription}
          </p>
          <div className="mt-6 text-[0.6rem] text-text-muted tracking-wide uppercase flex items-center gap-1.5 opacity-60">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            Click to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SKILLS SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedId, setFlippedId] = useState(null);

  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter((s) => s.category === activeFilter);

  // Click outside to flip back
  useEffect(() => {
    if (!flippedId) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.skill-card-wrapper')) {
        setFlippedId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [flippedId]);

  return (
    <SectionReveal
      id="skills"
      className="py-24 md:py-32 bg-bg-elevated border-t border-b border-white/[0.06] relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <RevealItem className="mb-8">
          <div className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            ● CAPABILITIES
          </div>
          <h2
            className="font-display font-bold text-text-primary leading-[1.1] mb-2"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Tools I <em className="italic font-light bg-gradient-to-br from-accent to-accent-bright bg-clip-text text-transparent">master</em>,<br />
            systems I build.
          </h2>
        </RevealItem>

        {/* Category filter tabs */}
        <RevealItem className="mb-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {SKILL_FILTERS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveFilter(tab.key);
                  setFlippedId(null);
                }}
                className={`relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === tab.key
                    ? 'text-white bg-accent shadow-[0_0_20px_rgba(255,92,26,0.2)]'
                    : 'text-text-muted hover:text-text-secondary bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </RevealItem>

        {/* Desktop: bento grid / Mobile: horizontal scroll-snap carousel */}
        <div className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6
          md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0 md:mx-0 md:px-0
          scrollbar-hide
        ">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                flippedId={flippedId}
                setFlippedId={setFlippedId}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </SectionReveal>
  );
}
