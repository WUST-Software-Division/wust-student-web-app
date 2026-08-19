import Link from "next/link";
import SectionIntro from "../../common/SectionIntro";
import { featuredEvents } from "../../../data/home";

export default function EventsZigzag() {
  return (
    <section className="section events-section">
      <div className="container">
        <SectionIntro eyebrow="Student life on campus" title="Show up. Join in. Make it yours." description="Programs, gatherings, and milestone moments selected from our official student-life coverage." />
        <div className="events-zigzag">
          {featuredEvents.map((event, index) => (
            <article className="event-row" key={event.title}>
              <div className="event-image"><img src={event.image} alt="" /><span>{event.date}</span></div>
              <div className="event-copy"><span className="event-number">0{index + 1}</span><h3>{event.title}</h3><p>{event.description}</p><Link href="/activity">Event details <span>↗</span></Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
