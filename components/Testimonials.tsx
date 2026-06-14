import { Fragment } from "react";

const quotes = [
  {
    text: (
      <>
        Après huit mois de lombalgie, j'avais perdu l'espoir d'une rééducation{" "}
        <em>vraiment</em> personnalisée. Élodie m'a écouté, observé, puis
        traité. Six séances plus tard, je remarche sans appréhension.
      </>
    ),
    author: "Thomas D.",
    detail: "Architecte, 42 ans · Ixelles",
  },
  {
    text: (
      <>
        Préparation marathon et suivi post-blessure. Une <em>rigueur</em> rare,
        une attention au geste, et toujours cette pédagogie qui vous fait
        comprendre ce qui se passe dans votre propre corps.
      </>
    ),
    author: "Sarah Vandenberghe",
    detail: "Athlète, course longue distance",
  },
  {
    text: (
      <>
        Ma fille de 16 ans souffrait de scoliose. La prise en charge ici a été
        d'une <em>douceur</em> et d'une exigence remarquables. Elle a retrouvé
        confiance dans son corps autant que dans ses mouvements.
      </>
    ),
    author: "Catherine L.",
    detail: "Mère, Saint-Gilles",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header">
        <div>
          <span className="section-number">§ 05 — Témoignages</span>
        </div>
        <h2 className="display section-title">
          Ce que disent <em className="italic-accent">celles et ceux</em> qui
          sont passés ici.
        </h2>
      </div>

      {quotes.map((q, i) => (
        <Fragment key={i}>
          <div className="quote-block reveal">
            <div></div>
            <p className="quote-text">{q.text}</p>
            <div className="quote-meta">
              <div className="quote-author">{q.author}</div>
              <div className="quote-detail">{q.detail}</div>
            </div>
          </div>
        </Fragment>
      ))}
    </section>
  );
}
