"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Briefcase, Building2, Clock3, ExternalLink, MapPin, MessageCircle, Search } from "lucide-react";
import PageHero from "./PageHero";
import { careerCategories, careerJobs, type CareerCategory, type CareerComment, type CareerJob } from "../../data/career";

type CategoryFilter = "All" | CareerCategory;

const categoryStyles: Record<CareerCategory, { badge: string; dot: string }> = {
  IT: { badge: "bg-wust-blue/10 text-wust-blue border-wust-blue/25", dot: "bg-wust-blue" },
  Business: { badge: "bg-wust-green/10 text-wust-green border-wust-green/25", dot: "bg-wust-green" },
  Humanities: { badge: "bg-wust-red/10 text-wust-red border-wust-red/25", dot: "bg-wust-red" },
};

const initials = (name: string) => name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();

type CommentDraft = { name: string; message: string };

export default function CareerBoard() {
  const [jobs, setJobs] = useState<CareerJob[]>(careerJobs);
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [openComments, setOpenComments] = useState<number[]>([]);
  const [drafts, setDrafts] = useState<Record<number, CommentDraft>>({});

  const filters: CategoryFilter[] = ["All", ...careerCategories];

  const counts = useMemo(() => {
    const base: Record<CategoryFilter, number> = { All: jobs.length, IT: 0, Business: 0, Humanities: 0 };
    jobs.forEach((job) => { base[job.category] += 1; });
    return base;
  }, [jobs]);

  const visible = useMemo(() => jobs.filter((job) => {
    const matchesCategory = category === "All" || job.category === category;
    const haystack = `${job.title} ${job.company} ${job.description} ${job.location}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [jobs, category, query]);

  const toggleComments = (jobId: number) => {
    setOpenComments((current) => current.includes(jobId) ? current.filter((id) => id !== jobId) : [...current, jobId]);
  };

  const updateDraft = (jobId: number, field: keyof CommentDraft, value: string) => {
    setDrafts((current) => {
      const existing = current[jobId] ?? { name: "", message: "" };
      return { ...current, [jobId]: { ...existing, [field]: value } };
    });
  };

  const submitComment = (jobId: number) => (event: FormEvent) => {
    event.preventDefault();
    const draft = drafts[jobId];
    if (!draft?.message?.trim()) return;
    const comment: CareerComment = { id: Date.now(), author: draft.name.trim() || "Guest Student", body: draft.message.trim(), time: "Just now" };
    setJobs((current) => current.map((job) => job.id === jobId ? { ...job, comments: [...job.comments, comment] } : job));
    setDrafts((current) => ({ ...current, [jobId]: { name: draft.name, message: "" } }));
    setOpenComments((current) => current.includes(jobId) ? current : [...current, jobId]);
  };

  return (
    <>
      <PageHero
        eyebrow="Career Center"
        title="Find your next opportunity."
        description="Browse jobs and internships posted for the student community, filter by field, and apply directly through each listing."
      />

      <section className="section">
        <div className="container">
          <div className="mb-10 flex flex-col gap-6 border-b border-[rgba(23,32,51,.12)] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-[var(--slate-500)]">
                <span className="h-[2px] w-8 bg-[var(--gold)]" /> Now hiring
              </span>
              <h2 className="text-[clamp(28px,3vw,40px)] leading-none tracking-tight text-[var(--slate-850)]">
                {visible.length} open {visible.length === 1 ? "role" : "roles"} for students
              </h2>
              <p className="mt-2 max-w-xl text-[var(--slate-500)]">
                Postings shown here are sample listings so the page can be previewed with real layout and data. Once the admin panel is connected, career staff will publish and manage live roles from this same page.
              </p>
            </div>
            <label className="flex min-w-[260px] items-center gap-2 rounded-full border border-[rgba(23,32,51,.24)] bg-white px-4 py-3 text-sm">
              <Search size={16} className="text-[var(--slate-500)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search job title, company, or location…"
                aria-label="Search career postings"
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--slate-500)]"
              />
            </label>
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-5 py-2 text-[12px] font-bold uppercase tracking-[.06em] transition-colors ${
                  category === item
                    ? "border-[var(--slate-850)] bg-[var(--slate-850)] text-white"
                    : "border-[rgba(23,32,51,.24)] text-[var(--slate-850)] hover:border-[var(--slate-850)]"
                }`}
              >
                {item} <span className="opacity-60">({counts[item]})</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {visible.map((job) => {
              const style = categoryStyles[job.category];
              const commentsOpen = openComments.includes(job.id);
              const draft = drafts[job.id];
              return (
                <article key={job.id} className="flex flex-col rounded-2xl border border-[rgba(23,32,51,.14)] bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[.08em] ${style.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} /> {job.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[.06em] text-[var(--slate-500)]">
                      <Clock3 size={13} /> {job.postedAt}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[22px] font-bold leading-tight text-[var(--slate-850)]">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--slate-500)]">
                    <span className="flex items-center gap-1.5"><Building2 size={14} /> {job.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.type}</span>
                  </div>

                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[var(--slate-700)]">{job.description}</p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(23,32,51,.1)] pt-5">
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--slate-850)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[.04em] text-white transition-opacity hover:opacity-85"
                    >
                      Apply for this role <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => toggleComments(job.id)}
                      className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.04em] text-[var(--slate-850)]"
                    >
                      <MessageCircle size={15} /> {job.comments.length} {job.comments.length === 1 ? "comment" : "comments"}
                    </button>
                  </div>

                  {commentsOpen && (
                    <div className="mt-5 border-t border-[rgba(23,32,51,.1)] pt-5">
                      {job.comments.length > 0 && (
                        <ul className="mb-4 flex flex-col gap-4">
                          {job.comments.map((comment) => (
                            <li key={comment.id} className="flex gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--slate-850)] text-[11px] font-bold text-white">
                                {initials(comment.author)}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <strong className="text-[13px] text-[var(--slate-850)]">{comment.author}</strong>
                                  <span className="text-[11px] text-[var(--slate-500)]">{comment.time}</span>
                                </div>
                                <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--slate-700)]">{comment.body}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <form onSubmit={submitComment(job.id)} className="flex flex-col gap-2">
                        <input
                          value={draft?.name ?? ""}
                          onChange={(event) => updateDraft(job.id, "name", event.target.value)}
                          placeholder="Your name (optional)"
                          aria-label="Your name"
                          className="rounded-lg border border-[rgba(23,32,51,.2)] px-3 py-2 text-[13px] outline-none focus:border-[var(--slate-850)]"
                        />
                        <div className="flex gap-2">
                          <textarea
                            value={draft?.message ?? ""}
                            onChange={(event) => updateDraft(job.id, "message", event.target.value)}
                            placeholder="Ask a question or leave a note about this role…"
                            aria-label="Add a comment"
                            rows={2}
                            className="flex-1 rounded-lg border border-[rgba(23,32,51,.2)] px-3 py-2 text-[13px] outline-none focus:border-[var(--slate-850)]"
                          />
                          <button type="submit" className="self-end rounded-lg bg-[var(--slate-850)] px-4 py-2 text-[12px] font-bold uppercase tracking-[.04em] text-white">
                            Post
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {!visible.length && (
            <div className="rounded-2xl border border-dashed border-[rgba(23,32,51,.2)] p-12 text-center">
              <strong className="block text-[16px] text-[var(--slate-850)]">No roles match your filters.</strong>
              <span className="mt-1 block text-[13px] text-[var(--slate-500)]">Try a different category or search term.</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
