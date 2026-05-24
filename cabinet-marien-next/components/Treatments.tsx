const treatments = [
  {
    num: "01",
    name: "Thérapie",
    accent: "manuelle",
    desc: "Mobilisations vertébrales, articulaires et techniques de relâchement myofascial.",
  },
  {
    num: "02",
    name: "Rééducation",
    accent: "posturale",
    desc: "Méthode globale pour ré-équilibrer les chaînes musculaires et la statique du corps.",
  },
  {
    num: "03",
    name: "Sport &",
    accent: "performance",
    desc: "Préparation, prévention des blessures et retour à la pratique pour les sportifs.",
  },
  {
    num: "04",
    name: "Douleurs",
    accent: "chroniques",
    desc: "Accompagnement long terme pour les lombalgies, cervicalgies et tensions persistantes.",
  },
  {
    num: "05",
    name: "Pré &",
    accent: "post-opératoire",
    desc: "Préparation à l'intervention et accompagnement de la convalescence et rééducation.",
  },
  {
    num: "06",
    name: "Bien-être",
    accent: "respiratoire",
    desc: "Kinésithérapie respiratoire, drainage et apprentissage du souffle conscient.",
  },
];

export default function Treatments() {
  return (
    <section className="treatments" id="soins">
      <div className="treatments-inner">
        <div className="section-header">
          <div>
            <span className="section-number">§ 02 — Domaines de soin</span>
          </div>
          <h2 className="display section-title">
            Six pratiques, une même{" "}
            <em className="italic-accent">attention</em>.
          </h2>
        </div>

        <div className="treatments-list">
          {treatments.map((t) => (
            <div className="treatment-row reveal" key={t.num}>
              <span className="treatment-num">/ {t.num}</span>
              <div className="treatment-name">
                {t.name} <em>{t.accent}</em>
              </div>
              <div className="treatment-desc">{t.desc}</div>
              <div className="treatment-arrow">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M2 6h8M7 2l3 4-3 4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
