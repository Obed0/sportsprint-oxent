import { useState, useRef, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { ShieldCheck, MessageSquare, Clock, FileCheck, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react';
import { PremiumButton } from '../components/ui/PremiumAnimations';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import { es } from 'date-fns/locale';
import { supabase } from '../lib/supabase';

export function CotizarPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasDesign, setHasDesign] = useState<string>('');
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    volume: '500-1000',
    eventDate: '',
    products: {
      playeras: false,
      morrales: false,
      medallas: false,
      kits: false,
      otros: false,
    },
    comments: '',
  });

  const formContainerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the confirmation/success message when form is submitted
  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80); // Small timeout to ensure DOM layout recalculation
    }
  }, [formSubmitted]);

  const handleResetForm = () => {
    setFormSubmitted(false);
    setHasDesign('');
    setDesignFile(null);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      volume: '500-1000',
      eventDate: '',
      products: {
        playeras: false,
        morrales: false,
        medallas: false,
        kits: false,
        otros: false,
      },
      comments: '',
    });
    // Scroll back to the top of the form smoothly
    setTimeout(() => {
      formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (productKey: keyof typeof formData.products) => {
    setFormData((prev) => ({
      ...prev,
      products: {
        ...prev.products,
        [productKey]: !prev.products[productKey],
      },
    }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setFormData((prev) => ({ ...prev, eventDate: `${year}-${month}-${day}` }));
    } else {
      setFormData((prev) => ({ ...prev, eventDate: '' }));
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'dd/mm/aaaa';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check products selection
    const hasProduct = Object.values(formData.products).some((val) => val === true);
    if (!hasProduct) {
      setError('Por favor selecciona al menos un producto a cotizar.');
      return;
    }

    // Validate phone number format (at least 10 digits)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Por favor ingresa un número de teléfono de 10 dígitos válido.');
      return;
    }

    if (!formData.eventDate) {
      setError('Por favor selecciona la fecha del evento.');
      return;
    }

    if (!hasDesign) {
      setError('Por favor indica si cuentas con diseño/arte para sublimar.');
      return;
    }

    if (hasDesign === 'si' && !designFile) {
      setError('Por favor sube tu archivo de diseño/arte para continuar.');
      return;
    }

    setError(null);
    setSubmitting(true);
    setUploadProgress('Iniciando envío...');

    try {
      let designFileUrl = '';

      // 1. Upload design file to Supabase Storage if present
      if (hasDesign === 'si' && designFile) {
        setUploadProgress('Subiendo archivo de diseño...');
        
        // Generate a unique file name to avoid collisions
        const fileExt = designFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `quote-designs/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('designs')
          .upload(filePath, designFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error(`Error al subir el diseño: ${uploadError.message}`);
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('designs')
          .getPublicUrl(filePath);

        designFileUrl = publicUrlData.publicUrl;
      }

      // 2. Insert record into database table 'quotes'
      setUploadProgress('Guardando solicitud de cotización...');
      const { error: dbError } = await supabase.from('quotes').insert([
        {
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          volume: formData.volume,
          event_date: formData.eventDate,
          products: formData.products,
          has_design: hasDesign,
          design_file_url: designFileUrl,
          comments: formData.comments,
        }
      ]);

      if (dbError) {
        throw new Error(`Error al guardar en la base de datos: ${dbError.message}`);
      }

      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting B2B quote:', err);
      setError(err.message || 'Ocurrió un error inesperado al procesar tu solicitud. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
      setUploadProgress(null);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hola Sports Print MX, quiero cotizar un lote de kits deportivos para mi evento. Volumen estimado: ${formData.volume} piezas.`
    );
    const url = `https://wa.me/525543945069?text=${message}`;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <PageTransition>
      <section className="pt-44 pb-24 bg-white text-black min-h-screen select-none">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: B2B Copy & Trust Signs */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-5xl xl:text-7xl tracking-tight leading-[0.95] uppercase mb-8 text-black">
                SOLICITA TU <br />
                <span className="text-black hover:text-sp-accent transition-colors duration-300">
                  COTIZACIÓN
                </span>
              </h1>

              {/* Trust signals */}
              <div className="space-y-6 border-t border-black/10 pt-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-black bg-white flex items-center justify-center shrink-0 rounded-none">
                    <FileCheck size={18} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Muestrario Opcional
                    </h3>
                    <p className="text-[#4B5563] text-xs mt-1 font-medium">
                      Solicita muestras físicas sin costo directamente en tus oficinas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-black bg-white flex items-center justify-center shrink-0 rounded-none">
                    <ShieldCheck size={18} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Garantía de Entrega
                    </h3>
                    <p className="text-[#4B5563] text-xs mt-1 font-medium">
                      Entregas puntuales y respaldadas bajo contrato formal.
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Callout */}
              <div className="mt-12 p-6 bg-white border border-black flex flex-col sm:flex-row items-center justify-between gap-4 rounded-none">
                <div className="flex items-center gap-3">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-6.5 h-6.5 text-[#25D366] fill-[#25D366] shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.37 5.054L2 22l5.132-1.347a9.936 9.936 0 0 0 4.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0 0 12.012 2zm5.72 13.94c-.244.688-1.22 1.343-1.687 1.41-.397.056-.917.1-2.656-.626-2.222-.926-3.64-3.19-3.75-3.34-.112-.149-.912-1.213-.912-2.31 0-1.096.575-1.637.78-1.86.205-.224.446-.279.596-.279.15 0 .298.002.428.008.135.006.318-.052.497.38.186.448.634 1.547.69 1.66.056.112.093.242.019.39-.074.15-.112.242-.224.372-.112.13-.235.29-.335.39-.112.112-.229.233-.099.456.13.223.578.953 1.24 1.543.854.76 1.572.996 1.796 1.108.223.112.353.093.483-.056.13-.15.558-.65.707-.873.15-.223.298-.186.496-.112.2.075 1.265.596 1.482.707.217.112.36.168.41.254.05.087.05.503-.194 1.19z" />
                  </svg>
                  <div>
                    <span className="text-xs font-bold uppercase text-black block">¿Prefieres cotizar vía WhatsApp?</span>
                    <span className="text-[10px] text-[#4B5563] font-semibold">Atención inmediata</span>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-black hover:bg-neutral-800 text-white text-[10px] font-bold tracking-widest uppercase px-5 py-3 transition-colors shrink-0 rounded-none border border-black"
                >
                  HABLAR CON ASESOR
                </button>
              </div>

            </div>

            {/* Right Column: Form Area */}
            <div ref={formContainerRef} className="lg:col-span-7 bg-white border border-black p-8 sm:p-10 shadow-none rounded-none relative">
              {formSubmitted ? (
                <ScrollReveal direction="none">
                  <div className="text-center py-16 flex flex-col items-center">
                    <CheckCircle2 size={56} className="text-black mb-6" />
                    <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-black mb-4 select-none">
                      ¡SOLICITUD RECIBIDA!
                    </h2>
                    <p className="text-[#4B5563] text-sm leading-relaxed max-w-md mx-auto mb-8 font-medium">
                      Tu solicitud de cotización comercial ha sido registrada. Un especialista de Sports Print se pondrá en contacto contigo en las próximas horas para validar los detalles de tu evento.
                    </p>
                    <button
                      onClick={handleResetForm}
                      className="bg-black text-white hover:bg-neutral-800 text-xs font-bold tracking-widest uppercase px-6 py-3 transition-all rounded-none border border-black"
                    >
                      ENVIAR OTRA SOLICITUD
                    </button>
                  </div>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-heading font-black text-2xl uppercase text-black border-b border-black pb-4 mb-6 select-none">
                    FORMULARIO DE PRODUCCIÓN INDUSTRIAL
                  </h2>

                  {error && (
                    <div className="border border-red-500 bg-red-50 p-4 text-xs font-bold text-red-600 uppercase tracking-wider rounded-none flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Event Name */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                        Empresa u Organizador del Evento *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Ej. Maratón Monterrey 2026"
                        className="bg-white border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none"
                      />
                    </div>

                    {/* Contact Name */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                        Nombre del Contacto Directo *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Ej. Lic. Claudia Salinas"
                        className="bg-white border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                        Email Corporativo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ej. compras@eventosmasivos.mx"
                        className="bg-white border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                        Teléfono Móvil (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ej. 55 9876 5432"
                        className="bg-white border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none"
                      />
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-3">
                      Volumen Estimado (Piezas) *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: '500-1000', label: '500 a 1,000' },
                        { value: '1000-5000', label: '1,000 a 5,000' },
                        { value: '5000-10000', label: '5,000 a 10,000' },
                        { value: '10000+', label: '10,000+' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, volume: opt.value }))}
                          className={`p-3.5 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-200 rounded-none ${
                            formData.volume === opt.value
                              ? 'bg-black text-white border-black shadow-[2px_2px_0px_#E43537]'
                              : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Event Date */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                      Fecha del Evento *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="bg-white border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-none text-left flex items-center justify-between w-full cursor-pointer hover:bg-neutral-50"
                        >
                          <span className={formData.eventDate ? 'text-black font-semibold' : 'text-neutral-400'}>
                            {formData.eventDate ? formatDisplayDate(formData.eventDate) : 'dd/mm/aaaa'}
                          </span>
                          <CalendarIcon size={16} className="text-[#4B5563]" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-auto bg-white border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-none z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.eventDate ? new Date(formData.eventDate + 'T00:00:00') : undefined}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          locale={es}
                          initialFocus
                          className="rounded-none bg-white border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Products */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-3">
                      Productos a Cotizar (Selecciona todos los que apliquen)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2.5 p-3 bg-white border border-black cursor-pointer hover:bg-neutral-50 transition-colors rounded-none">
                        <input
                          type="checkbox"
                          checked={formData.products.playeras}
                          onChange={() => handleCheckboxChange('playeras')}
                          className="w-4 h-4 accent-black rounded-none"
                        />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Playeras</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-3 bg-white border border-black cursor-pointer hover:bg-neutral-50 transition-colors rounded-none">
                        <input
                          type="checkbox"
                          checked={formData.products.morrales}
                          onChange={() => handleCheckboxChange('morrales')}
                          className="w-4 h-4 accent-black rounded-none"
                        />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Morrales</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-3 bg-white border border-black cursor-pointer hover:bg-neutral-50 transition-colors rounded-none">
                        <input
                          type="checkbox"
                          checked={formData.products.medallas}
                          onChange={() => handleCheckboxChange('medallas')}
                          className="w-4 h-4 accent-black rounded-none"
                        />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Medallas Conmemorativas</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-3 bg-white border border-black cursor-pointer hover:bg-neutral-50 transition-colors rounded-none">
                        <input
                          type="checkbox"
                          checked={formData.products.kits}
                          onChange={() => handleCheckboxChange('kits')}
                          className="w-4 h-4 accent-black rounded-none"
                        />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Kits Completos</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-3 bg-white border border-black cursor-pointer hover:bg-neutral-50 transition-colors rounded-none col-span-2 sm:col-span-1">
                        <input
                          type="checkbox"
                          checked={formData.products.otros}
                          onChange={() => handleCheckboxChange('otros')}
                          className="w-4 h-4 accent-black rounded-none"
                        />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Otros Accesorios</span>
                      </label>
                    </div>
                  </div>

                  {/* ¿Cuentas con diseño/arte? */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-3">
                      ¿Cuentas con diseño/arte para sublimar? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setHasDesign('no');
                          setDesignFile(null);
                        }}
                        className={`p-3.5 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-200 rounded-none ${
                          hasDesign === 'no'
                            ? 'bg-black text-white border-black shadow-[2px_2px_0px_#E43537]'
                            : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                        }`}
                      >
                        No, necesito apoyo
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasDesign('si')}
                        className={`p-3.5 text-xs font-bold uppercase tracking-wider text-center border transition-all duration-200 rounded-none ${
                          hasDesign === 'si'
                            ? 'bg-black text-white border-black shadow-[2px_2px_0px_#E43537]'
                            : 'bg-white text-black border-black hover:bg-neutral-50 hover:scale-[1.02]'
                        }`}
                      >
                        Sí, cuento con diseño
                      </button>
                    </div>

                    {hasDesign === 'si' && (
                      <div className="mt-4 p-5 border border-dashed border-black bg-neutral-50 flex flex-col items-center justify-center gap-3 rounded-none animate-fade-in">
                        <span className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider text-center block">
                          Formatos: JPG, PNG, PDF, AI, PSD (Máx. 10MB)
                        </span>
                        <input
                          type="file"
                          id="design-file-upload"
                          accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              const file = e.target.files[0];
                              if (file.size > 10 * 1024 * 1024) {
                                setError('El archivo supera el tamaño máximo permitido de 10MB.');
                                setDesignFile(null);
                              } else {
                                setError(null);
                                setDesignFile(file);
                              }
                            }
                          }}
                        />
                        <label
                          htmlFor="design-file-upload"
                          className="bg-black text-white hover:bg-neutral-800 text-[10px] font-bold tracking-widest uppercase px-5 py-3 cursor-pointer transition-colors rounded-none border border-black"
                        >
                          Seleccionar Archivo
                        </label>
                        {designFile ? (
                          <span className="text-[11px] font-bold text-black uppercase tracking-wider mt-1 text-center">
                            ✓ {designFile.name} ({(designFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider text-center">
                            Ningún archivo seleccionado
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Comments */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                      Requerimientos de Diseño y Comentarios Adicionales
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Ej. Requerimos costura Flatlock de hilo reflectivo 3M..."
                      className="bg-white border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none rounded-none"
                    />
                  </div>

                  {/* Submit button */}
                  <PremiumButton
                    type="submit"
                    text={submitting ? (uploadProgress || "PROCESANDO...") : "SOLICITAR PRESUPUESTO"}
                    variant="primary"
                    fullWidth
                    animatedBorder
                    disabled={submitting}
                  />

                  <span className="text-[10px] text-[#4B5563] block text-center mt-2 font-semibold">
                    * Al enviar aceptas recibir una propuesta comercial vía correo electrónico o llamada telefónica.
                  </span>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </PageTransition>
  );
}
export default CotizarPage;
