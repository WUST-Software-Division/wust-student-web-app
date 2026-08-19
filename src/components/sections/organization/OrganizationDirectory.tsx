"use client";

import { useMemo, useState } from "react";
import PageHero from "../../common/PageHero";
import { organizations } from "../../../data/organization";

export default function OrganizationDirectory() {
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState<string[]>([]);
  const visible = useMemo(() => organizations.filter((item) => `${item.name} ${item.type}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <>
      <PageHero eyebrow="Student organizations" title="Find your people. Build something together." description="Discover student-led groups or bring your own idea to life with support every step of the way." />
      <section className="section organization-section"><div className="container">
        <div className="directory-toolbar"><div><h2>Organization directory</h2><p>Communities led by students, for students</p></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search organizations…" aria-label="Search organizations" /></div>
        <div className="organization-grid">{visible.map((organization) => <article key={organization.name}><div className="org-monogram">{organization.initials}</div><span>{organization.type}</span><h3>{organization.name}</h3><p>{organization.description}</p><div><small>{organization.members} active members</small><button onClick={() => setJoined((current) => current.includes(organization.name) ? current.filter((name) => name !== organization.name) : [...current, organization.name])}>{joined.includes(organization.name) ? "Request sent ✓" : "Request to join →"}</button></div></article>)}</div>
        <div className="start-org"><div><span className="eyebrow eyebrow--light">Start something new</span><h2>Don’t see your community yet?</h2><p>We’ll help you shape the idea, find members, and understand the organization process.</p></div><a className="button button--light" href="mailto:studentlife@wust.edu">Start an organization ↗</a></div>
      </div></section>
    </>
  );
}
