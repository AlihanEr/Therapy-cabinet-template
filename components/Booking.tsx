"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitAppointment, type FormState } from "@/app/actions";
import {
  MOTIFS,
  maxDateStr,
  slotsForDate,
  todayStr,
} from "@/lib/availability";

const initialState: FormState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="booking-btn" disabled={pending}>
      {pending ? "Envoi…" : "Demander ce rendez-vous"}
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

export default function Booking() {
  const [state, formAction] = useActionState(submitAppointment, initialState);
  const [date, setDate] = useState("");

  const slots = useMemo(() => (date ? slotsForDate(date) : []), [date]);
  const min = todayStr();
  const max = maxDateStr();

  return (
    <section className="booking" id="booking">
      <div className="booking-inner reveal">
        <div className="booking-intro">
          <span className="label">Rendez-vous</span>
          <h2 className="display booking-headline">
            Prêt·e à commencer ? <em>Réservons</em> votre séance.
          </h2>
          <p className="booking-lede">
            Choisissez une date et un créneau parmi les disponibilités du
            cabinet. Vous recevez aussitôt un e-mail de confirmation.
          </p>
          <div className="booking-secondary">
            ou téléphonez au <strong>+32 2 511 04 22</strong>
            <br />
            Lundi — Samedi · 8h — 19h
          </div>
        </div>

        <form className="booking-form" action={formAction} noValidate>
          <div className="bk-row">
            <div className="bk-field">
              <label htmlFor="bk-name">Nom *</label>
              <input id="bk-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="bk-field">
              <label htmlFor="bk-phone">Téléphone *</label>
              <input id="bk-phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
          </div>

          <div className="bk-field">
            <label htmlFor="bk-email">E-mail *</label>
            <input id="bk-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="bk-row">
            <div className="bk-field">
              <label htmlFor="bk-date">Date *</label>
              <input
                id="bk-date"
                name="date"
                type="date"
                min={min}
                max={max}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="bk-field">
              <label htmlFor="bk-slot">Créneau *</label>
              <select id="bk-slot" name="slot" required disabled={!date}>
                {!date && <option value="">Choisissez d&apos;abord une date</option>}
                {date && slots.length === 0 && (
                  <option value="">Aucune disponibilité ce jour</option>
                )}
                {date && slots.length > 0 && (
                  <>
                    <option value="">Sélectionnez un horaire</option>
                    {slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="bk-field">
            <label htmlFor="bk-motif">Motif *</label>
            <select id="bk-motif" name="motif" required defaultValue="">
              <option value="">Sélectionnez un motif</option>
              {MOTIFS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="bk-field">
            <label htmlFor="bk-note">Message (optionnel)</label>
            <textarea
              id="bk-note"
              name="note"
              rows={3}
              placeholder="Précisez votre demande si besoin"
            />
          </div>

          {/* Honeypot */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="bk-company">Société</label>
            <input id="bk-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
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
