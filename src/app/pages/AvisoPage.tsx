import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';

export function AvisoPage() {
  return (
    <PageTransition>
      <section className="pt-44 pb-24 bg-white text-black min-h-screen select-none">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <ScrollReveal duration={0.6} direction="up">
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none uppercase mb-10 text-black text-center">
              AVISO DE PRIVACIDAD
            </h1>
          </ScrollReveal>

          <ScrollReveal duration={0.6} delay={0.1} direction="up" className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-8 font-medium">
            <p className="text-justify">
              <strong>SPORTS PRINT MX</strong>, en adelante <strong>“SPORTS PRINT”</strong>, es responsable del tratamiento de los datos personales que usted proporcione a través de nuestro sitio web, formularios de contacto, redes sociales, WhatsApp, correo electrónico o cualquier otro medio de comunicación relacionado con nuestros productos y servicios.
            </p>
            <p className="text-justify">
              El presente Aviso de Privacidad tiene como finalidad informarle qué datos personales recabamos, para qué los utilizamos, cómo los protegemos y cuáles son los medios disponibles para ejercer sus derechos sobre dichos datos.
            </p>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                1. Datos personales que recabamos
              </h2>
              <p className="text-justify">
                SPORTS PRINT podrá recabar los siguientes datos personales:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 font-semibold">
                <li>Nombre</li>
                <li>Apellido</li>
                <li>Teléfono</li>
                <li>Correo electrónico</li>
                <li>Empresa, organización o evento, en caso de que el titular lo proporcione</li>
                <li>Especificaciones del pedido o proyecto</li>
                <li>Tipo de producto solicitado</li>
                <li>Cantidades aproximadas</li>
                <li>Fechas estimadas de entrega</li>
                <li>Comentarios, referencias, archivos o información adicional que el titular preocupe voluntariamente para cotización o seguimiento</li>
              </ul>
              <p className="text-justify text-neutral-500 text-xs italic">
                SPORTS PRINT no recaba datos personales sensibles a través de su sitio web.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                2. Finalidades del tratamiento de datos personales
              </h2>
              <p className="text-justify">
                Los datos personales que recabamos serán utilizados para las siguientes finalidades primarias, necesarias para atender la solicitud del titular:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 font-semibold">
                <li>Registrar su solicitud de información, cotización o contacto.</li>
                <li>Integrar sus datos en nuestra base de prospectos o clientes.</li>
                <li>Contactarle por teléfono, correo electrónico, WhatsApp u otros medios proporcionados.</li>
                <li>Dar seguimiento a solicitudes relacionadas con productos, telas, materiales, diseños, pedidos, cotizaciones, tiempos de entrega y disponibilidad.</li>
                <li>Elaborar propuestas comerciales o cotizaciones personalizadas.</li>
                <li>Canalizar su solicitud con un asesor comercial para brindarle atención.</li>
                <li>Mantener comunicación relacionada con el proceso de venta, producción, entrega o servicio postventa.</li>
                <li>Dar cumplimiento a obligaciones legales, fiscales, administrativas o contractuales, cuando resulte aplicable.</li>
              </ul>
              
              <p className="text-justify pt-2">
                De manera adicional, sus datos podrán ser utilizados para finalidades secundarias, que no son indispensables para atender su solicitud, pero que nos permiten mejorar nuestra comunicación comercial:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 font-semibold">
                <li>Enviar información sobre productos, promociones, lanzamientos, novedades, catálogos, materiales, telas o servicios de SPORTS PRINT.</li>
                <li>Realizar seguimiento comercial posterior a una cotización.</li>
                <li>Conocer la experiencia del cliente y mejorar nuestros procesos de atención.</li>
                <li>Generar estadísticas internas sobre solicitudes, productos de interés y necesidades de clientes.</li>
              </ul>
              <p className="text-justify pt-2">
                En caso de que no desee que sus datos sean utilizados para finalidades secundarias, podrá manifestarlo enviando un correo electrónico a:{' '}
                <a href="mailto:admin@sportsprintmx.com" className="text-black underline font-bold hover:text-neutral-700">
                  admin@sportsprintmx.com
                </a>
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                3. Transferencia de datos personales
              </h2>
              <p className="text-justify">
                SPORTS PRINT no venderá, rentará ni comercializará sus datos personales con terceros.
              </p>
              <p className="text-justify">
                Sus datos personales podrán ser compartidos únicamente cuando sea necesario para cumplir con las finalidades descritas en este Aviso de Privacidad, por ejemplo, con asesores internos, personal administrativo, proveedores de sistemas, servicios de mensajería, plataformas tecnológicas, herramientas de CRM, servicios de correo electrónico, servicios de almacenamiento o proveedores relacionados con la operación comercial y atención al cliente.
              </p>
              <p className="text-justify">
                Asimismo, SPORTS PRINT podrá transferir sus datos cuando exista una obligación legal, requerimiento de autoridad competente o cuando sea necesario para la defensa de derechos de la empresa.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                4. Protección y conservación de los datos personales
              </h2>
              <p className="text-justify">
                SPORTS PRINT implementará medidas administrativas, técnicas y físicas razonables para proteger los datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado.
              </p>
              <p className="text-justify">
                Los datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades señaladas en este Aviso de Privacidad, así como para atender obligaciones legales, administrativas, fiscales o comerciales que resulten aplicables.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                5. Derechos ARCO
              </h2>
              <p className="text-justify">
                Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales, conocidos como derechos ARCO.
              </p>
              <p className="text-justify mb-2">
                Para ejercer cualquiera de estos derechos, podrá enviar una solicitud al correo electrónico:{' '}
                <a href="mailto:admin@sportsprintmx.com" className="text-black underline font-bold hover:text-neutral-700">
                  admin@sportsprintmx.com
                </a>, indicando:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 font-semibold">
                <li>Nombre completo del titular.</li>
                <li>Medio de contacto para comunicar la respuesta.</li>
                <li>Derecho que desea ejercer: acceso, rectificación, cancelación u oposición.</li>
                <li>Descripción clara de los datos personales respecto de los cuales desea ejercer el derecho.</li>
                <li>Documento que acredite su identidad o, en su caso, la representación legal.</li>
                <li>Cualquier información adicional que facilite la localización de sus datos.</li>
              </ul>
              <p className="text-justify pt-2">
                SPORTS PRINT dará respuesta a su solicitud dentro de los plazos establecidos por la legislación aplicable en materia de protección de datos personales.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                6. Revocación del consentimiento y limitación de uso
              </h2>
              <p className="text-justify">
                Usted podrá revocar el consentimiento otorgado para el tratamiento de sus datos personales o solicitar que se limite el uso o divulgación de los mismos, enviando una solicitud al correo electrónico:{' '}
                <a href="mailto:admin@sportsprintmx.com" className="text-black underline font-bold hover:text-neutral-700">
                  admin@sportsprintmx.com
                </a>
              </p>
              <p className="text-justify">
                La revocación del consentimiento no tendrá efectos retroactivos y podrá estar limitada cuando exista una obligación legal, contractual o administrativa que requiera conservar cierta información.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                7. Uso de cookies y tecnologías similares
              </h2>
              <p className="text-justify">
                El sitio web de SPORTS PRINT podrá utilizar cookies, formularios, herramientas de análisis, píxeles de seguimiento o tecnologías similares para mejorar la experiencia de navegación, conocer el comportamiento general de los usuarios dentro del sitio, medir el desempeño de campañas publicitarias y facilitar el contacto con clientes potenciales.
              </p>
              <p className="text-justify font-bold text-neutral-500">
                El usuario puede configurar su navegador para bloquear, eliminar o recibir alertas sobre el uso de cookies. Sin embargo, algunas funciones del sitio podrían verse limitadas.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                8. Datos proporcionados por menores de edad
              </h2>
              <p className="text-justify">
                El sitio web de SPORTS PRINT está dirigido a personas mayores de edad, empresas, instituciones, organizadores de eventos o personas interesadas en solicitar productos personalizados. SPORTS PRINT no recaba intencionalmente datos personales de menores de edad.
              </p>
              <p className="text-justify">
                En caso de que un padre, madre o tutor considere que un menor de edad ha proporcionado datos personales, podrá solicitar su eliminación a través del correo:{' '}
                <a href="mailto:admin@sportsprintmx.com" className="text-black underline font-bold hover:text-neutral-700">
                  admin@sportsprintmx.com
                </a>
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider pl-3 border-l-2 border-[#E43537]">
                9. Cambios al Aviso de Privacidad
              </h2>
              <p className="text-justify">
                SPORTS PRINT podrá modificar, actualizar o cambiar el presente Aviso de Privacidad en cualquier momento, derivado de cambios legales, internos, comerciales, operativos o por la incorporación de nuevos productos, servicios o herramientas tecnológicas.
              </p>
              <p className="text-justify font-bold text-[#E43537]">
                Cualquier modificación será publicada en el sitio web oficial de SPORTS PRINT MX.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default AvisoPage;
