import { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PremiumButton, Card3DTilt } from '../components/ui/PremiumAnimations';

// Import local fabric images
import fabricPet from '../../imports/fabric_pet.webp';
import fabricCoolDry from '../../imports/fabric_cooldry.webp';
import fabricPolyesterPlus from '../../imports/fabric_polyesterplus.webp';
import fabricMicroPanal from '../../imports/fabric_micropanal.webp';


interface Fabric {
  id: string;
  name: string;
  weight: string;
  composition: string;
  breathability: string;
  elasticity: string;
  uvProtection: string;
  bestFor: string;
  image: string;
  bulletSpecs: { label: string; text: string }[];
}

const fabrics: Fabric[] = [
  {
    id: 'pet-reciclado',
    name: 'PET (100% Reciclado)',
    weight: '120 g/m²',
    composition: '100% Poliéster Reciclado (PET)',
    breathability: 'Excelente (Ligera y Transpirable)',
    elasticity: 'Media (Trama Elástica)',
    uvProtection: 'UPF 30+',
    bestFor: 'Marcas y eventos running que buscan generar un impacto positivo y ecológico sin comprometer el rendimiento técnico. Cuida tu rendimiento y también el planeta.',
    image: fabricPet,
    bulletSpecs: [
      { label: 'MATERIAL 100% RECICLADO', text: 'Cuidas tu rendimiento y también el planeta.' },
      { label: 'LIGERA Y TRANSPIRABLE', text: 'Mayor ventilación para entrenar sin límites.' },
      { label: 'SECADO RÁPIDO', text: 'Evacúa el sudor y te mantiene seco por más tiempo.' },
      { label: 'APORTA VALOR ECOLÓGICO A TU EVENTO', text: 'Ideal para marcas y eventos que quieren generar impacto positivo.' }
    ]
  },
  {
    id: 'cool-dry',
    name: 'Cool Dry',
    weight: '130 g/m²',
    composition: '100% Poliéster de Rápida Evaporación',
    breathability: 'Excelente (Secado Ultra Rápido)',
    elasticity: 'Alta (Filtro UV e hidrófilo)',
    uvProtection: 'UPF 40+',
    bestFor: 'Corredores elite de maratón y entrenamientos intensos. Expulsa la humedad, cuenta con tecnología anti mal olor y es sumamente suave al tacto.',
    image: fabricCoolDry,
    bulletSpecs: [
      { label: 'SECADO ULTRA RÁPIDO', text: 'Evacúa el sudor y te mantiene seco por más tiempo.' },
      { label: 'EXPULSA LA HUMEDAD', text: 'Mantiene tu piel fresca y cómoda en todo momento.' },
      { label: 'TECNOLOGÍA ANTI MAL OLOR', text: 'Ayuda a prevenir los malos olores para que te sientas seguro(a) durante más tiempo.' },
      { label: 'TELA SUAVE AL TACTO', text: 'Ligera, cómoda y agradable para tu piel.' }
    ]
  },
  {
    id: 'polyester-plus',
    name: 'Poliéster Plus',
    weight: '140 g/m²',
    composition: '100% Poliéster Resistente',
    breathability: 'Buena Transpirabilidad',
    elasticity: 'Media (Estructural)',
    uvProtection: 'UPF 25+',
    bestFor: 'Prendas con excelente relación calidad-precio. Ofrece tela ligera y resistente para mayor comodidad y durabilidad en cada movimiento.',
    image: fabricPolyesterPlus,
    bulletSpecs: [
      { label: 'TELA LIGERA Y RESISTENTE', text: 'Comodidad y durabilidad en cada movimiento.' },
      { label: 'EXCELENTE RELACIÓN CALIDAD-PRECIO', text: 'Alta calidad que se adapta a tu presupuesto sin comprometer tu rendimiento.' },
      { label: 'SECADO RÁPIDO', text: 'La tecnología de secado rápido te mantiene fresco y listo para rendir al máximo.' },
      { label: 'BUENA TRANSPIRABILIDAD', text: 'Permite la circulación del aire y mantiene tu piel fresca durante más tiempo.' }
    ]
  },
  {
    id: 'micro-panal',
    name: 'Micro Panal',
    weight: '110 g/m²',
    composition: '100% Poliéster en Tejido de Panal',
    breathability: 'Extrema (Mejora la Ventilación)',
    elasticity: 'Alta (Material Ultraligero)',
    uvProtection: 'UPF 30+',
    bestFor: 'Corredores que exigen la máxima frescura y ligereza. Brinda una sensación fresca al correr gracias a su estructura que mejora la circulación del aire.',
    image: fabricMicroPanal,
    bulletSpecs: [
      { label: 'MEJORA LA VENTILACIÓN', text: 'Su estructura de micro panal permite una mayor circulación de aire para mantenerte fresco.' },
      { label: 'SENSACIÓN FRESCA AL CORRER', text: 'Te mantiene seco y cómodo, incluso en las mayores exigencias.' },
      { label: 'LIGERA Y CÓMODA', text: 'Material ultraligero que se adapta a tu movimiento sin restricciones.' },
      { label: 'LIGERA Y CÓMODA (Tacto suave)', text: 'Tacto suave y agradable para que te enfoques solo en tu rendimiento.' }
    ]
  },
];



