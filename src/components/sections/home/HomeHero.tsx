import Link from "next/link";
import { homeData } from "../../../data/home";

export default function HomeHero() {
  const { hero } = homeData;
  return (
    <section className="home-hero">
      <img className="home-hero__image" src={hero.image} alt="A diverse group of student leaders" />
      <div className="home-hero__veil" />
      <div className="container home-hero__content">
        <span className="eyebrow eyebrow--light">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
        <div className="hero-actions">
          <Link className="button button--light" href="/activity">Explore activities <span>↗</span></Link>
          <Link className="text-link text-link--light" href="/organization">Find your organization <span>→</span></Link>
        </div>
      </div>
      <div className="hero-index"><span>01</span><i /><small>WELCOME TO STUDENT LIFE</small></div>
    </section>
  );
}
