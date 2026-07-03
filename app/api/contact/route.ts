import { Resend } from 'resend';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'Vant <onboarding@resend.dev>';
const toAddress = process.env.RESEND_TO_EMAIL ?? 'hola@vantmx.com.mx';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  if (!resendApiKey) {
    return Response.json({ error: 'Falta configurar RESEND_API_KEY.' }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return Response.json({ error: 'El cuerpo de la solicitud no es válido.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim() || 'Sin empresa';
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return Response.json({ error: 'Nombre, correo y mensaje son obligatorios.' }, { status: 400 });
  }

  const resend = new Resend(resendApiKey);
  const subject = `Nuevo mensaje de ${name} desde Vant`;

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: [toAddress],
    replyTo: email,
    subject,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; background:#0d1311; color:#ffffff; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#121816; border:1px solid rgba(255,255,255,0.08); padding:24px;">
          <h1 style="margin:0 0 16px; color:#e38569; font-size:24px;">Nuevo mensaje desde Vant</h1>
          <p style="margin:0 0 10px;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 10px;"><strong>Correo:</strong> ${escapeHtml(email)}</p>
          <p style="margin:0 0 10px;"><strong>Empresa:</strong> ${escapeHtml(company)}</p>
          <p style="margin:18px 0 8px;"><strong>Mensaje:</strong></p>
          <div style="white-space:pre-wrap; line-height:1.7; color:#d1d5db;">${escapeHtml(message)}</div>
        </div>
      </div>
    `,
    text: [
      'Nuevo mensaje desde Vant',
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Empresa: ${company}`,
      '',
      'Mensaje:',
      message,
    ].join('\n'),
  });

  if (error) {
    return Response.json({ error: error.message ?? 'No se pudo enviar el correo.' }, { status: 500 });
  }

  return Response.json({
    message: 'Mensaje enviado con éxito.',
    id: data?.id ?? null,
  });
}