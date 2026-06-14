/**
 * Practitioner availability — schedule-based.
 *
 * This is the single source of truth for when appointments can be requested.
 * Edit SCHEDULE / SLOT_MINUTES / LUNCH to match the cabinet's real hours.
 *
 * Used in two places:
 *  - client (Booking form) to populate selectable time slots for a chosen day
 *  - server (submitAppointment) to validate the submitted slot is legitimate
 *
 * Upgrade path: swap slotsForDate() for a call to Google Calendar FreeBusy to
 * get live availability and prevent double-booking.
 */

// 0 = Sunday … 6 = Saturday. [openHour, closeHour] in 24h, or null = closed.
export const SCHEDULE: Record<number, [number, number] | null> = {
  0: null, // Dimanche
  1: [8, 19], // Lundi
  2: [8, 19], // Mardi
  3: [8, 19], // Mercredi
  4: [8, 19], // Jeudi
  5: [8, 19], // Vendredi
  6: [9, 14], // Samedi
};

export const SLOT_MINUTES = 45;

// Daily break excluded from slots, or null for none. [startHour, endHour].
export const LUNCH: [number, number] | null = [12, 13];

// How far ahead bookings are allowed (days).
export const MAX_DAYS_AHEAD = 60;

export const MOTIFS = [
  "Première consultation",
  "Suivi / séance de rééducation",
  "Thérapie manuelle",
  "Autre",
] as const;

export type Motif = (typeof MOTIFS)[number];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Parse 'YYYY-MM-DD' as a local date (avoids UTC off-by-one). */
export function parseLocalDate(dateStr: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Today's date as 'YYYY-MM-DD' (local). */
export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Max bookable date as 'YYYY-MM-DD' (local). */
export function maxDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + MAX_DAYS_AHEAD);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Slots ('HH:MM') available on a given 'YYYY-MM-DD', honouring schedule + lunch. */
export function slotsForDate(dateStr: string): string[] {
  const date = parseLocalDate(dateStr);
  if (!date) return [];

  // No slots in the past.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return [];
  const tooFar = parseLocalDate(maxDateStr());
  if (tooFar && date > tooFar) return [];

  const hours = SCHEDULE[date.getDay()];
  if (!hours) return [];

  const [open, close] = hours;
  const slots: string[] = [];
  for (let mins = open * 60; mins + SLOT_MINUTES <= close * 60; mins += SLOT_MINUTES) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (LUNCH) {
      const [ls, le] = LUNCH;
      if (mins >= ls * 60 && mins < le * 60) continue;
    }
    slots.push(`${pad(h)}:${pad(m)}`);
  }
  return slots;
}

/** True if the slot is a legitimate, bookable slot for that date. */
export function isValidSlot(dateStr: string, slot: string): boolean {
  return slotsForDate(dateStr).includes(slot);
}
