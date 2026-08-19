"use client";

import { useState } from "react";
import { galleryImages } from "../../../data/home";

export default function GalleryCarousel() {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((active + direction + galleryImages.length) % galleryImages.length);

  return (
    <section className="section gallery-section">
      <div className="container gallery-header">
        <div><span className="eyebrow">Campus in motion</span><h2>Snapshots from student life.</h2></div>
        <div className="carousel-controls"><button onClick={() => move(-1)} aria-label="Previous image">←</button><span>{String(active + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span><button onClick={() => move(1)} aria-label="Next image">→</button></div>
      </div>
      <div className="gallery-window">
        <div className="gallery-track" style={{ transform: `translateX(calc(-${active} * (var(--gallery-card-width) + 18px)))` }}>
          {galleryImages.map((image, index) => <figure key={image.src} className={index === active ? "active" : ""}><img src={image.src} alt={image.alt} /><figcaption><span>0{index + 1}</span>{image.alt}</figcaption></figure>)}
        </div>
      </div>
    </section>
  );
}
