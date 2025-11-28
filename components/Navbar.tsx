import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, Globe } from 'lucide-react';
import { Language } from '../types';
import { TEXTS } from '../constants';

interface NavbarProps {
  lang: Language;
}

const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangPath = lang === Language.EN ? 'en' : 'ja';

  const navLinks = [
    { path: `/${currentLangPath}`, label: TEXTS.home[lang.toLowerCase()] },
    { path: `/${currentLangPath}/menu`, label: TEXTS.menu[lang.toLowerCase()] },
    { path: `/${currentLangPath}/about`, label: TEXTS.about[lang.toLowerCase()] },
    { path: `/${currentLangPath}/gallery`, label: TEXTS.gallery[lang.toLowerCase()] },
    { path: `/${currentLangPath}/reviews`, label: TEXTS.reviews[lang.toLowerCase()] },
    { path: `/${currentLangPath}/contact`, label: TEXTS.contact[lang.toLowerCase()] },
  ];

  const isActive = (path: string) => {
    if (path === `/${currentLangPath}` && location.pathname === `/${currentLangPath}`) return true;
    if (path !== `/${currentLangPath}` && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleLang = () => {
    const newLang = lang === Language.EN ? 'ja' : 'en';
    // Replace the language segment in the current URL
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(en|ja)/, `/${newLang}`);
    navigate(newPath);
  };

  const isHome = location.pathname === `/${currentLangPath}`;

  // Don't show standard navbar on admin pages
  if (location.pathname.startsWith('/admin')) return null;


  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isHome
        ? scrolled
          ? 'bg-brand-red/95 backdrop-blur-md shadow-lg py-2 border-b border-white/10'
          : 'bg-transparent py-6'
        : 'bg-brand-red shadow-lg py-2'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 group">
            <Link to={`/${currentLangPath}`} className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-brand-cream tracking-wide group-hover:text-amber-400 transition-colors duration-300">Cafe Maemi</span>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-amber-500 group-hover:text-amber-300 transition-colors duration-300">Indian & Nepalese</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-widest transition-all duration-300 relative group py-2 ${isActive(link.path) ? 'text-amber-400' : 'text-amber-100/80 hover:text-white'
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 ${isActive(link.path) ? 'scale-x-100' : ''}`}></span>
              </Link>
            ))}

            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-bold border border-amber-500/30 text-amber-400 px-4 py-2 rounded-full hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300 ml-4 backdrop-blur-sm cursor-pointer"
            >
              <Globe size={14} />
              {lang}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-amber-200 hover:text-white transition-colors"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-500 hover:text-amber-400 focus:outline-none transition-transform duration-300 active:scale-95"
            >
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute w-full bg-brand-red/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`block px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} ${isActive(link.path)
                ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-400'
                : 'text-amber-100/70 hover:bg-white/5 hover:text-white'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;