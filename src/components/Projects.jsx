import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionReveal, { RevealItem } from './SectionReveal';
import projects from '../data/projects';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SELECTED WORK — Homepage preview
   Shows the first 3 projects with a "View All Work →"
   link routing to the dedicated /work page.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const PREVIEW_COUNT = 3;
const previewProjects = projects.slice(0, PREVIEW_COUNT);

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  // First card spans 2 columns on desktop
  const isWide = index === 0;

  return (
    <motion.article
      className={`relative group ${isWide ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container with glowing tech border effect */}
      <div className="relative rounded-[20px] bg-bg-elevated border border-white/[0.04] p-2 transition-colors duration-500 group-hover:border-accent/30 group-hover:bg-bg-card">
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/80 transition-all duration-500 rounded-tl-[20px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/80 transition-all duration-500 rounded-br-[20px] pointer-events-none" />

        <div className={`relative flex flex-col ${isWide ? (isEven ? 'md:flex-row' : 'md:flex-row-reverse') : 'flex-col'} gap-0 md:gap-6`}>
          
          {/* Image Container */}
          <div className={`relative overflow-hidden rounded-[16px] shadow-2xl ${isWide ? 'md:w-[65%] min-h-[300px]' : 'w-full aspect-[4/3]'}`}>
            <motion.img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) contrast(1.1)' }}
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'brightness(0.95) contrast(1.1)' : 'brightness(0.75) contrast(1.1)',
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Number Badge */}
            <div className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-accent font-display text-sm font-bold tracking-widest z-10">
              {project.id < 10 ? `0${project.id}` : project.id}
            </div>
          </div>

          {/* Text Panel */}
          <motion.div 
            className={`relative z-20 flex flex-col justify-center p-6 md:p-8 rounded-[16px] bg-bg-card/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${
              isWide ? (isEven ? 'md:-ml-16 md:mt-12 md:mb-12 md:w-[45%]' : 'md:-mr-16 md:mt-12 md:mb-12 md:w-[45%]') : 'mt-[-40px] mx-4'
            }`}
            animate={{
              y: isHovered ? -8 : 0,
              boxShadow: isHovered ? '0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255,92,26,0.1)' : '0 20px 40px rgba(0,0,0,0.5), 0 0 0 rgba(255,92,26,0)',
              borderColor: isHovered ? 'rgba(255,92,26,0.3)' : 'rgba(255,255,255,0.08)'
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-6 bg-accent rounded-full" />
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-accent">
                {project.tags[0] || 'Project'}
              </span>
            </div>
            
            <h3 className={`font-display font-bold text-text-primary mb-3 leading-tight ${isWide ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
              {project.title}
            </h3>
            
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {project.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-[0.7rem] font-medium text-text-muted tracking-widest uppercase">
                <span>{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-accent/50" />
                <span>{project.tags[1] || project.tags[0] || 'Design'}</span>
              </div>
              
              <motion.div 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 text-accent border border-accent/20"
                animate={{
                  x: isHovered ? 4 : 0,
                  backgroundColor: isHovered ? 'rgba(255,92,26,0.2)' : 'rgba(255,92,26,0.1)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <SectionReveal
      id="projects"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <RevealItem className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              SELECTED WORK
            </div>
            <h2
              className="font-display font-bold text-text-primary leading-[1.1]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Crafted with<br />
              <em className="italic font-light bg-gradient-to-br from-accent to-accent-bright bg-clip-text text-transparent">precision</em>.
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-[300px] leading-relaxed">
            A curated showcase of my latest graphic design and visual communication projects.
          </p>
        </RevealItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 md:gap-y-16">
          {previewProjects.map((project, index) => (
            <RevealItem key={project.id} className={index === 0 ? 'md:col-span-2' : ''}>
              <ProjectCard project={project} index={index} />
            </RevealItem>
          ))}
        </div>

        {/* View All Work link */}
        <RevealItem className="mt-16 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-3 text-lg font-display font-semibold text-accent hover:text-accent-bright transition-all group"
          >
            View All Work
            <motion.span
              className="inline-block"
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            >
              →
            </motion.span>
          </Link>
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
