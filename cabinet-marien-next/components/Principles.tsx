const principles = [
  {
    num: "i",
    title: "Le temps n'est pas une dépense.",
    body: "Cinquante minutes par séance, sans chevauchement. La précipitation est l'ennemi du soin durable.",
  },
  {
    num: "ii",
    title: "La douleur a une grammaire.",
    body: "Comprendre d'où vient le symptôme avant d'agir : c'est la condition d'un traitement qui tient.",
  },
  {
    num: "iii",
    title: "Le corps sait, souvent.",
    body: "Notre rôle n'est pas d'imposer un schéma — mais de rendre au corps les conditions de son propre rééquilibrage.",
  },
  {
    num: "iv",
    title: "Vous restez l'expert.",
    body: "Aucun protocole ne remplace votre ressenti. Nous traitons ensemble, dans la transparence, à votre rythme.",
  },
];

export default function Principles() {
  return (
    <section className="principles" id="principes">
      <div className="principles-inner">
        <div className="section-header">
          <div>
            <span className="section-number">§ 04 — Principes</span>
          </div>
          <h2 className="display section-title">
            Quatre <em className="italic-accent">convictions</em> qui guident
            chaque séance.
          </h2>
        </div>

        <div className="principles-grid">
          {principles.map((p) => (
            <div className="principle reveal" key={p.num}>
              <div className="principle-num">{p.num}</div>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
