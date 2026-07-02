import { Menu, X, ChevronDown, ArrowRight, Instagram, Facebook, Linkedin, Search, Shirt, Backpack, Award, Dumbbell, GlassWater } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router';
import { brandLogosMap } from './ClientLogos';
import { PremiumButton } from './ui/PremiumAnimations';
import logoTransparent from '../../imports/Logo3.jpeg';

const searchDatabase = [
  {
    id: 'playeras',
    title: 'Playeras atléticas',
    icon: Shirt,
    keywords: ['playeras', 'playera', 'camisetas', 'camiseta', 'jersey', 'jerseys', 'ropa', 'deportiva', 'vestimenta', 'telas', 'sublimado'],
    url: '/catalogo#playeras'
  },
  {
    id: 'morrales',
    title: 'Morrales reforzados',
    icon: Backpack,
    keywords: ['morrales', 'morral', 'mochilas', 'mochila', 'bolsa', 'bolsas', 'bulto', 'morralito', 'bolso', 'talega'],
    url: '/catalogo#morrales'
  },
  {
    id: 'medallas',
    title: 'Medallas Metálicas',
    icon: Award,
    keywords: ['medallas', 'medalla', 'metalica', 'metalicas', 'trofeo', 'premio', 'premios', 'reconocimiento', 'bronce', 'plata', 'oro'],
    url: '/catalogo#medallas'
  },
  {
    id: 'kits',
    title: 'Kits deportivos',
    icon: Dumbbell,
    keywords: ['kits', 'kit', 'paquete', 'paquetes', 'combo', 'combos', 'corredor', 'corredores', 'competidor', 'competidores'],
    url: '/catalogo#kits'
  },
  {
    id: 'otros',
    title: 'Otros Accesorios',
    icon: GlassWater,
    keywords: ['otros', 'gorras', 'gorra', 'viseras', 'visera', 'botellas', 'botella', 'cilindros', 'cilindro', 'termos', 'termo', 'accesorios', 'accesorio', 'hidratacion'],
    url: '/catalogo#otros'
  }
];

// Prefetch functions for lazy route chunks optimization
const prefetchCatalogo = () => import('../pages/CatalogoPage');
const prefetchNosotros = () => import('../pages/NosotrosPage');
const prefetchCasos = () => import('../pages/CasosPage');
const prefetchTecnologia = () => import('../pages/TecnologiaPage');
const prefetchCotizar = () => import('../pages/CotizarPage');