export function TecnologiaPage() {
  const [selectedFabricA, setSelectedFabricA] = useState(fabrics[0].id);
  const [selectedFabricB, setSelectedFabricB] = useState(fabrics[1].id);

  const fabricA = fabrics.find((f) => f.id === selectedFabricA) || fabrics[0];
  const fabricB = fabrics.find((f) => f.id === selectedFabricB) || fabrics[1];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-44 pb-20 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] mb-6 text-black select-none">
            Telas para cada tipo de evento
          </h1>
        </div>
      </section>

      {/* Fabric Gallery */}
      <section id="tejidos" className="py-24 bg-white text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-16 border-b border-neutral-200 pb-10">
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase text-black">
              CATÁLOGO DE TEJIDOS PREMIUM
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fabrics.map((fabric, i) => (
              <ScrollReveal key={fabric.id} delay={i * 0.1} direction="up" className="h-full">
                <Card3DTilt className="h-full">
                  <div className="bg-white border border-black flex flex-col h-full group hover:scale-102 transition-transform duration-300 rounded-none relative overflow-hidden">
                    <div className="aspect-square bg-neutral-100 overflow-hidden relative border-b border-neutral-200 rounded-none">
                      <ImageWithFallback
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-full object-cover img-bw-high-contrast"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6 relative flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading font-black text-xl uppercase text-black mb-6">
                          {fabric.name}
                        </h3>
                        <div className="space-y-5">
                          {fabric.bulletSpecs.map((spec, idx) => (
                            <div key={idx} className="flex gap-3 items-start text-xs leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-[#FF6663] rounded-full shrink-0 mt-1.5" />
                              <div>
                                <h4 className="text-black font-bold text-[10px] tracking-wider uppercase mb-0.5">
                                  {spec.label}
                                </h4>
                                <p className="text-neutral-500 font-medium">
                                  {spec.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hover state overlay */}
                      <div className="absolute inset-0 bg-black text-white p-6 opacity-0 pointer-events-none group-hover:pointer-events-auto translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-start z-20">
                        <h3 className="font-heading font-black text-xl uppercase text-white mb-6">
                          {fabric.name}
                        </h3>
                        <span className="text-[10px] tracking-[0.2em] text-[#FF6663] font-bold uppercase block mb-3">
                          Ideal para:
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                          {fabric.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card3DTilt>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Comparator */}
      <section id="comparador" className="py-24 bg-white text-black border-b border-neutral-200 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase">
              COMPARADOR TEXTIL
            </h2>
            <p className="text-[#4B5563] text-base mt-4 leading-relaxed">
              Selecciona dos telas para analizar sus especificaciones de forma paralela.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Fabric Selectors - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              {/* Selector A */}
              <div className="border border-black p-5 bg-white rounded-none">
                <label className="text-xs font-bold text-[#4B5563] uppercase tracking-wider block mb-3">
                  Tela Principal (A)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabricA(f.id)}
                      disabled={f.id === selectedFabricB}
                      className={`p-3 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ease-out rounded-none ${
                        selectedFabricA === f.id
                          ? 'bg-black text-white border-black shadow-[2px_2px_0px_#FF6663]'
                          : f.id === selectedFabricB
                          ? 'bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                          : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                      }`}
                    >
                      {f.name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector B */}
              <div className="border border-black p-5 bg-white rounded-none">
                <label className="text-xs font-bold text-[#4B5563] uppercase tracking-wider block mb-3">
                  Tela Comparativa (B)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabricB(f.id)}
                      disabled={f.id === selectedFabricA}
                      className={`p-3 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ease-out rounded-none ${
                        selectedFabricB === f.id
                          ? 'bg-black text-white border-black shadow-[2px_2px_0px_#FF6663]'
                          : f.id === selectedFabricA
                          ? 'bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                          : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                      }`}
                    >
                      {f.name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Table - 8 cols */}
            <div className="lg:col-span-8 border border-black overflow-hidden rounded-none">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-black text-white font-heading text-sm sm:text-base tracking-wider">
                    <th className="p-4 uppercase w-1/3 rounded-none">BENEFICIO</th>
                    <th className="p-4 uppercase w-1/3 border-l border-neutral-800 rounded-none">{fabricA.name.split(' (')[0]}</th>
                    <th className="p-4 uppercase w-1/3 border-l border-neutral-800 rounded-none">{fabricB.name.split(' (')[0]}</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm font-semibold">
                  <tr className="border-b border-neutral-200">
                    <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider">Gramaje</td>
                    <td className="p-4 text-black border-l border-neutral-200">{fabricA.weight}</td>
                    <td className="p-4 text-black border-l border-neutral-200">{fabricB.weight}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider">Composición</td>
                    <td className="p-4 text-black border-l border-neutral-200">{fabricA.composition}</td>
                    <td className="p-4 text-black border-l border-neutral-200">{fabricB.composition}</td>
                  </tr>
                  {[0, 1, 2, 3].map((idx) => (
                    <tr key={idx} className="border-b border-neutral-200 last:border-0">
                      <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider text-xs leading-tight">
                        {fabricA.bulletSpecs[idx]?.label ?? '—'}
                      </td>
                      <td className="p-4 text-black border-l border-black leading-relaxed">
                        {fabricA.bulletSpecs[idx]?.text ?? '—'}
                      </td>
                      <td className="p-4 text-black border-l border-black leading-relaxed">
                        {fabricB.bulletSpecs[idx]?.text ?? '—'}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 text-[#4B5563] bg-neutral-50 font-bold uppercase tracking-wider">Uso Ideal</td>
                    <td className="p-4 text-neutral-600 border-l border-black leading-relaxed">{fabricA.bestFor}</td>
                    <td className="p-4 text-neutral-600 border-l border-black leading-relaxed">{fabricB.bestFor}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>




      {/* CTA bottom */}
      <section className="py-24 bg-white text-black text-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <ScrollReveal direction="up">
            <h3 className="font-heading font-black text-4xl sm:text-5xl uppercase mb-4">
              ¿Listo para evaluar la textura en persona?
            </h3>
            <p className="text-[#4B5563] text-sm max-w-xl mx-auto mb-8 font-medium">
              Enviamos muestrarios físicos con todas nuestras telas activas, tipos de costura y ejemplos de impresión de logotipos directo a tu oficina.
            </p>
            <PremiumButton
              to="/cotizar"
              text="SOLICITAR KIT DE MUESTRAS GRATIS"
              variant="primary"
              className="mx-auto"
            />
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
export default TecnologiaPage;
