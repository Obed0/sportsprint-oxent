import { Link, useLocation } from 'react-router';
import { ArrowUp, Download, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import logoTransparent from '../../imports/logo_transparent.png';
import { PremiumButton } from './ui/PremiumAnimations';
import { ScrollReveal } from './ScrollReveal';

const footerLinks = {
  navegacion: [
    { label: 'INICIO', href: '/' },
    { label: 'NOSOTROS', href: '/nosotros' },
    { label: 'CASOS DE ÉXITO', href: '/casos-de-exito' },
    { label: 'TELAS Y MATERIALES', href: '/tecnologia-textil' },
  ],
  servicios: [
    { label: 'Playeras Atléticas', href: '/catalogo#playeras' },
    { label: 'Morrales Reforzados', href: '/catalogo#morrales' },
    { label: 'Medallas Especializadas', href: '/catalogo#medallas' },
    { label: 'Kits Deportivos', href: '/catalogo#kits' },
    { label: 'Otros Accesorios', href: '/catalogo#otros' },
  ],
};

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/sportsprintmx/' },
  { name: 'Facebook', url: 'https://www.facebook.com/61587807222921/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/sportsprintmx/' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Dynamic B2B CTA Banner Content Mapping
  let ctaTitle = '¿Necesitas artículos para tu evento o carrera deportiva?';
  let ctaSubtext = 'Descarga nuestro catálogo o solicita un presupuesto personalizado para tu carrera.';
  let primaryBtnText = 'COTIZAR EVENTO';
  let primaryBtnTo = '/cotizar';
  let showSecondaryBtn = true;

  if (path === '/kitsparacarreras' || path === '/catalogo') {
    ctaTitle = '¿LISTO PARA ARMAR EL KIT OFICIAL DE TU EDICIÓN?';
    ctaSubtext = 'Diseñamos y fabricamos playeras, medallas, morrales y accesorios de alto rendimiento.';
    primaryBtnText = 'CONFIGURA TU PRÓXIMO KIT';
    primaryBtnTo = '/cotizar';
    showSecondaryBtn = false;
  } else if (path === '/casosdeexito' || path === '/casos-de-exito') {
    ctaTitle = 'Necesitas artículos para tu evento o carrera deportiva';
    ctaSubtext = 'Equipa a tus atletas con la misma calidad técnica que confían los eventos masivos líderes.';
    primaryBtnText = 'COTIZAR AHORA';
    primaryBtnTo = '/cotizar';
    showSecondaryBtn = false;
  } else if (path === '/acercasportsprint' || path === '/nosotros') {
    ctaTitle = '¿BUSCAS UN PROVEEDOR SIN INTERMEDIARIOS?';
    ctaSubtext = '';
    primaryBtnText = 'CONÓCENOS';
    primaryBtnTo = '/cotizar';
    showSecondaryBtn = false;
  }

  const isCotizarOrAvisoOrTerminos = path === '/cotizar' || path === '/aviso-de-privacidad' || path === '/terminos-comerciales';

  return (
    <footer id="contacto" className="bg-white border-t border-black text-black select-none relative z-10">
      {/* Fixed Organic Blob and Glow - z-[10] */}
      {!isCotizarOrAvisoOrTerminos && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10] w-[200px] h-[200px] sm:w-[480px] sm:h-[480px] md:w-[680px] md:h-[680px]" style={{ willChange: 'transform' }}>
          {/* Backlight Glow for Premium Contrast */}
          <div className="absolute inset-0 bg-[#FF6663] opacity-35 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Organic Morphing SVG Blob Background */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 bg-[#FF6663]/25 pointer-events-none animate-morph-blob"
          >
            <path
              fill="currentColor"
              className="text-[#FF6663]/30"
              d="M45.5,-75.8C58.3,-69.5,67.6,-56.3,73.8,-41.8C80,-27.3,83.1,-11.6,83.9,4.2C84.7,20,83.2,35.8,76.1,48.7C69.1,61.7,56.5,71.8,42.4,77.5C28.3,83.1,12.7,84.4,-2.4,88.1C-17.5,91.8,-32.1,98,-44.6,94.9C-57.1,91.8,-67.6,79.5,-74.6,65.6C-81.6,51.8,-85.2,36.5,-86.3,21.3C-87.4,6,-86.1,-9.1,-81.4,-22.7C-76.7,-36.3,-68.7,-48.4,-57.5,-55.1C-46.3,-61.8,-32,-63.1,-18.2,-68.7C-4.4,-74.3,9,-84.1,24.9,-84.3C40.7,-84.5,32.7,-82.1,45.5,-75.8Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      )}

      {/* Top B2B CTA Banner - Black Minimalist */}
      {!isCotizarOrAvisoOrTerminos && (
        <div className="bg-transparent border-b border-black py-20 px-5 sm:px-8 lg:px-12 relative overflow-hidden text-center flex flex-col items-center">
          {/* Solid Black Background under the Fixed Blob */}
          <div className="absolute inset-0 bg-black z-0" />
          
          {/* Decorative Neon Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF6663] to-transparent z-20" />
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#FF6663] opacity-5 filter blur-[120px] z-20" />

          <div className="max-w-[1400px] mx-auto relative z-20 flex flex-col items-center w-full">
            <ScrollReveal duration={0.7} direction="up" className="w-full flex flex-col items-center relative z-20">
              <h3 className="font-heading text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.15] uppercase max-w-4xl mx-auto mb-6 text-white relative py-8 sm:py-16 flex items-center justify-center w-full min-h-[120px] sm:min-h-[220px] z-30">
                <span className="relative z-30 block max-w-3xl">
                  {ctaTitle}
                </span>
              </h3>
              
              <p className="text-white text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-bold relative z-30">
                {ctaSubtext}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto items-stretch sm:items-center relative z-30">
                <PremiumButton
                  to={primaryBtnTo}
                  text={primaryBtnText}
                  variant="white"
                  className="w-full sm:w-auto text-center relative z-30"
                />
                {showSecondaryBtn && (
                  <PremiumButton
                    to="/Sports-Print-Catalogo.pdf"
                    download="Sports_Print_Catalogo.pdf"
                    text="DESCARGAR CATÁLOGO"
                    icon={<Download size={14} />}
                    variant="secondary"
                    className="w-full sm:w-auto text-center border-white relative z-30"
                  />
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="relative z-30 bg-white max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block group mb-6">
                <img src={logoTransparent} alt="Sports Print MX Logo" className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed max-w-sm mb-8">
                Producimos playeras, morrales, medallas, y más productos de alta calidad para organizadores de carreras, marcas deportivas y eventos running.
              </p>
            </div>

            {/* Social List */}
            <div className="flex gap-5 items-center">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/sportsprintmx/', Icon: Instagram },
                { name: 'Facebook', url: 'https://www.facebook.com/61587807222921/', Icon: Facebook },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/sportsprintmx/', Icon: Linkedin },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4B5563] hover:text-sp-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.25em] text-[#4B5563] uppercase font-bold mb-6">NAVEGACIÓN</h4>
            <ul className="space-y-4">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-black text-xs hover:underline font-bold tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.25em] text-[#4B5563] uppercase font-bold mb-6">PRODUCTOS</h4>
            <ul className="space-y-4">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-black text-xs hover:underline font-bold tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-[0.25em] text-[#4B5563] uppercase font-bold mb-6">PLANTA DE MANUFACTURA</h4>
            <ul className="space-y-4 text-xs font-bold text-black tracking-wide">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 text-black mt-0.5" />
                <span>Ciudad de México (CDMX)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-black" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-black" />
                <span>contacto@sportsprintmx.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-30 bg-white border-t border-black py-6">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#4B5563] text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Sports Print MX. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/aviso-de-privacidad" className="text-[#4B5563] text-[10px] uppercase tracking-widest hover:text-black">Aviso de Privacidad</Link>
            <Link to="/terminos-comerciales" className="text-[#4B5563] text-[10px] uppercase tracking-widest hover:text-black">Términos Comerciales</Link>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 border border-black flex items-center justify-center text-black hover:bg-neutral-100 transition-colors rounded-none"
              aria-label="Volver arriba"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
