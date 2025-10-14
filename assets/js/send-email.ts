// send-email.ts
// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// 1. Obtener la clave API desde las variables de entorno de Supabase
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// 2. Verificar que la clave API esté configurada
if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY environment variable");
  return new Response(
    JSON.stringify({ error: "Server configuration error: Missing API key" }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
}

// 3. Definir la función manejadora de la solicitud
Deno.serve(async (req: Request) => {
  // 4. Verificar el método HTTP
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    // 5. Parsear el cuerpo de la solicitud JSON
    const { to, subject, html, clientName, trackingCode } = await req.json();

    // 6. Validar datos obligatorios
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: 'to', 'subject', 'html'" }),
        {
          status: 400, // Bad Request
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // --- Plantilla HTML Profesional ---
    // Puedes personalizar esta plantilla según tus necesidades.
    const emailHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #6366f1, #4f46e5); /* Colores de tu marca */
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                 margin: 0;
                 font-size: 28px;
                 font-weight: 700;
            }
             .header p {
                 margin: 10px 0 0;
                 font-size: 16px;
                 opacity: 0.9;
             }
            .content {
                padding: 30px;
            }
            .content h2 {
                 color: #4f46e5; /* Color primario de tu marca */
                 margin-top: 0;
            }
            .content p {
                margin: 10px 0;
            }
            .code-box {
                 background-color: #f0f9ff; /* Fondo suave para el código */
                 border: 1px dashed #6366f1; /* Borde del color de tu marca */
                 border-radius: 6px;
                 padding: 15px;
                 text-align: center;
                 font-size: 20px;
                 font-weight: bold;
                 color: #4f46e5; /* Color del texto del código */
                 margin: 20px 0;
                 letter-spacing: 2px; /* Espacio entre letras para mejor legibilidad */
            }
            .cta-button {
                 display: inline-block;
                 background: linear-gradient(135deg, #6366f1, #4f46e5); /* Degradado del botón */
                 color: #ffffff !important; /* Forzar color blanco */
                 text-decoration: none;
                 padding: 12px 25px;
                 border-radius: 50px; /* Botón redondeado */
                 font-weight: bold;
                 margin: 20px 0;
                 transition: background-color 0.3s ease, transform 0.2s ease;
            }
             .cta-button:hover {
                 background: linear-gradient(135deg, #4f46e5, #4338ca); /* Degradado al pasar el ratón */
                 transform: translateY(-2px); /* Pequeño levantamiento al pasar el ratón */
                 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
             }
            .footer {
                 background-color: #f8fafc;
                 padding: 20px;
                 text-align: center;
                 color: #64748b;
                 font-size: 14px;
                 border-top: 1px solid #e2e8f0;
            }
             .footer a {
                 color: #6366f1;
                 text-decoration: none;
            }
             .footer a:hover {
                 text-decoration: underline;
             }
             @media (max-width: 600px) {
                 .container {
                     margin: 10px;
                 }
                 .content, .header {
                     padding: 20px 15px;
                 }
             }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                 <h1>Sonidos de Recuerdos</h1>
                 <p>Transformando tus ideas en melodías únicas</p>
            </div>
            <div class="content">
                 <h2>¡Hola, ${clientName || 'Cliente'}!</h2>
                 <p>Gracias por confiar en <strong>Sonidos de Recuerdos</strong> para transformar tu historia en una composición musical original.</p>

                 <p><strong>Tu código de seguimiento único es:</strong></p>
                 <div class="code-box">${trackingCode || 'RXXXXXX'}</div>

                 <p>Guarda este código en un lugar seguro. Te permitirá acceder a tu perfil personalizado para:</p>
                 <ul>
                     <li>Ver el estado de tu proyecto</li>
                     <li>Escuchar demos exclusivas</li>
                     <li>Comunicarte directamente con el compositor</li>
                 </ul>

                 <p style="text-align: center;">
                     <a href="https://studio-raell.vercel.app/perfil.html?code=${trackingCode}" class="cta-button">Ir a Mi Proyecto</a>
                 </p>

                 <p>Estamos emocionados de comenzar este viaje creativo contigo. Pronto recibirás novedades sobre el avance de tu canción.</p>

                 <p>Si tienes alguna pregunta, no dudes en responder a este correo.</p>

                 <p>Con gratitud,<br>El equipo de <strong>Sonidos de Recuerdos</strong></p>
            </div>
            <div class="footer">
                 <p>&copy; 2024 Sonidos de Recuerdos. Todos los derechos reservados.</p>
                 <p>
                     <a href="https://studio-raell.vercel.app/">Visita nuestro sitio web</a> |
                     <a href="mailto:infostudioraell@gmail.com">Contáctanos</a>
                 </p>
                 <p style="font-size: 12px; margin-top: 15px;">
                     Dirección: Ciudad, País<br>
                     Teléfono: +1234567890
                 </p>
            </div>
        </div>
    </body>
    </html>
    `;
    // --- Fin de la Plantilla HTML Profesional ---

    // 7. Preparar datos para la llamada a la API de Resend
    const resendPayload = {
      from: 'Sonidos de Recuerdos <infostudioraell@gmail.com>', // Asegúrate de que este correo esté verificado en Resend
      to: [to], // Resend espera un array de destinatarios
      subject: subject,
      html: html || emailHtmlContent, // Usar HTML personalizado o la plantilla por defecto
    };

    console.log("Sending email with payload:", JSON.stringify(resendPayload, null, 2)); // Log para depuración

    // 8. Enviar el correo usando la API de Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        // Incluir 'idempotency-key' es opcional pero recomendable para evitar envíos duplicados
        // 'Idempotency-Key': crypto.randomUUID(), // Requires crypto import
      },
      body: JSON.stringify(resendPayload),
    });

    // 9. Obtener la respuesta de Resend
    const resendData = await resendResponse.json();

    // 10. Manejar la respuesta de Resend
    if (!resendResponse.ok) {
      console.error("Resend API error response:", resendData);
      // Devolver el error específico de Resend al cliente
      return new Response(
        JSON.stringify({ error: "Failed to send email via Resend", details: resendData }),
        {
          status: resendResponse.status, // Usar el código de estado de Resend
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 11. Éxito: Devolver la respuesta de Resend
    console.log("Email sent successfully via Resend. ID:", resendData.id);
    return new Response(
      JSON.stringify({ message: "Email sent successfully", resendData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );


  } catch (error) {
    // 12. Manejo global de errores inesperados
    console.error("Unexpected error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      {
        status: 500, // Internal Server Error
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});

/* Para probar la función localmente (opcional):
curl -X POST http://localhost:54321/functions/v1/send-email \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "tu-email-de-prueba@gmail.com",
    "subject": "Prueba de Correo desde Supabase",
    "html": "<h1>¡Hola Mundo!</h1><p>Este es un correo de prueba.</p>",
    "clientName": "Usuario de Prueba",
    "trackingCode": "R12345LL"
  }'
*/