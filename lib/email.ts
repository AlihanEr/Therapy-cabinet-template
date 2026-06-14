import "server-only";
import nodemailer from "nodemailer";

export type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export type SendResult = { ok: boolean; transport: "gmail" | "resend" | "console" };

/**
 * Sends mail through whichever transport is configured, in order:
 *   1. Gmail SMTP  — GMAIL_USER + GMAIL_APP_PASSWORD (App Password, needs 2FA)
 *   2. Resend      — RESEND_API_KEY
 *   3. Console     — logs the message (dev fallback so forms always "work")
 */
export async function sendMail(mail: Mail): Promise<SendResult> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });
    await transporter.sendMail({
      from: `Cabinet Marien <${gmailUser}>`,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    });
    return { ok: true, transport: "gmail" };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL || "Cabinet Marien <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [mail.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[email] Resend error", res.status, detail);
      throw new Error("resend_failed");
    }
    return { ok: true, transport: "resend" };
  }

  console.info(
    `[email] No transport configured; logging instead:\n` +
      `To: ${mail.to}\nSubject: ${mail.subject}\nReply-To: ${mail.replyTo ?? "—"}\n\n${mail.text}\n`,
  );
  return { ok: true, transport: "console" };
}
