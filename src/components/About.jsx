import SectionReveal, { RevealItem } from './SectionReveal';

export default function About() {
  return (
    <SectionReveal
      id="about"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <RevealItem className="mb-12">
          <div className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            ● ABOUT ME
          </div>
          <h2
            className="font-display font-bold text-text-primary leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Creative mind,<br />
            <em className="italic font-light bg-gradient-to-br from-accent to-accent-bright bg-clip-text text-transparent">technical</em> craft.
          </h2>
        </RevealItem>

        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-12 items-start">
          {/* Portrait column */}
          <RevealItem>
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group max-md:max-w-[350px] max-md:mx-auto">
              {/* 
                (a) SWAP YOUR PHOTO HERE
                Replace the src with your actual portrait image path.
              */}
              <img
                src="/Rajan.jpg"
                alt="Rajan Pantha"
                className="w-full h-full object-cover object-[center_20%] transition-transform duration-600 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[inset_0_0_30px_rgba(255,92,26,0.06)]" />
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
              Available for projects
            </div>
          </RevealItem>

          {/* Content column */}
          <RevealItem>
            <p className="text-lg text-text-primary leading-relaxed font-light mb-8">
              I'm a digital architect specializing in bridging aesthetics with advanced functionality.
              Armed with expertise in cinematic video editing and high-fidelity web interfaces, I forge
              immersive visual experiences that push creative boundaries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education card */}
              <div className="card bg-bg-card border border-white/[0.06] rounded-[14px] p-6 transition-all duration-400 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(255,92,26,0.06)] hover:-translate-y-1">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/[0.06] border border-accent/15 text-lg mb-4">
                  🎓
                </div>
                <h3 className="font-display text-base font-semibold text-text-primary mb-3">Education</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-accent">
                    <strong className="text-text-primary font-medium">BCA (Semester 1)</strong> — Butwal Kalika Campus, TU
                  </li>
                  <li className="text-sm text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-accent">
                    <strong className="text-text-primary font-medium">+2/SLC Board</strong> — Kalika Manavgyan Secondary School (3.81 GPA)
                  </li>
                  <li className="text-sm text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-accent">
                    <strong className="text-text-primary font-medium">SEE</strong> — Shree Chhatradevi Evergreen Secondary School (3.55 GPA)
                  </li>
                </ul>
              </div>

              {/* Experience card */}
              <div className="card bg-bg-card border border-white/[0.06] rounded-[14px] p-6 transition-all duration-400 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(255,92,26,0.06)] hover:-translate-y-1">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/[0.06] border border-accent/15 text-lg mb-4">
                  💼
                </div>
                <h3 className="font-display text-base font-semibold text-text-primary mb-3">Experience</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-accent">
                    <strong className="text-text-primary font-medium">NIT Legend, Butwal</strong> — Graphic Designer, Video Editor, UI/UX Designer, Web Designer &amp; Student Trainer
                  </li>
                </ul>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </SectionReveal>
  );
}
