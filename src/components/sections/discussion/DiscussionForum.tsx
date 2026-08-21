"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { discussionPosts, forumCommunities, forumRules, forumSpaces, type DiscussionPost, type ForumSpace } from "../../../data/discussion";

type DraftAttachment = { name: string; type: string; preview?: string };

const initials = (name: string) => name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export default function DiscussionForum() {
  const [posts, setPosts] = useState(discussionPosts);
  const [space, setSpace] = useState<ForumSpace>("Group");
  const [community, setCommunity] = useState(forumCommunities.Group[0]);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState<DraftAttachment | null>(null);
  const [openReplies, setOpenReplies] = useState<number[]>([]);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const childNavigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const applyHash = () => {
      const selected = forumSpaces.find((item) => `#${item.id}` === window.location.hash);
      if (selected) setSpace(selected.label);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const navigation = childNavigationRef.current;
    if (!navigation) return;
    const navigationTop = navigation.getBoundingClientRect().top + window.scrollY;
    const headerHandoffHeight = 70;
    let active = false;

    const updateNavigationMode = () => {
      const nextActive = window.scrollY >= navigationTop - headerHandoffHeight;
      if (nextActive === active) return;
      active = nextActive;
      navigation.classList.toggle("child-navigation--pinned", active);
      window.dispatchEvent(new CustomEvent("wust-forum-navigation", { detail: active }));
    };

    updateNavigationMode();
    window.addEventListener("scroll", updateNavigationMode, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateNavigationMode);
      window.dispatchEvent(new CustomEvent("wust-forum-navigation", { detail: false }));
    };
  }, []);

  const filtered = useMemo(() => posts.filter((post) =>
    space !== "Rules & Terms" && post.space === space && `${post.title} ${post.body} ${post.category}`.toLowerCase().includes(query.toLowerCase())
  ), [posts, space, query]);

  const selectSpace = (next: ForumSpace, id: string) => {
    setSpace(next);
    if (next !== "Rules & Terms") setCommunity(forumCommunities[next][0]);
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById("forum")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAttachment({ name: file.name, type: file.type, preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined });
  };

  const createPost = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !body.trim() || space === "Rules & Terms") return;
    const post: DiscussionPost = {
      id: Date.now(), space, community, category: `${space} post`, title: title.trim(), body: body.trim(), author: signedIn ? "Student" : "Guest Student", time: "Just now", likes: 0,
      image: attachment?.preview, attachment: attachment && !attachment.preview ? attachment.name : undefined, replies: [],
    };
    setPosts((current) => [post, ...current]);
    setTitle(""); setBody(""); setAttachment(null); setComposer(false);
  };

  const addReply = (postId: number) => {
    const value = replyDrafts[postId]?.trim();
    if (!value) return;
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, replies: [...post.replies, { id: Date.now(), author: signedIn ? "Student" : "Guest Student", body: value, time: "Just now" }] } : post));
    setReplyDrafts((current) => ({ ...current, [postId]: "" }));
  };

  return (
    <>
      <section className="forum-hero">
        <img src="/images/student-life/fall-orientation-community.webp" alt="Students gathering at orientation" />
        <div className="forum-hero__veil" />
        <div className="container forum-hero__layout">
          <div className="forum-hero__copy">
            <span className="eyebrow eyebrow--light">Student Forum</span>
            <h1>Connect with your campus community.</h1>
            <p>Ask questions, find your people, share resources, and help student ideas move forward.</p>
          </div>
          <div className="forum-login-card">
            <div className="forum-login-card__brand"><img src="/images/wust/wust-logo.png" alt="" /><span><strong>Student Connect</strong><small>Temporary access preview</small></span></div>
            {signedIn ? <div className="login-success"><span>✓</span><div><strong>You’re signed in</strong><small>Student preview account</small></div><button onClick={() => setSignedIn(false)}>Sign out</button></div> : <>
              <h2>Join the conversation</h2><p>Central authentication will be connected later. Use temporary access to preview the forum.</p>
              <button className="login-option" onClick={() => setSignedIn(true)}><span className="login-option__icon">S</span><span><strong>Student, Faculty & Staff</strong><small>Continue with temporary campus access</small></span><b>→</b></button>
              <button className="login-option login-option--secondary" onClick={() => setSignedIn(true)}><span className="login-option__icon">G</span><span><strong>Guest community access</strong><small>Preview posting and replies</small></span><b>→</b></button>
            </>}
          </div>
        </div>
      </section>

      <nav ref={childNavigationRef} className="child-navigation" aria-label="Student Forum sections">
        <div className="container child-navigation__inner">
          {forumSpaces.map((item) => <button key={item.label} className={space === item.label ? "active" : ""} onClick={() => selectSpace(item.label, item.id)}><span>{item.label}</span><small>{item.description}</small></button>)}
        </div>
      </nav>

      <section className="forum-section" id="forum">
        <div className="container">
          <div className="forum-section__heading">
            <div><span className="eyebrow">{space === "Rules & Terms" ? "Community guidance" : `${space} forum`}</span><h2>{space === "Rules & Terms" ? "A respectful space for every student." : `${space} conversations`}</h2></div>
            {space !== "Rules & Terms" && <button className="button button--dark" onClick={() => setComposer(!composer)}>+ Create post</button>}
          </div>

          {space === "Rules & Terms" ? <div className="forum-rules">{forumRules.map((rule, index) => <article key={rule.title}><span>0{index + 1}</span><h3>{rule.title}</h3><p>{rule.description}</p></article>)}</div> : <>
            <div className="forum-tools"><label className="forum-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${space.toLowerCase()} posts`} /></label><div><button className="active">Latest</button><button>Popular</button><button onClick={() => setSaved([])}>Saved {saved.length ? `(${saved.length})` : ""}</button></div></div>
            {composer && <form className="forum-composer" onSubmit={createPost}>
              <div className="avatar">{signedIn ? "WS" : "GS"}</div><div className="forum-composer__fields"><div className="composer-scope"><label>Post to<select value={space} onChange={(event) => selectSpace(event.target.value as ForumSpace, forumSpaces.find((item) => item.label === event.target.value)?.id || "groups")}><option value="Group">Group</option><option value="Club">Club</option><option value="Organization">Organization</option></select></label><label>{space} community<select value={community} onChange={(event) => setCommunity(event.target.value)}>{forumCommunities[space as Exclude<ForumSpace, "Rules & Terms">].map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" aria-label="Post title" /><textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder={`Share something with the ${space.toLowerCase()} community…`} rows={4} />
              {attachment && <div className="attachment-preview">{attachment.preview ? <img src={attachment.preview} alt="Selected upload preview" /> : <span>▧</span>}<strong>{attachment.name}</strong><button type="button" onClick={() => setAttachment(null)}>Remove</button></div>}
              <div className="composer-actions"><label className="attachment-button">＋ Add media or file<input type="file" accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.txt" onChange={handleAttachment} /></label><span>Images, PDF, DOC, PPT or TXT</span><button type="button" onClick={() => setComposer(false)}>Cancel</button><button className="button button--dark" type="submit">Publish post</button></div></div>
            </form>}

            <div className="forum-feed">
              {filtered.map((post) => {
                const repliesOpen = openReplies.includes(post.id);
                return <article className="forum-post" key={post.id}>
                  <header><div className="avatar">{initials(post.author)}</div><div><strong>{post.author}</strong><span>{post.category}{post.community ? ` · ${post.community}` : ""} · {post.time}</span></div><button aria-label="More post options">•••</button></header>
                  <div className="forum-post__content"><h3>{post.title}</h3><p>{post.body}</p>{post.image && <img className="forum-post__media" src={post.image} alt="Media shared with this post" />}{post.attachment && <div className="post-file"><span>PDF</span><strong>{post.attachment}</strong><button>Download</button></div>}</div>
                  <footer><button className={liked.includes(post.id) ? "active" : ""} onClick={() => setLiked((current) => current.includes(post.id) ? current.filter((id) => id !== post.id) : [...current, post.id])}>♡ {post.likes + (liked.includes(post.id) ? 1 : 0)}</button><button onClick={() => setOpenReplies((current) => current.includes(post.id) ? current.filter((id) => id !== post.id) : [...current, post.id])}>▢ {post.replies.length} replies</button><button className={saved.includes(post.id) ? "active" : ""} onClick={() => setSaved((current) => current.includes(post.id) ? current.filter((id) => id !== post.id) : [...current, post.id])}>⌑ {saved.includes(post.id) ? "Saved" : "Save"}</button></footer>
                  {repliesOpen && <div className="reply-thread">{post.replies.map((reply) => <div className="forum-reply" key={reply.id}><div className="avatar">{initials(reply.author)}</div><div><strong>{reply.author}</strong><small>{reply.time}</small><p>{reply.body}</p></div></div>)}<div className="reply-composer"><div className="avatar">{signedIn ? "WS" : "GS"}</div><textarea rows={2} value={replyDrafts[post.id] || ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Write a reply…" /><button onClick={() => addReply(post.id)}>Reply</button></div></div>}
                </article>;
              })}
              {!filtered.length && <div className="forum-empty"><strong>No posts found.</strong><span>Start the first conversation in this space.</span></div>}
            </div>
          </>}
        </div>
      </section>
    </>
  );
}
