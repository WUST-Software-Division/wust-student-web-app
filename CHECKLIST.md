# WUST Sustainability Site — Feedback & Redesign Checklist

_Last updated: 2026-07-17_

> Note: the original `feedback.md` and assessment PDF shared at the start of this
> work are not reproduced verbatim here — this checklist is built from the actual
> session history and verified against the current codebase (`git status`, live
> dev server checks), not from re-reading the source documents.

## Content & Real Data

- [x] Governance page — real policy content, mission statement drawn from the
      actual signed "Sustainability Policy and Commitment Statement"
- [x] Reports page — real content, fixed broken header image path
      (`WUST_Sustainability_Annual_Report_Dummy.png` didn't exist)
- [x] Energy / Waste / Water / Transport / Research evidence pages — real WUST
      program content
- [x] Policy source codes/titles reconciled against the 9 real signed PDFs
      (`GD-01`, `GV-01`, `EC-01`/`EC-02` swap, `WT-01`, plus `GD-09`, `GD-10` added)
- [x] Policy PDFs served dynamically via CMS — confirmed pre-existing, no action
      needed
- [x] "Last updated" date — confirmed pre-existing via env var, no action needed

## UI Fixes

- [x] Invisible icon badges (`IconBadge` `tone`/`shape` variants replacing
      fragile className overrides)
- [x] Icon+label pill misalignment (merged into a single flex pill)
- [x] Section width/padding on homepage commitment statement (wrapped in
      `SectionShell`)
- [x] Signee photo card added, duplicate "Approved By" text removed (all 3
      statement cards)
- [x] Sticky nav bar — two-part fix: header/nav restructured as siblings, and
      `overflow-x: hidden` → `overflow-x: clip` on `html`/`body`
- [x] Logo shown beside HOME in sticky state, no line-wrap on
      CAMPUS/NEWS EVENTS links

## Photography (real WUST photos, replacing placeholders/Unsplash)

- [x] Batch 1 (20 photos) — hero, framework cards, focus page headers,
      campus/reports/governance headers, events, news covers
- [x] Per-pipeline-step images de-duplicated across
      energy/waste/water/transport/research (no repeated image per step)
- [x] Batch 2 (23 SDG/UI-GreenMetric-coded photos) — remapped to precise
      ranking-question matches (three-bin recycling, hazardous waste,
      no-idling sign, stormwater sign, bikeshare station, visitor parking,
      pedestrian crossing button, reusable cups/bottles, etc.)
- [x] Batch 3 (SDG7 large-windows photo) — now the homepage hero
- [x] Governance Activity cards + Monthly Updates carousel — Unsplash stock
      photos swapped for real campus photos

## Redesign (beyond the original feedback — requested mid-session)

- [x] Header overlay redesign on all page headers: removed the
      dimming/desaturating filter and grid-mesh texture, replaced with a
      green-left/transparent-right scrim over full-clarity photos
- [x] Interactive Map panel — real Google Maps embed per campus address,
      replacing a non-functional "Launch 3D Navigator" button
- [x] News/Events — new grid component (`NewsGrid`) + dynamic
      `/news-events/[slug]` article detail pages

## Not Yet Done / Open Items

- [ ] **3 missing team headshots** — Adam Lagssaibi, Mohammad Majharul Islam
      Jabed, Cynthia Teran Valadez. None of the supplied campus photos are
      portraits.
- [ ] **Duplicate original-named files** in `public/images/campus/`
      (`IMG_XXXX.jpg` sitting alongside renamed copies from batch 1) — likely a
      OneDrive sync artifact restoring "deleted" originals. Needs confirmation
      before deletion.
- [ ] **Governance Committee section** (`committeeMembers` in
      `GovernanceSection.tsx`) — still fictional names (Dr. Arthur Vance, Prof.
      Elena Rostova, Marcus Thorne, Dr. Aisha Rahman) with Unsplash stock
      headshots. Needs a decision: real bios + photos, or remove the section.
- [ ] **Photo caption/credit strip** (photographer, date, location) — not
      implemented; no EXIF/metadata supplied for any photo batch.
- [ ] **`campusPage.documents` / `DocumentationAreas`** — dead data, not
      rendered anywhere. Several new photos (front desk camera, restricted
      entry sign, indoor plants) have no current content slot.
- [ ] **Nothing has been committed to git yet** — every change this session is
      sitting uncommitted in the working tree.
