"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitAppointment, type FormState } from "@/app/actions";
import {
  MOTIFS,
  maxDateStr,
  parseLocalDate,
  slotsForDate,
  todayStr,
} from "@/lib/availability";

const initialState: FormState = { ok: false };

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const DOW_FR = ["L", "M", "M", "J", "V", "S", "D"]; // Monday-first

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
function ymd(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function SubmitButton({ ready }: { ready: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="rdv-submit" disabled={pending || !ready}>
      {pending ? "Envoi…" : "Confirmer le rendez-vous"}
      <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function AppointmentBooking() {
  const [state, formAction] = useActionState(submitAppointment, initialState);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState({ y: 2026, m: 0 });
  const [selDate, setSelDate] = useState<string>("");
  const [selSlot, setSelSlot] = useState<string>("");

  // Calendar depends on "today" → initialise after mount to avoid SSR mismatch.
  useEffect(() => {
    const now = new Date();
    setView({ y: now.getFullYear(), m: now.getMonth() });
    setMounted(true);
  }, []);

  const today = todayStr();
  const max = maxDateStr();
  const maxD = parseLocalDate(max)!;
  const minMonth = useMemo(() => {
    const t = parseLocalDate(today)!;
    return t.getFullYear() * 12 + t.getMonth();
  }, [today]);
  const maxMonth = maxD.getFullYear() * 12 + maxD.getMonth();
  const curMonth = view.y * 12 + view.m;

  const slots = useMemo(() => (selDate ? slotsForDate(selDate) : []), [selDate]);

  // Build the day grid for the viewed month (Monday-first, padded).
  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const lead = (first.getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const out: ({ day: number; date: string; open: boolean } | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = ymd(view.y, view.m, d);
      const open =
        date >= today && date <= max && slotsForDate(date).length > 0;
      out.push({ day: d, date, open });
    }
    return out;
  }, [view, today, max]);

  function step(delta: number) {
    const next = curMonth + delta;
    if (next < minMonth || next > maxMonth) return;
    setView({ y: Math.floor(next / 12), m: next % 12 });
  }

  const humanWhen =
    selDate && selSlot
      ? `${parseLocalDate(selDate)?.toLocaleDateString("fr-BE", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })} à ${selSlot}`
      : "";

  if (state.ok && state.message) {
    return (
      <div className="rdv-done">
        <span className="rdv-check">✓</span>
        <h2 className="display">Demande envoyée</h2>
        <p>{state.message}</p>
        <a href="/" className="rdv-back">Retour à l&apos;accueil</a>
      </div>
    );
  }

  return (
    <form className="rdv-grid" action={formAction} noValidate>
      {/* Step 1 — calendar */}
      <div className="rdv-col">
        <span className="rdv-step">01 — Choisissez une date</span>
        <div className="rdv-cal">
          <div className="rdv-cal-head">
            <button
              type="button"
              className="rdv-nav"
              onClick={() => step(-1)}
              disabled={!mounted || curMonth <= minMonth}
              aria-label="Mois précédent"
            >‹</button>
            <span className="rdv-month">
              {mounted ? `${MONTHS_FR[view.m]} ${view.y}` : "—"}
            </span>
            <button
              type="button"
              className="rdv-nav"
              onClick={() => step(1)}
              disabled={!mounted || curMonth >= maxMonth}
              aria-label="Mois suivant"
            >›</button>
          </div>
          <div className="rdv-dow">
            {DOW_FR.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="rdv-days">
            {mounted &&
              cells.map((c, i) =>
                c === null ? (
                  <span key={i} className="rdv-day empty" />
                ) : (
                  <button
                    key={i}
                    type="button"
                    className={`rdv-day ${c.open ? "" : "closed"} ${selDate === c.date ? "on" : ""}`}
                    disabled={!c.open}
                    onClick={() => {
                      setSelDate(c.date);
                      setSelSlot("");
                    }}
                  >
                    {c.day}
                  </button>
                ),
              )}
          </div>
        </div>
      </div>

      {/* Step 2 — slots */}
      <div className="rdv-col">
        <span className="rdv-step">02 — Choisissez un créneau</span>
        {!selDate ? (
          <p className="rdv-hint">Sélectionnez d&apos;abord une date dans le calendrier.</p>
        ) : slots.length === 0 ? (
          <p className="rdv-hint">Aucune disponibilité ce jour. Choisissez une autre date.</p>
        ) : (
          <div className="rdv-slots">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                className={`rdv-slot ${selSlot === s ? "on" : ""}`}
                onClick={() => setSelSlot(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Step 3 — details */}
        <span className="rdv-step rdv-step--mt">03 — Vos coordonnées</span>
        <div className="rdv-fields">
          <div className="rdv-row">
            <div className="rdv-field">
              <label htmlFor="r-name">Nom *</label>
              <input id="r-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="rdv-field">
              <label htmlFor="r-phone">Téléphone *</label>
              <input id="r-phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
          </div>
          <div className="rdv-field">
            <label htmlFor="r-email">E-mail *</label>
            <input id="r-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="rdv-field">
            <label htmlFor="r-motif">Motif *</label>
            <select id="r-motif" name="motif" required defaultValue="">
              <option value="">Sélectionnez un motif</option>
              {MOTIFS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="rdv-field">
            <label htmlFor="r-note">Message (optionnel)</label>
            <textarea id="r-note" name="note" rows={2} placeholder="Précisez votre demande si besoin" />
          </div>
        </div>

        {/* Hidden — chosen date + slot */}
        <input type="hidden" name="date" value={selDate} />
        <input type="hidden" name="slot" value={selSlot} />
        {/* Honeypot */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="r-company">Société</label>
          <input id="r-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {humanWhen && <p className="rdv-summary">Rendez-vous demandé : <strong>{humanWhen}</strong></p>}
        {state.error && <p className="form-msg form-msg--err" role="alert">{state.error}</p>}

        <SubmitButton ready={!!selDate && !!selSlot} />
      </div>
    </form>
  );
}
