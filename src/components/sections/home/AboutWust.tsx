import Link from "next/link";
import SectionIntro from "../../common/SectionIntro";
import { homeData } from "../../../data/home";

export default function AboutWust() {
  const { about } = homeData;
  return (
    <section className="section about-section">
      <div className="container about-grid">
        <div className="about-copy">
          <SectionIntro eyebrow="About us" title={about.title} />
          <p className="body-large">{about.body}</p>
          <div className="about-facts">
            <div><strong>Career-ready</strong><span>Learning that connects theory to action.</span></div>
            <div><strong>Globally minded</strong><span>A community enriched by many perspectives.</span></div>
          </div>
          <Link className="button button--dark" href="/organization">Meet our community <span>↗</span></Link>
        </div>
        <div className="about-visual">
          <div className="about-visual__frame"><img src={about.image} alt="Campus" /></div>
          <div className="about-stamp"><strong>Learn</strong><span>Lead · Belong</span></div>
          <div className="line-art" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
