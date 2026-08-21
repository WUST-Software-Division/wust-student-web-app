"use client";

import { useMemo, useState } from "react";
import PageHero from "./PageHero";
import { organizations } from "../../data/organization";

type CommunityKind = "groups" | "clubs" | "organizations";

const directoryData: Record<CommunityKind, { title: string; description: string; items: typeof organizations }> = {
  groups: {
    title: "Find your student group.",
    description: "Small communities for shared interests, study goals, and everyday campus connection.",
    items: [
      { name: "Data Analytics Study Circle", type: "Academic group", members: 24, description: "Review datasets, share tools, and make progress together each week.", initials: "DA" },
      { name: "International Student Network", type: "Peer community", members: 86, description: "A welcoming place for cross-cultural friendships and practical support.", initials: "IS" },
      { name: "Weekend Wellness Group", type: "Wellness group", members: 31, description: "Low-pressure walks, movement, and conversations that help students reset.", initials: "WW" },
    ],
  },
  clubs: {
    title: "Explore student clubs.",
    description: "Make time for the interests, creative work, and collaborations that make campus yours.",
    items: [
      { name: "Photography Club", type: "Creative club", members: 42, description: "Photo walks, beginner workshops, and a space to share your point of view.", initials: "PC" },
      { name: "Innovation & Technology Club", type: "Professional club", members: 64, description: "Build projects, meet practitioners, and turn curiosity into useful skills.", initials: "IT" },
      { name: "Cultural Exchange Club", type: "Culture club", members: 58, description: "Celebrate the stories, food, and traditions represented across WUST.", initials: "CE" },
    ],
  },
  organizations: { title: "Meet campus organizations.", description: "Recognized student organizations shaping leadership, service, and campus initiatives.", items: organizations },
};

export default function CommunityDirectory({ kind }: { kind: CommunityKind }) {
  const [query, setQuery] = useState("");
  const directory = directoryData[kind];
  const visible = useMemo(() => directory.items.filter((item) => `${item.name} ${item.type}`.toLowerCase().includes(query.toLowerCase())), [directory.items, query]);
  return <><PageHero eyebrow={`${kind} directory`} title={directory.title} description={directory.description} /><section className="section organization-section"><div className="container"><div className="directory-toolbar"><div><h2>{kind === "organizations" ? "Organization directory" : `${kind[0].toUpperCase()}${kind.slice(1)} directory`}</h2><p>{visible.length} communities to explore</p></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${kind}…`} aria-label={`Search ${kind}`} /></div><div className="organization-grid">{visible.map((item) => <article key={item.name}><div className="org-monogram">{item.initials}</div><span>{item.type}</span><h3>{item.name}</h3><p>{item.description}</p><div><small>{item.members} active members</small><button>View community →</button></div></article>)}</div></div></section></>;
}
