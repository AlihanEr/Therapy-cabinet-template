"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions";

const initialState: ContactState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="contact-btn" disabled={pending}>
      {pending ? "Envoi…" : "Envoyer le message"}
      <svg
        className="arrow"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <section className="contact" id="contact">
      <div className="contact-inner reveal">
        <div className="contact-intro">
          <span className="label label-ink">Contact</span>
          <h2 className="display contact-headline">
            Une question ? <em>Écrivez-nous.</em>
          </h2>
          <p className="contact-lede">
            Pour une première prise de contact, une demande de renseignement ou
            un suivi, laissez-nous un message. Nous vous répondons sous 24&nbsp;h
            ouvrées.
          </p>
          <ul className="contact-points">
            <li>
              <span className="label">Téléphone</span>
              <a href="tel:+3225110422">+32 2 511 04 22</a>
            </li>
            <li>
              <span className="label">E-mail</span>
              <a href="mailto:contact@cabinet-marien.be">
                contact@cabinet-marien.be
              </a>
            </li>
            <li>
              <span className="label">Cabinet</span>
              <span className="val">Rue de la Forêt 12, 1050 Ixelles</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" action={formAction} noValidate>
          <div className="field-row">
            <div className="field">
              <label htmlFor="c-name">Nom</label>
              <input
                id="c-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="c-phone">Téléphone</label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Optionnel"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="c-email">E-mail</label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.be"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              placeholder="Comment pouvons-nous vous aider ?"
              required
            />
          </div>

          {/* Honeypot — hidden from humans, catches bots. */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="c-company">Société</label>
            <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {state.error && (
            <p className="form-msg form-msg--err" role="alert">
              {state.error}
            </p>
          )}
          {state.ok && state.message && (
            <p className="form-msg form-msg--ok" role="status">
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
