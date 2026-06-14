import Link from "next/link";

export default function Booking() {
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
            cabinet, en ligne et en quelques secondes.
          </p>
        </div>
        <div className="booking-actions">
          <Link href="/rendez-vous" className="booking-btn">
            Prendre rendez-vous
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
          </Link>
          <div className="booking-secondary">
            ou téléphonez au <strong>+32 2 511 04 22</strong>
            <br />
            Lundi — Samedi · 8h — 19h
          </div>
        </div>
      </div>
    </section>
  );
}
