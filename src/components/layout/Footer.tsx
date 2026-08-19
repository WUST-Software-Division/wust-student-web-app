import Link from "next/link";
import { navigation } from "../../config/nav";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer-contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/wust/wust-logo.png" alt="" />
          <div>
            <strong>Student Life</strong>
          </div>
          <p>A student-first community built for belonging, leadership, and practical growth.</p>
        </div>
        <div>
          <h3>Explore</h3>
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <h3>Campus</h3>
          <a href="https://www.wust.edu/" target="_blank" rel="noreferrer">Main Site</a>
          <a href="mailto:studentlife@wust.edu">studentlife@wust.edu</a>
          <span>Alexandria, Virginia</span>
        </div>
        <div className="footer-cta">
          <span className="eyebrow eyebrow--light">Have an idea?</span>
          <h3>Help shape student life.</h3>
          <Link className="button button--light" href="/discussion">Start a discussion</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Washington University of Science and Technology</span>
        <span>Built for the student community</span>
      </div>
    </footer>
  );
}
