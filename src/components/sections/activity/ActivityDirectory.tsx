"use client";

import { useMemo, useState } from "react";
import PageHero from "../../common/PageHero";
import { activities } from "../../../data/activity";

export default function ActivityDirectory() {
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState<string[]>([]);
  const visible = useMemo(() => activities.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <>
      <PageHero eyebrow="Get involved" title="Your next experience starts here." description="Explore hands-on communities for leadership, wellbeing, culture, service, technology, and more." />
      <section className="section directory-section"><div className="container"><div className="directory-toolbar"><div><h2>Explore activities</h2><p>{visible.length} opportunities to connect this semester</p></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search activities…" aria-label="Search activities" /></div>
        <div className="activity-grid">{visible.map((item, index) => <article className="activity-card" key={item.title}><div className="activity-card__image"><img src={item.image} alt="" /><span>0{index + 1}</span></div><div className="activity-card__body"><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p><div><span>{item.schedule}</span><button onClick={() => setJoined((current) => current.includes(item.title) ? current.filter((title) => title !== item.title) : [...current, item.title])}>{joined.includes(item.title) ? "Interested ✓" : "I'm interested →"}</button></div></div></article>)}</div>
      </div></section>
    </>
  );
}
