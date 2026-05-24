const items = [
  {
    num: "i.",
    title: "Bilan complet et personnalisé",
    body: "Chaque parcours commence par une évaluation approfondie : antécédents, posture, schémas de mouvement et zones de tension. Aucun raccourci.",
    icon: (
      <svg
        className="icon"
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <circle cx="28" cy="28" r="22" />
        <path d="M14 28 Q28 18 42 28 Q28 38 14 28 Z" />
        <circle cx="28" cy="28" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "ii.",
    title: "Thérapie manuelle ciblée",
    body: "Mobilisations articulaires, techniques myofasciales et travail tissulaire — pour libérer ce que le corps a immobilisé, en douceur et avec précision.",
    icon: (
      <svg
        className="icon"
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 38 Q18 20 28 20 Q38 20 46 38" />
        <path d="M14 38 L42 38" />
        <circle cx="28" cy="20" r="3" fill="currentColor" />
        <path d="M28 23 L28 30" />
      </svg>
    ),
  },
  {
    num: "iii.",
    title: "Rééducation au mouvement",
    body: "Exercices conçus pour vous : retrouver de l'amplitude, de la force et surtout, la confiance dans votre propre corps au quotidien.",
    icon: (
      <svg
        className="icon"
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 14 Q28 28 14 42" />
        <path d="M28 14 Q42 28 28 42" />
        <path d="M42 14 Q56 28 42 42" strokeDasharray="2 3" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
        <circle cx="28" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Approach() {
  return (
    <section className="approach" id="approche">
      <div className="section-header">
        <div>
          <span className="section-number">§ 01 — Approche</span>
        </div>
        <h2 className="display section-title">
          Une lecture <em className="italic-accent">attentive</em> du corps,
          pour des soins justes et durables.
        </h2>
      </div>

      <div className="approach-grid">
        {items.map((item) => (
          <div className="approach-item reveal" key={item.num}>
            <span className="num">{item.num}</span>
            {item.icon}
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
