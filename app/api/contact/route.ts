import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().max(30).optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
  // Honeypot-Feld — muss leer bleiben (Bot-Schutz ohne CAPTCHA)
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ungültige Eingabe.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot: Bot hat das versteckte Feld gefüllt
    if (parsed.data.website) {
      return NextResponse.json({ success: true }); // Still 200 so bots think it worked
    }

    const { name, email, phone, subject, message } = parsed.data;

    await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM ?? "noreply@example.com",
      to:   process.env.CONTACT_EMAIL_TO   ?? "kontakt@example.com",
      replyTo: email,
      subject: `[Kontaktanfrage] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#7c3aed;">Neue Kontaktanfrage</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:120px;"><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;"><strong>E-Mail</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#666;"><strong>Telefon</strong></td><td>${phone}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#666;"><strong>Betreff</strong></td><td>${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <p style="white-space:pre-wrap;color:#333;">${message}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <p style="font-size:12px;color:#999;">Diese Nachricht wurde über das Kontaktformular gesendet.</p>
        </div>
      `,
    });

    // Bestätigungs-E-Mail an Absender
    await resend.emails.send({
      from:    process.env.CONTACT_EMAIL_FROM ?? "noreply@example.com",
      to:      email,
      subject: "Ihre Anfrage ist eingegangen",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#7c3aed;">Vielen Dank, ${name}!</h2>
          <p>Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich bei Ihnen.</p>
          <p style="color:#666;font-size:14px;">Diese E-Mail wurde automatisch generiert.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
