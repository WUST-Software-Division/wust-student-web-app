import Link from "next/link";
import SectionIntro from "../../common/SectionIntro";
import { successHighlights } from "../../../data/home";

export default function StudentSuccess() {
  return (
    <section className="success-section">
      <div className="container success-grid">
        <div className="success-copy">
          <SectionIntro light eyebrow="Student success" title="Progress looks different for every student." />
          <p>Success includes the confidence to speak up, the courage to try, and the community that helps you keep going.</p>
          <Link className="button button--light" href="/success">Read student stories <span>↗</span></Link>
        </div>
        <div className="success-stats">
          {successHighlights.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}
