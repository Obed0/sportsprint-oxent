import { PageTransition } from '../components/PageTransition';
import { HomeHero } from '../components/home/HomeHero';
import { ClientLogos } from '../components/home/ClientLogos';
import { Diferenciadores } from '../components/home/Diferenciadores';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ProcessOverview } from '../components/home/ProcessOverview';
import { CasosExitoSection } from '../components/home/CasosExitoSection';

export function HomePage() {
  return (
    <PageTransition>
      <HomeHero />
      <ClientLogos />
      <Diferenciadores />
      <FeaturedProducts />
      <ProcessOverview />
      <CasosExitoSection minimal={true} />
    </PageTransition>
  );
}
export default HomePage;
