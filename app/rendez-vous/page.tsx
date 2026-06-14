import type { Metadata } from "next";
import AppointmentBooking from "@/components/AppointmentBooking";
import ClientEffects from "@/components/ClientEffects";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — Cabinet Marien",
  description:
    "Réservez votre séance de kinésithérapie au Cabinet Marien à Bruxelles. Choisissez une date et un créneau parmi les disponibilités.",
};

export default function RendezVousPage() {
  return (
    <>
      <Nav />
      <main className="rdv-page">
        <header className="rdv-head">
          <span className="label label-ink">Rendez-vous</span>
          <h1 className="display rdv-title">
            Réservez votre <em>séance</em>.
          </h1>
          <p className="rdv-lede">
            Choisissez une date et un créneau parmi les disponibilités du
            cabinet. Vous recevez aussitôt un e-mail de confirmation. Une
            question ? Téléphonez au <strong>+32 2 511 04 22</strong>.
          </p>
        </header>
        <AppointmentBooking />
      </main>
      <Footer />
      <ClientEffects />
    </>
  );
}
