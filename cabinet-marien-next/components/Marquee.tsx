export default function Marquee() {
  const items = (
    <>
      Thérapie manuelle <span className="dot"></span> Rééducation posturale{" "}
      <span className="dot"></span> Sport &amp; Performance{" "}
      <span className="dot"></span> Douleurs chroniques{" "}
      <span className="dot"></span> Pré &amp; post-opératoire{" "}
      <span className="dot"></span> Bien-être respiratoire{" "}
      <span className="dot"></span>
    </>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{items}</span>
        <span>{items}</span>
      </div>
    </div>
  );
}
