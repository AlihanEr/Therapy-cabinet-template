export default function Booking() {
  return (
    <section className="booking" id="booking">
      <div className="booking-inner reveal">
        <h2 className="display booking-headline">
          Prêt·e à commencer ? <em>Réservons</em> votre première séance.
        </h2>
        <div className="booking-actions">
          <a href="#" className="booking-btn">
            Prendre rendez-vous en ligne
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
          </a>
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
