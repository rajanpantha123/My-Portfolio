import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Navigation links — Work now routes to /work,
     others are hash anchors that work from any page */
  const links = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/work', label: 'Work', isRoute: true },
  ];

  const closeMenu = () => setMenuOpen(false);

  const handleLinkClick = (e, link) => {
    closeMenu();

    if (link.isRoute) {
      // Let react-router handle /work
      return;
    }

    e.preventDefault();
    const hash = link.href.split('#')[1];

    if (isHome) {
      // On home page: smooth scroll to section
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On other pages: navigate home then scroll
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] px-[4%] flex justify-between items-center transition-all duration-400 nav-header ${scrolled ? 'py-3 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-white/[0.06]' : 'py-5 bg-transparent'}`}>
      <Link to="/" className="font-display text-xl font-bold text-text-primary tracking-tight">
        RAJAN<span className="text-accent">.</span>
      </Link>

      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <ul className="flex items-center gap-8 max-md:flex-col max-md:gap-8">
          {links.map((link) => (
            <li key={link.label}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  onClick={closeMenu}
                  className={`text-sm transition-colors relative group ${
                    location.pathname === '/work'
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  <span className={`absolute left-0 -bottom-1 h-[1.5px] bg-accent transition-all duration-300 ${
                    location.pathname === '/work' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </li>
          ))}
          <li>
            <MagneticButton>
              {isHome ? (
                <a
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, { href: '/#contact' })}
                  className="bg-accent text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-accent-bright transition-all shadow-[0_0_20px_rgba(255,92,26,0.2)] hover:shadow-[0_0_35px_rgba(255,92,26,0.4)] hover:-translate-y-0.5"
                >
                  Let's Talk
                </a>
              ) : (
                <Link
                  to="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-accent text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-accent-bright transition-all shadow-[0_0_20px_rgba(255,92,26,0.2)] hover:shadow-[0_0_35px_rgba(255,92,26,0.4)] hover:-translate-y-0.5"
                >
                  Let's Talk
                </Link>
              )}
            </MagneticButton>
          </li>
        </ul>
      </nav>

      <button
        className="hidden max-md:block z-[1001] bg-transparent border-none p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-text-primary rounded transition-all mb-[5px] ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`block w-6 h-0.5 bg-text-primary rounded transition-all mb-[5px] ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-text-primary rounded transition-all ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>
    </header>
  );
}
