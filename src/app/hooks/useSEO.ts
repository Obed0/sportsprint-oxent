import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOMapping {
  title: string;
  description: string;
}

interface SEOMappings {
  [key: string]: SEOMapping;
}

const seoData: SEOMappings = {
  '/': {
    title: 'Sports Print MX — Manufactura Premium de Playeras Deportivas para Maratones',
    description: 'Manufactura mayorista de playeras deportivas premium para maratones y eventos masivos. Sublimación, tecnología Dry-Fit, producción de +50,000 piezas por tiraje. Solicita cotización por volumen.',
  },
  '/catalogo': {
    title: 'Catálogo de Artículos Deportivos B2B | Sports Print MX',
    description: 'Explora nuestra línea de producción de playeras, morrales, medallas metálicas conmemorativas y kits deportivos listos para entregar en maratones.',
  },
  '/nosotros': {
    title: 'Nosotros: Ingeniería y Planta Textil | Sports Print MX',
    description: 'Conoce nuestra planta industrial de 5,000m² con capacidad masiva y cero intermediarios. Más de 15 años confeccionando playeras de alto rendimiento con certificación OEKO-TEX.',
  },
  '/casos-de-exito': {
    title: 'Casos de Éxito en Eventos Deportivos AAA | Sports Print MX',
    description: 'Conoce cómo equipamos a eventos líderes como Trotime Monterrey, Woman\'s 5K, Fundación Vuela y más. Logística de kits coordinada sin retrasos.',
  },
  '/tecnologia-textil': {
    title: 'Tecnología Textil y Comparador Técnico | Sports Print MX',
    description: 'Analiza nuestras microfibras Cool Dry, PET Reciclado y Micro Panal. Conoce nuestra tecnología de costuras e impresión por sublimación.',
  },
  '/cotizar': {
    title: 'Cotización Comercial de Kits Deportivos | Sports Print MX',
    description: 'Solicita un presupuesto masivo para tu maratón o carrera atlética. Muestrario técnico de costuras y telas gratis a tus oficinas a nivel nacional.',
  },
};

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const currentSEO = seoData[pathname] || seoData['/'];
    
    // Update document title
    document.title = currentSEO.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentSEO.description);

    // Update Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSEO.title);
    }

    // Update Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', currentSEO.description);
    }

    // Update Twitter Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', currentSEO.title);
    }

    // Update Twitter Description
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', currentSEO.description);
    }
  }, [pathname]);
}
