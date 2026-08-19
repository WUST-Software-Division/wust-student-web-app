"use client";

import { FormEvent, useState } from "react";

type Message = { role: "assistant" | "user"; text: string };

const getReply = (message: string) => {
  const input = message.toLowerCase();
  if (input.includes("club") || input.includes("organization")) return "You can browse active groups on the Organization page. Each card includes a simple join action.";
  if (input.includes("event") || input.includes("activity")) return "Visit Activities for upcoming groups and schedules. The homepage also highlights the next featured events.";
  if (input.includes("support") || input.includes("help")) return "I can point you toward student services, peer support, or academic resources. For urgent or personal concerns, please contact Student Services directly.";
  return "Thanks for reaching out. I can help you find activities, organizations, student stories, or the discussion forum.";
};

export default function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I’m Wren, your student-life guide. What would you like to find?" },
  ]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const clean = input.trim();
    if (!clean) return;
    setMessages((current) => [...current, { role: "user", text: clean }, { role: "assistant", text: getReply(clean) }]);
    setInput("");
  };

  return (
    <div className="chatbot">
      {open && (
        <section className="chatbot-panel" aria-label="Student support chat">
          <header><div className="chatbot-avatar">W</div><div><strong>Ask Wren</strong><span>Student support guide</span></div><button onClick={() => setOpen(false)} aria-label="Close chat">×</button></header>
          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message, index) => <p key={index} className={`chat-message chat-message--${message.role}`}>{message.text}</p>)}
          </div>
          <form onSubmit={submit}><label className="sr-only" htmlFor="chat-input">Message</label><input id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about student life…" /><button aria-label="Send message">↑</button></form>
          <small>Demo assistant · Connect your AI service later</small>
        </section>
      )}
      <button className="chatbot-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open student support chat">
        {open ? "×" : <><span>✦</span><em>Need help?</em></>}
      </button>
    </div>
  );
}
