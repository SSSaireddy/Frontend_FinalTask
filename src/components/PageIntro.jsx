export default function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="page-intro">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
