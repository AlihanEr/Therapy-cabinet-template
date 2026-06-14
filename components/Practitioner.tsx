export default function Practitioner() {
  return (
    <section className="practitioner" id="praticien">
      <div className="practitioner-portrait reveal">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="portraitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DDD3BF" />
              <stop offset="100%" stopColor="#A99B7E" />
            </linearGradient>
            <linearGradient id="figureGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A2E" />
              <stop offset="100%" stopColor="#15291F" />
            </linearGradient>
          </defs>

          <rect width="400" height="500" fill="url(#portraitGrad)" />

          <circle cx="320" cy="120" r="60" fill="#E8E1D2" opacity="0.6" />
          <circle cx="320" cy="120" r="35" fill="#F1ECE2" opacity="0.5" />

          <path
            d="M0 360 Q100 320 200 340 Q300 360 400 330 L400 500 L0 500 Z"
            fill="#C4622D"
            opacity="0.85"
          />
          <path
            d="M0 400 Q120 370 240 390 Q340 410 400 385 L400 500 L0 500 Z"
            fill="#1E3A2E"
            opacity="0.92"
          />

          <path
            d="M180 220 Q180 195 200 195 Q220 195 220 220 L222 250 Q230 255 232 280 L230 360 Q228 400 222 440 L210 440 L208 380 L192 380 L190 440 L178 440 Q172 400 170 360 L168 280 Q170 255 178 250 Z"
            fill="url(#figureGrad)"
          />

          <g stroke="#1A1814" strokeWidth="0.4" opacity="0.12">
            <line x1="0" y1="200" x2="400" y2="195" />
            <line x1="0" y1="220" x2="400" y2="214" />
            <line x1="0" y1="240" x2="400" y2="232" />
          </g>
        </svg>

        <div className="portrait-tag">
          <span className="dot"></span>
          <span>Disponible cette semaine</span>
        </div>
      </div>

      <div className="practitioner-body reveal">
        <span className="label">§ 03 — Praticien</span>
        <h2 className="display practitioner-name">
          Élodie <em className="italic-accent">Marien</em>
        </h2>
        <div className="practitioner-bio">
          <p>
            Diplômée de la Faculté de Médecine de l'UCLouvain et formée à la
            thérapie manuelle Maitland-Mulligan, j'ai ouvert ce cabinet avec
            une seule conviction : le soin demande du temps, et le corps
            mérite qu'on l'écoute avant qu'on ne le traite.
          </p>
          <p>
            Onze années de pratique m'ont appris qu'aucune douleur n'est
            identique à une autre, qu'aucun corps ne s'inscrit dans un
            protocole. Mon approche marie la rigueur clinique à l'attention
            portée à la personne — son histoire, son métier, ses gestes du
            quotidien.
          </p>
        </div>

        <div className="credentials">
          <div className="credential">
            <span className="label">Diplômes</span>
            <div className="credential-name">
              Master en Kinésithérapie, UCLouvain (2013)
            </div>
          </div>
          <div className="credential">
            <span className="label">Spécialisations</span>
            <div className="credential-name">
              Thérapie Manuelle · Méthode Mézières
            </div>
          </div>
          <div className="credential">
            <span className="label">Langues</span>
            <div className="credential-name">
              Français · Nederlands · English
            </div>
          </div>
          <div className="credential">
            <span className="label">INAMI</span>
            <div className="credential-name">5/41284/52/700</div>
          </div>
        </div>
      </div>
    </section>
  );
}
