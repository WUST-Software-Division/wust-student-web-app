import PageHero from "../../common/PageHero";
import { successStories } from "../../../data/success";

export default function SuccessStories() {
  return (
    <>
      <PageHero eyebrow="Student success" title="Stories of momentum, purpose, and growth." description="Meet students turning their campus experience into leadership, confidence, and meaningful next steps." />
      <section className="section stories-section"><div className="container">
        <div className="story-feature"><div><span className="eyebrow">Featured story</span><blockquote>“{successStories[0].quote}”</blockquote><h2>{successStories[0].name}</h2><p>{successStories[0].program} · {successStories[0].year}</p><strong>{successStories[0].achievement}</strong></div><img src={successStories[0].image} alt="" /></div>
        <div className="story-grid">{successStories.slice(1).map((story) => <article key={story.name}><img src={story.image} alt="" /><div><span>{story.achievement}</span><blockquote>“{story.quote}”</blockquote><h3>{story.name}</h3><p>{story.program} · {story.year}</p></div></article>)}</div>
        <div className="share-story"><span>Have a story worth sharing?</span><h2>Your experience could inspire another student.</h2><a className="button button--light" href="mailto:studentlife@wust.edu">Share your story ↗</a></div>
      </div></section>
    </>
  );
}
