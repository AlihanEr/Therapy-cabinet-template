export default function Nav() {
  return (
    <nav className="nav">
      <a href="#" className="nav-brand">
        Cabinet<span className="dot"></span>Marien
      </a>
      <ul className="nav-links">
        <li>
          <a href="#approche">Approche</a>
        </li>
        <li>
          <a href="#soins">Soins</a>
        </li>
        <li>
          <a href="#praticien">Praticien</a>
        </li>
        <li>
          <a href="#principes">Principes</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <a href="#booking" className="nav-cta">
        Prendre rendez-vous
        <svg
          className="arrow"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </nav>
  );
}
