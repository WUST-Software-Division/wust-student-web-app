import PageHero from "../../common/PageHero";
import { alumniBenefits, alumniStories } from "../../../data/alumni";

export default function AlumniNetwork() {
  return (
    <>
      <PageHero eyebrow="WUST alumni" title="Your WUST story keeps moving." description="Stay connected to the campus, find trusted mentors, and turn one student community into a lifelong professional network." />
      <section className="section alumni-section">
        <div className="container">
          <div className="alumni-intro">
            <div><span className="eyebrow">Beyond graduation</span><h2>Campus connections with a longer horizon.</h2></div>
            <p>Alumni connect students to real opportunities through mentoring, company conversations, referrals, and honest stories about the road ahead.</p>
          </div>
          <div className="alumni-stats">{alumniBenefits.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
          <div className="alumni-heading"><span className="eyebrow">Alumni in action</span><h2>Meet the people opening the next door.</h2></div>
          <div className="alumni-grid">{alumniStories.map((story) => <article className="alumni-card" key={story.name}><img src={story.image} alt={`${story.name}, ${story.role}`} /><div><span>{story.program} · {story.company}</span><h3>{story.name}</h3><strong>{story.role}</strong><blockquote>“{story.quote}”</blockquote><button>Connect with alumni →</button></div></article>)}</div>
          <div className="alumni-cta"><div><span className="eyebrow eyebrow--light">Keep the circle open</span><h2>Bring your experience back to campus.</h2><p>Share your journey, mentor a student, or join the next alumni conversation.</p></div><a className="button button--light" href="mailto:alumni@wust.edu">Join alumni network ↗</a></div>
        </div>
      </section>
    </>
  );
}
