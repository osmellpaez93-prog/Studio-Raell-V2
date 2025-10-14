// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// 1. Obtener la clave API desde las variables de entorno de Supabase
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

console.log("Function started. RESEND_API_KEY present:", !!RESEND_API_KEY);

// 2. Definir la función manejadora de la solicitud
Deno.serve(async (req: Request) => {
  // 3. Verificar el método HTTP
  if (req.method !== "POST") {
    console.warn("Invalid method:", req.method);
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    // 4. Parsear el cuerpo de la solicitud JSON
    const { email, trackingCode, clientName } = await req.json();
    console.log("Received data:", { email, trackingCode, clientName });

    // 5. Validar datos obligatorios
    if (!email || !trackingCode || !clientName) {
      console.warn("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields: 'email', 'trackingCode', 'clientName'" }),
        {
          status: 400, // Bad Request
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // --- Plantilla HTML Profesional ---
    const emailHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Tu Código de Seguimiento - Raell Studio!</title>
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
                background: linear-gradient(135deg, #6366f1, #4f46e5);
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
                 color: #4f46e5;
                 margin-top: 0;
            }
            .content p {
                margin: 10px 0;
            }
            .code-box {
                 background-color: #f0f9ff;
                 border: 1px dashed #6366f1;
                 border-radius: 6px;
                 padding: 15px;
                 text-align: center;
                 font-size: 20px;
                 font-weight: bold;
                 color: #4f46e5;
                 margin: 20px 0;
                 letter-spacing: 2px;
            }
            .cta-button {
                 display: inline-block;
                 background: linear-gradient(135deg, #6366f1, #4f46e5);
                 color: #ffffff !important;
                 text-decoration: none;
                 padding: 12px 25px;
                 border-radius: 50px;
                 font-weight: bold;
                 margin: 20px 0;
                 transition: background-color 0.3s ease, transform 0.2s ease;
            }
             .cta-button:hover {
                 background: linear-gradient(135deg, #4f46e5, #4338ca);
                 transform: translateY(-2px);
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
                 <h1>Raell Studio</h1>
                 <p>Transformando tus ideas en melodías únicas</p>
            </div>
            <div class="content">
                 <h2>¡Hola, ${clientName}!</h2>
                 <p>Gracias por confiar en <strong>Raell Studio</strong> para transformar tu historia en una composición musical original.</p>

                 <p><strong>Tu código de seguimiento único es:</strong></p>
                 <div class="code-box">${trackingCode}</div>

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

                 <p>Con gratitud,<br>El equipo de <strong>Raell Studio</strong></p>
            </div>
            <div class="footer">
                 <p>&copy; 2024 Raell Studio. Todos los derechos reservados.</p>
                 <p>
                     <a href="https://studio-raell.vercel.app/">Visita nuestro sitio web</a> |
                     <a href="mailto:raellstudio@resend.dev">Contáctanos</a>
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

    // 6. Verificar que la clave API esté presente ANTES de usarla
    if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing after initialization.");
        return new Response(
            JSON.stringify({ error: "Server configuration error: Missing API key" }),
            {
            status: 500, // Internal Server Error
            headers: { "Content-Type": "application/json" },
            },
        );
    }

    // 7. Preparar datos para la llamada a la API de Resend
    const resendPayload = {
      from: 'Raell Studio <raellstudio@resend.dev>', // CAMBIADO AQUI
      to: [email],
      subject: `¡Tu Código de Seguimiento - Raell Studio! (${trackingCode})`,
      html: emailHtmlContent,
    };

    console.log("Sending email with payload...");

    // 8. Enviar el correo usando la API de Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendPayload),
    });

    // 9. Obtener la respuesta de Resend
    const resendData = await resendResponse.json();

    // 10. Manejar la respuesta de Resend
    if (!resendResponse.ok) {
      console.error("Resend API error response:", resendData);
      return new Response(
        JSON.stringify({ error: "Failed to send email via Resend", details: resendData }),
        {
          status: resendResponse.status,
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