"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "../../config/nav";
import styles from "./Header.module.css";

const ENTER_COMPACT_AT = 96; // px scrolled before the header shrinks
const EXIT_COMPACT_AT = 24; // must scroll back above this before it expands again

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forumNavigationActive, setForumNavigationActive] = useState(false);

  useEffect(() => {
    // Two different thresholds for entering vs. leaving the compact state
    // (hysteresis) plus a requestAnimationFrame throttle. Without this, a
    // single cutoff value makes the header flicker back and forth whenever
    // the scroll position hovers right around that number.
    let ticking = false;
    const evaluate = () => {
      setScrolled((current) => {
        const y = window.scrollY;
        return current ? y > EXIT_COMPACT_AT : y > ENTER_COMPACT_AT;
      });
      ticking = false;
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleForumNavigation = (event: Event) => setForumNavigationActive((event as CustomEvent<boolean>).detail);
    window.addEventListener("wust-forum-navigation", handleForumNavigation);
    return () => window.removeEventListener("wust-forum-navigation", handleForumNavigation);
  }, []);

  useEffect(() => {
    setOpen(false);
    setCommunityOpen(false);
    setForumNavigationActive(false);
  }, [pathname]);

  const navLinks = (
    <>
      {navigation.map((item) => item.children ? (
        <div
          className={styles.dropdown}
          key={item.href}
          onMouseEnter={() => setCommunityOpen(true)}
          onMouseLeave={() => setCommunityOpen(false)}
        >
          <div className={styles.dropdownTrigger}>
            <Link href={item.href} className={pathname === item.href ? styles.active : ""} onClick={() => setOpen(false)}>{item.label}</Link>
            <button aria-label="Toggle Community menu" aria-expanded={communityOpen} onClick={() => setCommunityOpen(!communityOpen)}>⌄</button>
          </div>
          <div className={`${styles.dropdownMenu}${communityOpen ? ` ${styles.isOpen}` : ""}`} aria-label="Community directory">
            <div className={styles.dropdownHeading}><span>Explore community</span><small>Find your place here</small></div>
            <div className={styles.dropdownCards}>
            {item.children.map((child) => (
              <Link key={child.label} href={child.href} onClick={() => { setOpen(false); setCommunityOpen(false); }}>
                <span>{child.initials}</span><span><strong>{child.label}</strong><small>{child.description}</small><em>{child.count} <b>→</b></em></span>
              </Link>
            ))}
            </div>
          </div>
        </div>
      ) : (
            <Link key={item.href} href={item.href} className={pathname === item.href ? styles.active : ""} onClick={() => setOpen(false)}>{item.label}</Link>
      ))}
    </>
  );

  return (
    <>
      <div className={styles.campusBar} aria-label="Campus websites">
        <div className={`container ${styles.campusBarInner}`}>
          <span>Washington University of Science and Technology</span>
          <nav aria-label="Campus websites">
            <a href="https://www.wust.edu/" target="_blank" rel="noreferrer">Main Campus</a>
            <a href="https://global.wust.edu/" target="_blank" rel="noreferrer">Global Campus</a>
            <a href="https://la.wust.edu/" target="_blank" rel="noreferrer">LA Campus</a>
          </nav>
        </div>
      </div>
        <header className={`${styles.siteHeader}${scrolled ? ` ${styles.scrolled}` : ""}${forumNavigationActive ? ` ${styles.forumHidden}` : ""}`}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.brandRow}>
            <Link href="/" className={styles.brand} aria-label="Student Life home">
              <img src="/images/wust/wust-logo.png" alt="Student Life" />
              <span><strong>Student</strong><small>Student Life</small></span>
            </Link>
          </div>
          <div className={styles.navRow}>
            <Link href="/" className={`${styles.brand} ${styles.compactBrand}`} aria-label="Student Life home">
              <img src="/images/wust/wust-logo.png" alt="Student Life" />
              <span><strong>Student</strong><small>Student Life</small></span>
            </Link>
            <button className={styles.menuToggle} aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
            <nav className={`${styles.mainNav}${open ? ` ${styles.isOpen}` : ""}`} aria-label="Main navigation">
              {navLinks}
            </nav>
            <Link className={styles.cta} href="/discussion#forum">Open forum <span>↗</span></Link>
          </div>
        </div>
      </header>
    </>
  );
}
