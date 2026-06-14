"use server";

export type ContactState = {
  ok: boolean;
  error?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot — bots fill hidden fields; humans never see it.
  const trap = String(formData.get("company") ?? "").trim();

  if (trap) return { ok: true, message: "Merci, votre message a bien été reçu." };

  if (!name || !email || !message) {
    return { ok: false, error: "Veuillez remplir le nom, l'e-mail et le message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Adresse e-mail invalide." };
  }
  if (message.length > 4000) {
    return { ok: false, error: "Message trop long (4000 caractères max)." };
  }

  const to = process.env.CONTACT_TO_EMAIL || "contact@cabinet-marien.be";
  const from =
    process.env.CONTACT_FROM_EMAIL || "Cabinet Marien <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `Nouveau message du site — ${name}`;
  const text =
    `Nom : ${name}\n` +
    `E-mail : ${email}\n` +
    `Téléphone : ${phone || "—"}\n\n` +
    `${message}\n`;

  // No key configured yet — log server-side so the form is usable in dev.
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set; logging submission:\n" + text);
    return {
      ok: true,
      message: "Message reçu. Nous vous répondrons dans les plus brefs délais.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error", res.status, detail);
      return {
        ok: false,
        error:
          "Envoi impossible pour le moment. Réessayez ou téléphonez-nous au +32 2 511 04 22.",
      };
    }

    return {
      ok: true,
      message: "Message envoyé. Nous vous répondrons dans les plus brefs délais.",
    };
  } catch (err) {
    console.error("[contact] request failed", err);
    return { ok: false, error: "Erreur réseau. Veuillez réessayer plus tard." };
  }
}
