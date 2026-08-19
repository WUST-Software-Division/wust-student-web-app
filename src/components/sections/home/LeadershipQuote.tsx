import { homeData } from "../../../data/home";

export default function LeadershipQuote() {
  const { quote } = homeData;
  return (
    <section className="quote-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.96), rgba(15,23,42,.78)), url(${quote.background})` }}>
      <div className="container quote-inner">
        <span className="quote-mark">“</span>
        <blockquote>{quote.text}</blockquote>
        <div className="quote-person">
          <img src={quote.portrait} alt={quote.name} />
          <div><strong>{quote.name}</strong><span>{quote.role}</span></div>
        </div>
      </div>
    </section>
  );
}
