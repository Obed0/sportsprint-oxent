import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';

export function TerminosPage() {
  return (
    <PageTransition>
      <section className="pt-44 pb-24 bg-white text-black min-h-screen select-none">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <ScrollReveal duration={0.6} direction="up">
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none uppercase mb-10 text-black text-center">
              TÉRMINOS COMERCIALES
            </h1>
          </ScrollReveal>

          <ScrollReveal duration={0.6} delay={0.1} direction="up" className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-8 font-medium">
            <p className="text-justify">
              Los presentes Términos Comerciales regulan el uso del sitio web de <strong>Sports Print MX</strong>, así como las solicitudes de información, cotización y contratación de productos personalizados realizadas a través de nuestros formularios, WhatsApp, correo electrónico, redes sociales o cualquier otro medio de contacto oficial.
            </p>
            <p className="text-justify">
              El sitio web de Sports Print MX tiene como finalidad presentar información general sobre los productos que fabricamos, tales como artículos deportivos, textiles personalizados, playeras, medallas, morrales, telas, materiales y otros productos relacionados. La información publicada en el sitio es de carácter informativo y comercial, por lo que no constituye por sí misma una cotización formal ni una confirmación de pedido.
            </p>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                1. Solicitudes de información y cotización
              </h2>
              <p className="text-justify">
                Al registrar sus datos en el sitio web, el usuario autoriza a Sports Print MX a utilizar la información proporcionada para dar seguimiento a su solicitud, integrar su información en nuestra base de datos comercial y permitir que un asesor lo contacte lo antes posible.
              </p>
              <p className="text-justify">
                El registro de datos en el sitio web no implica la aceptación automática de un pedido ni obliga a Sports Print MX a iniciar producción, apartar materiales, respetar fechas de entrega o mantener precios sin una cotización formal previamente emitida y aceptada por escrito.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                2. Cotizaciones
              </h2>
              <p className="text-justify">
                Toda cotización emitida por Sports Print MX deberá ser revisada y aprobada por el cliente antes de iniciar cualquier proceso de producción.
              </p>
              <p className="text-justify">
                Los precios, materiales, cantidades y especificaciones finales serán los establecidos en la cotización correspondiente.
              </p>
              <p className="text-justify font-bold text-neutral-600">
                Salvo que se indique lo contrario por escrito, las cotizaciones estarán sujetas a disponibilidad de materiales, capacidad de producción, validación de archivos, confirmación de anticipo y aprobación final del diseño.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                3. Términos aplicables a cotizaciones y pedidos
              </h2>
              <p className="text-justify">
                Una vez emitida y aceptada una cotización, serán aplicables los siguientes términos y condiciones comerciales:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700 font-semibold">
                <li>Todos los precios están expresados en pesos mexicanos (MXN). El IVA se encuentra incluido de manera expresa en la cotización.</li>
                <li>El tiempo de producción comenzará a contar una vez confirmado el pedido por escrito y recibido el anticipo correspondiente al 50% del valor total.</li>
                <li>El saldo restante deberá ser liquidado en su totalidad contra entrega del pedido, salvo acuerdo distinto por escrito.</li>
                <li>Los archivos de diseño deberán ser entregados por el cliente en formato editable, preferentemente AI, EPS o PDF, conforme a las especificaciones técnicas indicadas.</li>
                <li>La aprobación final del diseño autoriza la producción. Sports Print MX no será responsable por errores aprobados previamente.</li>
                <li>Cambios solicitados después de la aprobación final podrán generar costos adicionales y ajustes en la entrega.</li>
                <li>Podrán existir ligeras variaciones propias del proceso de producción, las cuales no se considerarán defecto de fabricación.</li>
                <li>Los precios cotizados consideran entrega en un solo punto dentro de la Ciudad de México. Entregas adicionales o foráneas se cotizarán por separado.</li>
                <li>Sports Print MX no será responsable por retrasos derivados de causas ajenas a su operación, como demoras de proveedores, mensajería, clima o fuerza mayor.</li>
                <li>El cliente tendrá 2 días hábiles para reportar por escrito cualquier defecto visible, faltante o inconsistencia. Después, se entenderá recibido de conformidad.</li>
                <li>En caso de cancelación una vez iniciada la producción, Sports Print MX podrá retener total o parcialmente el anticipo según materiales, avances y costos generados.</li>
              </ul>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                4. Productos personalizados
              </h2>
              <p className="text-justify">
                Los productos fabricados por Sports Print MX son elaborados conforme a las especificaciones solicitadas por cada cliente, incluyendo diseño, tallas, colores, materiales, cantidades, fechas y características particulares.
              </p>
              <p className="text-justify font-bold text-neutral-600">
                Por tratarse de productos personalizados, los cambios, devoluciones o cancelaciones estarán sujetos al avance del pedido, compra de materiales, procesos iniciados y condiciones establecidas en la cotización correspondiente.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                5. Imágenes, muestras y referencias visuales
              </h2>
              <p className="text-justify">
                Las imágenes, fotografías, renders, mockups, catálogos, fichas técnicas y ejemplos publicados en el sitio web son únicamente referenciales y pueden presentar variaciones respecto al producto final.
              </p>
              <p className="text-justify">
                Los colores, texturas, acabados, proporciones y materiales pueden variar dependiendo de la pantalla del usuario, disponibilidad de insumos, procesos de impresión, sublimación, confección o fabricación.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                6. Tiempos de entrega
              </h2>
              <p className="text-justify">
                Los tiempos de producción y entrega serán confirmados en cada cotización. Dichos tiempos comenzarán a contar únicamente cuando el pedido haya sido confirmado por escrito, se haya recibido el anticipo correspondiente y el diseño haya sido aprobado para producción.
              </p>
              <p className="text-justify">
                Cualquier retraso en la entrega de archivos, aprobación de diseño, pago de anticipo, confirmación de especificaciones o información necesaria por parte del cliente podrá modificar la fecha estimada de entrega.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                7. Comunicación con asesores
              </h2>
              <p className="text-justify">
                Sports Print MX podrá contactar al cliente a través de los medios proporcionados, incluyendo teléfono, correo electrónico, WhatsApp u otros canales digitales, con la finalidad de atender solicitudes, resolver dudas, enviar cotizaciones, confirmar información del pedido y dar seguimiento comercial.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                8. Limitación de responsabilidad
              </h2>
              <p className="text-justify">
                Sports Print MX no será responsable por errores derivados de información incorrecta, incompleta o no actualizada proporcionada por el cliente, incluyendo datos de contacto, especificaciones del pedido, archivos, diseños, cantidades, tallas, fechas o direcciones de entrega.
              </p>
              <p className="text-justify font-bold text-neutral-700">
                El cliente será responsable de revisar cuidadosamente la cotización, archivos, diseños, cantidades, tallas, materiales y condiciones antes de aprobar el inicio de producción.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                9. Modificaciones a los Términos Comerciales
              </h2>
              <p className="text-justify">
                Sports Print MX podrá modificar o actualizar los presentes Términos Comerciales en cualquier momento. Las modificaciones serán publicadas en este sitio web y entrarán en vigor a partir de su publicación.
              </p>
              <p className="text-justify font-bold text-[#FF6663]">
                Para pedidos ya confirmados, aplicarán las condiciones establecidas en la cotización aceptada por el cliente, salvo acuerdo distinto por escrito.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8 space-y-4">
              <h2 className="text-lg font-extrabold uppercase text-neutral-900 tracking-wider">
                10. Contacto
              </h2>
              <p className="text-justify">
                Para dudas relacionadas con estos Términos Comerciales, cotizaciones, pedidos o productos, puede contactarnos a través de los medios oficiales de Sports Print MX:
              </p>
              <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-2 text-neutral-700 font-semibold rounded-none">
                <p><strong>Firma:</strong> Sports Print MX</p>
                <p><strong>Sitio web:</strong> <a href="https://www.sportsprintmx.com" target="_blank" rel="noopener noreferrer" className="text-black underline">www.sportsprintmx.com</a></p>
                <p><strong>Correo electrónico:</strong> <a href="mailto:admin@sportsprintmx.com" className="text-black underline">admin@sportsprintmx.com</a></p>
                <p><strong>Teléfono / WhatsApp:</strong> <a href="tel:5543945069" className="text-black underline">5543945069</a></p>
                <p className="text-xs text-neutral-400 mt-2 font-normal">Última actualización: junio 2026</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default TerminosPage;
