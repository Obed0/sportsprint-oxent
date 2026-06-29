import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useSEO } from './hooks/useSEO';

// Lazy loaded Pages for bundle size optimization
const HomePage = lazy(() => import('./pages/HomePage'));
const NosotrosPage = lazy(() => import('./pages/NosotrosPage'));
const CasosPage = lazy(() => import('./pages/CasosPage'));
const TecnologiaPage = lazy(() => import('./pages/TecnologiaPage'));
const CotizarPage = lazy(() => import('./pages/CotizarPage'));
const CatalogoPage = lazy(() => import('./pages/CatalogoPage'));
const AvisoPage = lazy(() => import('./pages/AvisoPage'));
const TerminosPage = lazy(() => import('./pages/TerminosPage'));

// Sleek, minimal brand-aligned page loader for chunk transitions
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Sleek rotating minimalist stroke loader */}
        <div className="w-10 h-10 border-2 border-black border-t-transparent animate-spin rounded-full" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black animate-pulse">
          Cargando...
        </span>
      </div>
    </div>
  );
}

// Scroll to hash or top on route change helper
function ScrollToHashAndTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      let attempts = 0;
      const maxAttempts = 30; // Max 3 seconds

      const tryScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };

      setTimeout(tryScroll, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  useSEO();

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden flex flex-col justify-between rounded-none">
      <ScrollToHashAndTop />
      <Navbar />
      <WhatsAppButton />
      
      <main className="flex-grow relative z-30 bg-white">
        {/* Animated Page Transitions */}
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/kitsparacarreras" element={<Navigate to="/catalogo" replace />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/acercasportsprint" element={<Navigate to="/nosotros" replace />} />
              <Route path="/casos-de-exito" element={<CasosPage />} />
              <Route path="/casosdeexito" element={<Navigate to="/casos-de-exito" replace />} />
              <Route path="/tecnologia-textil" element={<TecnologiaPage />} />
              <Route path="/cotizar" element={<CotizarPage />} />
              <Route path="/aviso-de-privacidad" element={<AvisoPage />} />
              <Route path="/terminos-comerciales" element={<TerminosPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
export { App };