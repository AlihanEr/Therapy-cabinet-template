"use server";

import { isValidSlot, MOTIFS, parseLocalDate, todayStr } from "@/lib/availability";
import { sendMail } from "@/lib/email";

export type FormState = {
  ok: boolean;
  error?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function recipient(): string {
  return (
    process.env.APPOINTMENT_TO_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    process.env.GMAIL_USER ||
    "contact@cabinet-marien.be"
  );
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const trap = String(formData.get("company") ?? "").trim();

  if (trap) return { ok: true, message: "Merci, votre message a bien été reçu." };
  if (!name || !email || !message) {
    return { ok: false, error: "Veuillez remplir le nom, l'e-mail et le message." };
  }
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Adresse e-mail invalide." };
  if (message.length > 4000) {
    return { ok: false, error: "Message trop long (4000 caractères max)." };
  }

  try {
    await sendMail({
      to: recipient(),
      replyTo: email,
      subject: `Nouveau message du site — ${name}`,
      text:
        `Nom : ${name}\nE-mail : ${email}\nTéléphone : ${phone || "—"}\n\n${message}\n`,
    });
    return {
      ok: true,
      message: "Message reçu. Nous vous répondrons dans les plus brefs délais.",
    };
  } catch (err) {
    console.error("[contact] send failed", err);
    return {
      ok: false,
      error: "Envoi impossible pour le moment. Réessayez ou téléphonez-nous.",
    };
  }
}

export async function submitAppointment(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const slot = String(formData.get("slot") ?? "").trim();
  const motif = String(formData.get("motif") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const trap = String(formData.get("company") ?? "").trim();

  if (trap) return { ok: true, message: "Votre demande a bien été reçue." };

  if (!name || !email || !phone || !date || !slot || !motif) {
    return { ok: false, error: "Veuillez remplir tous les champs obligatoires." };
  }
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Adresse e-mail invalide." };
  if (!(MOTIFS as readonly string[]).includes(motif)) {
    return { ok: false, error: "Motif invalide." };
  }
  if (date < todayStr()) {
    return { ok: false, error: "La date choisie est déjà passée." };
  }
  if (!isValidSlot(date, slot)) {
    return {
      ok: false,
      error: "Ce créneau n'est plus disponible. Choisissez un autre horaire.",
    };
  }
  if (note.length > 2000) {
    return { ok: false, error: "Message trop long (2000 caractères max)." };
  }

  const human = parseLocalDate(date)?.toLocaleDateString("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const when = `${human} à ${slot}`;

  try {
    // Notify the cabinet.
    await sendMail({
      to: recipient(),
      replyTo: email,
      subject: `Demande de rendez-vous — ${name} (${date} ${slot})`,
      text:
        `Nouvelle demande de rendez-vous :\n\n` +
        `Quand : ${when}\nMotif : ${motif}\n\n` +
        `Nom : ${name}\nE-mail : ${email}\nTéléphone : ${phone}\n\n` +
        `Note du patient :\n${note || "—"}\n`,
    });

    // Confirm to the patient.
    await sendMail({
      to: email,
      replyTo: recipient(),
      subject: `Votre demande de rendez-vous — Cabinet Marien`,
      text:
        `Bonjour ${name},\n\n` +
        `Nous avons bien reçu votre demande de rendez-vous :\n\n` +
        `  ${when}\n  Motif : ${motif}\n\n` +
        `Le cabinet vous recontacte rapidement pour confirmer ce créneau. ` +
        `En cas d'empêchement, répondez simplement à cet e-mail ou appelez le +32 2 511 04 22.\n\n` +
        `À bientôt,\nCabinet Marien — Kinésithérapie & Thérapie Manuelle\n` +
        `Rue de la Forêt 12, 1050 Ixelles\n`,
    });

    return {
      ok: true,
      message: `Demande envoyée pour ${when}. Un e-mail de confirmation vient de vous être adressé.`,
    };
  } catch (err) {
    console.error("[appointment] send failed", err);
    return {
      ok: false,
      error:
        "Envoi impossible pour le moment. Réessayez ou téléphonez-nous au +32 2 511 04 22.",
    };
  }
}
