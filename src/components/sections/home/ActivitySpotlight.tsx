import Link from "next/link";
import SectionIntro from "../../common/SectionIntro";
import { activityStats } from "../../../data/home";

export default function ActivitySpotlight() {
  return (
    <section className="section activity-spotlight">
      <div className="container activity-heading">
        <SectionIntro eyebrow="Life beyond the classroom" title="Find the experience that moves you." description="Scroll through the many ways students learn, lead, connect, and contribute on campus." />
        <Link className="text-link" href="/activity">View all activities <span>→</span></Link>
      </div>
      <div className="activity-track" aria-label="Student activity highlights">
        {activityStats.map((item, index) => (
          <article className="activity-panel" key={item.label}>
            <img src={item.image} alt="" />
            <div className="activity-panel__shade" />
            <span className="activity-panel__number">0{index + 1}</span>
            <div><strong>{item.value}</strong><h3>{item.label}</h3><p>Student-powered experiences designed to build confidence, connection, and practical skills.</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