const aaaClients = [
  'Fundación Kardias',
  'Universidad Panamericana',
  'Trotime',
  'AllMkting',
  'Adient',
  'IOS Offices',
  'IdemSport',
  'SomosRunning',
  'En Dónde Correr',
  'UNAM',
  'IPN'
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedProductos, setMobileExpandedProductos] = useState(false);
  const [mobileExpandedNosotros, setMobileExpandedNosotros] = useState(false);
  const [mobileExpandedCasos, setMobileExpandedCasos] = useState(false);
  const [mobileExpandedTecnologia, setMobileExpandedTecnologia] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search states & refs
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<typeof searchDatabase>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside search container to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions dynamically
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
    const filtered = searchDatabase.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.some(kw => kw.includes(query))
    );
    setSearchSuggestions(filtered);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Try to find an exact or keyword match
    const match = searchDatabase.find(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.some(kw => kw === query || kw.includes(query))
    );

    if (match) {
      // Navigate to destination
      navigate(match.url);
      // If we are already on /catalogo, need to scroll to section
      if (location.pathname === '/catalogo') {
        const element = document.getElementById(match.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Fallback: just go to catalog
      navigate('/catalogo');
    }

    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchSuggestions([]);
  };

  const handleSuggestionClick = (url: string, id: string) => {
    navigate(url);
    if (location.pathname === '/catalogo') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchSuggestions([]);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // slight delay to prevent abrupt flashing
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[9999] transition-all duration-300 bg-white/80 backdrop-blur-md border-b ${
          scrolled ? 'border-black py-3' : 'border-black/10 py-5'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E43537] origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => { setIsOpen(false); setActiveDropdown(null); }}
              className="flex items-center gap-2 group font-heading font-black text-xl sm:text-2xl tracking-tighter text-black select-none shrink-0"
            >
              <motion.img 
                src={logoTransparent} 
                alt="Sports Print MX Logo" 
                className="h-14 sm:h-20 lg:h-24 w-auto object-contain"
                whileHover={{ rotate: -3, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-10 h-full">
              
              {/* Catálogo link with Dropdown indicator */}
              <Link 
                to="/catalogo"
                className="h-full flex items-center gap-1 group/navlink relative"
                onMouseEnter={() => { handleMouseEnter('productos'); prefetchCatalogo(); }}
                onFocus={prefetchCatalogo}
              >
                <span className={`whitespace-nowrap text-xs font-bold tracking-widest transition-colors duration-200 uppercase ${
                  isActive('/catalogo') || activeDropdown === 'productos' ? 'text-black underline underline-offset-8 decoration-2 decoration-sp-accent' : 'text-neutral-500 group-hover/navlink:text-black'
                }`}>
                  Catálogo
                </span>
                <ChevronDown size={12} className={`text-neutral-500 group-hover/navlink:text-black transition-all duration-200 ${activeDropdown === 'productos' ? 'rotate-180 text-black' : ''}`} />
              </Link>

              {/* Nosotros link with Dropdown indicator */}
              <Link 
                to="/nosotros"
                className="h-full flex items-center gap-1 group/navlink relative"
                onMouseEnter={() => { handleMouseEnter('nosotros'); prefetchNosotros(); }}
                onFocus={prefetchNosotros}
              >
                <span className={`whitespace-nowrap text-xs font-bold tracking-widest transition-colors duration-200 uppercase ${
                  isActive('/nosotros') || activeDropdown === 'nosotros' ? 'text-black underline underline-offset-8 decoration-2 decoration-sp-accent' : 'text-neutral-500 group-hover/navlink:text-black'
                }`}>
                  Nosotros
                </span>
                <ChevronDown size={12} className={`text-neutral-500 group-hover/navlink:text-black transition-all duration-200 ${activeDropdown === 'nosotros' ? 'rotate-180 text-black' : ''}`} />
              </Link>

              {/* Casos de Éxito link with Dropdown indicator */}
              <Link 
                to="/casos-de-exito"
                className="h-full flex items-center gap-1 group/navlink relative"
                onMouseEnter={() => { handleMouseEnter('casos'); prefetchCasos(); }}
                onFocus={prefetchCasos}
              >
                <span className={`whitespace-nowrap text-xs font-bold tracking-widest transition-colors duration-200 uppercase ${
                  isActive('/casos-de-exito') || activeDropdown === 'casos' ? 'text-black underline underline-offset-8 decoration-2 decoration-sp-accent' : 'text-neutral-500 group-hover/navlink:text-black'
                }`}>
                  Casos de Éxito
                </span>
                <ChevronDown size={12} className={`text-neutral-500 group-hover/navlink:text-black transition-all duration-200 ${activeDropdown === 'casos' ? 'rotate-180 text-black' : ''}`} />
              </Link>

              {/* Tecnología link with Dropdown indicator */}
              <Link 
                to="/tecnologia-textil"
                className="h-full flex items-center gap-1 group/navlink relative"
                onMouseEnter={() => { handleMouseEnter('tecnologia'); prefetchTecnologia(); }}
                onFocus={prefetchTecnologia}
              >
                <span className={`whitespace-nowrap text-xs font-bold tracking-widest transition-colors duration-200 uppercase ${
                  isActive('/tecnologia-textil') || activeDropdown === 'tecnologia' ? 'text-black underline underline-offset-8 decoration-2 decoration-sp-accent' : 'text-neutral-500 group-hover/navlink:text-black'
                }`}>
                  Telas y materiales
                </span>
                <ChevronDown size={12} className={`text-neutral-500 group-hover/navlink:text-black transition-all duration-200 ${activeDropdown === 'tecnologia' ? 'rotate-180 text-black' : ''}`} />
              </Link>
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 h-full">
              {/* Search Bar - Desktop */}
              <div ref={searchContainerRef} className={`relative hidden lg:flex items-center transition-all duration-300 ${isSearchOpen ? 'mx-5' : 'mx-1.5'}`}>
                <motion.div
                  animate={{
                    width: isSearchOpen ? 260 : 42,
                    borderRadius: isSearchOpen ? "14px" : "9999px",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  onClick={() => {
                    if (!isSearchOpen) {
                      setIsSearchOpen(true);
                    }
                  }}
                  className={`flex items-center h-10 overflow-hidden transition-shadow transition-colors duration-300 border ${
                    isSearchOpen 
                      ? "bg-white border-neutral-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]" 
                      : "bg-white/80 backdrop-blur-md border-black/10 hover:border-black/20 cursor-pointer justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <form onSubmit={handleSearchSubmit} className="flex items-center w-full h-full px-1 justify-between">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="BUSCAR..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`bg-transparent border-0 outline-none text-xs font-bold uppercase tracking-wider text-black placeholder-neutral-400 h-full transition-all duration-300 ${
                        isSearchOpen ? "opacity-100 pl-3 w-full flex-grow" : "opacity-0 w-0 p-0 flex-none pointer-events-none"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSearchOpen) {
                          if (searchQuery.trim()) {
                            handleSearchSubmit({ preventDefault: () => {} } as any);
                          } else {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }
                        } else {
                          setIsSearchOpen(true);
                        }
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-black hover:bg-neutral-100/50 transition-colors shrink-0 flex-none"
                      aria-label="Buscar"
                    >
                      <Search size={16} />
                    </button>
                  </form>
                </motion.div>

                {/* Desktop Search Suggestions */}
                <AnimatePresence>
                  {isSearchOpen && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white border border-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-[10000] p-2 rounded-xl"
                    >
                      <span className="text-[9px] tracking-[0.2em] text-neutral-400 font-bold uppercase block px-3 py-1 border-b border-neutral-100 mb-1">
                        Sugerencias de búsqueda
                      </span>
                      {searchSuggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSuggestionClick(item.url, item.id)}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors uppercase tracking-wider flex items-center gap-3 rounded-lg"
                        >
                          <item.icon size={15} className="text-neutral-400 group-hover:text-black transition-colors duration-300 shrink-0" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar - Mobile */}
              <div className={`lg:hidden flex items-center relative transition-all duration-300 ${isSearchOpen ? 'mx-3' : 'mx-0.5'}`}>
                <motion.div
                  animate={{
                    width: isSearchOpen ? 180 : 38,
                    borderRadius: isSearchOpen ? "12px" : "9999px",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  onClick={() => {
                    if (!isSearchOpen) {
                      setIsSearchOpen(true);
                    }
                  }}
                  className={`flex items-center h-9 overflow-hidden transition-shadow transition-colors duration-300 border ${
                    isSearchOpen 
                      ? "bg-white border-neutral-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]" 
                      : "bg-white/80 backdrop-blur-md border-black/10 cursor-pointer justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <form onSubmit={handleSearchSubmit} className="flex items-center w-full h-full px-0.5 justify-between">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="BUSCAR..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`bg-transparent border-0 outline-none text-[10px] font-bold uppercase tracking-wider text-black placeholder-neutral-400 h-full transition-all duration-300 ${
                        isSearchOpen ? "opacity-100 pl-2 w-full flex-grow" : "opacity-0 w-0 p-0 flex-none pointer-events-none"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSearchOpen) {
                          if (searchQuery.trim()) {
                            handleSearchSubmit({ preventDefault: () => {} } as any);
                          } else {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }
                        } else {
                          setIsSearchOpen(true);
                        }
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-black hover:bg-neutral-50/50 transition-colors shrink-0 flex-none"
                      aria-label="Buscar"
                    >
                      <Search size={14} />
                    </button>
                  </form>
                </motion.div>

                {/* Mobile Suggestions */}
                <AnimatePresence>
                  {isSearchOpen && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white border border-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-[10000] p-2 rounded-xl"
                    >
                      {searchSuggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSuggestionClick(item.url, item.id)}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors uppercase tracking-wider flex items-center gap-3 rounded-lg"
                        >
                          <item.icon size={14} className="text-neutral-400 group-hover:text-black transition-colors duration-300 shrink-0" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* COTIZA AHORA - Visible on Desktop AND Mobile */}
              <div onMouseEnter={prefetchCotizar} onFocus={prefetchCotizar}>
                <PremiumButton
                  to="/cotizar"
                  onClick={() => { setIsOpen(false); setActiveDropdown(null); }}
                  text="COTIZA AHORA"
                  variant="primary"
                  className="!py-2.5 sm:!py-3 !px-3 sm:!px-6 shrink-0"
                />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-black p-2 hover:bg-neutral-100 transition-colors border border-black/10"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega-Menu Overlay panels */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 w-full bg-white border-b border-black shadow-lg z-50 overflow-hidden"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-10">
                {activeDropdown === 'productos' && (
                  <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Title and CTA */}
                    <div className="lg:col-span-5 border-r border-black/10 pr-12 flex flex-col justify-between">
                      <div className="pt-4">
                        <h3 className="font-heading font-black text-2xl uppercase mb-3 text-black">
                          Catálogo de Productos
                        </h3>
                      </div>
                      <Link 
                        to="/cotizar"
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black pb-1 hover:border-sp-accent transition-colors w-fit group/cta"
                      >
                        <span>Cotizar Catálogo</span>
                        <ArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right Column: Vertical Products list */}
                    <div className="lg:col-span-7 flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-bold uppercase block mb-3">
                        Artículos Disponibles
                      </span>
                      <div className="flex flex-col">
                        {[
                          { title: 'Playeras', path: '/catalogo#playeras', icon: Shirt },
                          { title: 'Morrales', path: '/catalogo#morrales', icon: Backpack },
                          { title: 'Medallas', path: '/catalogo#medallas', icon: Award },
                          { title: 'Kits Deportivos', path: '/catalogo#kits', icon: Dumbbell },
                          { title: 'Otros Accesorios', path: '/catalogo#otros', icon: GlassWater }
                        ].map((prod) => (
                          <Link
                            key={prod.title}
                            to={prod.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-center border-b border-neutral-100 py-3.5 hover:pl-2 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="w-1.5 h-1.5 bg-[#E43537] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rounded-none" />
                              <prod.icon size={18} className="text-neutral-400 group-hover:text-black transition-colors duration-300 shrink-0" />
                              <h4 className="font-heading font-bold text-xs sm:text-[13px] tracking-[0.12em] uppercase text-neutral-600 group-hover:text-black transition-colors duration-300">
                                {prod.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === 'nosotros' && (
                  <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Title and CTA */}
                    <div className="lg:col-span-5 border-r border-black/10 pr-12 flex flex-col justify-between">
                      <div className="pt-4">
                        <h3 className="font-heading font-black text-2xl uppercase mb-3 text-black">
                          Sobre Nosotros
                        </h3>
                      </div>
                      <Link 
                        to="/nosotros#infraestructura"
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black pb-1 hover:border-sp-accent transition-colors w-fit group/cta"
                      >
                        <span>Ver Planta Industrial</span>
                        <ArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right Column: Vertical Subcategories list */}
                    <div className="lg:col-span-7 flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-bold uppercase block mb-3">
                        Secciones
                      </span>
                      <div className="flex flex-col">
                        {[
                          { title: '¿Quiénes Somos?', path: '/nosotros' },
                          { title: 'Planta de Manufactura / Infraestructura', path: '/nosotros#infraestructura' },
                          { title: 'Galería Industrial', path: '/nosotros#galeria' }
                        ].map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-center border-b border-neutral-100 py-3.5 hover:pl-2 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 bg-[#E43537] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rounded-none" />
                              <h4 className="font-heading font-bold text-xs sm:text-[13px] tracking-[0.12em] uppercase text-neutral-600 group-hover:text-black transition-colors duration-300">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === 'casos' && (
                  <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Title and CTA */}
                    <div className="lg:col-span-5 border-r border-black/10 pr-12 flex flex-col justify-between">
                      <div className="pt-4">
                        <h3 className="font-heading font-black text-2xl uppercase mb-3 text-black">
                          Eventos Masivos y Proyectos AAA
                        </h3>
                      </div>
                      <Link 
                        to="/casos-de-exito"
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black pb-1 hover:border-sp-accent transition-colors w-fit group/cta"
                      >
                        <span>Ver Casos de Éxito</span>
                        <ArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right Column: Vertical Subcategories list */}
                    <div className="lg:col-span-7 flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-bold uppercase block mb-3">
                        Casos Clave
                      </span>
                      <div className="flex flex-col">
                        {[
                          { title: 'Clientes', path: '/casos-de-exito#clientes' },
                          { title: 'Carrera IOS (IOS Offices)', path: '/casos-de-exito#ios-offices' },
                          { title: 'AllMkting & En Dónde Correr', path: '/casos-de-exito#allmkting' },
                          { title: 'Trotime', path: '/casos-de-exito#trotime' }
                        ].map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-center border-b border-neutral-100 py-3.5 hover:pl-2 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 bg-[#E43537] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rounded-none" />
                              <h4 className="font-heading font-bold text-xs sm:text-[13px] tracking-[0.12em] uppercase text-neutral-600 group-hover:text-black transition-colors duration-300">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === 'tecnologia' && (
                  <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Title and CTA */}
                    <div className="lg:col-span-5 border-r border-black/10 pr-12 flex flex-col justify-between">
                      <div className="pt-4">
                        <h3 className="font-heading font-black text-2xl uppercase mb-3 text-black">
                          Innovación y Desarrollo de Microfibras
                        </h3>
                      </div>
                      <Link 
                        to="/tecnologia-textil#comparador"
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black pb-1 hover:border-sp-accent transition-colors w-fit group/cta"
                      >
                        <span>Ver Comparador Técnico</span>
                        <ArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right Column: Vertical Subcategories list */}
                    <div className="lg:col-span-7 flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-bold uppercase block mb-3">
                        Nuestra Tecnología
                      </span>
                      <div className="flex flex-col">
                        {[
                          { title: 'Catálogo de Tejidos Premium', path: '/tecnologia-textil#tejidos' },
                          { title: 'Comparador Textil', path: '/tecnologia-textil#comparador' }
                        ].map((item) => (
                          <Link
                            key={item.title}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-center border-b border-neutral-100 py-3.5 hover:pl-2 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 bg-[#E43537] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rounded-none" />
                              <h4 className="font-heading font-bold text-xs sm:text-[13px] tracking-[0.12em] uppercase text-neutral-600 group-hover:text-black transition-colors duration-300">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Navigation - Solid White overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white pt-24 pb-12 px-6 flex flex-col justify-between lg:hidden border-b border-black overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-4">
              <nav className="flex flex-col gap-5">
                
                {/* Catálogo Accordion */}
                <div className="border-b border-black/10 pb-3">
                  <button 
                    onClick={() => setMobileExpandedProductos(!mobileExpandedProductos)}
                    className="w-full flex justify-between items-center text-left font-heading text-2xl font-extrabold tracking-tight uppercase py-2 text-black"
                  >
                    <span>Catálogo</span>
                    <ChevronDown size={20} className={`transition-transform duration-200 ${mobileExpandedProductos ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpandedProductos && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-2 mt-2 flex flex-col overflow-hidden text-sm border-l border-black/10"
                      >
                        {[
                          { title: 'Playeras', path: '/catalogo#playeras', icon: Shirt },
                          { title: 'Morrales', path: '/catalogo#morrales', icon: Backpack },
                          { title: 'Medallas', path: '/catalogo#medallas', icon: Award },
                          { title: 'Kits Deportivos', path: '/catalogo#kits', icon: Dumbbell },
                          { title: 'Otros Accesorios', path: '/catalogo#otros', icon: GlassWater }
                        ].map((prod) => (
                          <Link 
                            key={prod.title}
                            to={prod.path}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 active:bg-neutral-50 block border-b border-neutral-100/50"
                          >
                            <span className="font-heading font-bold text-neutral-600 active:text-black uppercase tracking-[0.1em] text-xs flex items-center gap-3">
                              <prod.icon size={15} className="text-neutral-400 shrink-0" />
                              <span>{prod.title}</span>
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nosotros Accordion */}
                <div className="border-b border-black/10 pb-3">
                  <button 
                    onClick={() => setMobileExpandedNosotros(!mobileExpandedNosotros)}
                    className="w-full flex justify-between items-center text-left font-heading text-2xl font-extrabold tracking-tight uppercase py-2 text-black"
                  >
                    <span>Nosotros</span>
                    <ChevronDown size={20} className={`transition-transform duration-200 ${mobileExpandedNosotros ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpandedNosotros && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-2 mt-2 flex flex-col overflow-hidden text-sm border-l border-black/10"
                      >
                        {[
                          { title: '¿Quiénes Somos?', path: '/nosotros' },
                          { title: 'Planta de Manufactura / Infraestructura', path: '/nosotros#infraestructura' },
                          { title: 'Galería Industrial', path: '/nosotros#galeria' }
                        ].map((item) => (
                          <Link 
                            key={item.title}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 active:bg-neutral-50 block border-b border-neutral-100/50"
                          >
                            <span className="font-heading font-bold text-neutral-600 active:text-black uppercase tracking-[0.1em] text-xs block">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Casos de Éxito Accordion */}
                <div className="border-b border-black/10 pb-3">
                  <button 
                    onClick={() => setMobileExpandedCasos(!mobileExpandedCasos)}
                    className="w-full flex justify-between items-center text-left font-heading text-2xl font-extrabold tracking-tight uppercase py-2 text-black"
                  >
                    <span>Casos de Éxito</span>
                    <ChevronDown size={20} className={`transition-transform duration-200 ${mobileExpandedCasos ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpandedCasos && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-2 mt-2 flex flex-col overflow-hidden text-sm border-l border-black/10"
                      >
                        {[
                          { title: 'Clientes', path: '/casos-de-exito#clientes' },
                          { title: 'Carrera IOS (IOS Offices)', path: '/casos-de-exito#ios-offices' },
                          { title: 'AllMkting & En Dónde Correr', path: '/casos-de-exito#allmkting' },
                          { title: 'Trotime', path: '/casos-de-exito#trotime' }
                        ].map((item) => (
                          <Link 
                            key={item.title}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 active:bg-neutral-50 block border-b border-neutral-100/50"
                          >
                            <span className="font-heading font-bold text-neutral-600 active:text-black uppercase tracking-[0.1em] text-xs block">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tecnología Accordion */}
                <div className="border-b border-black/10 pb-3">
                  <button 
                    onClick={() => setMobileExpandedTecnologia(!mobileExpandedTecnologia)}
                    className="w-full flex justify-between items-center text-left font-heading text-2xl font-extrabold tracking-tight uppercase py-2 text-black"
                  >
                    <span>Telas y materiales</span>
                    <ChevronDown size={20} className={`transition-transform duration-200 ${mobileExpandedTecnologia ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpandedTecnologia && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-2 mt-2 flex flex-col overflow-hidden text-sm border-l border-black/10"
                      >
                        {[
                          { title: 'Catálogo de Tejidos Premium', path: '/tecnologia-textil#tejidos' },
                          { title: 'Comparador Textil', path: '/tecnologia-textil#comparador' }
                        ].map((item) => (
                          <Link 
                            key={item.title}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 active:bg-neutral-50 block border-b border-neutral-100/50"
                          >
                            <span className="font-heading font-bold text-neutral-600 active:text-black uppercase tracking-[0.1em] text-xs block">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </nav>

              <div className="mt-4">
                <Link
                  to="/cotizar"
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center bg-black hover:bg-neutral-800 text-white font-bold text-sm tracking-widest uppercase py-4 border border-black transition-all rounded-none"
                >
                  SOLICITAR COTIZACIÓN
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-neutral-500 font-semibold mt-8">
              <div className="flex gap-5 items-center">
                <a href="https://www.instagram.com/sportsprintmx/" target="_blank" rel="noopener noreferrer" className="text-[#4B5563] hover:text-sp-accent transition-colors" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/61587807222921/" target="_blank" rel="noopener noreferrer" className="text-[#4B5563] hover:text-sp-accent transition-colors" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://www.linkedin.com/company/sportsprintmx/" target="_blank" rel="noopener noreferrer" className="text-[#4B5563] hover:text-sp-accent transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
              <span className="text-[10px] uppercase tracking-widest">SPORTS PRINT MX &copy; 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
