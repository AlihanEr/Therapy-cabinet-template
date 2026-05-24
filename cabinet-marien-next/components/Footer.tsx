export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            Le mouvement,
            <br />
            <em>retrouvé.</em>
          </div>

          <div className="footer-col">
            <h5>Cabinet</h5>
            <ul>
              <li>
                <a href="#">Rue de la Forêt 12</a>
              </li>
              <li>
                <a href="#">1050 Ixelles, Bruxelles</a>
              </li>
              <li>
                <a href="mailto:contact@cabinet-marien.be">
                  contact@cabinet-marien.be
                </a>
              </li>
              <li>
                <a href="tel:+3225110422">+32 2 511 04 22</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Horaires</h5>
            <ul>
              <li>
                <a href="#">Lun · 08h — 19h</a>
              </li>
              <li>
                <a href="#">Mar · 08h — 19h</a>
              </li>
              <li>
                <a href="#">Mer · 08h — 19h</a>
              </li>
              <li>
                <a href="#">Sam · 09h — 14h</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Praticien</h5>
            <ul>
              <li>
                <a href="#">À propos</a>
              </li>
              <li>
                <a href="#">Soins</a>
              </li>
              <li>
                <a href="#">Tarifs INAMI</a>
              </li>
              <li>
                <a href="#">Mentions légales</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-mega">
            CABINET
            <br />
            MARIEN.
          </div>
          <div className="footer-meta">
            © MMXXVI — Cabinet Marien
            <br />
            Kinésithérapie agréée INAMI
            <br />
            N° d'entreprise BE0712.984.330
            <br />
            Site conçu avec soin · Bruxelles
          </div>
        </div>
      </div>
    </footer>
  );
}
