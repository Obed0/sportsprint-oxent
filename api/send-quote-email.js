export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the Supabase webhook payload
    const { record, type, table } = req.body || {};

    if (type !== 'INSERT' || table !== 'quotes' || !record) {
      console.warn('Invalid webhook payload structure:', req.body);
      return res.status(400).json({ error: 'Invalid webhook event. Only INSERT on quotes is allowed.' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not defined.');
      return res.status(500).json({ error: 'Mail service configuration error (RESEND_API_KEY is missing)' });
    }

    // Destination email (sales team)
    const toEmail = process.env.SALES_EMAIL || 'ventas@sportsprint.mx';

    // Parse products list
    const productsList = Object.entries(record.products || {})
      .filter(([_, checked]) => checked)
      .map(([name]) => name.toUpperCase())
      .join(', ');

    // HTML Email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #ffffff; color: #111111;">
        <div style="text-align: center; border-bottom: 3px solid #E43537; padding-bottom: 20px; margin-bottom: 25px;">
          <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; color: #000000;">Nueva Cotización Recibida</h1>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #666666; font-weight: bold;">Sports Print MX</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.5; color: #333333;">Se ha registrado una nueva solicitud de cotización industrial desde el formulario del sitio web:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tbody>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; width: 40%; background-color: #fafafa;">Empresa / Organizador:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${record.company_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Contacto Directo:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${record.contact_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Email Corporativo:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${record.email}" style="color: #E43537; text-decoration: none; font-weight: bold;">${record.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Teléfono (WhatsApp):</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;"><a href="https://wa.me/${record.phone.replace(/\D/g, '')}" style="color: #E43537; text-decoration: none; font-weight: bold;">${record.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Volumen Estimado:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">${record.volume} piezas</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Fecha del Evento:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${record.event_date}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Productos a Cotizar:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${productsList || 'Ninguno'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">¿Cuentan con Diseño?:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; text-transform: uppercase;">${record.has_design}</td>
            </tr>
            ${record.design_file_url ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f0f0f0; background-color: #fafafa; color: #E43537;">Archivo de Diseño:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;"><a href="${record.design_file_url}" target="_blank" style="color: #ffffff; background-color: #E43537; font-weight: bold; text-decoration: none; padding: 6px 12px; border-radius: 3px; display: inline-block; font-size: 12px;">Descargar Archivo</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #f0f0f0; background-color: #fafafa;">Comentarios Adicionales:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; white-space: pre-wrap; line-height: 1.4;">${record.comments || 'Sin comentarios.'}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 11px; color: #888888;">
          <p style="margin: 0;">Este correo es una alerta automática generada por el sitio web oficial de Sports Print MX.</p>
          <p style="margin: 5px 0 0 0;">ID de Cotización: ${record.id}</p>
        </div>
      </div>
    `;

    // Call Resend API using standard fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Sports Print MX <onboarding@resend.dev>', // Resend standard onboarding address for sandbox. Custom domains can be configured later.
        to: toEmail,
        subject: `Nueva Cotización: ${record.company_name} - ${record.contact_name}`,
        html: htmlContent
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API response error:', data);
      return res.status(response.status).json({ error: 'Failed to send email via Resend API', details: data });
    }

    console.log('Email sent successfully via Resend. Message ID:', data.id);
    return res.status(200).json({ success: true, messageId: data.id });

  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
