export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    
    // Extract quote record: support Supabase Webhooks ({ record, type, table }) and direct payloads ({ record } or raw object)
    let record = body.record;
    if (!record && body.company_name) {
      record = body;
    }

    if (!record || !record.company_name || !record.email) {
      console.warn('Invalid request payload:', body);
      return res.status(400).json({ 
        error: 'Estructura de payload inválida. Se requieren campos obligatorios (company_name, email, etc.).' 
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY no definida en variables de entorno.');
      return res.status(200).json({ 
        warning: 'RESEND_API_KEY no encontrada. La cotización se registró en Supabase, pero el correo no fue despachado.' 
      });
    }

    // Destination email (sales team)
    const toEmail = process.env.SALES_EMAIL || 'ventas@sportsprint.mx';

    // Format products badges
    const rawProducts = record.products || {};
    const productLabels = {
      playeras: 'Playeras Sublimadas',
      morrales: 'Morrales Deportivos',
      medallas: 'Medallas Conmemorativas',
      kits: 'Kits Completos',
      otros: 'Otros Accesorios'
    };

    let productsBadgesHTML = '';
    if (typeof rawProducts === 'object' && !Array.isArray(rawProducts)) {
      const selected = Object.entries(rawProducts)
        .filter(([_, checked]) => Boolean(checked))
        .map(([key]) => productLabels[key] || key.toUpperCase());

      if (selected.length > 0) {
        productsBadgesHTML = selected
          .map(
            (p) =>
              `<span style="display: inline-block; background-color: #111111; color: #ffffff; padding: 4px 10px; border-radius: 3px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-right: 6px; margin-bottom: 6px; border: 1px solid #E43537;">${p}</span>`
          )
          .join('');
      } else {
        productsBadgesHTML = '<span style="color: #666666; font-style: italic;">Sin especificación</span>';
      }
    } else if (typeof rawProducts === 'string') {
      productsBadgesHTML = `<span style="font-weight: bold; color: #111111;">${rawProducts}</span>`;
    }

    // Clean phone number for WhatsApp direct link
    const cleanPhone = String(record.phone || '').replace(/\D/g, '');
    const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${record.contact_name}, nos comunicamos de SportsprintMX respecto a tu cotización.`)}` : '';

    // HTML Email template with SportsprintMX x Oxent branding
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Cotización B2B - SportsprintMX</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #18181b;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; padding: 30px 10px;">
          <tr>
            <td align="center">
              
              <!-- Container Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; background-color: #ffffff; border: 1px solid #e4e4e7; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: left;">
                
                <!-- Header with SportsprintMX x Oxent branding -->
                <tr>
                  <td style="background-color: #000000; padding: 28px 32px; border-bottom: 4px solid #E43537;">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td>
                          <span style="font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;">
                            SPORTSPRINT<span style="color: #E43537;">MX</span>
                          </span>
                          <span style="font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 1px; margin-left: 8px; text-transform: uppercase; border-left: 1px solid #3f3f46; padding-left: 8px;">
                            x OXENT
                          </span>
                        </td>
                        <td align="right">
                          <span style="background-color: #E43537; color: #ffffff; font-size: 10px; font-weight: 800; padding: 5px 10px; text-transform: uppercase; letter-spacing: 1px;">
                            COTIZACIÓN B2B
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px;">
                    
                    <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 0.5px;">
                      NUEVA SOLICITUD RECIBIDA
                    </h2>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #52525b; line-height: 1.5;">
                      Se ha registrado una solicitud de producción desde el formulario web. A continuación se muestran todos los detalles capturados:
                    </p>

                    <!-- Table of details -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e4e4e7;">
                      
                      <tr style="background-color: #fafafa; border-bottom: 1px solid #e4e4e7;">
                        <td width="38%" style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          Empresa / Evento:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #000000;">
                          ${record.company_name || 'N/A'}
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          Contacto Directo:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #18181b;">
                          ${record.contact_name || 'N/A'}
                        </td>
                      </tr>

                      <tr style="background-color: #fafafa; border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          Email Corporativo:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600;">
                          <a href="mailto:${record.email}" style="color: #E43537; text-decoration: none; font-weight: 700;">
                            ${record.email}
                          </a>
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          Teléfono (WhatsApp):
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600;">
                          <span style="color: #18181b;">${record.phone || 'N/A'}</span>
                          ${whatsappUrl ? `
                            <a href="${whatsappUrl}" target="_blank" style="margin-left: 10px; display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 2px; text-transform: uppercase;">
                              Abrir WhatsApp
                            </a>
                          ` : ''}
                        </td>
                      </tr>

                      <tr style="background-color: #fafafa; border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          Volumen Estimado:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 800; color: #000000;">
                          ${record.volume || 'N/A'} piezas
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          Fecha del Evento:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #18181b;">
                          ${record.event_date || 'Sin fecha definida'}
                        </td>
                      </tr>

                      <tr style="background-color: #fafafa; border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">
                          Productos Requeridos:
                        </td>
                        <td style="padding: 12px 16px;">
                          ${productsBadgesHTML}
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                          ¿Cuenta con Diseño?:
                        </td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; text-transform: uppercase; color: ${record.has_design === 'si' ? '#15803d' : '#b45309'};">
                          ${record.has_design === 'si' ? '✓ Sí, adjuntó archivo' : 'No, requiere apoyo de diseño'}
                        </td>
                      </tr>

                      ${record.design_file_url ? `
                      <tr style="background-color: #fef2f2; border-bottom: 1px solid #e4e4e7;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.5px;">
                          Archivo de Diseño:
                        </td>
                        <td style="padding: 12px 16px;">
                          <a href="${record.design_file_url}" target="_blank" style="display: inline-block; background-color: #E43537; color: #ffffff; font-weight: 800; font-size: 11px; text-decoration: none; padding: 8px 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Descargar Arte Adjunto
                          </a>
                        </td>
                      </tr>
                      ` : ''}

                      <tr>
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; uppercase; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; background-color: #fafafa;">
                          Comentarios / Notas:
                        </td>
                        <td style="padding: 12px 16px; font-size: 13px; color: #27272a; line-height: 1.5; white-space: pre-wrap; background-color: #fafafa;">
                          ${record.comments ? record.comments : '<span style="color: #9ca3af; font-style: italic;">Sin comentarios adicionales.</span>'}
                        </td>
                      </tr>

                    </table>

                    <!-- Quick Action Bar -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px; background-color: #000000; padding: 20px; border-left: 4px solid #E43537;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase;">
                            Acción Recomendada:
                          </p>
                          <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
                            Responder directamente a <a href="mailto:${record.email}" style="color: #ffffff; text-decoration: underline;">${record.email}</a> o contactar por WhatsApp.
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #fafafa; padding: 20px 32px; border-top: 1px solid #e4e4e7; font-size: 11px; color: #71717a; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #18181b;">
                      SportsprintMX — Manufactura & Sublimación Industrial
                    </p>
                    <p style="margin: 0; font-size: 10px; color: #a1a1aa;">
                      Notificación automática del sistema de cotizaciones B2B | Oxent Platform
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Sender email
    const fromEmail = process.env.SENDER_EMAIL || 'Sports Print MX <onboarding@resend.dev>';

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `[Cotización B2B] ${record.company_name} - ${record.contact_name} (${record.volume} pzs)`,
        html: htmlContent
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error en respuesta de Resend API:', data);
      return res.status(response.status).json({ 
        error: 'Error enviando correo a través de Resend', 
        details: data 
      });
    }

    console.log('Correo de cotización enviado exitosamente. ID Resend:', data.id);
    return res.status(200).json({ success: true, messageId: data.id });

  } catch (error) {
    console.error('Error interno procesando webhook/email:', error);
    return res.status(500).json({ error: 'Error interno en el servidor', message: error.message });
  }
}

