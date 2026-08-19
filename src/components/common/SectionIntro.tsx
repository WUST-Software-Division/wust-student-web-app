type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export default function SectionIntro({ eyebrow, title, description, light = false }: SectionIntroProps) {
  return (
    <div className={`section-intro ${light ? "section-intro--light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
