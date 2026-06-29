import { PageTransition } from '../components/PageTransition';
import { Catalogo } from '../components/home/Catalogo';

export function CatalogoPage() {
  return (
    <PageTransition>
      {/* Editorial Header */}
      <section className="pt-44 pb-16 bg-white text-black select-none">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase mb-6 text-black select-none">
            CATÁLOGO DE <br />
            <span className="text-black hover:text-sp-accent transition-colors duration-300">
              PRODUCTOS
            </span>
          </h1>

        </div>
      </section>

      {/* Catalog Grid */}
      <Catalogo />
    </PageTransition>
  );
}
export default CatalogoPage;
