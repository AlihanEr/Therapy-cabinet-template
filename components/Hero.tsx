export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-tag">
        <span className="pulse"></span>
        <span className="label label-ink">Cabinet ouvert · Bruxelles</span>
      </div>

      <div className="hero-content">
        <h1 className="display hero-headline">
          <span className="line">
            <span>Le mouvement</span>
          </span>
          <span className="line">
            <span>
              <em className="italic-accent">est</em> notre
            </span>
          </span>
          <span className="line">
            <span>médecine.</span>
          </span>
        </h1>

        <p className="hero-sub">
          Cabinet de kinésithérapie et thérapie manuelle, fondé sur l'écoute du
          corps, la précision du geste et la patience du soin. Pour rendre au
          mouvement sa simplicité originelle.
        </p>

        <div className="hero-meta">
          <div className="meta-item">
            <span className="label">Établi en</span>
            <div className="value">MMXIV</div>
          </div>
          <div className="meta-item">
            <span className="label">Adresse</span>
            <div className="value">Rue de la Forêt 12, 1050</div>
          </div>
          <div className="meta-item">
            <span className="label">Consultations</span>
            <div className="value">Lun. — Sam.</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-figure">
          <svg
            viewBox="0 0 400 500"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g stroke="rgba(26,24,20,0.08)" strokeWidth="1">
              <circle cx="200" cy="200" r="180" />
              <circle cx="200" cy="200" r="140" />
              <circle cx="200" cy="200" r="100" />
              <line x1="20" y1="200" x2="380" y2="200" />
              <line x1="200" y1="20" x2="200" y2="480" />
            </g>

            <g stroke="#1A1814" strokeWidth="1.4" className="draw-path">
              <circle cx="200" cy="105" r="28" />
              <path d="M200 133 Q198 180 202 230 Q204 280 196 320" />
              <path d="M158 155 Q200 145 242 155" />
              <path d="M158 155 Q120 130 100 90 Q92 70 96 50" />
              <path d="M242 155 Q280 130 300 90 Q308 70 304 50" />
              <path d="M96 50 L92 38 M96 50 L98 38 M96 50 L102 40" />
              <path d="M304 50 L308 38 M304 50 L302 38 M304 50 L298 40" />
              <path d="M168 175 Q200 168 232 175" />
              <path d="M170 195 Q200 188 230 195" />
              <path d="M172 215 Q200 208 228 215" />
              <path d="M178 320 Q200 315 222 320 L228 350 Q200 348 172 350 Z" />
              <path d="M185 350 Q175 410 168 470" />
              <path d="M215 350 Q230 410 240 470" />
              <path d="M168 470 L155 475 L170 478 Z" />
              <path d="M240 470 L253 475 L238 478 Z" />
            </g>

            <g fill="#B85C3A" className="draw-path-2">
              <circle cx="158" cy="155" r="3" />
              <circle cx="242" cy="155" r="3" />
              <circle cx="178" cy="320" r="3" />
              <circle cx="222" cy="320" r="3" />
              <circle cx="200" cy="200" r="3" />
              <circle cx="100" cy="90" r="3" />
              <circle cx="300" cy="90" r="3" />
            </g>

            <g
              stroke="#B85C3A"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              className="draw-path-2"
            >
              <path d="M100 90 Q60 130 80 180" />
              <path d="M300 90 Q340 130 320 180" />
            </g>

            <g
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="8"
              fill="rgba(26,24,20,0.55)"
              letterSpacing="1"
            >
              <text x="40" y="200" textAnchor="end">
                C-VII
              </text>
              <text x="40" y="230" textAnchor="end">
                T-IV
              </text>
              <text x="40" y="260" textAnchor="end">
                L-III
              </text>
              <text x="360" y="155">
                DELT.
              </text>
              <text x="360" y="320">
                COX.
              </text>
            </g>
          </svg>

          <svg className="orbit-stamp" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text>
              <textPath href="#circlePath">
                — MOUVEMENT · ÉCOUTE · ÉQUILIBRE · SOIN ·
              </textPath>
            </text>
            <circle cx="50" cy="50" r="8" className="center" />
          </svg>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="label">Faites défiler</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
