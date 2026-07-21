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

    // Destination emails (supports multiple emails separated by commas)
    const rawSalesEmail = process.env.SALES_EMAIL || 'contacto@sportsprintmx.com, oxentsolutions@gmail.com';
    const toEmails = rawSalesEmail.split(',').map(e => e.trim()).filter(Boolean);

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
        .map(([key]) => productLabels[key] || key);

      if (selected.length > 0) {
        productsBadgesHTML = `<span style="font-size: 14px; font-weight: 600; color: #0f172a;">${selected.join(', ')}</span>`;
      } else {
        productsBadgesHTML = '<span style="color: #94a3b8; font-style: italic;">Sin especificación</span>';
      }
    } else if (typeof rawProducts === 'string') {
      productsBadgesHTML = `<span style="font-size: 14px; font-weight: 600; color: #0f172a;">${rawProducts}</span>`;
    }

    // Clean phone number for WhatsApp direct link
    const cleanPhone = String(record.phone || '').replace(/\D/g, '');
    const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${record.contact_name}, nos comunicamos de Sports Print MX respecto a tu solicitud.`)}` : '';

    // HTML Email template - Clean & Minimalist Design
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solicitud Nueva - Sports Print MX</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 40px 12px;">
          <tr>
            <td align="center">
              
              <!-- Container Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05); text-align: left;">
                
                <!-- Clean Minimal Header -->
                <tr>
                  <td style="background-color: #000000; padding: 24px 32px; text-align: center; border-bottom: 3px solid #E43537;">
                    <span style="font-size: 20px; font-weight: 900; letter-spacing: 2.5px; color: #ffffff; text-transform: uppercase;">
                      SPORTS PRINT <span style="color: #E43537;">MX</span>
                    </span>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    
                    <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.2px;">
                      NUEVA SOLICITUD RECIBIDA
                    </h2>
                    <p style="margin: 0 0 28px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                      Se ha registrado una nueva solicitud desde el formulario web. A continuación se presentan los detalles:
                    </p>

                    <!-- Table of details -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; margin-bottom: 28px; border: 1px solid #f1f5f9; border-radius: 6px; overflow: hidden;">
                      
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #f1f5f9;">
                        <td width="40%" style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          Empresa / Evento:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0f172a;">
                          ${record.company_name || 'N/A'}
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          Contacto Directo:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #334155;">
                          ${record.contact_name || 'N/A'}
                        </td>
                      </tr>

                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          Email Corporativo:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600;">
                          <a href="mailto:${record.email}" style="color: #E43537; text-decoration: none; font-weight: 700;">
                            ${record.email}
                          </a>
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          Teléfono (WhatsApp):
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600;">
                          <span style="color: #334155;">${record.phone || 'N/A'}</span>
                          ${whatsappUrl ? `
                            <a href="${whatsappUrl}" target="_blank" style="margin-left: 10px; display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                              WhatsApp
                            </a>
                          ` : ''}
                        </td>
                      </tr>

                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          Volumen Estimado:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 800; color: #0f172a;">
                          ${record.volume || 'N/A'} piezas
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          Fecha del Evento:
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #334155;">
                          ${record.event_date || 'Sin fecha definida'}
                        </td>
                      </tr>

                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">
                          Productos Requeridos:
                        </td>
                        <td style="padding: 12px 16px;">
                          ${productsBadgesHTML}
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                          ¿Cuenta con Diseño?:
                        </td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; text-transform: uppercase; color: ${record.has_design === 'si' ? '#16a34a' : '#d97706'};">
                          ${record.has_design === 'si' ? '✓ Sí, adjuntó archivo' : 'No, requiere apoyo de diseño'}
                        </td>
                      </tr>

                      ${record.design_file_url ? `
                      <tr style="background-color: #fef2f2; border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px;">
                          Archivo de Diseño:
                        </td>
                        <td style="padding: 12px 16px;">
                          <a href="${record.design_file_url}" target="_blank" style="display: inline-block; background-color: #E43537; color: #ffffff; font-weight: 700; font-size: 11px; text-decoration: none; padding: 6px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Descargar Arte Adjunto
                          </a>
                        </td>
                      </tr>
                      ` : ''}

                      <tr>
                        <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; background-color: #f8fafc;">
                          Comentarios / Notas:
                        </td>
                        <td style="padding: 12px 16px; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap; background-color: #f8fafc;">
                          ${record.comments ? record.comments : '<span style="color: #94a3b8; font-style: italic;">Sin comentarios adicionales.</span>'}
                        </td>
                      </tr>

                    </table>

                    <!-- Minimalist Quick Action Bar -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; border-radius: 6px; padding: 16px 20px; border-left: 4px solid #E43537;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">
                            Acción Recomendada:
                          </p>
                          <p style="margin: 0; font-size: 13px; color: #ffffff;">
                            Responder directamente a <a href="mailto:${record.email}" style="color: #ffffff; text-decoration: underline; font-weight: 600;">${record.email}</a> o contactar por WhatsApp.
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Minimalist Footer with Oxent Credit -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                    <p style="margin: 0 0 6px 0; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                      Sports Print MX
                    </p>
                    <p style="margin: 0 0 12px 0; font-size: 11px; color: #94a3b8;">
                      Notificación automática del sistema de cotizaciones
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #64748b;">
                      developed by <a href="https://oxent.com.mx" target="_blank" style="color: #6218EC; font-weight: 800; text-decoration: none;">oxent.com.mx</a>
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

    // Sender email - Always send from noreply address
    const fromEmail = 'Sports Print MX <noreply@sportsprintmx.com>';

    // Email subject as requested: "Solicitud Nueva de [Empresa] - [Contacto]"
    const emailSubject = `Solicitud Nueva de ${record.company_name || 'Cotización'} - ${record.contact_name || 'Contacto'}`;

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmails,
        subject: emailSubject,
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

